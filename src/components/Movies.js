import React, { useState } from 'react';
import AppBar from './AppBar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../util/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddDialog from './AddDialog';
import { firebaseDatabase } from '../util/firebase';
import Util from '../util/util';
import ProgressIndicator from './ProgressIndicator';
import { useAuth } from '../contexts/AuthContext';
import Alert from './Alert';

const useLocalStyles = makeStyles((theme: Theme) =>
    createStyles({
        localButton: {
            margin: theme.spacing(3),
        },
    }),
);

export default function Movies(props) {
    const [state, setState] = useState({
        addDialogOpen: false,
        showProgress: false,
        showAlert: false,
        alertText: '',
        alertType: 'success'
    });
    const classes = useStyles();
    const localClasses = useLocalStyles();
    const { currentUser } = useAuth();

    const addMovie = () => {
        setState(prevState => ({
            ...prevState,
            addDialogOpen: true
        }));
    };

    const onDialogClose = () => {
        setState(prevState => ({
            ...prevState,
            addDialogOpen: false
        }));
    };

    const onDialogOKPressed = (data) => {
        setState(prevState => ({
            ...prevState,
            showProgress: true
        }));

        firebaseDatabase.ref('movies/' + Util.createID()).set({
            title: data.name,
            comment: data.comment,
            linkTo: data.linkTo,
            user: currentUser.uid
        }, function(error) {
            if (error) {
                console.log(error);
                setState(prevState => ({
                    ...prevState,
                    showAlert: true,
                    alertText: 'Nooo! Something is wrong!! Check the console you nerd!',
                    alertType: 'error'
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    showAlert: true,
                    alertText: 'Yay! Movie is saved!',
                    alertType: 'success'
                }));
            }
            setState(prevState => ({
                ...prevState,
                showProgress: false,
                addDialogOpen: false
            }));
        });        
    };

    return (
        <div>
            <AppBar />
            <Alert open={state.showAlert} message={state.alertText} type={state.alertType}/>
            <ProgressIndicator open={state.showProgress} />
            <AddDialog open={state.addDialogOpen} title={'Add a Movie'} text={'Fill in the blanks to add a movie. You know the drill!! Yay!!'} onClose={onDialogClose} 
                onOKPressed={onDialogOKPressed} mainAddFieldText={'Movie Title'} linkToText={'IMDb link'}
            />
            <Typography variant="h2" className={classes.pageTitle}>
                MOVIES
            </Typography>
            <hr className={classes.lineBreak}/>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={6}>
                    <Button
                        className={localClasses.localButton}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        color="primary"
                        onClick={addMovie}
                    >Add a Movie</Button>
                </Grid>
                <Grid className={classes.grid} item xs={6}>
                <Button
                        className={localClasses.localButton}
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        color="secondary"
                        onClick={() => {}}
                    >Suggest a Random Movie</Button>
                </Grid>
            </Grid>
            <hr className={classes.lineBreak}/>
            <Typography variant="h4" className={classes.pageTitle}>
                Movie List
            </Typography>
        </div>
    )
}
