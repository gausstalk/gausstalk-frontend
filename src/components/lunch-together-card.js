import * as React from 'react';
import {Chip, Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, CircularProgress} from '@mui/material'
import { green } from '@mui/material/colors';

import LunchTogetherModal from './lunch-together-modal.js'
import '../assets/styles/lunch-together-card.css'
import axios from "axios";
import urlJoin from "url-join";

export default function MultiActionAreaCard({
    appointment_id,
    datetime,
    meeting_point,
    n_participants,
    organizer_mail,
    organizer_name,
    restaurant_id,
    title
}) {
    const token = window.sessionStorage.getItem('gaussAccessToken');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    const formattedDatetime = new Date(datetime);
    const today = new Date()
    let difference = formattedDatetime.getTime() - today.getTime();
    let daysUntil = "D-" + Math.ceil(difference / (1000 * 3600 * 24));

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        async function fetchData() {
            // retrieve the first 6 appointments
            return await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/lunch-together/v1/registrations/'), {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true,
                params: {"appointment_id": appointment_id}
            })
        }

        fetchData().then((res) => {
            if (res.status === 200) {
                setSuccess(true);
                setLoading(false);
            } else {
                setSuccess(false);
                setLoading(false);
            }
        });
        return () => {
            clearTimeout(timer.current);
        };
    }, [appointment_id, token]);

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleClick = () => {
        setOpen(!open)
    }

    const handleRegister = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                async function fetchData() {
                    // retrieve the first 6 appointments
                    return await axios.put(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/lunch-together/v1/registrations/'), {}, {
                        headers: {Authorization: `Bearer ${token}`},
                        withCredentials: true,
                        params: {"appointment_id": appointment_id}
                    })
                }

                fetchData().then((res) => {
                    if (res.status === 200) {
                        setSuccess(true);
                        setLoading(false);
                    } else {
                        setSuccess(false);
                        setLoading(false);
                    }
                });

            }, 2000);
        }
    };

    return (
        <Card className={"card"} sx={{ minWidth: 230}}>
            <CardActionArea onClick={handleOpenModal}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <div className={"align-vertical-center"}>
                            {title}
                            <Chip className={"chip"} label={daysUntil} color="info" size={"small"} />
                        </div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span className={"date"}>{datetime}</span>
                        <br/>
                        <span className={"planner"}>Organizer: {organizer_name}</span>
                        <br/>
                        <span className={"current-count"}>Participants: {n_participants}/10</span>
                        <br/>
                        <span className={"meeting-place"}>Meeting point: {meeting_point}</span>
                        <br/>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div className={"card-button-group"}>
                <Button size="small" color="primary" onClick={handleOpenModal}>
                    Details
                </Button>
                <LunchTogetherModal isOpen={open} handleClick={handleClick}></LunchTogetherModal>
                <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleRegister}
                >
                    Register
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Button>
                </div>

            </CardActions>
        </Card>
    );
}
