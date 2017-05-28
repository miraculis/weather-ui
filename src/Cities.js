import React, {Component} from 'react';
import $ from 'jquery';
import Bacon from 'baconjs';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Cities extends Component {
    state = {cities: [''], et:moment(), st:moment()};
    constructor() {
        super();
    }

    handleSubmit = () => {
        Bacon.fromPromise($.ajax({url : "/api?" + this.state.cities.reduce((string, city) => {return string + "city=" + city + "&";},"") +
            "st=" + this.state.st + "&et=" + this.state.et})).onValue((v) => this.props.onDataChanged(v));
    }

    handleAddCity = () => {
        const {cities: xs, ...rest} = this.state;
        this.setState({cities: [...xs, ''], ...rest});
    }

    handleRemoveCity = (idx) => () => {
        this.state.cities.splice(idx);
        this.setState(this.state);
    }

    handleCityChange = (idx) => (evt) => {
        this.state.cities.splice(idx, 1, evt.target.value);
        this.setState(this.state);
    }

    handleStChange = (date) => {
        const {st:t, ...rest} = this.state;
        this.setState({st:date, ...rest});
    }

    handleEtChange = (date) => {
        const {et:t, ...rest} = this.state;
        this.setState({et:date, ...rest});
    }

    render() {
        return (
            <div>
                <h4>choose cities</h4>

                {this.state.cities.map((city, idx) => (
                    <div key={'city' + idx}>
                        <input
                            type="text"
                            placeholder={`city #${idx + 1} name`}
                            value={city}
                            onChange={this.handleCityChange(idx)}
                        />
                        <button type="button" onClick={this.handleRemoveCity(idx)} className="small">-</button>
                    </div>
                ))}
                <button id="addcity" type="button" onClick={this.handleAddCity} className="small">+</button>
                <div>
                    <DatePicker
                        selected={this.state.st}
                        onChange={this.handleStChange}
                    />
                    <DatePicker
                        selected={this.state.et}
                        onChange={this.handleEtChange}
                    />
                </div>
                <button type="button" onClick={this.handleSubmit}>request</button>
            </div>
        )
    }
}
;

export default Cities;