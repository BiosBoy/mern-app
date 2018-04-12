import React from 'react'
import DOMClassNames from '../../Variables/DOMClassNames'

class Footer extends React.Component {
    render() {
        return (
            <div className={DOMClassNames().todosFooter}>
                <p>------------------------------</p>
                <p>Full-stack MERN-app. v.1.0</p>
                <p>Powered by
                    <a href="https://www.mongodb.com/" style={{color: "#61dafb"}}> MongoDB</a> & 
                    <a href="http://expressjs.com/" style={{color: "#61dafb"}}> Express</a> &  
                    <a href="https://reactjs.org/" style={{color: "#61dafb"}}> React</a> & 
                    <a href="https://nodejs.org/en/" style={{color: "#6F45BA"}}> NodeJS</a>. Styled on 
                    <a href="https://getbootstrap.com/" style={{color: "#563d7c"}}> Bootstrap 4 Dev</a>
                </p> 
                <p><a href="https://sviatkuzh.top/">by Sviatoslav Kuzhelev. 2018</a></p>
                <p>All right Reserved</p>
            </div>
        )
    }
}

export default Footer;