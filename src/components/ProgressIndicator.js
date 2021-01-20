import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            position: 'fixed',
            top: '50%',
            left: '50%'
        }
    }),
);

export default function ProgressIndicator(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    return (
        <>
            <Modal open={open}>
                <div tabIndex="1">
                    <CircularProgress className={classes.progress} color="primary" tabIndex="-1"/>
                </div>
            </Modal>
        </>
    )
}
