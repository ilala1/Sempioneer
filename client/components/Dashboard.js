import { Component, createRef } from 'react';
import moment from 'moment';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';

import pagesData from '../data/users/test.json';

var uniqid = require('uniqid');

import { getCookie, removeCookie } from '../lib/session';
import { apiGet, apiPut, apiPost } from '../lib/api';


import DataTable from './DataTable';
import Chart from './Chart';
import Flashes from './Flashes';

const axios = require('axios');

import { redirectIfNoAccess } from '../lib/auth';
import { createFlash } from '../lib/flashes';
import websites from '../pages/websites';


const dtTitles = [{
    key: 'URL',
    type: 'string',
    label: 'URL',
}, {
    key: 'clicks',
    type: 'string',
    label: 'Clicks',
}, {
    key: 'impressions',
    type: 'string',
    label: 'Impressions',
}, {
    key: 'ctr',
    type: 'string',
    label: 'CTR',
}, {
    key: 'position',
    type: 'string',
    label: 'Position',
}];

const UserStyles = styled.aside`
    width:100%;
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

    @media only screen and (max-width: 640px) {

    }       
`;


class Dashboard extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfNoAccess(ctx)) {
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
            siteUrl: [],
            permissionLevel: [],
            loading: true,
            dtTitles: [],
            dtData: [],
            editable: 'true',
        };
    }

    async componentDidMount() {
        const userCookie = getCookie({}, 'user');
        const oneUser = await apiGet({}, '/oneUser', {userCookie});
        this.setState({
            user: oneUser._id,
            userObject: oneUser
        })
        const accessToken = this.state.userObject.access_token;
        const siteURL = localStorage.getItem('siteURL');

        const getSoonestAvailableDayFromAPI = await axios.post('http://flask-env.idjm3vkzsw.us-east-2.elasticbeanstalk.com/api/gsc_data/get_available_dates/', {
            "Access_Token": accessToken,
             "Refresh_Token": "three",
             "Client_Secret": "two",
             "Authorization_Code": "one",
             "site_url": siteURL
         })
          .then((res) => {
              const daysAvailableWTime = res.data;
              let daysAvailable = [];
              let test = [];
              for(var i=0; i<daysAvailableWTime.length; i++){
                  const splitArray = daysAvailableWTime[i].split(',');
                  daysAvailable.push(splitArray[0]);
                  // console.log(res);
        
              }
              for(var k=0; k<daysAvailable.length; k++){
                  var trimmedDays = daysAvailable[k].substring(0, 2);
                  test.push(parseInt(trimmedDays));
        
              }
              var smallest = test[0];
              for (var i=0; i<test.length; i++){
                  if (test[i]<smallest){
                      smallest = test[i];
                  }
              }
              return(smallest);
              
          })
          .catch((error) => {
            console.error(error)
            const userID = this.state.user;
            this.updateTokens(userID);
          })

          console.log(getSoonestAvailableDayFromAPI);
          this.setState({
            loading: false,
            dtTitles,
            dtData: this.createDataTable(pagesData),
          });
    //     const historicalDataPulling = await axios.post('http://flask-env.idjm3vkzsw.us-east-2.elasticbeanstalk.com/api/gsc_data/historical_data_pulling/', {
    //         "Access_Token": accessToken,
    //         "Refresh_Token": "three",
    //         "Client_Secret": "two",
    //         "Authorization_Code": "one",
    //         "site_url": siteURL,
    //         "time_query": 333
    //     })
    //     .then((res) => {
    //         console.log(res.data);
    //         const pages = res.data;
    //         const keys = Object.keys(pages)
    //         const values = Object.values(pages)
    //         console.log(keys);
    //         console.log(values)
            
    //     })
    //     .catch((error) => {
    //         const userID = this.state.user;
    //         this.updateTokens(userID);
    //         console.error(error)
    //     })          

    }

    updateTokens = async (userID) => {
        const status = await apiPost({}, '/refreshTokens', {userID});
 
        console.log(status);
        if (status === 'OK') {
             location.reload();
        }
 
     }

    sortByKey = (array, key) => {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    createDataTable = (allPages) => {
        // console.log(allPages);
        let totalClicks = 0;
        let totalImpressions = 0;
        let averageCTR = 0;
        let averagePosition = 0;
        let noOfDates = 0;
        let newArrayOfPages= [];


        for(var i=0; i<allPages.length; i++){
            const page = allPages[i].data;
            noOfDates = allPages[i].data.length;

            for(var k=0; k<page.length; k++){
                totalClicks += parseInt(page[k].figures[0]);
                totalImpressions += parseInt(page[k].figures[1]);
                averageCTR += parseInt(page[k].figures[2]/noOfDates);
                averagePosition += parseInt(page[k].figures[3]/noOfDates);
            }

            let pageObj = {
                url: allPages[i].URL,
                totalClicks,
                totalImpressions,
                averageCTR,
                averagePosition
            };
            newArrayOfPages.push(pageObj);

        }
        
        console.log(newArrayOfPages);
        // returns object with id and title
        const dtData = newArrayOfPages.map(Page => ({
            id: uniqid(),
            data: [{
                key: 'URL',
                value: Page.url,
            }, {
                key: 'clicks',
                value: Page.totalClicks,
            }, {
                key: 'impressions',
                value: Page.totalImpressions,
            }, {
                key: 'ctr',
                value: Page.averageCTR,
            }, {
                key: 'position',
                value: Page.averagePosition,
            }],
        }));
        return dtData;
    }

    // Event Handlers

    addFlash = (flash) => {
        console.log(flash);
        this.flashesComponent.current.addFlash(flash);
    };

    render() {
        return (
            <UserStyles>
                <Flashes
                    ref={this.flashesComponent}
                    flashes={this.props.flashes}
                />
                <br/>
                <Chart/>>
                <DataTable
                    loading={this.state.loading}
                    titles={this.state.dtTitles}
                    data={this.state.dtData}
                    editable={this.state.editable}
                    sortField="name"
                    sortDirection="dsc"
                    handleBulk={this.bulkIdsState}
                    handleEdit={this.selectForEdit}
                    getResponse={this.clickValidation}
                    btnClick={this.btnClick}
                />
            </UserStyles>
        );
    }
}

export default Dashboard;
