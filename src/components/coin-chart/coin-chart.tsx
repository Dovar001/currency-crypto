import axios from "axios";
import { FC, useState, useEffect } from "react";
import { HistoricalChart } from "../../config";
import { useCrypto } from "../../context";

interface CoinChartProps {
  id: string | undefined;
}

const CoinChart: FC<CoinChartProps> = ({ id }) => {
  const { currency, symbol } = useCrypto();

  const [historyData, setHistoryData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(HistoricalChart(id, 365, currency));
    setHistoryData(data?.prices);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, [currency]);

  const hisData = historyData?.slice(1, 20).map((history) => {
    return {
      date: `${history[0]}`,
      value: +history[1],
    };
  });

  return <div>1</div>;
};

export { CoinChart };
