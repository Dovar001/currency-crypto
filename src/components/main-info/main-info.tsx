import {
  Avatar,
  createTheme,
  Grid,
  makeStyles,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { color } from "@mui/system";
import axios from "axios";
import React, { FC, ReactEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CoinList, TrendingCoins } from "../../config";
import { useCrypto } from "../../context";
import { useCoins } from "../../hooks/useCoins";
import { LinearLoading } from "../linear-loading";
import { FiInbox } from "react-icons/fi";
import { StyledTableCell, StyledTableRow } from "../styled-table/styled-table";

const MainInfo: FC = () => {
  const { currency, symbol } = useCrypto();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const { getCoinList } = useCoins();

  const getData = async () => {
    setLoading(true);
    const { data, error } = await getCoinList(currency);
    if (error) {
      setError(error.message);
    }
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [currency]);

  const formatNumber = (inputNumber: any) => {
    let formetedNumber = Number(inputNumber)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    let splitArray = formetedNumber.split(".");
    if (splitArray.length > 1) {
      formetedNumber = splitArray[0];
    }
    return formetedNumber;
  };

  const getPercantage = (number: any) => {
    let formetedNumber = Number(number);
    if (formetedNumber > 0) {
      return (
        <span style={{ color: "#16c784", fontWeight: "bolder" }}>
          {formetedNumber.toFixed(2)}%
        </span>
      );
    } else {
      return (
        <span style={{ color: "#ea3943", fontWeight: "bolder" }}>
          {formetedNumber.toFixed(2)}%
        </span>
      );
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scroll({
      top: 500,
      left: 0,
      behavior: "smooth",
    });
  };

  const data: any[] = coins
    ?.slice((page - 1) * 10, page * 10)
    ?.filter((coin: any) =>
      coin?.name?.toLowerCase()?.includes(search?.toLowerCase())
    );

  return (
    <Grid
      container
      color="white"
      justifyContent="center"
      spacing={3}
      marginTop={20}
      paddingBottom={10}
    >
      <Grid item xs={10}>
        <TextField
          value={search}
          onChange={handleInputChange}
          variant="outlined"
          placeholder="Search for crypto ...."
          color="primary"
          sx={{
            input: { color: "white", border: "1px solid rgb(219, 219, 44)" },
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={10}>
        <TableContainer>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell style={{ color: "white" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell>Market Cap</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Total Supply</StyledTableCell>
                <StyledTableCell>Volume(24h)</StyledTableCell>
                <StyledTableCell>Price change(24h)</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.map((coin: any) => (
                <StyledTableRow>
                  <StyledTableCell>
                    <Stack
                      component={Link}
                      to={`/coins/${coin.id}`}
                      color="#fff"
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      style={{ textDecoration: "none" }}
                    >
                      <Avatar
                        sx={{ height: "60px", width: "60px" }}
                        src={coin?.image}
                      />
                      <Stack>
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                          {coin?.symbol}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "hsl(0deg 7% 73%)",
                          }}
                        >
                          {coin?.name}
                        </span>
                      </Stack>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    {symbol} {formatNumber(coin?.market_cap)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {symbol} {(coin?.current_price).toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatNumber(coin?.total_supply)} {coin?.symbol}
                  </StyledTableCell>
                  <StyledTableCell>
                    {symbol} {formatNumber(coin?.total_volume)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {getPercantage(coin?.price_change_percentage_24h)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {error && <div>{error}</div>}
              {loading && <LinearLoading />}
              {!data && !loading && !error && (
                <StyledTableRow>
                  <StyledTableCell colSpan={6} component="th" scope="row">
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <FiInbox />
                      <Typography>No Data!</Typography>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={10}>
        <Stack alignItems="center">
          <Pagination
            color="primary"
            count={+(coins?.length / 10).toFixed(0)}
            onChange={handlePaginationChange}
            renderItem={(item) => (
              <PaginationItem
                sx={{
                  backgroundColor: "transparent",
                  color: "rgb(219, 219, 44)",
                }}
                {...item}
              />
            )}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export { MainInfo };
