import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/ui/app_screen/App';
import reportWebVitals from './reportWebVitals';
import './index.css'
import AppViewModel from "./main/ui/app_screen/AppViewModel";
import {InMemoryDatabase} from "./main/InMemoryDatabase";


// this can be thought of as a entry point

ReactDOM.render(
    <React.StrictMode>
        <App appViewModel={new AppViewModel(new InMemoryDatabase())}/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
