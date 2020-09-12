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
            validated: false
        };
    }

    async componentDidMount() {

        localStorage.removeItem('siteURL');
        const userCookie = getCookie({}, 'user');
        const oneUser = await apiGet({}, '/oneUser', {userCookie});
        console.log(oneUser);
        
        this.setState({
            user: oneUser.uid,
            userObject: oneUser
        })
        const userObj = this.state.userObject;

        // this.getWebsite();

        const getWebsitesFromAPI = axios.post('http://sempioneer-api-prod.eba-vq3iddtp.us-west-2.elasticbeanstalk.com/api/gsc_data/get_website_list/', {
            "Access_Token": userObj.access_token,
            "Refresh_Token": "three",
            "Client_Secret": "two",
            "Authorization_Code": "one"
        })
        .then((res) => {
            const WebsiteList = res.data.siteEntry;
            let websitesObj = {};
            for(var i = 0; i < WebsiteList.length; i++) {
                WebsiteList[i].id = this.state.user;
                if (WebsiteList[i].permissionLevel === 'siteUnverifiedUser') {
                    WebsiteList.splice(i, 1); 
                }
                websitesObj = {
                    id: this.state.user,
                    data: WebsiteList
                }

            }
            this.setState({
                loading: false,
                dtTitles,
                dtData: this.createDataTable(websitesObj),
            });
        })
        .catch((error) => {
            console.error('No website due to error (old access code maybe)');
            this.addFlash(createFlash('error', 'No websites due to error. (old access code maybe.'));
            const userObject = this.state.userObject;
            console.log(userObject)
            this.updateTokens(userObject);
            // console.error(error)
        })
    }

    updateTokens = async (user) => {
       const status = await apiPost({}, '/refreshTokens', {user});

       console.log(status);
       if (status === 'OK') {
            location.reload();
       }

    }

    addWebsite = async (user, siteURL) => {
        const oneWebsite = await apiPost({}, '/website', {user, siteURL});
    }

    getWebsite = async () => {
        const oneWebsite = await apiGet({}, '/allWebsite');
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
        //TODO
        // see if the domain/website url already exists, if so modal pop up
        // to request access page from the admin (then we email admin)
        // if not then do below


        const getWebsitesFromAPI = axios.post('http://sempioneer-api-prod.eba-vq3iddtp.us-west-2.elasticbeanstalk.com/api/gsc_data/test_websites_for_traffic/', {
            "Access_Token": this.state.userObject.access_token,
                "Refresh_Token": "three",
                "Client_Secret": "two",
                "Authorization_Code": "one",
                "site_url": response
            })
        .then((res) => {
            let websiteData = res.data[response];
            console.log(websiteData)
            let selectedSiteClicks = websiteData.clicks;
            console.log(selectedSiteClicks)
            if (selectedSiteClicks < 100) {
                this.addFlash(createFlash('error', 'Please select a website with more than 100 clicks.'));
                this.setState({
                    validated: false,
                })
            } else {
                this.setState({
                    validated: true,
                })
            }

        })
        .catch((error) => {
            console.error(error)
        })

    }

    btnClick = (siteURL) => {
        const userObj = this.state.userObject;
        const accessToken = userObj.access_token;
        if (siteURL === '') {
            this.addFlash(createFlash('error', 'Please select a website.'));
        } else if (this.state.validated === false){
            this.addFlash(createFlash('error', 'Please select a website with more than 100 clicks.'));
        } else {
            console.log(siteURL)
            localStorage.setItem('siteURL', siteURL);
            // add website to db
            this.addWebsite(userObj, siteURL);
            // add selected tag to website
            window.location.href = 'http://localhost:3000/dashboard';

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
                    submitBtn="true"
                />
            </UserStyles>
        );
    }
}

export default Websites;
