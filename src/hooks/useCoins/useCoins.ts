import axios from "axios";
import {
  CoinList,
  HistoricalChart,
  SingleCoin,
  TrendingCoins,
} from "../../config";

const useCoins = () => {
  const getCoinList = async (currency: string): Promise<any> => {
    try {
      const res = await axios.get(CoinList(currency));
      const data = res.data;
      return { data };
    } catch (error) {
      return { error };
    }
  };
  const getSingleCoin = async (id: string | undefined): Promise<any> => {
    try {
      const res = await axios.get(SingleCoin(id));
      const data = res.data;
      return { data };
    } catch (error) {
      return { error };
    }
  };
  const getTrendingCoins = async (currency: string): Promise<any> => {
    try {
      const res = await axios.get(TrendingCoins(currency));
      const data = res.data;
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const getHistorycalChart = async (
    id: string | undefined,
    days: number,
    currency: string
  ): Promise<any> => {
    try {
      const res = await axios.get(HistoricalChart(id, days, currency));
      const data = res.data;
      return { data };
    } catch (error) {
      return { error };
    }
  };

  return { getCoinList, getSingleCoin, getTrendingCoins, getHistorycalChart };
};

export { useCoins };
