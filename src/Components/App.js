import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Auth from './Auth/Auth';
import Main from './Main/Main';
import LoginPage from './Auth/LoginPage'
import RegistrationPage from './Auth/RegistrationPage';
import LogoutPage from './Auth/LogoutPage'
import EmployersBox from './Employers/EmployersBox';
import NotFoundPage from './NotFoundPage'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        {/* <Route path="/" render={(props) => <Main history={this.props.history}/>} /> */}
                        {/* <Route path="/auth/" render={(props) => <Auth history={this.props.history}/>} /> */}
                        <Route path="/auth/login" render={(props) => <LoginPage history={this.props.history}/>} />
                        <Route path="/auth/registration" render={(props) => <RegistrationPage history={this.props.history}/>} />
                        <Route path="/auth/logout" render={(props) => <LogoutPage history={this.props.history}/>} />
                        <Route path="/employers" 
                            render={(props) => <EmployersBox {...props} history={this.props.history}/>} />
                        <Route path="" component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;