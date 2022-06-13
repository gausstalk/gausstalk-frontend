import React from 'react';
import {Button} from "@mui/material";
import CustomNavbar from "./custom-nav-bar";
import {WorkingFlipDate} from './countdown'
import '../assets/styles/one-on-one.css'


const getTodayMidnight = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString();
}


function OneOnOne() {
    return (<>
        <CustomNavbar />
            <section className={"section"} id={"one-on-one-section"}>
                <div className={"section-solid"}>
                    <div className={"section-content content"}>
                        <div className={"section-copy"}>
                            <h1 className={"section-h1"}>1:1</h1>
                            <p>
                                Every end of the day,<br></br>random 1:1’s are matched and sent to you via email!
                            </p>
                            <Button variant="contained">Register</Button>
                        </div>
                        <div className={"countdown-container"}>
                            <WorkingFlipDate value={getTodayMidnight()} />
                            <p className={"countdown-detail"}>left until application deadline</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default OneOnOne;