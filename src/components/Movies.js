import React from 'react';
import AppBar from './AppBar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../util/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useLocalStyles = makeStyles((theme: Theme) =>
    createStyles({
        localButton: {
            margin: theme.spacing(3),
        },
    }),
);

export default function Movies() {
    const classes = useStyles();
    const localClasses = useLocalStyles();

    const addMovie = () => {
        
    }

    return (
        <div>
            <AppBar />
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
