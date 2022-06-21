import * as React from 'react';
import {Chip, Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, CircularProgress} from '@mui/material'
import { green } from '@mui/material/colors';

import LunchTogetherModal from './lunch-together-modal.js'
import '../assets/styles/lunch-together-card.css'

export default function MultiActionAreaCard(restaurant, date, organizer, participants, meeting_point) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

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
                setSuccess(true);
                setLoading(false);
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
                            대우부대찌개
                            <Chip className={"chip"} label="D-1" color="info" size={"small"} />
                        </div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span className={"date"}>Aug 21st 1:00pm ~ 2:00pm</span>
                        <br/>
                        <span className={"planner"}>Organizer: Yooha Bae</span>
                        <br/>
                        <span className={"current-count"}>Participants: 3/10</span>
                        <br/>
                        <span className={"meeting-place"}>Meeting point: Lobby</span>
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
