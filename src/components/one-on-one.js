import React  from 'react';
import {Button} from "@mui/material";
import CustomNavbar from "./custom-nav-bar";
import register from "../assets/images/register.png";


function OneOnOne() {
    return (<>
        <CustomNavbar />
            <section className={"section"} id={"features"}>
                <div className={"section-solid"}>
                    <div className={"section-content content"}>
                        <div className={"section-copy"}>
                            <h1 className={"section-h1"}>1:1</h1>
                            <p>
                                Every end of the day,
                                random 1:1’s are matched and sent to you via email!
                            </p>
                            <Button variant="contained">Register</Button>
                        </div>
                        <div className={"section-img-wrapper"}>
                            <img className={"section-img"} src={register} alt={"One on One"}></img>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default OneOnOne;