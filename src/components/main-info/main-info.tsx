import {
  Avatar,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { TrendingCoins } from "../../config";
import { useCrypto } from "../../context";
import { StyledTableCell, StyledTableRow } from "../styled-table/styled-table";

const MainInfo: FC = () => {
  var nf = new Intl.NumberFormat();

  const { currency, symbol } = useCrypto();

  const [coins, setCoins] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setCoins(data);
    console.log(data);
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

  return (
    <Grid container color="white" justifyContent="center" marginTop={20}>
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
              {coins?.map((coin: any) => (
                <StyledTableRow>
                  <StyledTableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar src={coin?.image} />
                      <span> {coin?.name}</span>
                      <span>{coin?.symbol}</span>
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
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export { MainInfo };
