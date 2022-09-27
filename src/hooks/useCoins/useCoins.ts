import axios from "axios";
import { CoinList } from "../../config";

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
  return { getCoinList };
};

export { useCoins };
