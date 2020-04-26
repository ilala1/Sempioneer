import { Component, createRef } from 'react';

import moment from 'moment';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';

var uniqid = require('uniqid');

import { getCookie, removeCookie } from '../lib/session';
import { apiGet, apiPut, apiPost } from '../lib/api';

import DataTable from './DataTable';
import Flashes from './Flashes';

const axios = require('axios');

import { redirectIfNotAuthenticated } from '../lib/auth';
import { createFlash } from '../lib/flashes';
import websites from '../pages/websites';


const dtTitles = [{
    key: 'permissionLevel',
    type: 'string',
    label: 'Permission Level',
}, {
    key: 'siteUrl',
    type: 'string',
    label: 'Site Url',
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


class Websites extends Component {
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
        
        console.log(oneUser.accessToken);
        this.setState({
            user: oneUser.uid,
            userObject: oneUser
        })
        const userID = this.state.userObject;




        const accessToken = await apiGet({}, '/accessToken', {});
        console.log(accessToken)





        // const getWebsitesFromAPI = axios.post('http://gsc-production.kggsendwcm.us-west-2.elasticbeanstalk.com/api/gsc_data/get_website_list/', {
        //     "Access_Token": oneUser.accessToken,
        //     "Refresh_Token": "three",
        //     "Client_Secret": "two",
        //     "Authorization_Code": "one"
        // })
        // .then((res) => {
        //     console.log('testing');
        //     console.log(res);
        // //   const WebsiteList = res.data.siteEntry;
        // //   let userObj = {};
        // //   for(var i = 0; i < WebsiteList.length; i++) {
        // //         WebsiteList[i].id = this.state.user;
        // //         if (WebsiteList[i].permissionLevel === 'siteUnverifiedUser') {
        // //             WebsiteList.splice(i, 1); 
        // //         }
        // //         userObj = {
        // //             id: this.state.user,
        // //             data: WebsiteList
        // //         }
        // //     }

        // //     // this.addWebsite(userObj);
        // //     this.setState({
        // //         loading: false,
        // //         dtTitles,
        // //         dtData: this.createDataTable(userObj),
        // //     });
        // })
        // .catch((error) => {
        //     console.error('No website due to error (old access code maybe)');
        //     // const userID = this.state.user;
        //     // this.updateTokens(userID);
        //     // console.error(error)
        // })
    }

    updateTokens = async (user) => {
       const status = await apiPost({}, '/refreshTokens', {user});

       console.log(status);
       if (status === 'OK') {
            location.reload();
       }

    }

    addWebsite = async (site) => {
        const oneWebsite = await apiPost({}, '/website', {site});
    }

    sortByKey = (array, key) => {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    createDataTable = (allNoms) => {
        // returns object with id and title
        const dtData = allNoms.data.map(nominee => ({
            id: uniqid(),
            data: [{
                key: 'permissionLevel',
                value: nominee.permissionLevel,
            }, {
                key: 'siteUrl',
                value: nominee.siteUrl,
            }],
        }));
        return dtData;
    }

    // Event Handlers

    addFlash = (flash) => {
        console.log(flash);
        this.flashesComponent.current.addFlash(flash);
    };

    clickValidation = (response) => {
        console.log(response);
        if (response < 100) {
            this.addFlash(createFlash('error', 'Please select a website with more than 100 clicks.'));
        }
    }

    // selectForEdit = (props) => {
    //     this.setState({ editID: props });
    // }

    btnClick = (siteURL) => {
        const accessToken = this.state.userObject.access_token;
        if (siteURL === '') {
            // this.addFlash(createFlash('error', 'Please select a website.'));
        } else {
            // console.log('getAvailableDatesFromAPI?');
            // localStorage.setItem('siteURL', siteURL);
            // window.location.href = '/dashboard';
            // this.props.navigation.navigate('/dashboard', { siteURL })
            // const getAvailableDatesFromAPI = axios.post('http://flask-env.idjm3vkzsw.us-east-2.elasticbeanstalk.com/api/gsc_data/get_available_dates/', {
            //     "Access_Token": accessToken,
            //      "Refresh_Token": "three",
            //      "Client_Secret": "two",
            //      "Authorization_Code": "one",
            //      "site_url": siteURL
            //  })
            // .then((res) => {
            //     const daysAvailableWTime = res.data;
            //     let daysAvailable = [];
            //     let test = [];
            //     for(var i=0; i<daysAvailableWTime.length; i++){
            //         const splitArray = daysAvailableWTime[i].split(',');
            //         daysAvailable.push(splitArray[0]);
            //         // console.log(res);

            //     }
            //     for(var k=0; k<daysAvailable.length; k++){
            //         var trimmedDays = daysAvailable[k].substring(0, 2);
            //         console.log(trimmedDays);
            //         test.push(parseInt(trimmedDays));

            //     }
            //     var smallest = test[0];
            //     for (var i=0; i<test.length; i++){
            //         if (test[i]<smallest){
            //             smallest = test[i];
            //         }
            //     }
            //     console.log(smallest);
                
            // })
            // .catch((error) => {
            //   console.error(error)
            // })
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
                {/* <DataTable
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
                /> */}
            </UserStyles>
        );
    }
}

export default Websites;
