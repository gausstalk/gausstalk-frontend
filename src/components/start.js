import React from 'react';
import Button from '@mui/material/Button';

import CustomNavbar from './custom-nav-bar.js';
import CustomBottomNavbar from './custom-bottom-nav-bar.js';

import '../assets/styles/start.css'
import start_img_1 from  '../assets/images/start1.png'
import company_chat from '../assets/images/company-chat.png'
import lunch_together from '../assets/images/lunch-together.png'
import one_on_one from '../assets/images/one-on-one.png'


class Start extends React.Component {
    render() {
        return (
            <>
                <CustomNavbar />
                <header className={"header-wrapper"} id={"about"}>
                    <div className={"header-solid"}>
                        <div className={"header-content content"}>
                            <div className={"header-copy"}>
                                <h1 className={"header-h1 smaller-text-space"}>Gauss Talk</h1>
                                <p className>
                                    A platform where Gaussians can communicate, discuss, and share their different ideas and improve company culture
                                </p>
                                <div className={"btn-group text-center"}>
                                    <Button href="https://login.microsoftonline.com/cfcd9b87-7c5a-4042-9129-abee6253febe/oauth2/v2.0/authorize?client_id=7fc37514-c400-4b28-a6d6-e19a9ae981b6&response_type=code&redirect_uri=http://localhost:3000/auth&scope=User.read" target="_self" variant={"contained"}>
                                            JOIN&nbsp;NOW
                                    </Button>
                                </div>
                            </div>
                            <div className={"header-img-wrapper"}>
                                <img className={"header-img"} src={start_img_1} alt={"Start 1"}></img>
                            </div>
                        </div>
                    </div>
                </header>
                <section className={"section"} id={"features"}>
                    <div className={"section-solid"}>
                        <div className={"section-content content"}>
                            <div className={"section-copy"}>
                                <h1 className={"section-h1"}>Company Chat</h1>
                                <p className>
                                    A live chat room where you can communicate with all of the Gaussians
                                </p>
                            </div>
                            <div className={"section-img-wrapper"}>
                                <img className={"section-img"} src={company_chat} alt={"Company Chat"}></img>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={"section"}>
                    <div className={"section-solid"}>
                        <div className={"section-content content"}>
                            <div className={"section-img-wrapper"}>
                                <img className={"section-img"} src={lunch_together} alt={"Lunch Together"}></img>
                            </div>
                            <div className={"section-copy"}>
                                <h1 className={"section-h1"}>Lunch Together</h1>
                                <p className>
                                    Gather people to eat lunch together. Upload the menu and place of your choice and just wait for people to join!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={"section"}>
                    <div className={"section-solid"}>
                        <div className={"section-content content"}>
                            <div className={"section-copy"}>
                                <h1 className={"section-h1"}>Random 1 : 1</h1>
                                <p className>
                                    Want to meet new coworkers? Just register for random 1 : 1s and we will directly match you!                                </p>
                            </div>
                            <div className={"section-img-wrapper"}>
                                <img className={"section-img"} src={one_on_one} alt={"One on One"}></img>
                            </div>
                        </div>
                    </div>
                </section>
                <CustomBottomNavbar/>
            </>
        );
    }
}

export default Start;
