import { Typography } from '@mui/material';
import { FC } from 'react';
import { Carousel } from '../carousel';
import styles from './banner.module.css';

const Banner: FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.title} >
        <Typography color='#fff' fontWeight={500} variant='h2' component='h1'>
          Crypto Currency
        </Typography>
        <Typography color='#fff ' fontWeight={200}>
          A cryptocurrency is a digital or virtual currency that is secured by
          cryptography, which makes it nearly impossible to counterfeit or
          double-spend
        </Typography>
      </div>
      <Carousel />
    </div>
  );
};

export { Banner };
