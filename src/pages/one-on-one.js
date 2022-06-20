import React, {useState, useEffect} from 'react';
import {Button} from "@mui/material";
import urlJoin from 'url-join';
import axios from "axios";
import CustomNavbar from "../components/custom-nav-bar";
import {WorkingFlipDate} from '../components/countdown'
import '../assets/styles/one-on-one.css'

import { SnackbarProvider, useSnackbar} from 'notistack';


const getTodayMidnight = () => {
    const date = new Date();

    if(date.getUTCHours() < 15) {
        return new Date(
            Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                     date.getUTCDate(), 15)
        ).toString();
    } else {
        return new Date(
            Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                     date.getUTCDate(), 15) +
            60000 * 60 * 24
        ).toString();
    }
}

const MyButton = () => {
    let token = window.sessionStorage.getItem('gaussAccessToken');

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/meeting/v1/'), {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true
            })
            return response
        }
        fetchData().then((res) => {
            if (res.status === 200) {
                setRegistered(true);
            }
            else {
                setRegistered(false);
            }
        });
    }, [token]);

    const [registered, setRegistered] = useState();
    const { enqueueSnackbar } = useSnackbar();
    const register = async () => {
        let success = "error";
        let message = "Registration failed. Please try again later."
        let registerDone = false;
        let token = window.sessionStorage.getItem('gaussAccessToken');
        await axios.put(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/meeting/v1/'), {}, {
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
        enqueueSnackbar(message, {
            variant: success
        });
        setRegistered(registerDone);
    };

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
                                Every end of the day,<br></br>random 1:1’s are matched and sent to you via email!<br></br>(All 1:1 are matched at 9:00AM KST)
                            </p>
                            <MyButton></MyButton>
                        </div>
                        <div className={"countdown-container"}>
                            <WorkingFlipDate value={getTodayMidnight()} />
                            <p className={"countdown-detail"}>left until registration ends</p>
                        </div>
                    </div>
                </div>
            </section>
        </SnackbarProvider>
        </>
    );
}

export default OneOnOne;