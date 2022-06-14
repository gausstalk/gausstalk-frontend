import React, {useState} from 'react';
import {Button} from "@mui/material";
import urlJoin from 'url-join';
import axios from "axios";
import CustomNavbar from "./custom-nav-bar";
import {WorkingFlipDate} from './countdown'
import '../assets/styles/one-on-one.css'

import { SnackbarProvider, useSnackbar} from 'notistack';


const getTodayMidnight = () => {
    const today = new Date();
    today.setUTCHours(15, 0, 0, 0);
    return today.toString();
}

const MyButton = () => {
    let token = window.sessionStorage.getItem('gaussAccessToken');
    let registerExists = false;
    axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/one-on-one'), {
        headers: {Authorization: `Bearer ${token}`},
        withCredentials: true
    }).then((res) => {
        if (res.status === 200) {
            registerExists = true;
        }
    }).catch((error) => {
        console.log(error);
    })
    const [registered, setRegistered] = useState(registerExists);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const register = async () => {
        let success = "error";
        let message = "Registration failed. Please try again later."
        let registerDone = false;
        let token = window.sessionStorage.getItem('gaussAccessToken');
        try {
            await axios.post(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/one-on-one'), {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true
            }).then((res) => {
                if (res.status === 200) {
                    success = "success"
                    message = "Registration success"
                    registerDone = true;
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error)
        }

        enqueueSnackbar(message, {
            variant: success
        });
        setRegistered(registerDone);
    };

    //TODO: get registered status

    if (!registered) {
        return <Button variant="contained" onClick={register}>Register</Button>
    }
    else {
        return <Button variant={"contained"} disabled>You have already registered! <br></br>Come back tomorrow</Button>
    }
}


function OneOnOne() {
    return (<>
        <CustomNavbar />
            <SnackbarProvider maxSnack={3}>
            <section className={"section"} id={"one-on-one-section"}>
                <div className={"section-solid"}>
                    <div className={"section-content content"}>
                        <div className={"section-copy"}>
                            <h1 className={"section-h1"}>1:1</h1>
                            <p>
                                Every end of the day,<br></br>random 1:1’s are matched and sent to you via email!
                            </p>
                            <MyButton></MyButton>
                        </div>
                        <div className={"countdown-container"}>
                            <WorkingFlipDate value={getTodayMidnight()} />
                            <p className={"countdown-detail"}>left until application deadline</p>
                        </div>
                    </div>
                </div>
            </section>
        </SnackbarProvider>
        </>
    );
}

export default OneOnOne;