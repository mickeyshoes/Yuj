import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class MyPageWeeklyStudyChart extends React.Component {
    constructor(props) {
        super(props);
        console.log("props입니다")
        console.log(props)
        console.log("props.centerImage입니다")
        console.log(props.centerImage)
        const center = props.centerImage
        this.state = {

            series: [props.percentage ? props.percentage : 0],
            options: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 60,
                            size: '65%',
                            image: center,
                            imageWidth: 64,
                            imageHeight: 64,
                            
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
                        src: ['/assets/chartBackground1.png'],
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
        if (this.props.percentage != prevProps.percentage) {
            this.setState({ series: [this.props.percentage] });
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