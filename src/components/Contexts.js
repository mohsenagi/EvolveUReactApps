
import React from 'react';

const ThemeContext = React.createContext();

class ThemeProvider extends React.Component {
    constructor () {
        super ()
        this.state = {
            fontColor: "White",
            LinkedListTarget: null
        }
    }

    changeTarget = (target) => {
        this.setState({LinkedListTarget: target});
    }

    changeFont = (event) => {
        this.setState({fontColor: event.target.value});
    }

    render() {
        return (
        <ThemeContext.Provider value={{...this.state, changeFont : this.changeFont, changeTarget : this.changeTarget}} >
            {this.props.children}
        </ThemeContext.Provider>
        )
    }
}

export {ThemeContext, ThemeProvider}