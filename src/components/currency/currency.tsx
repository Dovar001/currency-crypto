import { Grid, Typography, Stack, Skeleton } from "@mui/material";
import axios from "axios";
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart, SingleCoin } from "../../config";
import { useCrypto } from "../../context";
import styles from "./currency.module.css";

const Currency: FC = () => {
  const { id } = useParams();

  const { currency } = useCrypto();
  const [loading, setLoading] = useState<boolean>(false);

  const [coin, setCoin] = useState<any>();

  const getData = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [currency]);

  console.log(loading);

  return (
    <Grid height="90.4vh" container>
      <Grid
        padding={2}
        item
        color="white"
        alignSelf="center"
        xs={4}
        borderRight="2px solid #999"
      >
        <Stack alignItems="center" marginBottom={2} spacing={2}>
          {loading ? (
            <Skeleton variant="circular" height={250} width={250} />
          ) : (
            <img
              height={250}
              width={250}
              src={coin?.image?.large}
              alt="currency"
            />
          )}
          <Typography variant="h3" component="h6">
            {coin?.name}
          </Typography>
          <Typography className={styles.desc}>
            {coin?.description?.en?.split(".")[0]}
          </Typography>
        </Stack>
        <Typography variant="h5" component="h1">
          Rank: <span className={styles.rank}>{coin?.coingecko_rank}</span>
        </Typography>
        <Typography variant="h5" component="h1">
          Current Price: <span className={styles.rank}>{2}</span>
        </Typography>
        <Typography variant="h5" component="h1">
          Market Cap: <span className={styles.rank}>{2}</span>
        </Typography>
      </Grid>
      <Grid color="white" item xs={8}>
        2
      </Grid>
    </Grid>
  );
};
export { Currency };
