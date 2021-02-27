import React from 'react';
import PropTypes from 'prop-types';
import S from '../utilities/Main';

import '../../css/components-inc/chart.css';

export default class Chart extends React.Component {

    constructor(props) {
        super(props);

        this.ctx = null;

        this.nodes = {
            'root': React.createRef(),
            'canvas': React.createRef(),
        };
    }

    renderType() {
        switch (this.props.type) {
            case Chart.TYPE_PIE:
                return 'pie';
            default:
            case Chart.TYPE_LINE:
                return 'line';
        }
    }

    static makeChartDataSet(label, data, backgroundColor) {
        return { label, data, backgroundColor };
    }

    componentDidMount() {
        this.ctx = this.nodes.canvas.current.getContext('2d');

        this.chart = new ChartJs(this.ctx, {
            'type': this.renderType(),
            'data': {
                'labels': [],
                'datasets': [],
            },
            'options': this.chartOptions(),
        });

        this.updateChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }

    renderScales() {

        const pieChartScales = {
            'xAxes': [{
                'display': false,
                'ticks': {
                    'maxTicksLimit': 32,
                    'fontColor': '#4a4a4a',
                },
                'gridLines': {
                    'display': true,
                    'drawBorder': true,
                },
            }],
            'yAxes': [{
                'display': false,
                'ticks': {
                    'beginAtZero': true,
                    'maxTicksLimit': 10,
                    'fontColor': '#4a4a4a',
                },
                'gridLines': {
                    'display': false,
                    'color': '#ececec',
                    'zeroLineColor': '#ececec',
                    'drawBorder': false,
                },
                'stacked': false,
            }],
        };

        const lineChartScales = {
            'xAxes': [{
                'display': false,
                'ticks': {
                    'maxTicksLimit': 32,
                    'fontColor': '#4a4a4a',
                },
                'gridLines': {
                    'display': true,
                    'drawBorder': true,
                },
            }],
            'yAxes': [{
                'display': true,
                'ticks': {
                    'display': false,
                    'beginAtZero': true,
                    'maxTicksLimit': 10,
                    'fontColor': '#4a4a4a',
                },
                'gridLines': {
                    'display': true,
                    'color': '#ececec',
                    'zeroLineColor': '#ececec',
                    'drawBorder': false,
                },
                'stacked': false,
            }],
        };

        return this.props.type === Chart.TYPE_PIE ? pieChartScales : lineChartScales;
    }

    chartOptions() {

        return {
            'maintainAspectRatio': false,
            'scales': this.renderScales(),
            'axes': {
                'display': false,
            },
            'legend': {
                'display': false,
            },
            'elements': {
                'line': {
                    'tension': 0, // disables bezier curves
                },
            },
            'tooltips': {
                'displayColors': true,
                'custom': (tooltip) => {
                    if (tooltip === false) { return; }

                    tooltip.displayColors = false;
                },
                'callbacks': {
                    label: (tooltipItem, data) => {
                        let label = S.Strings.EMPTY, value = S.Strings.EMPTY;

                        switch (this.props.type) {
                            case Chart.TYPE_LINE:
                                label = tooltipItem.xLabel;
                                value = tooltipItem.yLabel;
                                break;
                            case Chart.TYPE_PIE: {
                                const index = tooltipItem.index;
                                label = data.labels[index];
                                value = data.datasets[0].data[index];
                            }
                                break;
                            default:
                                break;
                        }

                        return `${label}: ${value}`;
                    },
                    title(tooltipItem, data) {
                    },
                },
            },
        };
    }

    updateChart() {
        this.chart.data.labels = this.props.labels;
        this.chart.data.datasets = this.props.data.map((data) => {

            if (this.props.type === Chart.TYPE_PIE) {
                return {
                    'label': data.label,
                    'data': data.data,
                    'borderColor': data.backgroundColor,
                    'backgroundColor': data.backgroundColor,
                    'pointBackgroundColor': 'transparent',
                    'pointBorderColor': 'transparent',
                };
            } return {
                'label': data.label,
                'data': data.data,
                'borderColor': data.backgroundColor,
                'backgroundColor': 'transparent',
                'pointBackgroundColor': data.backgroundColor,
                'pointBorderColor': data.backgroundColor,
            };
        });
        this.chart.update();
    }

    render() {

        return (
            <div
                ref={this.nodes.root}
                className={`Chart ${this.props.className}`} >

                <canvas ref={this.nodes.canvas} />

            </div>
        );
    }

}

Chart.TYPE_PIE = 1;
Chart.TYPE_LINE = 2;

Chart.defaultProps = {
    'className': S.Strings.EMPTY,
};

Chart.propTypes = {
    'className': PropTypes.string,
    'labels': PropTypes.any,
    'data': PropTypes.any,
    'type': PropTypes.number,
};
