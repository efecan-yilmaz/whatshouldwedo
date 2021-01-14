import React, { useState, useEffect } from 'react';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import MovieIcon from '@material-ui/icons/Movie';
import SeriesIcon from '@material-ui/icons/MovieFilter';
import ActivitiesIcon from '@material-ui/icons/DirectionsRun';
import MusicIcon from '@material-ui/icons/MusicNote';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

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
    const [drawerOpen, setDrawerOpen] = useState(false);

    const useCheckMobileScreen = () => {
        const [width, setWidth] = useState(window.innerWidth);
        const handleWindowSizeChange = () => {
            console.log(window.innerWidth);
            setWidth(window.innerWidth);
        }
    
        useEffect(() => {
            window.addEventListener('resize', handleWindowSizeChange);
            return () => {
                window.removeEventListener('resize', handleWindowSizeChange);
            }
        }, []);
    
        return (width <= 768);
    }

    const navigate = (path) => {
        history.push(path);
    };

    const toggleDrawer = (open) => {    
        setDrawerOpen(open);
    };

    const getMenuButtons = () => (
        <>
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
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<MusicIcon />}
                onClick={() => navigate('/music')}
            >MUSIC</Button>
        </>
    );

    let content;
    if (useCheckMobileScreen()) {
        content = (
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => { toggleDrawer(true) }}>
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                    open={drawerOpen}
                    onClose={() => { toggleDrawer(false) }}
                    onOpen={() => { toggleDrawer(false) }}
                    >
                        {getMenuButtons()}
                </SwipeableDrawer>
            </Toolbar>    
        );
    } else {
        content = (
            <Toolbar>
                {getMenuButtons()}
            </Toolbar>
        );
    }

    return (
        <MaterialAppBar position="static">
            {content}
        </MaterialAppBar>
    )
}
