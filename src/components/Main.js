require('normalize.css');
require('styles/App.css');
require('styles/chartist.min.css');

import React from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist'

import { stringToKeyboardPosition, translateOffset } from '../zup_timeseries/string_series'
import { DTW } from '../zup_timeseries/util'

//let yeomanImage = require('../images/yeoman.png');

class Graph extends React.Component {
  render() {

    const offsetData = translateOffset(this.props.data, this.props.data2);
    const offsetData2 = translateOffset(this.props.data2, this.props.data);

    const distance = DTW(offsetData, offsetData2);

    const toXYObjectFormat = (elem, index) => { return { x: index, y: elem } };
    const data = {
      series: [
        offsetData.map(toXYObjectFormat),
        offsetData2.map(toXYObjectFormat)
      ]
    };

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

    return (
      <div>
        <ChartistGraph className={'ct-octave'} data={data} options={options} type={type} />
        <div className="center">{distance.toFixed(2)}</div>
      </div>
    )
  }
}


let AppComponent = React.createClass({
  getInitialState() {
    return {
      timeSeriesDataInput: [0],
      timeSeriesDataExist: [0]
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
        <Graph data={this.state.timeSeriesDataInput} data2={this.state.timeSeriesDataExist}/>
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
    if (!utf16Series.length) utf16Series.push(0)
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
