import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Currency } from "./components/currency";
import { Header } from "./components/header";
import { Main } from "./components/main";
import styles from "./app.module.css";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <div className={styles.app}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/currency/:id" element={<Currency />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
