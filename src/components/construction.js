import CustomNavbar from "./custom-nav-bar";
import construction from '../assets/images/construction.png'
import React from "react";
import lunch_together from "../assets/images/lunch-together.png";
import company_chat from "../assets/images/company-chat.png";

function Construction() {
    return (<>
            <CustomNavbar />

            <section className={"section"} id={"features"}>
                <div className={"section-solid"}>
                    <div className={"section-content content"}>
                        <div className={"section-copy"}>
                            <h1 className={"section-h1"}>Sorry,</h1>
                            <p>
                                We are still under construction
                            </p>
                        </div>
                        <div className={"section-img-wrapper"}>
                            <img className={"section-img"} src={construction} alt={"Construction"}></img>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Construction;