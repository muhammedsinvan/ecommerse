import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {ScrollToTop} from "./component/ScrollTop/ScrollTop";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <BrowserRouter>
  <ScrollToTop />
    <App />
  </BrowserRouter> 
);

  
//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