import { CircularProgress } from "@mui/material";
import axios from "axios";
import { error } from "console";
import { FC, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config";
import { useCrypto } from "../../context";
import { useCoins } from "../../hooks";
import styles from "./carousel.module.css";

const Carousel: FC = () => {
  const { currency, symbol } = useCrypto();
  const { getTrendingCoins } = useCoins();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    const { data, error } = await getTrendingCoins(currency);
    if (error) {
      setError(error?.message);
    } else {
      setCoins(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = coins.map((coin: any) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link className={styles.link} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin?.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span className={styles.profit}>
          {coin?.symbol}
          &nbsp;
          <span style={{ color: profit ? "green" : "red" }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span className={styles.symbol}>
          {symbol} {coin?.current_price.toFixed(2)}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div>
      {error && <div>Error happened:{error}</div>}
      {loading && (
        <CircularProgress style={{ color: "gold" }} size={200} thickness={1} />
      )}
      {coins && (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          disableDotsControls
          autoPlay
          responsive={responsive}
          items={items}
        />
      )}
    </div>
  );
};

export { Carousel };
