import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';

import Admin from "./components/admin"
import history from './History';
import Parents from "./components/Parents"
import Practioners from "./components/Practioners"
import Orders from "./components/Orders"

import Dashboard from "./components/Dashboard"
// export const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Admin} />   
                    <Route exact path="/Dashboard" component={Dashboard} />   
                    <Route  path="/Parents" component={Parents} />   
                    <Route  path="/Practitioners" component={Practioners} />   
                    <Route  path="/Orders" component={Orders} />   
                </div>
            </Router>
        )
    }
}

export default Routers;