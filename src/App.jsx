import { Routes, Route } from 'react-router-dom';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CountriesList />} />
      <Route path="/country/:id" element={<CountryDetails />} />
    </Routes>
  );
}

export default App;
