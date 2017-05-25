import React, {Component} from 'react';

const data = {
    data: [
        {
            city: 'New York', hourly: [
            {time: 1, t: 100, h: 80, w: 10, wd: 90},
            {time: 2, t: 90, h: 70, w: 20, wd: 80},
            {time: 3, t: 80, h: 70, w: 20, wd: 80},
            {time: 4, t: 190, h: 70, w: 20, wd: 80},
            {time: 5, t: 290, h: 50, w: 20, wd: 80},
        ], stat: {
            t: {mu: 1, sigma: 0.1, min: 10, max: 100},
            h: {mu: 1, sigma: 0.1, min: 10, max: 100},
            w: {mu: 1, sigma: 0.1, min: 10, max: 100},
            wd: {mu: 1, sigma: 0.1, min: 10, max: 100}
        }
        },
        {
            city: 'Maiami', hourly: [
            {time: 1, t: 100, h: 80, w: 10, wd: 90},
            {time: 2, t: 90, h: 70, w: 20, wd: 80},
            {time: 3, t: 80, h: 70, w: 20, wd: 80},
            {time: 4, t: 190, h: 70, w: 20, wd: 80},
            {time: 5, t: 290, h: 50, w: 20, wd: 80},
        ], stat: {
            t: {mu: 1, sigma: 0.1, min: 10, max: 100},
            h: {mu: 1, sigma: 0.1, min: 10, max: 100},
            w: {mu: 1, sigma: 0.1, min: 10, max: 100},
            wd: {mu: 1, sigma: 0.1, min: 10, max: 100}
        }
        },
    ]
};

class Cities extends Component {
    constructor() {
        super();
        this.state = {cities: [{name: ''}]};
    }

    handleSubmit = () => {
        const {cities} = this.state;
        console.log('submit ' + cities);
        this.props.onDataChanged(data);
    }

    handleAddCity = () => {
        this.setState({
            cities: this.state.cities.concat([{name: ''}])
        });
    }

    handleRemoveCity = (idx) => () => {
        this.setState({
            cities: this.state.cities.filter((c, cidx) => idx !== cidx)
        });
    }

    handleCityChange = (idx) => (evt) => {
        const newCities = this.state.cities.map((city, cidx) => {
            if (idx !== cidx) return city;
            return {name: evt.target.value};
        });

        this.setState({cities: newCities});
    }

    handleStChange = () => (evt) => {
        this.setState({st:evt.target.value});
    }

    handleEtChange = () => (evt) => {
        this.setState({et:evt.target.value});
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
                            value={city.name}
                            onChange={this.handleCityChange(idx)}
                        />
                        <button type="button" onClick={this.handleRemoveCity(idx)} className="small">-</button>
                    </div>
                ))}
                <button type="button" onClick={this.handleAddCity} className="small">+</button>
                <div>
                    <input
                        type="datetime-local"
                        value={this.state.st}
                        onChange={this.handleStChange()}
                    />
                    <input
                        type="datetime-local"
                        value={this.state.et}
                        onChange={this.handleEtChange()}
                    />
                </div>
                <button type="button" onClick={this.handleSubmit}>request</button>
            </div>
        )
    }
}
;

export default Cities;