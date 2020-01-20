import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import  React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Flashes from './Flashes';
import { createFlash } from '../lib/flashes';

import Modal from './Modal';

const axios = require('axios');
import { apiGet, apiPut, apiPost } from '../lib/api';
import { getCookie, removeCookie } from '../lib/session';

// Styles
const LoadingStyles = styled.aside`
    font-size: 2rem;
`;

const DataTableStyles = styled.section`
    width: 70%;
    margin: 0 auto;
    table {
        width: 100%;

        border-spacing: 0;
        border-collapse: collapse;

        font-size: 1.4rem;
        line-height: 2.2rem;

        input[type="checkbox"] {
            width: 1.4rem;
            height: 1.4rem;

            border: 1px solid #000000;

            cursor: pointer;

            &:checked { background-color: #9B2583; }
        }

        th, td {
            padding: 1.2rem 1.2rem 2rem;

            border: 1px solid #eee;
        }

        thead th {
            background-color: #fafafa;
            text-align: left;

            span:not(:only-child) { margin-right: 1rem; }

            &.sort { cursor: pointer; }
        }

        tbody {
            tr {
                &:hover { background: #f5f5f5; }
                &.selected { background-color: #f5edf3; }

                td.selectable { cursor: pointer; }
            }
        }

        tr:first-child th, tr:first-child td { border-top: 1px solid #e5e5e5; }
        tr:last-child th, tr:last-child td { border-bottom: 1px solid #e5e5e5; }
        td:first-child, th:first-child { border-left: 1px solid #e5e5e5; }
        td:last-child, th:last-child { border-right: 1px solid #e5e5e5; }
        @media only screen and (min-width: 1401px){
            width: 80%;  
            margin: 0 auto;  
        }
    }

    .edit {
        width: 40%;
    }

    .editCol {
        width: 8rem;
    }

    .btnWrap {
        padding-top: 2rem;
        text-align: center;
    }

    /*
        ----- RESPONSIVE -----
    */

    @media ${props => props.theme.mediaMinimum} {
        /* Force table to not be like tables anymore */
        table, thead, tbody, th, td, tr { 
                display: block; 
            }


            
            /* Hide table headers (but not display: none;, for accessibility) */
            thead tr { 
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

        .selectable {
            padding: 3rem 1.2rem 2rem;
        }

        .editCol {
            margin-right: auto;
            margin-left: auto;
        }
            
            tr { border: 1px solid #ccc; margin: 2rem 0; }
            
            td { 
                /* Behave  like a "row" */
                border: none;
                border-bottom: 1px solid #eee; 
                position: relative;
                padding-left: 50%; 
            }
            
            td:before { 
                /* Now like a table header */
                position: absolute;
                /* Top/left values mimic padding */
                top: 6px;
                left: 6px;
                width: 45%; 
                padding-right: 10px; 
                white-space: nowrap;
            }
            
            /*
            Label the data
            */
            td:nth-of-type(1):before { }
            td:nth-of-type(2):before { content: "Status"; }
            td:nth-of-type(3):before { content: "Nominator"; }
            td:nth-of-type(4):before { content: "Nominee"; }
            td:nth-of-type(5):before { content: "Why?"; }
            td:nth-of-type(6):before { content: "Key values"; }
            td:nth-of-type(7):before { content: "When?"; }
            td:nth-of-type(8):before {}
    }
`;

// Partial Components
const BulkTH = props => (
    <th>
        <input
            type="checkbox"
            checked={props.checked}
            onChange={props.handleBulkSelect}
        />
    </th>
);

const BulkTR = props => (
    <td>
        <input
            type="checkbox"
            value={props.value}
            checked={props.checked}
            onChange={props.checkSingleRow}
        />
    </td>
);

const EditTR = props => (
    <td className="editCol">
        <button onClick={props.handleEdit.bind(null, props.id)}>
            <img className="edit" src="../static/images/edit.png" alt="Edit icon" />
        </button>
    </td>
);

// Class
class DataTable extends Component {
    static propTypes = {
        titles: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        sortField: PropTypes.string,
        sortDirection: PropTypes.string,
        handleBulk: PropTypes.func,
        handleEdit: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            titles: props.titles,
            data: props.data,
            bulkSelected: false,
            rowsSelected: [],
            sortField: props.sortField || '',
            sortDirection: props.sortDirection || '',
            selected: [],
            show: false,
        };
    }

    async componentDidMount() {
        const userCookie = getCookie({}, 'user');
        const oneUser = await apiGet({}, '/oneUser', {userCookie});
        this.setState({
            user: oneUser
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.titles !== this.props.titles) {
            this.setState({ titles: this.props.titles });
        }

        if (prevProps.data !== this.props.data) {
            // Default selected states
            let updateData = this.props.data;

            if (this.props.editable) {
                updateData = updateData.map((d) => {
                    const newData = d;

                    if (!newData.selected) {
                        newData.selected = false;
                    }

                    return newData;
                });
            }

            this.setState({
                data: updateData,
                bulkSelected: false,
                rowsSelected: [],
            });
        }
    }

    // State handlers
    updateDataState = (selected) => {
        let updated = this.state.data;

        updated = updated.map((d) => {
            const newData = d;

            newData.selected = (selected.includes(newData.id));

            return newData;
        });

        this.setState({ data: updated });
    }

    // Event handlers
    clickSingleRow = (id) => {
        if (this.props.editable === 'true') {
            let updated = this.state.rowsSelected;

            if (updated.includes(id)) {
                updated = updated.filter(item => item !== id);
            } else {
                updated.push(id);
            }

            this.setState({ rowsSelected: updated });

            // Update user state
            this.updateDataState(updated);
            this.validateSelectedSite();
        }
    }

    checkSingleRow = (e) => {
        console.log('testing')
        e.persist();
        const { checked, value } = e.target;
        let updated = this.state.rowsSelected;
        
        if (checked) {
            updated.push(value);
        } else {
            updated = updated.filter(item => item !== value);
        }
        
        this.setState({ rowsSelected: updated });
        
        this.validateSelectedSite();
        // // Update user state
        // this.updateDataState(updated);

        // // Continue to parent handler
        // this.props.handleBulk(updated);
    }

    validateSelectedSite = () => {
        console.log('validating');
        const { user, data, rowsSelected } = this.state;

        // loop through data and match with row selected to get all details of row
        for (var i = 0; i < data.length; i++) {
            if (data[i].id === rowsSelected[0]) {
                console.log(data[i].data[1].value)
                console.log('match!');
                const getWebsitesFromAPI = axios.post('http://flask-env.idjm3vkzsw.us-east-2.elasticbeanstalk.com/api/gsc_data/test_single_website_for_traffic/', {
                    "Access_Token": user.access_token,
                     "Refresh_Token": "three",
                     "Client_Secret": "two",
                     "Authorization_Code": "one",
                     "site_url": data[i].data[1].value
                 })
                .then((res) => {
                    const clicks = res.data.clicks
                    if (clicks > 100) {
                        console.log('less than 100')
                        this.props.getResponse(clicks);

                    }
                })
                .catch((error) => {
                  console.error(error)
                })
            }
        }
    }

    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };

    handleBulkSelect = (e) => {
        e.persist();

        // Add to selected array
        const { checked } = e.target;

        const { data } = this.state;
        const selected = (checked) ? data.map(d => d.id) : [];

        this.setState({
            bulkSelected: checked,
            rowsSelected: selected,
        });

        // Update data
        this.updateDataState(selected);

        // Continue to parent handler
        this.props.handleBulk(selected);
    }

    handleSort = (title) => {
        const { data } = this.state;
        let { sortField, sortDirection } = this.state;

        // Direction
        if (sortField !== title.key) {
            sortDirection = 'asc';
        } else if (sortDirection === 'asc') {
            sortDirection = 'dsc';
        } else {
            sortDirection = 'asc';
        }

        sortField = title.key;

        // Sorting
        switch (title.type) {
        case 'int':
            break;
        case 'number':
            break;
        default:
            // Default to sort by string
            data.sort((a, b) => {
                const aRow = a.data.find(aData => aData.key === sortField);
                const bRow = b.data.find(bData => bData.key === sortField);

                const aValue = (aRow.value) ? aRow.value.toString() : '';
                const bValue = (bRow.value) ? bRow.value.toString() : '';

                if (sortDirection === 'dsc') {
                    return aValue < bValue ? 1 : -1;
                }

                return aValue > bValue ? 1 : -1;
            });
        }

        this.setState({
            data,
            sortField,
            sortDirection,
        });
    }

    render() {
        const { editable, loading } = this.props;
        const {
            titles,
            data,
            sortField,
            sortDirection,
        } = this.state;

        return (
            <DataTableStyles>
                {!loading && titles && data
                    && <>
                        <table>
                            <thead>
                                <tr>
                                    {/* <BulkTH
                                            checked={this.state.bulkSelected}
                                            handleBulkSelect={this.handleBulkSelect}
                                        /> */}

                                    {titles.map(title => (
                                        <th
                                            className="sort"
                                            key={title.key}
                                            onClick={this.handleSort.bind(this, title)}>

                                            <span>{title.label}</span>
                                            {/*
                                            {sortField === title.key
                                                && sortDirection === 'asc'
                                                && <FontAwesomeIcon icon="long-arrow-alt-down" />}

                                            {sortField === title.key
                                                && sortDirection === 'dsc'
                                                && <FontAwesomeIcon icon="long-arrow-alt-up" />} */}

                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(row => <tr
                                    key={row.id}
                                    className={(row.selected) ? 'selected' : undefined}>

                                    {/* <BulkTR
                                            value={row.id}
                                            checked={row.selected}
                                            checkSingleRow={this.checkSingleRow}
                                        /> */}

                                    {titles.map((title) => {
                                        const single = row.data.find(d => d.key === title.key);

                                        return (
                                            <td
                                                className="selectable"
                                                key={single.key}
                                                onClick={this.clickSingleRow.bind(this, row.id)}>
                                                {single.value}
                                            </td>
                                        );
                                    })}
                                </tr>)}
                            </tbody>
                        </table>
                        <div className="btnWrap">
                            <button onClick={this.showModal}>Submit</button>
                        </div>
                    </>
                }
            </DataTableStyles>
        );
    }
}

export default DataTable;
