import { Button, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/system";
import axios from "axios";
import { FC, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../../config";
import { useCrypto } from "../../context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface CoinChartProps {
  id: string | undefined;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart: FC<CoinChartProps> = ({ id }) => {
  const { currency, symbol } = useCrypto();
  const [days, setDays] = useState<number>(1);
  console.log(days);
  const [flag, setflag] = useState(true);

  const [historyData, setHistoryData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setHistoryData(data?.prices);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const chartDays = [
    { value: 1, label: "1 Days" },
    { value: 30, label: "30 Days" },
    { value: 90, label: "3 Months" },
    { value: 365, label: "1 Year" },
  ];

  const handleDayClick = (value: number) => {
    setDays(value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        {!historyData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historyData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historyData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays?.map((day) => (
                <button
                  key={day.value}
                  onClick={() => handleDayClick(day.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "5%",
                    border: "2px solid rgb(141,141,31,1)",
                    background:
                      day.value === days ? " rgb(141,141,31,1)" : "black",
                    color: day.value === days ? "black" : "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export { CoinChart };
