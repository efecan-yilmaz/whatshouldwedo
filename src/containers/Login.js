import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%);',
            border: '2px solid #EEEEEE',
            borderRadius: '8px',
            paddingBottom: 20
        },
        grid: {
            textAlign: 'center'
        },
        title: {
            fontSize: 20
        },
        textField: {
            width: '60%'
        }
    })
);

function Login(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid className={[classes.title, classes.grid].join(', ')} item xs={12}>
                    <h1>Show me what you got!!</h1>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="outlined-basic" label="What do they call you gov'nor?" variant="outlined" />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="outlined-basic" type="password" label="Fuck! I forgot the password!" variant="outlined" />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <Button variant="outlined" color="primary" startIcon={<SendIcon />}>Show time!</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;