// import { Component } from 'react';
// import styled from 'styled-components';

// import { getCookie, removeCookie } from '../lib/session';
// import { login, redirectIfAuthenticated, redirectIfNotAuthenticated } from '../lib/auth';
// import { apiGet, apiPost } from '../lib/api';

// import Nav from '../components/Nav';
// import Header from '../components/Header';
// import Options from '../components/Options';

// const HomeStyle = styled.section`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     padding: 2rem 0 10rem;
//     #sign-in-or-out-button {
//         margin-left: 25px
//     }

//     #revoke-access-button {
//         display: none; 
//         margin-left: 25px;
//     }

//     #auth-status {
//         display: inline; 
//         padding-left: 25px
//     }
//     @media only screen and (max-width: 640px) {
//         padding: 0 2rem;
//     }
// `;

// class Home extends Component {
//     static async getInitialProps(ctx) {
//         if (redirectIfNotAuthenticated(ctx)) {
//             return { };
//         }
//         return { };
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }

//     async componentDidMount() {
//         // const usersRef = firebase.database().ref('users');
//         // usersRef.on('value', (snapshot) => {
//         //   let users = snapshot.val();
//         //   console.log(users);
//         // });
//     }

//     logout = () =>{
//         auth.signOut().then(() => {
//             this.setState({
//                 user: [],
//                 isLoggedIn: false,
//             })
//         })
//     }

//     render() {
//         return (
//             <HomeStyle>
//                 <Nav/>
//                 <Header title="What App do you want to use?" />
//                 <Options />

//             </HomeStyle>
//         );
//     }
// }

// export default Home;

import { Component } from 'react';
import styled from 'styled-components';

import { getCookie, removeCookie } from '../lib/session';
import { login, redirectIfAuthenticated, redirectIfNotAuthenticated } from '../lib/auth';
import { apiGet, apiPost } from '../lib/api';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Options from '../components/Options';

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
            user: '',
        };
    }

    componentDidMount() {
        this.getUser();
        this.getTokens();

    }

    getTokens = async () => {
        // get query from URL string
        var qs = (function(a) {
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i)
            {
                var p=a[i].split('=', 2);
                if (p.length == 1)
                    b[p[0]] = "";
                else
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        })(window.location.search.substr(1).split('&'));

        let authCode = qs["code"];

        const response = await apiGet({}, '/index', {authCode});
        console.log(response.name);
        if (response) {
            login(response._id);
            this.setState({
                user: response.name
            })
        }
    }

    getUser = async () => {
        const userCookie = getCookie({}, 'user');

        // const oneUser = await apiGet({}, '/oneUser', {userCookie});
        // this.setState({
        //     user: oneUser.name
        // })
    }

    logout = () => {
        const userCookie = getCookie({}, 'user');
        if (userCookie) {
            removeCookie({}, 'user');
            window.location.reload();
        }
    }



    render() {
        return (
            <HomeStyle>
                <Nav/>
                Hello {this.state.user}
                <Header title="What App do you want to use?" />
                <Options />

            </HomeStyle>
        );
    }
}

export default Home;
