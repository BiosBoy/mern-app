import React from 'react'
import DOMClassNames from '../../Variables/DOMClassNames'

class Preloader extends React.Component {
    render() {
        return ( 
            <div className={DOMClassNames().preloader}>
                <div className={DOMClassNames().loader}></div> 
            </div> 
        ) 
    }
}

export default Preloader;