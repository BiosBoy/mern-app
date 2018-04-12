import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Header from  './Header/Header';
import Footer from './Footer/Footer';

class NotFoundPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        }
    }

    handleClick = (e) => {
        let target = e.target;
        this.setState({
            navigate: true
        });
    }

    render() {
        if (this.state.navigate) {
            return <Redirect to="/employers" />
        } 
        return (
            <Fragment>
                <Header/>
                <div className="page-not-found col-lg-9 mx-auto d-flex flex-column justify-content-center text-center align-items-center">
                    <div className="page-not-found-text">
                        <h1>Oops! 404 Page not found!</h1>
                    </div>
                    <div className="page-not-found-buttons">
                        <p>Go to the main Employers page</p>
                        <button className="btn btn-success" onClick={this.handleClick}>Go ahead</button>
                    </div>
                </div>
                <Footer/>
            </Fragment>
        )
    }
}

export default NotFoundPage;