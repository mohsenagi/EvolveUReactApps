import React from 'react';
import {ThemeContext} from './Contexts.js'
import './Setting.css';


class Setting extends React.Component {
    static contextType = ThemeContext;
    render() {
        return(
            <div className="game">
                <p className="eachSetting">Main Font Color:</p>
                <select className="Options" value={this.context.fontColor} onChange={this.context.changeFont} >
                    <option value="White">White</option>
                    <option value="Green">Green</option>
                </select>
            </div>
        )
    }
}

export {Setting}