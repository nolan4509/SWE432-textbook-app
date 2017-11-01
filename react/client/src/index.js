import React from 'react'
import { render } from 'react-dom'
import App from './App';

//This is wehre we will initialize the app and call ReactDOM.render, so we want this at the top level.

ReactDOM.render(
    <Api />, 
    document.getElementById('root')
);