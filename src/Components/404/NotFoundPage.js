import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import DOMClassNames from '../../Variables/DOMClassNames'
import Header from  '../Header/Header';
import Footer from '../Footer/Footer';

class NotFoundPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        }
    }

    handleClick = () => {
        this.props.history.push("");
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
                <div className={DOMClassNames().pageNotFound}>
                    <div className={DOMClassNames().pageNotFoundText}>
                        <h1>Oops! 404 Page not found!</h1>
                    </div>
                    <div className={DOMClassNames().pageNotFoundButtons}>
                        <p>Go to the main Employers page</p>
                        <button className={DOMClassNames().pageNotFoundButton} 
                            onClick={this.handleClick}>
                            Go ahead
                        </button>
                    </div>
                </div>
                <Footer/>
            </Fragment>
        )
    }
}

export default NotFoundPage;