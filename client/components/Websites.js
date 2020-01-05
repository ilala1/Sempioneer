import { Component, createRef } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Header from './Header';

import { apiGet, apiPut } from '../lib/api';

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
    .search {
        flex: 0 0 auto;

        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 2rem;

        >* { flex: 0 0 auto; }

        label { padding-right: 1rem; }

        #filter-search {
            border: 2px solid black;
        }

        input {
            width: 30rem;
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

        .bulk {
            padding: 0 5rem;
            flex: 0 0 auto;

            display: flex;
            align-items: center;

            >* { flex: 0 0 auto; }

            .select {
                position: relative;
                margin-right: 1rem;
            }

            select::-ms-expand {
                display: none;
            }

            button { font-size: 1.4rem; }
        }

        .filterMonth {
            padding: 0 5rem;
            select::-ms-expand {
                display: none;
            }
        }
    }

    h2 {
        text-align:center;
        padding: 3rem 0;
    }

    @media only screen and (min-width: 641px) and (max-width: 900px) {
        .search {
            padding-bottom: 0;
        }
        .sub-nav {
            padding: 2rem;
            flex-direction: column;
            text-align: center;
            .filter {
                padding: 0 0 2rem;
                margin-left: auto;
                margin-right: auto;
            }
            .bulk {
                flex-direction: column;
            }

            .filterMonth {
                padding: 2rem 0;
            }
        }
    }

    @media only screen and (max-width: 640px) {
        .search {
            padding-bottom: 0;
        }
        .sub-nav {
            padding: 2rem;
            flex-direction: column;
            text-align: center;
            .filter {
                padding: 1rem 0 2rem;
                margin-left: auto;
                margin-right: auto;
            }
            .filter:first-of-type {
                padding: 0;
            }
            .bulk {
                flex-direction: column;
            }

            .filterMonth {
                padding: 2rem 0;
                .floatingLabel {
                    width: 100%;
                }
            }
        }
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
            loading: true,
            dtTitles: [],
            dtData: [],
            editable: 'true',
        };
    }

    async componentDidMount() {
        let WebsiteList;
        const test = axios.post('http://flask-env.idjm3vkzsw.us-east-2.elasticbeanstalk.com/api/gsc_data/get_website_list/', {
            "Access_Token": "ya29.Il-4B55TFJV4oAaQLcGR7keaLYxomjzURT0qBEr_6ERBiOBIMahNmrFrXyUhI1fS9kcpCkPFgIUpVOWol5X6G8q_qAfNp021v0RP9_gLSI_jyo66YUoDgXxjR6f9kHyKmA",
            "Refresh_Token": "three",
            "Client_Secret": "two",
            "Authorization_Code": "one"
        })
        .then((res) => {
          console.log(res.data.siteEntry);
        })
        .catch((error) => {
          console.error(error)
        })
    }



    createDataTable = (allNoms) => {
        // returns object with id and title
        const dtData = allNoms.map(nominee => ({
            id: nominee._id,
            data: [{
                key: 'status',
                value: nominee.status,
            }, {
                key: 'nominator',
                value: this.capitalizeFirstLetter(nominee.user),
            }, {
                key: 'name',
                value: nominee.id.title,
            }, {
                key: 'description',
                value: nominee.textarea,
            }, {
                key: 'values',
                value: this.formatArray(nominee.values),
            }, {
                key: 'createdAt',
                value: moment(nominee.createdAt).format('MMMM Do'),
            }],
        }));
        return dtData;
    }

    render() {
        return (
            <UserStyles>
                <Header/>
                <h2>All Sites!</h2>
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
                    sortDirection="asc"
                />
            </UserStyles>
        );
    }
}

export default Websites;
