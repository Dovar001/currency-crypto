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

  return <div>{JSON.stringify(historyData)}</div>;
};

export { CoinChart };
