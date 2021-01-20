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
    const [state, setState] = useState({
        name: {
            val: '',
            validation: false,
            message: ''
        },
        linkTo: {
            val: ''
        },
        comment: {
            val: ''
        }
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setOpen(props.open);
        setState({
            name: {
                val: '',
                validation: false,
                message: ''
            },
            linkTo: {
                val: ''
            },
            comment: {
                val: ''
            }
        });
    }, [props.open])

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const handleOKPress = () => {
        if (!checkNameInput(state.name.val)) return;
        
        props.onOKPressed({
            name: state.name.val,
            comment: state.comment.val,
            linkTo: state.linkTo.val
        });
    }

    const onNameInput = (event) => {
        var v = event.target.value;
        checkNameInput(v);
    }

    const checkNameInput = (v) => {
        if (!v) {
            setState(prevState => ({
                ...prevState,
                name: {
                    ...prevState.name,
                    error: true,
                    message: 'Don\'t skip the name!!'
                }
            }));
            return false;
        } else {
            setState(prevState => ({
                ...prevState,
                name: {
                    ...prevState.name,
                    error: false,
                    message: ''
                }
            }));
            return true;            
        }
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
                        value={state.name.val} 
                        onChange={(e)=>setState(prevState => ({...prevState, name: { ...prevState.name, val: e.target.value}}))} 
                        onBlur={onNameInput} 
                        error={state.name.error} 
                        helperText={state.name.message} 
                    />
                    <TextField
                        margin="dense"
                        id="linkTo"
                        label={props.linkToText}
                        type="url"
                        fullWidth
                        value={state.name.linkTo} 
                        onChange={(e)=>setState(prevState => ({...prevState, linkTo: {val: e.target.value}}))} 
                    />
                    <TextField
                        margin="dense"
                        id="comment"
                        label={'Any comments?'}
                        multiline
                        fullWidth
                        rowsMax={4}
                        value={state.comment.val} 
                        onChange={(e)=>setState(prevState => ({...prevState, comment: {val: e.target.value}}))} 
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
