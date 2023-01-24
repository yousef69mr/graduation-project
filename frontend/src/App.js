
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import SignupPage from './Pages/SignupPage';
import AboutusPage from './Pages/AboutusPage';

import Data from "./Data/data.json";
import useFetch from './services/useFetch';


const App = (props) => {

  const [host, setHost] = useState(props.host_url);
  const [data, setData] = useState(Data);
  const { data: gov, loading, error } = useFetch(host.concat('en/governorates/'));

  console.log(gov, loading, error)
  const languages = props.languages;

  useEffect(() => {
    setData(Data);
  }, [data]);

  return (
    <Router>
      <Navbar languages={languages} />
      <Routes>
        <Route exact path='/' element={<HomePage governorates={data.Governorates} landmarks={data.Landmarks} />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/aboutus' element={<AboutusPage />} />
      </Routes>
    </Router>

  );
}


export default App;

