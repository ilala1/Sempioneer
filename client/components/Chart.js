// import React, { Component } from 'react'
import Chart from "chart.js";
import moment from 'moment'
import { Line } from 'react-chartjs-2';
import { apiGet, apiPut, apiPost } from '../lib/api';
import { getCookie, removeCookie } from '../lib/session';

import pagesData from '../data/desired_format.json';


export default class LineChart extends React.Component {
    constructor(props) {
      super(props);
	  this.chartRef = React.createRef();
	//   this.state = {
	// 		averageCTRVisible: {props.averageCTRVisible},
	// 		averagePositionVisible: false,
	// 		clicksVisible: true,
	// 		impressionsVisible: true,
	// 		chkbox: true
	// 	};
    }
  
    async componentDidMount() {  
		const userCookie = getCookie({}, 'user');
		this.displayChart(this.props.month);
		
		const test = await apiGet({}, '/pagesData', {userCookie});
		console.log(test)
	}

	displayChart = (month) => {
		let filteredDates;
		let xAxis = [];
		let filteredDatesArr = [];
		let clickData = [];
		let impressionData = [];
		let ctrData = [];
		let positionData = [];
		let allPagesAllDates = [];

		let sumOfClicksForChart = 0;
		let sumOfImpressionsForChart = 0;
		let sumOfCTRForChart = 0;
		let sumOfPositionForChart = 0;
		let groupingDatesWithFigures = {};
		
		// add up all values from all pages on specific date
		const data = pagesData.data;

		// get date X months before today
		var d = new Date();
		console.log
		d.setMonth(d.getMonth() - month);

		const dateX_monthsago = this.formatDate(d);

		// loop through all data to get specific dates data
		for (let i = 0; i < data.length; i++) {
			const element = data[i];
			const allDates = element.data;
			// loop through allthe dates and add them into an array of all the dates for all the pages
			for (let j = 0; j < allDates.length; j++) {
				allPagesAllDates.push(allDates[j])
			}
			// specific data for required time frame  (3/6 months)
			filteredDates = this.getDates(allPagesAllDates, dateX_monthsago);
		}

		
		// loop through figures of 3months create array of all relevant dates with all pages
		for (let f = 0; f < filteredDates.length; f++) {
			const filteredDate = filteredDates[f];
			filteredDatesArr.push(filteredDate);
		}

		// group by date
		var groupedDatesArray = filteredDatesArr.reduce(function (r, z) {
			r[z.date] = r[z.date] || [];
			r[z.date].push(z);
			return r;
		}, Object.create(null));
	
		// console.log(groupedDatesArray)

		// need to loop through each key and add up figures for each

		for (let [key, value] of Object.entries(groupedDatesArray)) {			
			let clicksData = 0;
			let impressionsData = 0;
			let ctrData = 0;
			let positionData = 0;

			// loop through and add all the values for each date
			for (let b = 0; b < value.length; b++) {
				clicksData += parseInt(value[b].figures[0]);
				impressionsData += parseInt(value[b].figures[1]);
				ctrData += parseInt(value[b].figures[2]);
				positionData += parseInt(value[b].figures[3]);
			}
	
			// grouping all the dates and their figures into object
			groupingDatesWithFigures[`${key}`] = [`${clicksData}`, `${impressionsData}`, `${ctrData}`, `${positionData}`];
		  }
		
		// split objects into array of arrays 
		let arrOfArraysofAllRelevantDates = Object.entries(groupingDatesWithFigures);

		// Split array into 16 
		var chartFiguresArr = arrOfArraysofAllRelevantDates.filter(function(value, index, Arr) {
			return index % 5 == 0;
		});

		// sorting chartFiguresArr array
		chartFiguresArr.sort((a, b) => (a.date > b.date) ? 1 : -1)


		for (let j = 0; j < chartFiguresArr.length; j++) {
			//create X axis labels for chart
			xAxis.push(chartFiguresArr[j][0])

			// adding all data into arrays
			clickData.push(chartFiguresArr[j][1][0]);
			impressionData.push(chartFiguresArr[j][1][1])
			ctrData.push(chartFiguresArr[j][1][2])
			positionData.push(chartFiguresArr[j][1][3])
		}
		// Create Chart with data provided
		this.createChart(xAxis, clickData, impressionData, ctrData, positionData)
	}

	createChart = (xAxis, clickData, impressionData, ctrData, positionData) => {
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
				data: clickData,
				hidden: !this.props.clicksVisible
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
				data: impressionData,
				hidden: !this.props.impressionsVisible
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
				data: ctrData,
				hidden: !this.props.averageCTRVisible
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
				data: positionData,
				hidden: !this.props.averagePositionVisible
			  }]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				legend: {
					onClick: (e) => e.stopPropagation()
				}
			}
		  });
	}

	// formats date from Thu Jan 30 2020 19:54:37 GMT+0000 - 2020-01-30
	formatDate = (str) => {
		var date = new Date(str),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join("-");
	}

	// gets dates before stop date from all data
    getDates = (array, stopDate) => {
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
		// get all the values from props
		const {month, averageCTRVisible, averagePositionVisible, clicksVisible, impressionsVisible} = this.props
		const chartDataSets = this.myChart.data.datasets;

		if (month === '6') {
			this.displayChart(6);
		} else {
			this.displayChart(3);
		}


		for (let c = 0; c < chartDataSets.length; c++) {
			const element = chartDataSets[c];

			switch(element.label) {
				case "Clicks":
					element.hidden = !clicksVisible
					this.myChart.update();
					break;
				case "Impressions":
					element.hidden = !impressionsVisible
					this.myChart.update();
					break;
				case "CTR":
					element.hidden = !averageCTRVisible
					this.myChart.update();
					break;
				case "Position":
					element.hidden = !averagePositionVisible
					this.myChart.update();
					break;
				default:
					// code block
			}
		}
    }

    render() {
      return <canvas ref={this.chartRef} id='dataChart' />;
      <div id="root"></div>
    }
  }