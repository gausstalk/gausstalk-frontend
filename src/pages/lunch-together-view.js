import MultiActionAreaCard from '../components/lunch-together-card.js'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useInfiniteScroll from 'react-infinite-scroll-hook';
import urlJoin from "url-join";
import { Button, CircularProgress } from '@mui/material';
import CustomNavbar from "../components/custom-nav-bar";
import '../assets/styles/lunch-together-view.css'

export default function LunchTogetherView() {
    let token = window.sessionStorage.getItem('gaussAccessToken');
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [hasNextPage, setHasNextPage] = React.useState(true);
    const navigate = useNavigate();

    function loadItems(startCursor = 0): Promise<Response> {
        return new Promise((resolve) => {
            let newArray = []
            let nextPage = true;
            let lineCount = 6;

            setTimeout(() => {
                async function fetchData() {
                    // retrieve the next 6 appointments from startCursor to startCursor + 6
                    return await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/lunch-together/v1/appointments/'), {
                        headers: {Authorization: `Bearer ${token}`},
                        withCredentials: true,
                        params: {
                            "offset": startCursor,
                            "limit": lineCount
                        }
                    })
                }

                fetchData().then((res) => {
                    if (res.status === 200) {
                        if (0 < res.data.length < lineCount) {
                            newArray = res.data;
                            nextPage = false;
                        } else if (res.data.length === lineCount) {
                            newArray = res.data;
                            nextPage = true;
                        } else {
                            nextPage = false;
                        }
                    } else {
                        console.log("failed")
                        nextPage = false;
                    }
                }).then((res) => {
                    resolve({hasNextPage: nextPage, data: newArray});
                });
            }, 1000);
        });
    }

    async function loadMore() {
        setLoading(true);
        try {
            if (items.length === 0) {
                return;
            }
            const {data, hasNextPage: newHasNextPage} = await loadItems(
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

    useEffect(() => {
        async function fetchData() {
            // retrieve the first 6 appointments
            return await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/lunch-together/v1/appointments/'), {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true,
                params: {"offset": 0, "limit": 6}
            })
        }

        fetchData().then((res) => {
            if (res.status === 200) {
                setItems(res.data)
            } else {
                console.log("failed")
            }
        });
    }, [token]);


    const [infiniteRef, {rootRef}] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        disabled: false,
        rootMargin: '0px 400px 0px 0px',
    });


    return (
        <>
            <CustomNavbar/>
            <section className={"upcoming-gatherings section"}>
                <Button variant='contained' onClick={() => { navigate('./form') }}>Create Appointment</Button>
                <div className={"gathering-cards-container"} ref={rootRef}>
                    {items.map((card) => (
                        <MultiActionAreaCard key={card.id} appointmentId={card.id} datetime={card.datetime} meetingPoint={card.meeting_point}
                                             maxParticipants={card.max_participants} organizerMail={card.organizer_mail}
                                             organizerName={card.organizer_name} restaurantId={card.restaurant_id}
                                             title={card.title}></MultiActionAreaCard>
                    ))}
                    {hasNextPage && (
                        <div ref={infiniteRef} className={"infinite-scroll"}>
                            <CircularProgress/>
                        </div>
                    )}
                </div>

            </section>

        </>
    )
}