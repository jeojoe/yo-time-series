require('normalize.css');
require('styles/App.css');
require('styles/chartist.min.css');

import React from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist'

import { stringToKeyboardPosition } from '../zup_timeseries/string_series'
import { threeDimensionDTW, extractSeriesDimension } from '../zup_timeseries/util'

//let yeomanImage = require('../images/yeoman.png');

class DistanceMeter extends React.Component {
  render() {
    const input = this.props.inputSeries;
    const comparing = this.props.comparingSeries;

    const distance = threeDimensionDTW(input, comparing);

    const options = {
      width: '800px',
      height: '500px',

      showPoint: false,

      lineSmooth: false,

      axisX: {
        showLabel: false,
        type: Chartist.AutoScaleAxis,
        onlyInteger: true
      }
    };

    const type = 'Line';

    const toXYObjectFormat = (elem, index) => { return { x: index, y: elem } };

    const dataX = {
      series: [
        extractSeriesDimension(input, 'x').map(toXYObjectFormat),
        extractSeriesDimension(comparing, 'x').map(toXYObjectFormat)
      ]
    };

    const dataY = {
      series: [
        extractSeriesDimension(input, 'y').map(toXYObjectFormat),
        extractSeriesDimension(comparing, 'y').map(toXYObjectFormat)
      ]
    };

    const dataZ = {
      series: [
        extractSeriesDimension(input, 'z').map(toXYObjectFormat),
        extractSeriesDimension(comparing, 'z').map(toXYObjectFormat)
      ]
    };

    return (
      <div>
        <div className="center alone">{distance.toFixed(2)}</div>

        <ChartistGraph className={'ct-octave'} data={dataX} options={options} type={type} />
        <div className="center">horizontal</div>

        <ChartistGraph className={'ct-octave'} data={dataY} options={options} type={type} />
        <div className="center">vertical</div>

        <ChartistGraph className={'ct-octave'} data={dataZ} options={options} type={type} />
        <div className="center">layout</div>
      </div>
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

        <DistanceMeter
          inputSeries={this.state.timeSeriesDataInput}
          comparingSeries={this.state.timeSeriesDataExist}
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
