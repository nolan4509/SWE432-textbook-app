import React from 'react'
import { render } from 'react-dom'
import Main from './containers/routes'
import { BrowserRouter } from 'react-router-dom'

render((
    <BrowserRouter>
        <Main />
    </BrowserRouter>
), document.getElementById('root'));