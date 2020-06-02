import { Component, createRef } from 'react';
import moment from 'moment';
import styled, { ThemeProvider } from 'styled-components';
const axios = require('axios');
const uniqid = require('uniqid');

// functions
import { getCookie, removeCookie } from '../lib/session';
import { apiGet, apiPut, apiPost } from '../lib/api';
import { redirectIfNotAuthenticated } from '../lib/auth';
import { test } from '../lib/gsc';
import { createFlash } from '../lib/flashes';

// Components
import DataTable from './DataTable';
import Chart from './Chart';
import Flashes from './Flashes';
import Select from './forms/Select';

// Data
import oldPagesData from '../data/oldDesiredFormat.json';
import pagesData from '../data/desired_format.json';
import monthNames from '../data/month.json';


import websites from '../pages/websites';


const monthOptions = monthNames.map(access => ({
    value: access.id,
    label: access.title,
}));

const dtAllTitles = [{
    key: '0',
    type: 'string',
    label: 'URLt',
}, {
    key: '1',
    type: 'string',
    label: 'Total Clicks',
}, {
    key: '2',
    type: 'string',
    label: 'Total Impressions',
}, {
    key: '5',
    type: 'string',
    label: 'Test',
}];


const dtTitles = [{
    key: '0',
    type: 'string',
    label: 'URL',
}, {
    key: '1',
    type: 'string',
    label: 'Total Clicks',
}, {
    key: '2',
    type: 'string',
    label: 'Total Impressions',
}, {
    key: '5',
    type: 'string',
    label: 'Test',
}];

const UserStyles = styled.aside`
    width:100%;
    .sub-nav {
        display: flex;
        justify-content: center;
        padding: 1rem 0;

        .filter {
            padding: 0 5rem;
            display: flex;
            align-items: center;

            >* { flex: 0 0 auto; }

            label { padding-right: 1rem; }

            input[type="checkbox"] {
                width: 1.8rem;
                height: 1.8rem;

                background: white;

                border: 1px solid #ACACAC;

                cursor: pointer;

                &:checked { background-color: #9B2583; }
            }
        }

        .filterMonth {
            padding: 0 5rem;
            select::-ms-expand {
                display: none;
            }
        }
    }
    .button {
        border: 1px solid black;
        padding: 0.6rem 0.8rem;
        :hover {
            background: #00a9e0;
            color: #fff;
        }
    }

    h2 {
        text-align:center;
        padding: 3rem 0;
    }

    .testBtn {
        color: #000;
        text-decoration: none;
    }

    @media only screen and (max-width: 640px) {

    }       
`;


class Dashboard extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfNotAuthenticated(ctx)) {
            return {};
        }

        return {};
    }

    constructor(props) {
        super(props);
        this.flashesComponent = createRef();
        this.state = {
            user: '',
            userObject: {},
            siteUrl: '',
            permissionLevel: [],
            loading: true,
            month: '3',
            dtTitles: [],
            dtData: [],
            editable: 'true',
            averageCTRVisible: false,
            averagePositionVisible: false,
            clicksVisible: true,
            impressionsVisible: true,
            chkbox: true
        };
    }

    async componentDidMount() {
        // testing remote js file code
        // test();
        // end remote js file test


        const userCookie = getCookie({}, 'user');
        const oneUser = await apiGet({}, '/oneUser', {userCookie});
        const siteURL = localStorage.getItem('siteURL');

        this.setState({
            loading: true,
            user: userCookie,
            userObject: oneUser,
            siteUrl: siteURL

        })
        const userID = this.state.user;
        const userObject = this.state.userObject;
        const accessToken = this.state.userObject.access_token;


        // local data test ----------------
        // this.setState({
        //     loading: false,
        //     dtTitles,
        //     dtData: this.createDataTable(pagesData.data),
        // });

        // create array for db page data to go into
        let DBpagesArray = [];

        // check db to see if page exists in db
        const DBpagesData = await apiGet({}, '/pagesdata', {userID, siteURL});

        DBpagesData.forEach(element => {
            DBpagesArray.push(element.page)
        });

        if (DBpagesData.length !== 0) {
            console.log('database data exists')
            let {month} = this.state;
            this.filterDates(DBpagesArray, month);

        } else {
            console.log('no database data -- pulling from live ')
            //if not
            const historicalDataPulling = await axios.post('http://sempioneer-api-prod.eba-vq3iddtp.us-west-2.elasticbeanstalk.com/api/gsc_data/async_scraping/', {
                "Access_Token": accessToken,
                "Refresh_Token": "three",
                "Client_Secret": "two",
                "Authorization_Code": "one",
                "site_url": siteURL,
                "userID": userID,
                "dimensions": "['page']"
            })
            .then((res) => {
                console.log('got Data')
                console.log(res)
                if (res) {
                    const pagesData = res.data;
                    console.log(pagesData);
                    const domain = pagesData.domain;
                    this.setState({
                        loading: false,
                        dtTitles,
                        dtData: this.createDataTable(pagesData.data),
                    });
                    this.postPagesDataToDB(pagesData, userObject, domain, siteURL);
                } else {
                    console.log('error - potentially need new access token')
                    this.updateTokens(userID);
                }
            })
            .catch((error) => {
                console.error(error)
            }) 
        }
    }

    // get filtered timeframe worth of data
    filterDates = async (data, month) => {

console.log(data)

		let filteredDates;
		let xAxis = [];
		let filteredDatesArr = [];
		let clickData = [];
		let impressionData = [];
		let ctrData = [];
		let positionData = [];
        let allPagesAllDates = [];
        let groupingDatesWithFigures = {};

        // calculating the figures for table
        let totalClicks = 0;
        let totalImpressions = 0;
        let sumOfCTR = 0;
        let sumOfPositions = 0;
        let averageCTR = 0;
        let averagePosition = 0;

        let newArrayOfPages= [];


        var d = new Date();        

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
        
		// group by site_url
		var groupedDatesArray = filteredDatesArr.reduce(function (r, z) {
			r[z.site_url] = r[z.site_url] || [];
			r[z.site_url].push(z);
			return r;
        }, Object.create(null));
        
        // TODO
        // Make sure figures are accurate for each page!



console.log(groupedDatesArray)

        
		// need to loop through each key and add up figures for each
        
		for (let [key, value] of Object.entries(groupedDatesArray)) {			
            let test = []
            let clicksData = 0;
			let impressionsData = 0;
			let ctrData = 0;
            let positionData = 0;
            let pageURL = '';

			// loop through and add all the values for each date
			for (let b = 0; b < value.length; b++) {
                clicksData = parseInt(clicksData) + value[b].figures[0];
                // console.log(value[b].figures[0])
                // console.log(clicksData)
				impressionsData += parseInt(value[b].figures[1], 10);
				ctrData += parseInt(value[b].figures[2], 10);
				positionData += parseInt(value[b].figures[3], 10);
            }
            
			groupingDatesWithFigures[`${key}`] = [`${clicksData}`, `${impressionsData}`, `${ctrData}`, `${positionData}`];
        }
console.log(groupingDatesWithFigures)
        


		// split objects into array of arrays 
        let arrOfArraysofAllRelevantDates = Object.entries(groupingDatesWithFigures);
        
        let noOfDates = arrOfArraysofAllRelevantDates.length;

        console.log(arrOfArraysofAllRelevantDates)
        for (let l = 0; l < arrOfArraysofAllRelevantDates.length; l++) {
            console.log(arrOfArraysofAllRelevantDates[l])
            let pageObj = {
                url: arrOfArraysofAllRelevantDates[l][0],
                totalClicks: arrOfArraysofAllRelevantDates[l][1][0],
                totalImpressions: arrOfArraysofAllRelevantDates[l][1][1],
                averageCTR: arrOfArraysofAllRelevantDates[l][1][2],
                averagePosition: arrOfArraysofAllRelevantDates[l][1][3]
            };
            newArrayOfPages.push(pageObj);
            // totalClicks += parseInt(arrOfArraysofAllRelevantDates[l][1][0]);
            // totalImpressions += parseInt(arrOfArraysofAllRelevantDates[l][1][1]);
            // sumOfCTR += parseInt(arrOfArraysofAllRelevantDates[l][1][2]);
            // sumOfPositions += parseInt(arrOfArraysofAllRelevantDates[l][1][3]);

            // averageCTR = sumOfCTR/noOfDates;
            // averagePosition = sumOfPositions/noOfDates;
        }

        // for (let z = 0; z < data.length; z++) {
            // let pageObj = {
            //     url: data[z].Grouped_URL,
            //     totalClicks,
            //     totalImpressions,
            //     averageCTR,
            //     averagePosition
            // };
        //     newArrayOfPages.push(pageObj);
        // }
        console.log('newArrayOfPages')
        console.log(newArrayOfPages)
        this.setState({
            loading: false,
            dtTitles,
            dtData: this.createDataTable(newArrayOfPages),
        });
    }

    createDataTable = (allPages) => {
        // let totalClicks = 0;
        // let totalImpressions = 0;
        // let sumOfCTR = 0;
        // let sumOfPositions = 0;
        // let averageCTR = 0;
        // let averagePosition = 0;
        // let noOfDates = 0;
        // let newArrayOfPages= [];

        // // const totalProps = allPages.reduce((a, obj) => a + Object.keys(obj).length, 0);
        // // console.log(totalProps);

        // for(var i=0; i<allPages.length; i++){
        //     const page = allPages[i].data;
        //     noOfDates = page.length;


        //     for(var k=0; k<page.length; k++){
        //         // does all the calculations for the table figures
        //         totalClicks += parseInt(page[k].figures[0]);
        //         totalImpressions += parseInt(page[k].figures[1]);

        //         sumOfCTR += parseInt(page[k].figures[2]);
        //         averageCTR = sumOfCTR/noOfDates;

        //         sumOfPositions += parseInt(page[k].figures[3]);
        //         averagePosition = sumOfPositions/noOfDates;
        //     }

        //     let pageObj = {
        //         url: allPages[i].Grouped_URL,
        //         totalClicks,
        //         totalImpressions,
        //         averageCTR,
        //         averagePosition
        //     };
        //     newArrayOfPages.push(pageObj);

            
        // }
        // console.log('old newArrayOfPages')
        // console.log(newArrayOfPages)
        
        // returns object with id and title
        const dtData = allPages.map(Page => ({
            id: uniqid(),
            data: [{
                key: '0',
                value: Page.url,
            }, {
                key: '1',
                value: Page.totalClicks,
            }, {
                key: '2',
                value: Page.totalImpressions,
            }, {
                key: '3',
                value: Page.averageCTR,
            }, {
                key: '4',
                value: Page.averagePosition,
            }, {
                key: '5',
                value: <button><a className="testBtn" href="/experiment">Test</a></button>
            }],
        }));
        return dtData;
    }

    // Event Handlers

    postPagesDataToDB = async (data, userID, domain, siteURL) => {
        const post = await apiPost({}, '/pagesdata', {data, userID, domain, siteURL});
    }

    updateTokens = async (userID) => {
        const status = await apiPost({}, '/refreshTokens', {userID});
 
        console.log(status);
        if (status === 'OK') {
             location.reload();
        }
 
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

    // formats date from Thu Jan 30 2020 19:54:37 GMT+0000 - 2020-01-30
	formatDate = (str) => {
		var date = new Date(str),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join("-");
	}

    sortByKey = (array, key) => {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    addFlash = (flash) => {
        console.log(flash);
        this.flashesComponent.current.addFlash(flash);
    };

    filterAverageCTR = async (e) => {
        await this.setState({
            averageCTRVisible: !this.state.averageCTRVisible
        });

        let {averageCTRVisible} = this.state;

        if (averageCTRVisible === true) {
            console.log('true')
            
            var index = dtAllTitles.findIndex(x => x.key=="3")
            // here you can check specific property for an object whether it exist in your array or not
            
            if (index === -1){
                dtAllTitles.unshift({
                    key: '3',
                    type: 'string',
                    label: 'Average CTR',
                });

                function compare(a, b) {
                    const labelA = a.key;
                    const labelB = b.key;
                  
                    let comparison = 0;
                    if (labelA > labelB) {
                      comparison = 1;
                    } else if (labelA < labelB) {
                      comparison = -1;
                    }
                    return comparison;
                  }

                console.log(dtAllTitles.sort(compare));

            } else {
                console.log("object already exists")
            }

            this.setState({
                dtTitles: dtAllTitles
            })
        }

        if (averageCTRVisible === false) {
            console.log('false')
            for (let i = 0; i < dtAllTitles.length; i++) {
                if(dtAllTitles[i].key === '3') {
                    dtAllTitles.splice(i, 1);
                };
            }
            dtAllTitles.sort();
        }

        this.setState({
            dtTitles: dtAllTitles
        })

    }

    filterAveragePosition = async (e) => {
        console.log('position'); 
        await this.setState({
            averagePositionVisible: !this.state.averagePositionVisible
        });

        let {averagePositionVisible} = this.state;

        if (averagePositionVisible === true) {
            console.log('true')
            
            var index = dtAllTitles.findIndex(x => x.key=="4")
            // here you can check specific property for an object whether it exist in your array or not
            
            if (index === -1){
                dtAllTitles.unshift({
                    key: '4',
                    type: 'string',
                    label: 'Average Position',
                });

                function compare(a, b) {
                    const labelA = a.key;
                    const labelB = b.key;
                  
                    let comparison = 0;
                    if (labelA > labelB) {
                      comparison = 1;
                    } else if (labelA < labelB) {
                      comparison = -1;
                    }
                    return comparison;
                  }

                console.log(dtAllTitles.sort(compare));

                this.setState({
                    dtTitles: dtAllTitles
                })
            } else {
                console.log("object already exists")
            }
        }

        if (averagePositionVisible === false) {
            console.log('false')
            for (let i = 0; i < dtAllTitles.length; i++) {
                if(dtAllTitles[i].key === '4') {
                    dtAllTitles.splice(i, 1);
                };
            }

            dtAllTitles.sort();
        }

        this.setState({
            dtTitles: dtAllTitles
        })

    }

    filterClicks = async (e) => {
        await this.setState({
            clicksVisible: !this.state.clicksVisible
        });

        let {clicksVisible} = this.state;

        if (clicksVisible === true) {
            console.log('true')
            
            var index = dtAllTitles.findIndex(x => x.key=="1")
            // here you can check specific property for an object whether it exist in your array or not
            
            if (index === -1){
                dtAllTitles.unshift({
                    key: '1',
                    type: 'string',
                    label: 'Total Clicks',
                });

                function compare(a, b) {
                    const labelA = a.key;
                    const labelB = b.key;
                  
                    let comparison = 0;
                    if (labelA > labelB) {
                      comparison = 1;
                    } else if (labelA < labelB) {
                      comparison = -1;
                    }
                    return comparison;
                  }

                  console.log(dtAllTitles.sort(compare));

                this.setState({
                    dtTitles: dtAllTitles
                })
            } else {
                console.log("object already exists")
            }
        }
        
        if (clicksVisible === false) {
            console.log('false')
            for (let i = 0; i < dtAllTitles.length; i++) {
                if(dtAllTitles[i].key === '1') {
                    dtAllTitles.splice(i, 1);
                };
            }
            dtAllTitles.sort();
        }

        this.setState({
            dtTitles: dtAllTitles
        })

    }

    filterImpressions = async (e) => {
        await this.setState({
            impressionsVisible: !this.state.impressionsVisible
        });

        let {impressionsVisible} = this.state;
        let arr = [];
        if (impressionsVisible === true) {
            console.log('true')
            
            //find index of 2 in dtAllTitles
            var index = dtAllTitles.findIndex(x => x.key=="2")
            // here you can check specific property for an object whether it exist in your array or not

            // if it doesnt exist add it to array
            if (index === -1){
                dtAllTitles.unshift({
                    key: '2',
                    type: 'string',
                    label: 'Total Impressions',
                });

                function compare(a, b) {
                    const labelA = a.key;
                    const labelB = b.key;
                  
                    let comparison = 0;
                    if (labelA > labelB) {
                      comparison = 1;
                    } else if (labelA < labelB) {
                      comparison = -1;
                    }
                    return comparison;
                  }

                  console.log(dtAllTitles.sort(compare));


                this.setState({
                    dtTitles: dtAllTitles
                })
            } else {
                console.log("object already exists")
            }
        }
        
        if (impressionsVisible === false) {
            console.log('false')
            for (let i = 0; i < dtAllTitles.length; i++) {
                if(dtAllTitles[i].key === '2') {
                    dtAllTitles.splice(i, 1);
                };
            }
            dtAllTitles.sort();
        }

        this.setState({
            dtTitles: dtAllTitles
        })

    }

    monthState = async (e) => {
        this.setState({ month: e.target.value });

        console.log(e.target.value)
    };

    getSelectedSite = (response) => {
        console.log(response);
        // if (response < 100) {
        //     this.addFlash(createFlash('error', 'Please select a website with more than 100 clicks.'));
        // }
    }

    // TODO ---------------------------------
    // need to get siteURL through when clicking row to pass onto experiments page
    btnClick = (siteURL) => {
        const accessToken = this.state.userObject.access_token;
        if (siteURL === '') {
            this.addFlash(createFlash('error', 'Please select a website.'));
        } else {
            console.log(siteURL)
        }
    }

    render() {
        return (
            <UserStyles>
                <Flashes
                    ref={this.flashesComponent}
                    flashes={this.props.flashes}
                />
                <br/>
                <div className="sub-nav">
                <div className="filter">
                        <label htmlFor="filter-clicks">Clicks?</label>
                        <input type="checkbox" id="filter-clicks" onChange={this.filterClicks} defaultChecked={this.state.chkbox}/>
                    </div>

                    <div className="filter">
                        <label htmlFor="filter-impressions">Impressions?</label>
                        <input type="checkbox" id="filter-impressions" onChange={this.filterImpressions} defaultChecked={this.state.chkbox}/>
                    </div>
                    <div className="filter">
                        <label htmlFor="filter-ctr">CTR?</label>
                        <input type="checkbox" id="filter-ctr" onChange={this.filterAverageCTR} />
                    </div>
                   
                    <div className="filter">
                        <label htmlFor="filter-postion">Position?</label>
                        <input type="checkbox" id="filter-postion" onChange={this.filterAveragePosition} /> 
                    </div>
                    
                    <div className="filterMonth">
                        <Select
                            label="Month"
                            name="monthName"
                            value={this.state.month}
                            options={monthOptions}
                            changeState={this.monthState}
                            errorMessage="Must choose a name"
                        />
                    </div>
                </div>
                <Chart
                    dtData={this.state.dtData}
                    siteURL={this.state.siteUrl}
                    averageCTRVisible={this.state.averageCTRVisible}
                    averagePositionVisible={this.state.averagePositionVisible}
                    clicksVisible={this.state.clicksVisible}
                    impressionsVisible={this.state.impressionsVisible}
                    month={this.state.month}
                />

                <DataTable
                    loading={this.state.loading}
                    titles={this.state.dtTitles}
                    data={this.state.dtData}
                    editable={this.state.editable}
                    sortField="name"
                    sortDirection="dsc"
                    handleBulk={this.bulkIdsState}
                    handleEdit={this.selectForEdit}
                    test={this.getSelectedSite}
                    btnClick={this.btnClick}
                />
            </UserStyles>
        );
    }
}

export default Dashboard;
