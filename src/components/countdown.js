import React, { useRef, useEffect, useState } from "react";
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

export const WorkingFlipDate = ({ value }) => {
    const divRef = useRef();
    const tickRef = useRef();

    const [tickValue, setTickValue] = useState(value);

    // Make the Tick instance and store it in the refs
    useEffect(() => {
        const didInit = tick => {
            tickRef.current = tick;
        };

        const currDiv = divRef.current;
        const tickValue = tickRef.current;
        Tick.DOM.create(currDiv, {
            value,
            didInit
        });
        return () => Tick.DOM.destroy(tickValue);
    }, [value]);

    // Start the Tick.down process
    useEffect(() => {
        const counter = Tick.count.down(value, {
            format: ["h", "m", "s"]
        });

        // When the counter updates, update React's state value
        counter.onupdate = function(value) {
            setTickValue(value);
        };

        // TODO: I don't know how to destroy this
        return () => {
            counter.onupdate = () => {};
        };
    }, [value]);

    // When the tickValue is updated, update the Tick.DOM element
    useEffect(() => {
        if (tickRef.current) {
            let newTick = []
            for (let i = 0; i< tickValue.length; i++){
                if (tickValue[i] < 10) {
                    newTick.push("0" + tickValue[i].toString())
                }
                else {
                    newTick.push(tickValue[i].toString())
                }
            }
            tickRef.current.value = newTick;
        }
    }, [tickValue]);

    return (
        <div ref={divRef} className="tick">
            <div data-repeat="true">
                <span data-view="flip">Tick</span>
            </div>
        </div>
    );
};