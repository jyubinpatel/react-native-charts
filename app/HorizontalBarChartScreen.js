import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import {HorizontalBarChart} from 'react-native-charts-wrapper';

class HorizontalBarChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: false,
        xEntrySpace: 20,
        yEntrySpace: 10,
        textSize: 14,
        form: "CIRCLE",
        formSize: 14,
        formToTextSpace: 10,
        horizontalAlignment: "CENTER",
      },
      data: {
          dataSets: [
            {
              values: [200, 155, 90, 185, 290, 395, 150],
              label: "Random",
              config: {
                drawValues: false,
                colors: [processColor('#34BDE6')],
              },
          },
          {
            values: [125, 110, 135, 140, 130, 160, 170],
            label: "Post Meal",
            config: {
              drawValues: false,
              colors: [processColor('#4167C8')],
            },
          },
          {
            values: [100,105,102,110,114,109,105],
            label: "Fasting",
            config: {
              drawValues: false,
              color: processColor('#E4B81D'),
            }
          },
        ],
        config: {
          barWidth: 0.25,
          group: {
            fromX: 0,
            groupSpace: 0.25,
            barSpace: 0,
          },
        },
      },
      xAxis: {
        valueFormatter: ['1 Apr', '2 Apr', '3 Apr', '4 Apr', '5 Apr', '6 Apr', '7 Apr'],
        position: 'BOTTOM',
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 7,
        axisMinimum: 0,
        centerAxisLabels: true,
        avoidFirstLastClipping: true,
        drawAxisLines: false,
        drawGridLines: false,
      },
      yAxis: {
        right:
        {
          enabled: true,
          granularityEnabled: true,
          axisMinimum: 0,
          axisMaximum: 500,
          granularity: 50,
          centerAxisLabels: true,
          drawAxisLines: true,
          drawGridLines: true,
          avoidFirstLastClipping: true,
        },
        left: {
          enabled: false,
          granularityEnabled: true,
          axisMinimum: 0,
          axisMaximum: 500,
          granularity: 50,
        }
     }
    };
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
          <HorizontalBarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            animation={{durationX: 1000}}
            legend={this.state.legend}
            drawGridBackground={true}
            gridBackgroundColor={processColor('#fff')}
            drawBarShadow={false}
            drawValueAboveBar={false}
            drawHighlightArrow={false}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
            highlightPerTapEnabled={false}
            highlightPerDragEnabled={false}
            pinchZoom={false}
            doubleTapToZoomEnabled={false}
            chartDescription={{text:''}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 0.7,
  }
});

export default HorizontalBarChartScreen;
