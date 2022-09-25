import {
  AppBar,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { useCrypto } from "../../context";
import styles from "./header.module.css";

const Header: FC = () => {
  const { currency, changeCurrency } = useCrypto();

  console.log(currency);

  const handleChange = (e: SelectChangeEvent) => {
    changeCurrency?.(e.target.value);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      sx={{ background: "rgba(255,255,31,0.10)" }}
    >
      <Typography
        variant="h6"
        component={Link}
        to="/"
        className={styles.currency}
      >
        Crypto Currency
      </Typography>
      <Select
        variant="outlined"
        size="small"
        value={currency}
        onChange={handleChange}
        className={styles.select}
      >
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="INR">INR</MenuItem>
        <MenuItem value="RUB">RUB</MenuItem>
      </Select>
    </Stack>
  );
};

export { Header };
