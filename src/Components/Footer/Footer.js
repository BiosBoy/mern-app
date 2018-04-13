import React from 'react'
import DOMClassNames from '../../Variables/DOMClassNames'

class Footer extends React.Component {
    render() {
        return (
            <div className={DOMClassNames().todosFooter}>
                <p>------------------------------</p>
                <p>Full-stack MERN-app. v.1.2</p>
                <p>Powered by
                    <a href="https://www.mongodb.com/" style={{color: "rgb(31, 212, 62)"}}> MongoDB</a> & 
                    <a href="http://expressjs.com/" style={{color: "rgb(62, 144, 28)"}}> Express</a> &  
                    <a href="https://reactjs.org/" style={{color: "rgb(97, 102, 251)"}}> React</a> & 
                    <a href="https://nodejs.org/en/" style={{color: "rgb(111, 69, 186)"}}> NodeJS</a>. Styled on 
                    <a href="https://getbootstrap.com/" style={{color: "rgb(86, 61, 124)"}}> Bootstrap 4 Dev</a>
                </p> 
                <p><a href="https://sviatkuzh.top/">by Sviatoslav Kuzhelev. 2018</a></p>
                <p>All right Reserved</p>
            </div>
        )
    }
}

export default Footer;