import MaterialCard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import DirectionIcon from '@material-ui/icons/Directions';

import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        }
    }),
);

export default function Card(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <MaterialCard>
            <CardHeader title={props.title}></CardHeader>
            <CardMedia
                className={classes.media}
                image={props.imagePath}
                title={props.imageTitle || 'image'}
            />
            <CardActions disableSpacing>
                <Button
                    color="primary"
                    startIcon={<DirectionIcon />}
                    onClick={(e) => { history.push(props.navPath); }}
                >Go Go Go!</Button>
            </CardActions>
        </MaterialCard>
    )
}
