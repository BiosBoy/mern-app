import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './Components/App';

const history = createHistory();

ReactDOM.render(
    <BrowserRouter>
        <App history={history}/>
    </BrowserRouter>, 
    document.getElementById('root')
);