import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/CheckBox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

export default function DetailsDialog(props) {
    const [open, setOpen] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const onLinkClick = (event) => {
        event.preventDefault();
        const link = props.data.linkTo.indexOf('http') > -1 ? props.data.linkTo : 'http://' + props.data.linkTo;
        window.open(link, '_blank');
    };

    const handleMarAsDonePress = (event) => {
        props.onMarkAsDonePress({
            id: props.dataId,
            done: !props.data.done
        });
    }

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="add-dialog-title">{props.data.title}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Typography variant="body1" gutterBottom>Title: </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="body1" gutterBottom>{props.data.title}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body1" gutterBottom>Creator: </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="body1" gutterBottom>{props.data.userName}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body1" gutterBottom>Comments: </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="body1" gutterBottom>{props.data.comment}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body1" gutterBottom>Link: </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="body1" gutterBottom><Link href="#" onClick={onLinkClick}>{props.data.linkTo}</Link></Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body1" gutterBottom>Done?: </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Checkbox disabled={true} color="primary" checked={props.data.done}/>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMarAsDonePress} color="secondary" startIcon={<CheckIcon />} variant="outlined">
                        {props.data.done ? "Mark as not done!" : "Mark as done!"}
                    </Button>
                    <Button onClick={handleClose} color="primary" startIcon={<CancelIcon />}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
