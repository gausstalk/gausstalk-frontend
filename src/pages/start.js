import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import urlJoin from 'url-join';

import CustomNavbar from '../components/custom-nav-bar.js';
import CustomBottomNavbar from '../components/custom-bottom-nav-bar.js';

import '../assets/styles/start.css'
import start_img_1 from '../assets/images/start1.png'
import company_chat from '../assets/images/company-chat.png'
import lunch_together from '../assets/images/lunch-together.png'
import one_on_one from '../assets/images/one-on-one.png'


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


const getKrHolidays = async (year, month) => {
    // This month
    let response = await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/utils/v1/holidays/kr/'), {
        params: {
            year: year,
            month: month,
        }
    });
    let dates = [];
    response.data.forEach(holiday => {
        dates.push(holiday['date']);
    });

    // Next month
    month += 1;
    if (month > 12) {
        year += 1;
        month = 1;
    }
    response = await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/utils/v1/holidays/kr/'), {
        params: {
            year: year,
            month: month,
        }
    });
    response.data.forEach(holiday => {
        dates.push(holiday['date']);
    });

    return new Set(dates);
};


const getUsHolidays = async () => {
    let response = await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/utils/v1/holidays/us/'));
    let dates = [];
    response.data.forEach(holiday => {
        dates.push(holiday['date']);
    });

    return new Set(dates);
}


class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payDay: null,
            payDayCounter: null,
        };
    }

    async componentDidMount() {
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let payDay = null;

        if (timeZone === 'Asia/Seoul') {
            let usualPayDay = 25;
            let holidays = await getKrHolidays(new Date().getFullYear(), new Date().getMonth() + 1);
            for (let curr = new Date(); ; curr.setDate(curr.getDate() + 1)) {
                // holiday or sunday or saturday
                if (holidays.has(formatDate(curr)) || curr.getDay() === 0 || curr.getDay() === 6) {
                    if (payDay !== null && curr.getDate() === usualPayDay) {
                        break;
                    }
                } else {
                    payDay = new Date(curr.getTime());
                    if (payDay !== null && curr.getDate() === usualPayDay) {
                        break;
                    }
                }
            }
        } else {
            let holidays = await getUsHolidays();
            console.log(holidays);
            for (let curr = new Date(); ; curr.setDate(curr.getDate() + 1)) {
                // holiday or sunday or saturday
                if (holidays.has(formatDate(curr)) || curr.getDay() === 0 || curr.getDay() === 6) {
                    if (payDay !== null &&
                        (curr.getDate() === 15 || curr.getDate() === new Date(curr.getFullYear(), curr.getMonth() + 1, 0).getDate())) {
                        // 15th or the end of month
                        break;
                    }
                } else {
                    payDay = new Date(curr.getTime());
                    if (payDay !== null &&
                        (curr.getDate() === 15 || curr.getDate() === new Date(curr.getFullYear(), curr.getMonth() + 1, 0).getDate())) {
                        // 15th or the end of month
                        break;
                    }
                }
            }
        }

        console.log(formatDate(new Date()), formatDate(payDay))

        if (formatDate(new Date()) === formatDate(payDay)) {
            this.setState({
                payDay: formatDate(payDay),
                payDayCounter: (<h2>D-Day!</h2>),
            });
        } else {
            let diff = Math.ceil((payDay - new Date()) / (24 * 3600 * 1000));
            this.setState({
                payDay: formatDate(payDay),
                payDayCounter: (<h2>D-{diff}</h2>),
            });
        }
    }

    render() {
        let redirectUrl = urlJoin(process.env.REACT_APP_FRONTEND_BASE_URL, 'auth');
        let loginUrl = `https://login.microsoftonline.com/cfcd9b87-7c5a-4042-9129-abee6253febe/oauth2/v2.0/authorize?client_id=7fc37514-c400-4b28-a6d6-e19a9ae981b6&response_type=code&redirect_uri=${redirectUrl}&scope=User.read`;
        const {payDay, payDayCounter} = this.state;

        return (
            <>
                <CustomNavbar />
                <header className={"header-wrapper"} id={"about"}>
                    <div className={"header-solid"}>
                        <div className={"header-content content"}>
                            <div className={"header-copy"}>
                                <h1 className={"header-h1 smaller-text-space"}>Pay Day</h1>
                                <p>Your pay day is {payDay}.</p>
                            </div>
                            <div className={"header-img-wrapper"}>
                                {payDayCounter}
                            </div>
                        </div>
                    </div>
                </header>
                <section className={"section-wrapper"} id={"about"}>
                    <div className={"section-solid"}>
                        <div className={"section-content content"}>
                            <div className={"section-copy"}>
                                <h1 className={"section-h1 smaller-text-space"}>Gauss Talk</h1>
                                <p>
                                    A platform where Gaussians can communicate, discuss, and share their different ideas and improve company culture
                                </p>
                                <div className={"btn-group text-center"}>
                                    <Button href={loginUrl} target="_self" variant={"contained"}>
                                            JOIN&nbsp;NOW
                                    </Button>
                                </div>
                            </div>
                            <div className={"section-img-wrapper"}>
                                <img className={"section-img"} src={start_img_1} alt={"Start 1"}></img>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={"section"} id={"features"}>
                    <div className={"section-solid"}>
                        <div className={"section-content content"}>
                            <div className={"section-copy"}>
                                <h1 className={"section-h1"}>Company Chat</h1>
                                <p>
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
                                <p>
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
                                <p>
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
