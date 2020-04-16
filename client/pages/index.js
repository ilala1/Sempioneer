import { Component } from 'react';
import styled from 'styled-components';

import { getCookie, removeCookie } from '../lib/session';
import { login, redirectIfAuthenticated, redirectIfNotAuthenticated } from '../lib/auth';
import { apiGet, apiPost } from '../lib/api';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Options from '../components/Options';

import firebase, { auth, provider } from '../../config/config.js';

const HomeStyle = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem 0 10rem;
    #sign-in-or-out-button {
        margin-left: 25px
    }

    #revoke-access-button {
        display: none; 
        margin-left: 25px;
    }

    #auth-status {
        display: inline; 
        padding-left: 25px
    }
    @media only screen and (max-width: 640px) {
        padding: 0 2rem;
    }
`;

class Home extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfNotAuthenticated(ctx)) {
            return { };
        }
        return { };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            // loggedIn: '',
            currentItem: '',
            username: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     // this.getUser();
    //     // this.getTokens();

    // }

    // getTokens = async () => {
    //     // get query from URL string
    //     var qs = (function(a) {
    //         if (a == "") return {};
    //         var b = {};
    //         for (var i = 0; i < a.length; ++i)
    //         {
    //             var p=a[i].split('=', 2);
    //             if (p.length == 1)
    //                 b[p[0]] = "";
    //             else
    //                 b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    //         }
    //         return b;
    //     })(window.location.search.substr(1).split('&'));

    //     let authCode = qs["code"];

    //     const response = await apiGet({}, '/index', {authCode});
    //     console.log(response.name);
    //     if (response) {
    //         login(response._id);
    //         this.setState({
    //             user: response.name
    //         })
    //     }
    // }

    // getUser = async () => {
    //     const userCookie = getCookie({}, 'user');

    //     const oneUser = await apiGet({}, '/oneUser', {userCookie});
    //     this.setState({
    //         user: oneUser.name
    //     })
    // }

    // logout = () => {
    //     const userCookie = getCookie({}, 'user');
    //     if (userCookie) {
    //         removeCookie({}, 'user');
    //         window.location.reload();
    //     }
    // }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    login = () => {
        auth.signInWithPopup(provider) 
          .then((result) => {
            const user = result.user;
            console.log(user);
            this.setState({
                user
            });
          });
    }

    logout = () => {
        auth.signOut().then(() => {
            this.setState({
                user: [],
                // loggedIn: false,
            })
        })
    }

      handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
          title: this.state.currentItem,
          user: this.state.username
        }
        itemsRef.push(item).then(function(){
            console.log('success')
        }).
        catch(function(error){
            console.log(error);
        });
        this.setState({
          currentItem: '',
          username: ''
        });
      }

    render() {
        return (
            <HomeStyle>
                <Nav/>
                {/* {this.state.loggedIn = false ?
                    <button onClick={this.logout}>Log Out</button>                
                    :
                    <button onClick={this.login}>Log In</button>              
                } */}

                <button onClick={this.logout}>Log Out</button> 
                <br/>
                <br/>
                <button onClick={this.login}>Log In</button>    


                Hello {this.state.user}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                    <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                    <br/>
                    <button>Add Item</button>
                </form>
                <Header title="What App do you want to use?" />
                <Options />

            </HomeStyle>
        );
    }
}

export default Home;
