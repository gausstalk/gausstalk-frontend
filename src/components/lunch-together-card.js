import * as React from 'react';
import {Chip, Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, CircularProgress} from '@mui/material'
import { green } from '@mui/material/colors';

import LunchTogetherModal from './lunch-together-modal.js'
import '../assets/styles/lunch-together-card.css'
import axios from "axios";
import urlJoin from "url-join";

export default function MultiActionAreaCard({
    appointmentId,
    datetime,
    meetingPoint,
    nParticipants,
    organizerMail,
    organizerName,
    restaurantId,
    title
}) {
    const token = window.sessionStorage.getItem('gaussAccessToken');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [registered, setRegistered] = React.useState(false);
    const [buttonText, setButtonText] = React.useState("Register");
    const timer = React.useRef();
    const formattedDatetime = new Date(datetime);
    const today = new Date()
    let difference = formattedDatetime.getTime() - today.getTime();
    let daysUntil = "D-" + Math.ceil(difference / (1000 * 3600 * 24));

    const buttonSx = {
        ...(registered && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleClick = () => {
        setOpen(!open)
    }

    const cancel = () => {
        async function fetchData() {
            return await axios.delete(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/lunch-together/v1/registrations/'), {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true,
                params: {"appointment_id": appointmentId}
            })
        }

        fetchData().then((res) => {
            if (res.status === 200) {
                setRegistered(false);
                setLoading(false);
                setButtonText("Register")
            } else {
                setRegistered(true);
                setLoading(false);
                setButtonText("Cancel")
            }
        });
    }

    const register = () => {
        async function fetchData() {
            return await axios.put(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/lunch-together/v1/registrations/'), {}, {
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true,
                params: {"appointment_id": appointmentId}
            })
        }

        fetchData().then((res) => {
            if (res.status === 201) {
                setRegistered(true);
                setLoading(false);
                setButtonText("Cancel")
            } else {
                setRegistered(false);
                setLoading(false);
                setButtonText("Register")
            }
        });
    }


    React.useEffect(() => {
        const getRegistration = () => {
            async function fetchData() {
                return await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/lunch-together/v1/registrations/'), {
                    headers: {Authorization: `Bearer ${token}`},
                    withCredentials: true,
                    params: {"appointment_id": appointmentId}
                })
            }

            fetchData().then((res) => {
                if (res.status === 200) {
                    let mail = window.sessionStorage.getItem('mail')
                    let registrations = res.data
                    for (let i = 0; i < registrations.length; i++) {
                        if (registrations[i]["participant_mail"] === mail) {
                            setRegistered(true);
                            setButtonText("Cancel")
                            break;
                        }
                    }
                    setLoading(false)
                } else {
                    setRegistered(false);
                    setLoading(false);
                    setButtonText("Register")
                }
            });
        };
        getRegistration();
        return () => {
            clearTimeout(timer.current);
        };
    }, [appointmentId, token]);

    const handleButtonClick = () => {
        if (!loading) {
            setLoading(true);
            timer.current = window.setTimeout(() => {
                if (registered) {
                    cancel();
                }
                else {
                    register();
                }

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
                        <span className={"date"}>{formattedDatetime.toLocaleString()}</span>
                        <br/>
                        <span className={"planner"}>Organizer: {organizerName}</span>
                        <br/>
                        <span className={"current-count"}>Participants: {nParticipants}/10</span>
                        <br/>
                        <span className={"meeting-place"}>Meeting point: {meetingPoint}</span>
                        <br/>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div className={"card-button-group"}>
                <Button size="small" color="primary" onClick={handleOpenModal}>
                    Details
                </Button>
                <LunchTogetherModal isOpen={open} handleClick={handleClick} appointmentId={appointmentId} datetime={formattedDatetime.toLocaleString()} meetingPoint={meetingPoint}
                                    nParticipants={nParticipants} organizerMail={organizerMail}
                                    organizerName={organizerName} restaurantId={restaurantId}
                                    title={title}></LunchTogetherModal>
                <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    {buttonText}
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
