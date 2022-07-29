import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config';
import { useCrypto } from '../../context';
import styles from './carousel.module.css';

const Carousel: FC = () => {
  const { currency, symbol } = useCrypto();

  const [coins, setCoins] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setCoins(data);
  };

  useEffect(() => {
    getData();
  }, [currency]);

  const items = coins.map((coin: any) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link className={styles.link} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin?.name}
          height='80'
          style={{ marginBottom: 10 }}
        />
        <span className={styles.profit}>
          {coin?.symbol}
          &nbsp;
          <span style={{ color: profit ? 'green' : 'yellow' }}>
            {profit && '+'}
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

  console.log(coins);

  return (
    <div>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        disableDotsControls
        autoPlay
        responsive={responsive}
        items={items}
      />
    </div>
  );
};

export { Carousel };
