import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DirectionsIcon from '@material-ui/icons/Directions';
import useStyles from '../util/styles';
import Util from '../util/util';

function Login(props) {
    const classes = useStyles();
    const [emailValidation, setEmailValidation] = useState(false);
    const [emailValidationMessage, setEmailValidationMessage] = useState('');

    const onEmailInput = (event) => {
        if (!Util().checkEmailRegex(event.target.value)) {
            setEmailValidation(true);
            setEmailValidationMessage('That is not an email address gov\'nor!!');
        } else {
            setEmailValidation(false);
            setEmailValidationMessage('');
        }
    };

    return (
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={12}>
                    <h1 className={classes.title}>Welcome to the Club Kido!</h1>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="emailTextField" label="Give me your e-mail address! I need it!" variant="outlined"  error={emailValidation} helperText={emailValidationMessage}/>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="passwordTextField" type="password" label="Choose! Your! Password! Wisely!" variant="outlined" />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="passwordRepeatTextField" type="password" label="Could you please repeat that m'lady?" variant="outlined" />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="secretTextField" label="You shall not pass!" variant="outlined" />
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