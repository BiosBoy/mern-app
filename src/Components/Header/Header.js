import React, { Fragment } from 'react'
import DOMClassNames from '../../Variables/DOMClassNames'

class Header extends React.Component {
    render() {
        return (
            <Fragment>
                <div className={DOMClassNames().todosHeader}>
                    <h2>Full-stack MERN-app</h2>
                    <h3> --- Clear build on MongoDB, Express, React and NodeJS stack ---</h3> 
                </div>
            </Fragment> 
        )
    }
}

export default Header;