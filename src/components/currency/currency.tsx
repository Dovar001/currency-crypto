import {
  Grid,
  Typography,
  Stack,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCrypto } from "../../context";
import { useCoins } from "../../hooks";
import { CoinChart } from "../coin-chart";
import styles from "./currency.module.css";

const Currency: FC = () => {
  const { id } = useParams();
  const { currency } = useCrypto();
  const { getSingleCoin } = useCoins();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [coin, setCoin] = useState<any>();

  const getData = async () => {
    setLoading(true);
    const { data, error } = await getSingleCoin(id);
    if (error) {
      setError(error?.message);
    } else {
      setCoin(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <Grid minHeight={"90.4vh"} height="100%" container>
      <Grid
        padding={2}
        item
        color="white"
        alignSelf="center"
        xs={12}
        md={4}
        borderRight="2px solid #999"
      >
        {error && <div>Error happaned: {error}</div>}
        {loading && (
          <CircularProgress
            style={{ color: "gold" }}
            size={200}
            thickness={1}
          />
        )}
        {!error && !loading && (
          <>
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
          </>
        )}
      </Grid>
      <Grid padding={2} alignSelf="center" color="white" item xs={12} md={8}>
        <CoinChart id={id} />
      </Grid>
    </Grid>
  );
};
export { Currency };
