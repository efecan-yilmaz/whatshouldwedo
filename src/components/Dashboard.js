import React from 'react';
import AppBar from './AppBar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            margin: 1,
            width: '100%'
        },
        child: {
            display: 'inline-block'
        }
    })
);

export default function Dashboard() {
    const classes = useStyles();

    return (
        <div>
            <AppBar />
            <Grid className={classes.box} container spacing={2}>
                <Grid className={classes.child} item xs={6}>
                    <Card title="Movies" imagePath="/img/blade_runner.jpg" imageTitle="Movies" navPath="/movies"/>
                </Grid>
                <Grid className={classes.child} item xs={6}>
                    <Card title="Series" imagePath="/img/man_castle.jpg" imageTitle="Series" navPath="/series"/>
                </Grid>
                <Grid className={classes.child} item xs={6}>
                    <Card title="Activities" imagePath="/img/bouldering.jpg" imageTitle="Activities" navPath="/activities"/>
                </Grid>
                <Grid className={classes.child} item xs={6}>
                    <Card title="Music" imagePath="/img/cash.jpg" imageTitle="Music" navPath="/music"/>
                </Grid>
            </Grid>
        </div>
    )
}
