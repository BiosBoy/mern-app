import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './Auth/LoginPage'
import RegistrationPage from './Auth/RegistrationPage';
import LogoutPage from './Auth/LogoutPage'
import EmployersBox from './Employers/EmployersBox';
import NotFoundPage from './404/NotFoundPage'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/auth/login" render={(props) => 
                            <LoginPage history={this.props.history}/>} />
                        <Route path="/auth/registration" render={(props) => 
                            <RegistrationPage history={this.props.history}/>} />
                        <Route path="/auth/logout" render={(props) => 
                            <LogoutPage history={this.props.history}/>} />
                        <Route path="/employers"  render={(props) => 
                            <EmployersBox {...props} history={this.props.history}/>} />
                        <Route path="" render={(props) => 
                            <NotFoundPage {...props} history={this.props.history}/>} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;