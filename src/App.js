import React, {Component} from 'react';
import {LineChart, Line, YAxis, XAxis, CartesianGrid} from 'recharts';
import ReactDataGrid from 'react-data-grid';
import './App.css';
import Cities from './Cities';

class ChartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {data: props.data.hourly.map((w)=>{
                const {time:t,...rest} = w;
                return {time:this.timeToString(t), ...rest};
            }
        )}
    }

    timeToString(t) {
     const d = new Date(t);
     return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+"-"+d.getHours();
    }

    render() {
        return (
            <div>
                <h4>{this.props.name}</h4>
            <LineChart width={600} height={300} data={this.state.data}>
                <Line type="monotone" dataKey={this.props.dataKey} stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="time"/>
                <YAxis />
            </LineChart>
            </div>
        );
    }
}
class TableItem extends Component {
    names = {0: 'mu', 1: 'sigma', 2:'min', 3:'max'}
    greeks = {0: '\u03BC', 1: '\u03C3', 2: 'min', 3: 'max'}
    render() {
        return (
            <ReactDataGrid
                columns={[
                    { key: 'name', name: '--' },
                    { key: 't', name: 'temperature' },
                    { key: 'h', name: 'humidity' },
                    { key: 'w', name: 'wind' },
                    { key: 'wd', name: 'wind direction' }
                    ]
                }
                rowGetter={(i) => {return {name:this.greeks[i], t: this.props.data.t[this.names[i]], h:this.props.data.h[this.names[i]],
                                            w:this.props.data.w[this.names[i]], wd:this.props.data.wd[this.names[i]]};}}
                rowsCount={4}
                minHeight={300} />
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {data: []};
    }

    render() {
        return (
            <div className="App">
                <h2>view and compare weather</h2>
                {this.state.data.map((item, idx) => (
                    <div key={item.city}>
                        <h3>{item.city}</h3>
                        <ChartItem dataKey="t" data={item} name="temperature"/>
                        <ChartItem dataKey="h" data={item} name="humidity"/>
                        <ChartItem dataKey="w" data={item} name="wind speed"/>
                        <ChartItem dataKey="wd" data={item} name="wind direction"/>
                        <TableItem data={item.stat}/>
                    </div>
                ))}
                <Cities onDataChanged={(data) => this.setState(data)}/>
            </div>
        );
    }
}

export default App;
