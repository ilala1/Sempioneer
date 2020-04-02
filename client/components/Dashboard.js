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

import { createFlash } from '../lib/flashes';
import websites from '../pages/websites';


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
            averageCtaVisible: false,
            averagePositionVisible: false,
            clicksVisible: true,
            impressionsVisible: true,
            chkbox: true
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
        // const post = await apiPost({}, '/pagesdata', {data, userID, domain});
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
                value: <button>Test</button>
            }],
        }));
        return dtData;
    }

    // Event Handlers

    addFlash = (flash) => {
        console.log(flash);
        this.flashesComponent.current.addFlash(flash);
    };

    filterAverageCTR = async (e) => {
        await this.setState({
            averageCtaVisible: !this.state.averageCtaVisible
        });

        let {averageCtaVisible} = this.state;

        if (averageCtaVisible === true) {
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

        if (averageCtaVisible === false) {
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
