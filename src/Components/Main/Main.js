import React from 'react'
import DOMClassNames from '../../Variables/DOMClassNames'

class Main extends React.Component {
    render() {
        return (
            <div className={DOMClassNames().todosFooter}>
                <p>This page is currently in progress. Come back later.</p>
            </div>
        )
    }
}

export default Main;