import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import {LineChart} from 'react-native-charts-wrapper';

const COLOR_PURPLE = processColor('#697dfb');

class AxisLineChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      data: {},
      xAxis: {},
      yAxis: {}
    };
  }

  componentDidMount() {
    const valueRange = 100;
    const size = 30;

    this.setState(
      update(this.state, {
        xAxis: {
          $set: {
            valueFormatter: [
              "8 AM",
              "8:30 AM",
              "9 AM",
              "9:30 AM",
              "10:00 AM",
              "10:30 AM",
              "11:00 AM",
            ],
            labelRotationAngle: 60,
            granularityEnabled: true,
            granularity: 1,
            axisMaximum: 7,
            axisMinimum: 0,
            centerAxisLabels: true,
            position: "BOTTOM",
            avoidFirstLastClipping: true,
            textColor: processColor('red'),
            textSize: 14,
            gridColor: processColor('red'),
            gridLineWidth: 0.5,
            axisLineColor: processColor('darkgray'),
            axisLineWidth: 1,
            gridDashedLine: {
              lineLength: 10,
              spaceLength: 10
            },
            avoidFirstLastClipping: true,
          }
        },
        yAxis: {
          $set: {
            left: {
              axisMinimum: 0,
              axisMaximum: 140,
              drawGridLines: false
            },
            right: {
              enabled: false
            }
          }
        },
        data: {
          $set: {
            dataSets: [{
              values: this._randomYValues(valueRange, size),
              label: '',
              config: {
                mode: 'CUBIC_BEZIER',
                lineWidth: 1.5,
                drawCircles: false,
                drawCubicIntensity: 0.3,
                drawCubic: true,
                drawHighlightIndicators: false,
                color: COLOR_PURPLE,
                drawFilled: true,
                fillColor: COLOR_PURPLE,
                fillAlpha: 90
              }
            }],
          }
        }
      })
    );
  }

  _randomYValues(range: number, size: number) {
    const nextValueMaxDiff = 0.8;
    let lastValue = range / 2;

    return _.times(size, () => {
      let min = lastValue * (1 - nextValueMaxDiff);
      let max = lastValue * (1 + nextValueMaxDiff);
      return {y: Math.random() * (max - min) + min};
    });
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (

      <View style={{flex: 1}}>

        <View style={{height:80}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            legend={{enabled: false}}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingBottom: 20,
  },
  chart: {
    flex: 1
  }
});

export default AxisLineChartScreen;
