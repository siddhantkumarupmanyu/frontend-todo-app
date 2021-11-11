import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/ui/app_screen/App';
import './index.css'
import AppViewModel from "./main/ui/app_screen/AppViewModel";
import {InMemoryDatabase} from "./main/InMemoryDatabase";


// TODO: use local storage instead of InMemory database

// this can be thought of as a entry point

ReactDOM.render(
    <React.StrictMode>
        <App appViewModel={new AppViewModel(new InMemoryDatabase())}/>
    </React.StrictMode>,
    document.getElementById('root')
);
