import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MaterialAlert from '@material-ui/lab/Alert';

export default function Alert(props) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MaterialAlert onClose={handleClose} severity={props.type}>
                    {props.message}
                </MaterialAlert>
            </Snackbar>
        </>
    )
}
