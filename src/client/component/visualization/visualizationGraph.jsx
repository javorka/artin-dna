import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved,import/extensions
import charts from 'charts';

class VisualizationGraph extends Component {
  static parseData(dataToParse) {
    const { data, maxIndex, ticks } = dataToParse.reduce((result, value, index, array) => {
      /* eslint-disable no-param-reassign */
      if (array[result.maxIndex].frequency < value.frequency) {
        result.maxIndex = index;
      }
      result.data.push([
        { v: index + 1, f: value.location },
        value.frequency,
        VisualizationGraph.generateTooltip(value),
        null, // style
      ]);
      result.ticks.push({ v: index + 1, f: value.location });
      return result;
    }, { data: [], maxIndex: 0, ticks: [] });

    data[maxIndex][3] = 'color: #EF681F';

    return { data, ticks };
  }

  static generateTooltip(data) {
    return (
      '<div style="padding: 5px;">' +
      `<span style="font-size: medium; font-style: italic; font-weight: bold; padding-left: 5px">Gene ${data.location}</span>` +
      '<ul style="list-style: none; margin-left: 0; padding-left: 5px">' +
      `<li><strong>Frequency: </strong>${Math.round(data.frequency * 10000) / 100}%</li>` +
      `<li><strong>Gene name: </strong>${data.geneName}</li>` +
      `<li><strong>Annotation impact: </strong>${data.annotationImpact}</li>` +
      `<li><strong>Feature type: </strong>${data.featureType}</li>` +
      `<li><strong>HGVSc: </strong>${data.HGVSc}</li>` +
      `<li><strong>HGVSp: </strong>${data.HGVSp}</li>` +
      `<li><strong>AA Position Length: </strong>${data.AAPositionLength}</li>` +
      '</ul>' +
      '</div>'
    );
  }

  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.drawChart();
    window.addEventListener('resize', this.drawChart);
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const dataTable = new charts.visualization.DataTable();
    dataTable.addColumn('number', 'Location');
    dataTable.addColumn('number', 'Frequency');
    dataTable.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    dataTable.addColumn({ type: 'string', role: 'style' });

    const { data, ticks } = VisualizationGraph.parseData(this.props.data);
    dataTable.addRows(data);

    const options = {
      trendlines: {
        0: {
          type: 'polynomial',
          degree: 2,
          lineWidth: 2,
          opacity: 1,
          tooltip: false,
          color: 'red',
        },
      },
      hAxis: {
        title: 'Gene location',
        gridlines: {
          color: 'transparent',
        },
        slantedTextAngle: 50,
        ticks,
      },
      vAxis: {
        title: 'Frequency',
        format: 'percent',
        minValue: 0,
        maxValue: 1,
      },
      explorer: {
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 4.0,
        maxZoomOut: 1,
      },
      tooltip: { isHtml: true },
      legend: { position: 'none' },
      colors: ['#76C045'],
      dataOpacity: 0.7,
    };

    const chart = new charts.visualization
      .ColumnChart(document.getElementById(this.props.chromosome));

    chart.draw(dataTable, options);
  }

  render() {
    return (<div id={this.props.chromosome} />);
  }
}

export const graphDataPropType = PropTypes.shape({
  chromosome: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  frequency: PropTypes.number.isRequired,
  annotationImpact: PropTypes.string.isRequired,
  geneName: PropTypes.string.isRequired,
  featureType: PropTypes.string.isRequired,
  HGVSc: PropTypes.string.isRequired,
  HGVSp: PropTypes.string.isRequired,
  AAPositionLength: PropTypes.string.isRequired,
});

VisualizationGraph.propTypes = {
  chromosome: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(graphDataPropType),
};

VisualizationGraph.defaultProps = {
  data: [],
};

export default VisualizationGraph;