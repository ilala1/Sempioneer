import { Component } from 'react';
import styled from 'styled-components';

import { getCookie, removeCookie } from '../lib/session';

const OptionsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 2rem 0;
    width: 100%;
    .optionsWrapper {
        display: flex;
        text-align: center;
        align-content: center;
        &.inView {
            .vote {
                opacity:1;
                transform:translateX(0);
                transition:all 1.5s ease;
            }
            .nominate {
                opacity:1;
                transform:translateX(0);
                transition:all 1.5s ease;
            }
	    }
        .options {
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 15rem;
            min-height: 15rem;
            padding: 0 1.125rem;
            margin: 2rem;
            transition: all .3s ease;
            background: none;
            outline: none;
            border: 2px solid #00a9e0;
            box-shadow: 3px 3px 5px 0 rgba(0,0,0,.5);
            cursor: pointer;
            font-family: helvetica-regular,Arial,sans-serif;
            font-size: 2rem;
            line-height: 1.375rem;
            color: #000;
            :hover {
                    background: #00a9e0;
                    color: #fff;
            }

        }
        .vote {
            opacity:0.01;
            transform:translateX(-50%);
            transition:all 1.5s ease;
        }
        .nominate {
            opacity:0.01;
            transform:translateX(50%);
            transition:all 1.5s ease;
        }
    }
    @media only screen and (max-width: 640px) {
        .optionsWrapper {
            flex-direction: column;
        }
    }
`;

class Options extends Component {
    // componentDidMount() {
    //     $.fn.isInViewport = function () {
    //         const elementTop = $(this).offset().top;
    //         const elementBottom = elementTop + $(this).outerHeight();

    //         const viewportTop = $(window).scrollTop();
    //         const viewportBottom = viewportTop + $(window).height();

    //         return elementBottom > viewportTop && elementTop < viewportBottom;
    //     };

    //     $('.optionsWrapper').each(function () {
    //         if ($(this).isInViewport()) {
    //             console.log('in view');
    //             $(this).addClass('inView');
    //         } else {
    //             $(this).removeClass('inView');
    //         }
    //     });
    // }


    logout = () => {
        const userCookie = getCookie({}, 'user');
        const adminCookie = getCookie({}, 'admin');
        if (userCookie || adminCookie) {
            removeCookie({}, 'user');
            removeCookie({}, 'admin');
            window.location.reload();
        }
    }

    render() {
        return (
            <OptionsWrapper>
                <div className="optionsWrapper">
                    <a className="options vote" href='/voting'>Vote</a>
                    <a className="options nominate" href='/websites'>Nominate</a>
                </div>
            </OptionsWrapper>
        );
    }
}

export default Options;
