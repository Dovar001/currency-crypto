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
                  <StyledTableCell>{coin?.market_cap}</StyledTableCell>
                  <StyledTableCell>{coin?.current_price}</StyledTableCell>
                  <StyledTableCell>{coin?.total_supply}</StyledTableCell>
                  <StyledTableCell>{coin?.total_volume}</StyledTableCell>
                  <StyledTableCell>
                    {coin?.price_change_percentage_24h.toFixed(2)}%
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
