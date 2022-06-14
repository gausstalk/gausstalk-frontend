import React, {useState} from 'react';
import {Button} from "@mui/material";
import CustomNavbar from "./custom-nav-bar";
import {WorkingFlipDate} from './countdown'
import '../assets/styles/one-on-one.css'

import { SnackbarProvider, useSnackbar} from 'notistack';


const getTodayMidnight = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString();
}

const MyButton = () => {
    //TODO: get register status and then useState
    const [registered, setRegistered] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const register = () => {
        let success = "success";
        let message = "Successfully registered"
        enqueueSnackbar(message, {
            variant: success
        });
        setRegistered(true);
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