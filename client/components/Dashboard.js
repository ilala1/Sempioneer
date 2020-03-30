import { Component, createRef } from 'react';
import moment from 'moment';
import styled, { ThemeProvider } from 'styled-components';

import pagesData from '../data/users/desired_format.json';

var uniqid = require('uniqid');

import { getCookie, removeCookie } from '../lib/session';
import { apiGet, apiPut, apiPost } from '../lib/api';


import DataTable from './DataTable';
import Chart from './Chart';
import Flashes from './Flashes';
import Select from './forms/Select';

const axios = require('axios');

import { redirectIfNoAccess } from '../lib/auth';
import { test } from '../lib/gsc';
import { createFlash } from '../lib/flashes';
import websites from '../pages/websites';


// const dtTitles = [{
//     key: 'URL',
//     type: 'string',
//     label: 'URL',
// }, {
//     key: 'clicks',
//     type: 'string',
//     label: 'Clicks',
// }, {
//     key: 'impressions',
//     type: 'string',
//     label: 'Impressions',
// }, {
//     key: 'ctr',
//     type: 'string',
//     label: 'CTR',
// }, {
//     key: 'position',
//     type: 'string',
//     label: 'Position',
// }];
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
            averageCtaVisible: false
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
        const domain = pagesData.domain;

        // this.postPagesDataToDB(pagesData, userID, domain);
        this.setState({
            loading: false,
            dtTitles,
            dtData: this.createDataTable(pagesData.data),
        });
        // const historicalDataPulling = await axios.post('http://gsc-production.kggsendwcm.us-west-2.elasticbeanstalk.com/api/gsc_data/async_scraping/', {
        //     "Access_Token": accessToken,
        //     "Refresh_Token": "three",
        //     "Client_Secret": "two",
        //     "Authorization_Code": "one",
        //     "site_url": siteURL,
        //     "userID": userID,
        //     "dimensions": ['page']
        // })
        // .then((res) => {
        //     if (res) {
        //         console.log(res);
        //         this.postPagesDataToDB(pagesData, userID, domain);
        //         this.setState({
        //             loading: false,
        //             dtTitles,
        //             dtData: this.createDataTable(pagesData),
        //         });
        //     } else {
        //         console.log('error - potentially need new access token')
        //         this.updateTokens(userID);
        //     }
        // })
        // .catch((error) => {
        //     console.error(error)
        // })          
    }

    postPagesDataToDB = async (data, userID, domain) => {
        // const test = await apiPost({}, '/pagesdata', {data, userID, domain});
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
        let totalClicks = 0;
        let totalImpressions = 0;
        let sumOfCTR = 0;
        let averageCTR = 0;
        let sumOfPositions = 0;
        let averagePosition = 0;
        let noOfDates = 0;
        let newArrayOfPages= [];


        for(var i=0; i<allPages.length; i++){
            const page = allPages[i].data;
            noOfDates = allPages[i].data.length;


            for(var k=0; k<page.length; k++){
                // does all the calculations for the table figures
                totalClicks += parseInt(page[k].figures[0]);
                totalImpressions += parseInt(page[k].figures[1]);

                sumOfCTR += parseInt(page[k].figures[2]);
                averageCTR = sumOfCTR/noOfDates;

                sumOfPositions += parseInt(page[k].figures[3]);
                averagePosition = sumOfPositions/noOfDates;
            }

            let pageObj = {
                url: allPages[i].Grouped_URL,
                totalClicks,
                totalImpressions,
                averageCTR,
                averagePosition
            };
            newArrayOfPages.push(pageObj);

        }
        
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

    filterAverageCTR = (e) => {
        console.log('hello'); 
        let { averageCtaVisible } = this.state;
        averageCtaVisible = !averageCtaVisible;
        this.setState({
            averageCtaVisible,
        });
        console.log(this.state.averageCtaVisible);

        if (averageCtaVisible === true) {
            const presentTitle = [{
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
            }];

            
            this.setState({
                loading: false,
                dtTitles: presentTitle,
                editable: false,
            });
        } else {
            this.setState({
                loading: false,
                dtTitles,
                editable: false,
            });
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
                        <label htmlFor="filter-ctr">CTR?</label>
                        <input type="checkbox" id="filter-ctr" onChange={this.filterAverageCTR} />
                    </div>

                    <div className="filter">
                        <label htmlFor="filter-deleted">Include deleted?</label>
                        {/* <input type="checkbox" id="filter-deleted" onChange={this.filterDeleted} /> */}
                    </div>
                    {/* <div className="filterMonth">
                        <Select
                            label="Month"
                            name="monthName"
                            value={this.state.month}
                            options={monthOptions}
                            changeState={this.monthState}
                            errorMessage="Must choose a name"
                        />
                    </div> */}
                </div>
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
