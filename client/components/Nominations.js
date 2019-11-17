import Fuse from 'fuse.js';
import { Component, createRef } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Header from './Header';
import Select from './forms/Select';
import Input from './forms/Input';

import { apiGet, apiPut } from '../lib/api';

import DataTable from './DataTable';
import EditForm from './EditForm';
import Flashes from './Flashes';

import dataNominees from '../data/users/nominationNames.json';
import monthNames from '../data/users/month.json';
import bulkOptionsJson from '../data/users/bulkOptions.json';

import { redirectIfNoAccess } from '../lib/auth';
import { createFlash } from '../lib/flashes';

const monthOptions = monthNames.map(access => ({
    value: access.id,
    label: access.title,
}));

monthOptions.unshift({
    value: 'all',
    label: 'Select one',
});

const bulkOptions = bulkOptionsJson.map(access => ({
    value: access.id,
    label: access.title,
}));

bulkOptions.unshift({
    value: '',
    label: 'Select one',
});

const dtTitles = [{
    key: 'status',
    type: 'string',
    label: 'Status',
}, {
    key: 'nominator',
    type: 'string',
    label: 'Nominator',
}, {
    key: 'name',
    type: 'string',
    label: 'Name',
}, {
    key: 'description',
    type: 'string',
    label: 'Why?',
}, {
    key: 'values',
    type: 'array',
    label: 'Values',
}, {
    key: 'createdAt',
    type: 'string',
    label: 'When?',
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


class Nominations extends Component {
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
            id: '',
            textarea: '',
            search: '',
            dtSearch: null,
            month: '',
            bulkAction: '',
            bulkIds: [],
            includeDeleted: false,
            presenting: false,
            editID: '',
            editable: 'true',
        };
    }

    async componentDidMount() {
        const allNominations = await apiGet({}, '/nominations');
        const allNoms = allNominations.map(nominee => this.formatNominee(nominee));
        // Default remove delete
        const { includeDeleted } = this.state;
        const updatedNominations = this.showHideDeleted(allNoms, includeDeleted);
        // Format for data table
        this.setState({
            loading: false,
            dtTitles,
            dtData: this.createDataTable(updatedNominations),
        });

        // Update search list
        this.searchState(allNoms);
    }

    showHideDeleted = (nominations, include) => nominations.filter(user => (include || (!include && user.status !== 'deleted')));

    formatNominee = (nominee) => {
        const updatedNominee = nominee;
        const personObj = dataNominees.find(a => a.id === nominee.nomId);

        updatedNominee.id = personObj;

        return updatedNominee;
    }

    formatArray = (array) => {
        const list = array.toString().replace(/,/g, ', ');
        return list;
    }

    capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

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


    // State Handlers

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

    searchState = allNoms => this.setState({
        dtSearch: new Fuse(allNoms, {
            threshold: 0,
            minMatchCharLength: 0,
            keys: [
                'user',
                'nomId',
                'textarea',
                'createdAt',
            ],
        }),
    });

    monthState = async (e) => {
        this.setState({ month: e.target.value });
        const allNominations = await apiGet({}, '/nominations');
        const allNoms = allNominations.map(nominee => this.formatNominee(nominee));
        const { includeDeleted } = this.state;
        const updatedNominations = this.showHideDeleted(allNoms, includeDeleted);
        const allMatchingNoms = [];
        const { month } = this.state;
        if (month.length > 0) {
            const nomination = updatedNominations.map((nomination) => {
                const allDates = nomination.createdAt;
                if (allDates.includes(month)) {
                    allMatchingNoms.push(nomination);
                    // Format for data table

                    this.setState({
                        loading: false,
                        dtTitles,
                        dtData: this.createDataTable(allMatchingNoms),
                    });
                } else if (month === 'all') {
                    this.setState({
                        loading: false,
                        dtTitles,
                        dtData: this.createDataTable(updatedNominations),
                    });
                } else {
                    this.setState({
                        loading: false,
                        dtTitles,
                        dtData: this.createDataTable(allMatchingNoms),
                    });
                }
            });
        }
    };

    // Event Handlers
    filterDeleted = async (e) => {
        let { includeDeleted } = this.state;
        includeDeleted = !includeDeleted;
        this.setState({
            includeDeleted,
        });
        const allNominations = await apiGet({}, '/nominations');
        const allNoms = allNominations.map(nominee => this.formatNominee(nominee));
        const updatedNominations = this.showHideDeleted(allNoms, includeDeleted);
        const flash = createFlash('success', 'Success');
        this.setState({
            loading: false,
            dtTitles,
            dtData: this.createDataTable(updatedNominations),
        });
        if (this.state.presenting === true) {
            const presentTitle = [{
                key: 'name',
                type: 'string',
                label: 'Name',
            }, {
                key: 'description',
                type: 'string',
                label: 'Why?',
            }, {
                key: 'createdAt',
                type: 'string',
                label: 'When?',
            }, {
                key: 'status',
                type: 'string',
                label: 'Status',
            }];
            this.setState({
                loading: false,
                dtTitles: presentTitle,
                dtData: this.createDataTable(updatedNominations),
                editable: false,
            });
        }
    }

    filterPresentation = async (e) => {
        let { presenting } = this.state;
        presenting = !presenting;
        this.setState({
            presenting,
        });
        if (presenting === true) {
            const presentTitle = [{
                key: 'name',
                type: 'string',
                label: 'Name',
            }, {
                key: 'description',
                type: 'string',
                label: 'Why?',
            }, {
                key: 'values',
                type: 'array',
                label: 'Values',
            }, {
                key: 'createdAt',
                type: 'string',
                label: 'When?',
            }];

            this.setState({
                dtTitles: presentTitle,
                presenting,
                editable: 'false',
            });
        } else {
            this.setState({
                dtTitles,
                editable: 'true',
            });
        }
    }

    search = (value) => {
        let allNoms = [];

        if (value.trim().length > 0) {
            allNoms = this.state.dtSearch.search(value);
        } else {
            allNoms = this.state.dtSearch.list;
        }

        this.setState({
            search: value,
            dtData: this.createDataTable(allNoms),
        });
    }

    selectForEdit = (props) => {
        this.setState({ editID: props });
    }

    render() {
        return (
            <UserStyles>
                <Header/>
                <h2>All nominations!</h2>
                <div className="search">
                    <Input
                        label="Search"
                        type="text"
                        name="search"
                        value={this.state.search}
                        changeState={this.search}
                    />
                </div>
                <Flashes
                    ref={this.flashesComponent}
                    flashes={this.props.flashes}
                />
                <EditForm
                    id={this.state.editID}
                    addFlash={this.props.addFlash}
                />
                <div className="sub-nav">
                    <div className="filter">
                        <label htmlFor="filter-presenting">Presenting?</label>
                        <input type="checkbox" id="filter-presenting" onChange={this.filterPresentation} />
                    </div>

                    <div className="filter">
                        <label htmlFor="filter-deleted">Include deleted?</label>
                        <input type="checkbox" id="filter-deleted" onChange={this.filterDeleted} />
                    </div>
                    <div className="bulk">
                        <div className="select">
                            <Select
                                label="Bulk Actions"
                                name="bulkaction"
                                value={this.state.bulkAction}
                                options={bulkOptions}
                                changeState={this.bulkActionState}
                            />
                        </div>

                        <button className="button" onClick={this.bulkUpdate}>
                            Update
                        </button>
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
                <DataTable
                    loading={this.state.loading}
                    titles={this.state.dtTitles}
                    data={this.state.dtData}
                    editable={this.state.editable}
                    sortField="name"
                    sortDirection="asc"
                    handleBulk={this.bulkIdsState}
                    handleEdit={this.selectForEdit}
                />
            </UserStyles>
        );
    }
}

export default Nominations;
