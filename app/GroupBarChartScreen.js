import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

class StackedBarChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: "CIRCLE",
        formSize: 14,
        xEntrySpace: 30,
        yEntrySpace: 0,
        wordWrapEnabled: true,
        formToTextSpace: 10,
        horizontalAlignment: "CENTER",
      },
      data: {
        dataSets: [
          {
            values: [125, 110, 135, 140, 130, 160, 170],
            label: "Systolic",
            config: {
              drawValues: true,
              colors: [processColor("#E4B81D")],
            },
          },
          {
            values: [80, 75, 60, 85, 90, 95, 105],
            label: "Diastolic",
            config: {
              drawValues: true,
              colors: [processColor("#4166C8")],
            },
          },
        ],
        config: {
          barWidth: 0.25,
          group: {
            fromX: 0,
            groupSpace: 0.5,
            barSpace: 0,
          },
        },
      },
      xAxis: {
        valueFormatter: [
          "1 Apr",
          "2 Apr",
          "3 Apr",
          "4 Apr",
          "5 Apr",
          "6 Apr",
          "7 Apr",
        ],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 7,
        axisMinimum: 0,
        centerAxisLabels: true,
        position: "BOTTOM",
        avoidFirstLastClipping: true,
      },

      yAxis: {
        left: {
          axisMinimum: 0,
          axisMaximum: 240,
          drawAxisLines: false,
          drawGridLines: false,
          limitLines: [{
            label: 'Upper limit',
            limit: 160,
            lineWidth: 2,
            labelPosition: 'LEFT_TOP',
            valueTextColor: processColor('red'),
            lineColor: processColor('red'),
          }, {
            label: 'Lower limit',
            limit: 75,
            lineWidth: 2,
            labelPosition: 'RIGHT_BOTTOM',
            valueTextColor: processColor('red'),
            lineColor: processColor('green'),
          }]
        },
        right: { axisMinimum: 0, axisMaximum: 0 },
      },
    };
  }

    componentDidMount() {
    // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
    // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
    // so 4 should be used as dataIndex to highlight bubble data.

    // if there is only bar, bubble in this combined chart.
    // 1 should be used as dataIndex to highlight bubble data.

    this.setState({...this.state, highlights: [{x: 1, y:40}, {x: 2, y:50}]})
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

        <View style={styles.container}>
          <BarChart
            xAxis={this.state.xAxis}
            style={styles.chart}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={true}
            highlightPerTapEnabled={false}
            highlightPerDragEnabled={false}
            drawGridBackground={true}
            gridBackgroundColor={processColor('#fff')}
            pinchZoom={false}
            doubleTapToZoomEnabled={false}
            chartDescription={{text:''}}
            yAxis={this.state.yAxis}
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
    marginBottom: 10,
  },
  chart: {
    flex: 0.7
  }
});


export default StackedBarChartScreen;
