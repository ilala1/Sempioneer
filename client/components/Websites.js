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

import { redirectIfNoAccess } from '../lib/auth';
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
            user: oneUser._id
        })

        const getWebsitesFromAPI = axios.post('http://flask-env.idjm3vkzsw.us-east-2.elasticbeanstalk.com/api/gsc_data/get_website_list/', {
            "Access_Token": oneUser.access_token,
            "Refresh_Token": "three",
            "Client_Secret": "two",
            "Authorization_Code": "one"
        })
        .then((res) => {
          const WebsiteList = res.data.siteEntry;
          let userObj = {};
          for(var i = 0; i < WebsiteList.length; i++) {
                WebsiteList[i].id = this.state.user;
                if (WebsiteList[i].permissionLevel === 'siteUnverifiedUser') {
                    WebsiteList.splice(i, 1); 
                }
                userObj = {
                    id: this.state.user,
                    data: WebsiteList
                }
            }
            // console.log();
            this.addWebsite(userObj);
          this.setState({
            loading: false,
            dtTitles,
            dtData: this.createDataTable(userObj),
          });
        })
        .catch((error) => {
          console.error(error)
        })
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

    bulkActionState = e => this.setState({ bulkAction: e.target.value });

    bulkIdsState = ids => this.setState({ bulkIds: ids });

    // Event handlers
    bulkUpdate = async () => {
        const { bulkAction, bulkIds } = this.state;

        if (bulkIds.length > 0) {
            // Format data
            let status = '';

            switch (bulkAction) {
            case 'delete':
                status = 'deleted';
                break;
            case 'restore':
                status = 'active';
                break;
            default:
                status = 'active';
            }

            const users = bulkIds.map(id => ({
                id,
                status,
            }));

            // Delete/Restore multiple
            const response = await apiPut({}, '/bulk', {
                users,
            });
            // const response = await bulkstuff(users);

            if (response.length > 0) {
                this.props.addFlash(createFlash('success', 'Success'));
                const allNominations = await apiGet({}, '/nominations');
                const allNoms = allNominations.map(nominee => this.formatNominee(nominee));
                const updatedNominations = this.showHideDeleted(allNoms, false);
                this.setState({
                    loading: false,
                    dtTitles,
                    dtData: this.createDataTable(updatedNominations),
                });
            }
        }
    }

    // Event Handlers

    addFlash = (flash) => {
        console.log(flash);
        this.flashesComponent.current.addFlash(flash);
    };

    test = (response) => {
        console.log(response);
        if (response > 100) {
            this.props.addFlash(createFlash('success', 'Success'));
        }
    }

    selectForEdit = (props) => {
        this.setState({ editID: props });
    }

    btnClick = () => {
        console.log(u)
    }

    render() {
        return (
            <UserStyles>
                <Flashes
                    ref={this.flashesComponent}
                    flashes={this.props.flashes}
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
                    getResponse={this.test}
                />
            </UserStyles>
        );
    }
}

export default Websites;
