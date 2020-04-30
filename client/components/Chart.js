// import React, { Component } from 'react'
import Chart from "chart.js";
import moment from 'moment'
import { Line } from 'react-chartjs-2';
import pagesData from '../data/users/desired_format.json';
import { apiGet, apiPut, apiPost } from '../lib/api';

export default class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
    }
  
    async componentDidMount() {    
		let filteredDates;
		let totalClicks = 0;
        let totalImpressions = 0;
        let sumOfCTR = 0;
        let sumOfPositions = 0;
		
		// add up all values from all pages on specific date
		const data = pagesData.data;

		// get date X months before today
		var d = new Date();
		d.setMonth(d.getMonth() - 6);

		const dateX_monthsago = this.convert(d);

		// loop through all data to get specific dates data
		for (let i = 0; i < data.length; i++) {
			const element = data[i];

			const allDates = element.data;
			const todaysDate = new Date(Date.now()).toLocaleString();

			// specific data for required time frame  (3/6 months)
			filteredDates = this.getDates(allDates, todaysDate, dateX_monthsago);
		}

		let xAxis = [];
		let filteredDatesArr = [];
		let clickData = [];
		let impressionData = [];
		let ctrData = [];
		let positionData = [];


		// loop through figures of 3months and add up for each
		for (let f = 0; f < filteredDates.length; f++) {
			const filteredDate = filteredDates[f];
			filteredDatesArr.push(filteredDate);
			
		}

		// get every 9th value
		var chartFiguresArr = filteredDatesArr.filter(function(value, index, Arr) {
			return index % 9 == 0;
		});

		for (let j = 0; j < chartFiguresArr.length; j++) {

			//create X axis labels for chart
			xAxis.push(chartFiguresArr[j].date)



			clickData.push(chartFiguresArr[j].figures[0]);
			impressionData.push(chartFiguresArr[j].figures[1])
			ctrData.push(chartFiguresArr[j].figures[2])
			positionData.push(chartFiguresArr[j].figures[3])
		}




      this.myChart = new Chart(this.chartRef.current, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
            label: 'Clicks',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: clickData
          },{
            label: 'Impressions',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: impressionData
		  },{
            label: 'CTR',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: ctrData
		  },{
            label: 'Position',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: positionData
		  }
		]
        }
      });
	}

	
	convert = (str) => {
		var date = new Date(str),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join("-");
	}

    getDates = (array, startDate, stopDate) => {
		let all = [];
		for (let j = 0; j < array.length; j++) {
			const element = array[j];
			if (element.date > stopDate) {
				all.push(element)
			}
		}

		return all;
  }
  
    componentDidUpdate() {
      // get all the values here
      const {averageCTRVisible, averagePositionVisible, clicksVisible, impressionsVisible} = this.props

    }

    render() {
      return <canvas ref={this.chartRef} />;
      <div id="root"></div>
    }
  }