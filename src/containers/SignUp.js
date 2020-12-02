import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DirectionsIcon from '@material-ui/icons/Directions';
import useStyles from '../util/styles';

function Login(props) {
    const classes = useStyles();

    return (
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={12}>
                    <h1 className={classes.title}>Welcome to the Club Kido!</h1>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="outlined-basic" label="Give me your e-mail address! I need it!" variant="outlined" />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="outlined-basic" type="password" label="Choose! Your! Password! Wisely!" variant="outlined" />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="outlined-basic" type="password" label="Could you please repeat that m'lady?" variant="outlined" />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="outlined-basic" label="You shall not pass!" variant="outlined" />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <Button variant="outlined" color="primary" startIcon={<SendIcon />}>Let's roll!</Button>
                </Grid>
                <hr className={classes.lineBreak}/>
                <Grid className={classes.grid} item xs={12}>
                    <Button variant="outlined" color="secondary" startIcon={<DirectionsIcon />} onClick={() => { arguments[0].history.push("/login"); }}>Back to the Future!</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;