import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'

export default function LunchTogetherModal({isOpen, handleClick, appointmentId, title, nParticipants, organizerMail, organizerName, datetime, meetingPoint, restaurantId}) {
    const [scroll] = React.useState('paper');

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);

    return (<>
        {isOpen &&(
            <Dialog
                open={isOpen}
                onClose={handleClick}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {title}
                        {datetime}
                        {organizerName}
                        {nParticipants}
                        {meetingPoint}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick}>Close</Button>
                </DialogActions>
            </Dialog>
    )}
        </>
    );
}
