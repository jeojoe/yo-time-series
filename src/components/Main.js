require('normalize.css');
require('styles/App.css');
require('styles/chartist.min.css');

import React from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist'

import { stringToKeyboardPosition } from '../zup_timeseries/string_series'
import { threeDimensionDTW } from '../zup_timeseries/util'

//let yeomanImage = require('../images/yeoman.png');

class DistanceMeter extends React.Component {
  render() {
    const input = this.props.inputSeries;
    const comparing = this.props.comparingSeries;

    const distance = threeDimensionDTW(input, comparing);

    return (
      <div className="center">{distance.toFixed(2)}</div>
    )
  }
}


let AppComponent = React.createClass({
  getInitialState() {
    return {
      timeSeriesDataInput: [{ x: 0, y: 0, z: 0 }],
      timeSeriesDataExist: [{ x: 0, y: 0, z: 0 }]
    }
  },
  updateTimeSeriesData(data, target) {
    if(target === 'input') {
      this.setState({ timeSeriesDataInput: data });
    } else {
      this.setState({ timeSeriesDataExist: data });
    }
  },
  render() {
    return (
      <div className="index">
        <DistanceMeter
          inputSeries={this.state.timeSeriesDataInput}
          comparingSeries={this.state.timeSeriesDataExist}
        />

        <SearchInput
          timeSeriesData={this.state.timeSeriesDataInput}
          updateTimeSeriesData={this.updateTimeSeriesData}
          type='input'
        />

        <SearchInput
            timeSeriesData={this.state.timeSeriesDataInput}
            updateTimeSeriesData={this.updateTimeSeriesData}
            type='exist'
        />
      </div>
    );
  },
  renderCode() {
    return this.state.timeSeriesDataInput.map((code) => {
      return <p>{code}</p>
    })
  }
});

let SearchInput = React.createClass({
  calcInput(e) {
    let text = e.target.value;
    let utf16Series = stringToKeyboardPosition(text);
    if (!utf16Series.length) utf16Series.push(0);
    this.props.updateTimeSeriesData(utf16Series, this.props.type);
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
