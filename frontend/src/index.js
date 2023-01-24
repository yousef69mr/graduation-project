import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import getData from './services/getData';

const Host_url = "http://127.0.0.1:8000/";

const languages = getData(Host_url.concat('languages/'));
console.log(languages);

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <App host_url={Host_url} languages={languages} />
  </React.StrictMode>
);


