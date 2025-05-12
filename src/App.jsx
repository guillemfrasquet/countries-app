import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<CountriesList />} />
        <Route path="country/:id" element={<CountryDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
