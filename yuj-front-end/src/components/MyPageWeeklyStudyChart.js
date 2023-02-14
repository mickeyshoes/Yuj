import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class MyPageWeeklyStudyChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [props.percentage? props.percentage : 0],
            options: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 15,
                            size: '70%',
                            image: '/assets/chartCenterImage.png',
                            imageWidth: 64,
                            imageHeight: 64,
                            imageClipped: false
                        },
                        dataLabels: {
                            name: {
                                show: false,
                                color: '#fff'
                            },
                            value: {
                                show: true,
                                color: '#333',
                                offsetY: 70,
                                fontSize: '22px'
                            }
                        }
                    }
                },
                fill: {
                    type: 'image',
                    image: {
                        src: ['/assets/chartBackground.jpg'],
                    }
                },
                stroke: {
                    lineCap: 'round'
                },
                labels: ['Volatility'],
            },


        };
    }

    componentDidUpdate(prevProps) {
        if(this.props.percentage != prevProps.percentage){
            this.setState({series: [this.props.percentage]});
        }
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={350} />
            </div>


        );
    }
}


export default MyPageWeeklyStudyChart;