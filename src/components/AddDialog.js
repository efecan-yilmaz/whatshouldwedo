import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';

export default function AddDialog(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setOpen(props.open);
    }, [props.open])

    const handleClose = () => {
        props.onClose();
        setOpen(false);
    };

    const handleOKPress = () => {
        props.onOKPressed();
        setOpen(false);
    }

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="add-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.text}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={props.mainAddFieldText}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="linkTo"
                        label={props.linkToText}
                        type="url"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="comment"
                        label={'Any comments?'}
                        multiline
                        fullWidth
                        rowsMax={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" startIcon={<CancelIcon />}>
                        Cancel
                    </Button>
                    <Button onClick={handleOKPress} color="primary" startIcon={<SaveIcon />}>
                        Save
                    </Button>
                    </DialogActions>
            </Dialog>
        </>
    )
}
