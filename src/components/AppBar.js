import React from 'react';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import MovieIcon from '@material-ui/icons/Movie';
import SeriesIcon from '@material-ui/icons/MovieFilter';
import ActivitiesIcon from '@material-ui/icons/DirectionsRun';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

export default function AppBar() {
    const classes = useStyles();
    const history = useHistory();

    const navigate = (path) => {
        history.push(path);
    };

    return (
        <MaterialAppBar position="static">
            <Toolbar>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                >HOME</Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<MovieIcon />}
                    onClick={() => navigate('/movies')}
                >MOVIES</Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SeriesIcon />}
                    onClick={() => navigate('/series')}
                >SERIES</Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<ActivitiesIcon />}
                    onClick={() => navigate('/activities')}
                >ACTIVITIES</Button>
            </Toolbar>
        </MaterialAppBar>
    )
}
