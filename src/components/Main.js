require('normalize.css');
require('styles/App.css');
require('styles/chartist.min.css');

import React from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist'

import { stringToUTF16Series } from '../zup_timeseries/string_series'

//let yeomanImage = require('../images/yeoman.png');

class Graph extends React.Component {
  render() {

    const data = {
      series: [
        this.props.data
          .map((elem, index) => {
            return { x: index, y: elem } })
      ]
    };

    const options = {
      width: '800px',
      height: '500px',

      lineSmooth: false,

      axisX: {
        showLabel: false,
        type: Chartist.AutoScaleAxis,
        onlyInteger: true
      }
    };

    const type = 'Line';

    return (
      <div>
        <ChartistGraph className={'ct-octave'} data={data} options={options} type={type} />
      </div>
    )
  }
}


let AppComponent = React.createClass({
  getInitialState() {
    return {
      timeSeriesData: [0]
    }
  },
  updateTimeSeriesData(data) {
    this.setState({
      timeSeriesData: data
    })
  },
  render() {
    return (
      <div className="index">
        <Graph data={this.state.timeSeriesData}/>
        <SearchInput
          timeSeriesData={this.state.timeSeriesData}
          updateTimeSeriesData={this.updateTimeSeriesData}
        />
      </div>
    );
  },
  renderCode() {
    return this.state.timeSeriesData.map((code) => {
      return <p>{code}</p>
    })
  }
});

let SearchInput = React.createClass({
  calcInput(e) {
    let text = e.target.value;
    let utf16Series = stringToUTF16Series(text);
    if (!utf16Series.length) utf16Series.push(0)
    this.props.updateTimeSeriesData(utf16Series);
  },
  render() {
    return (
      <input onChange={this.calcInput}
             placeholder="Insert some text.."
             className="search-box"
      />
    )
  }
});

AppComponent.defaultProps = {
};

export default AppComponent;
