import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import useStyles from '../util/styles';
import DirectionsIcon from '@material-ui/icons/Directions';

function Login(props) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid className={classes.grid} item xs={12}>
                        <h1 className={classes.title}>Show me what you got!!</h1>
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
                    <hr className={classes.lineBreak}/>
                    <Grid className={classes.grid} item xs={12}>
                        <Button variant="outlined" color="secondary" startIcon={<DirectionsIcon />} onClick={() => { arguments[0].history.push("/signup"); }}>Back to the Future!</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Login;