import MultiActionAreaCard from '../components/lunch-together-card.js'
import React, {useState, useEffect} from 'react';
import axios from "axios";
import useInfiniteScroll from 'react-infinite-scroll-hook';
import urlJoin from "url-join";
import { CircularProgress } from '@mui/material';
import CustomNavbar from "../components/custom-nav-bar";
import '../assets/styles/lunch-together-view.css'

export default function LunchTogetherView() {
    let token = window.sessionStorage.getItem('gaussAccessToken');
    const cardData = Array.from({ length: 6 })
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState(cardData);
    const [hasNextPage, setHasNextPage] = React.useState(true);

    function loadItems(startCursor = 0): Promise<Response> {
        return new Promise((resolve) => {
            let newArray = []

            setTimeout(() => {
                for (let i = startCursor; i < startCursor + 6; i++) {
                    const newItem = {
                        key: i,
                        value: `This is item ${i}`,
                    };
                    newArray = [...newArray, newItem];
                }

                resolve({ hasNextPage: true, data: newArray });
            }, 1000);
        });
    }

    async function loadMore() {
        setLoading(true);
        try {
            const { data, hasNextPage: newHasNextPage } = await loadItems(
                items.length,
            );
            setItems((current) => [...current, ...data]);
            setHasNextPage(newHasNextPage);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    /*
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/lunch/v1/'), {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true
            })
            return response
        }
        fetchData().then((res) => {
            if (res.status === 200) {
                console.log("data retrieved")
            }
            else {
                console.log("failed")
            }
        });
    }, [token]);

     */
    const [infiniteRef, { rootRef }] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        disabled: false,
        rootMargin: '0px 400px 0px 0px',
    });



    return (
        <>
            <CustomNavbar />
            <section className={"upcoming-gatherings section"}>
                <div className={"gathering-cards-container"} ref={rootRef}>
                    {items.map((card, index) => (
                        <MultiActionAreaCard key={index}></MultiActionAreaCard>
                    ))}
                    {hasNextPage && (
                        <div ref={infiniteRef} className={"infinite-scroll"}>
                            <CircularProgress />
                        </div>
                    )}
                </div>

            </section>

        </>
    )
}