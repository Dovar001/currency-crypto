import { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Currency } from './components/currency';
import { Header } from './components/header';
import { Main } from './components/main';
import styles from './app.module.css';

function App() {
  return (

    <div className={styles.app} >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/currency/:id' element={<Currency />} />
        </Routes>
      </BrowserRouter>

    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;
