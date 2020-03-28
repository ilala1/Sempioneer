import { Component, createRef } from 'react';
import moment from 'moment';
import styled, { ThemeProvider } from 'styled-components';

// import pagesData from '../data/users/desired_format.json';

var uniqid = require('uniqid');

import { getCookie, removeCookie } from '../lib/session';
import { apiGet, apiPut, apiPost } from '../lib/api';


import DataTable from './DataTable';
import Chart from './Chart';
import Flashes from './Flashes';

const axios = require('axios');

import { redirectIfNoAccess } from '../lib/auth';
import { test } from '../lib/gsc';
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
            loading: true,
            user: oneUser._id,
            userObject: oneUser
        })
        const userID = this.state.user;
        const accessToken = this.state.userObject.access_token;
        const siteURL = localStorage.getItem('siteURL');

        // // this.postPagesDataToDB(pagesData);
        // this.setState({
        //     loading: false,
        //     dtTitles,
        //     dtData: this.createDataTable(pagesData),
        // });
        const historicalDataPulling = await axios.post('http://gsc-production.kggsendwcm.us-west-2.elasticbeanstalk.com/api/gsc_data/async_scraping/', {
            "Access_Token": accessToken,
            "Refresh_Token": "three",
            "Client_Secret": "two",
            "Authorization_Code": "one",
            "site_url": siteURL,
            "userID": userID,
            "dimensions": ['page']
        })
        .then((res) => {
            if (res) {
                console.log(res.data);
                const allData = res.data;

                const pagesData = res.data;
                const domain = res.data.domain;
                console.log(domain);
                this.postPagesDataToDB(pagesData, userID, domain);
                this.setState({
                    loading: false,
                    dtTitles,
                    dtData: this.createDataTable(pagesData),
                });
            } else {
                
                this.updateTokens(userID);
            }
        })
        .catch((error) => {
            console.error(error)
        })          
    }

    postPagesDataToDB = async (data, userID, domain) => {
        // const DBPages = await apiGet({}, '/dbPageData');


        // for (let i = 0; i < DBPages.length; i++) {
        //     const db = DBPages[i];
        //     console.log(db);
        //     for (let j = 0; j < data.length; j++) {
        //         const local = data[j];
                
        //         if (db.URL === !local.URL) {
        //             // need to update db data with the local
        //             console.log('no match')
        //         }
        //     }
        // }
        const test = await apiPost({}, '/pagesdata', {data, userID, domain});
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
        
        // console.log(newArrayOfPages);
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
                <Chart/>
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
