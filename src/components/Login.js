import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import useStyles from '../util/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import Util from '../util/util';

function Login(props) {
    const classes = useStyles();
    const [emailValidation, setEmailValidation] = useState(false);
    const [emailValidationMessage, setEmailValidationMessage] = useState('');
    const [email, setEmail] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
    const [password, setPassword] = useState('');

    const onEmailInput = (event) => {
        var v = event.target.value;
        checkEmailValid(v);
    };

    const checkEmailValid = (v) => {
        if (!(v && v.length) || !Util().checkEmailRegex(v)) {
            setEmailValidation(true);
            setEmailValidationMessage('That is not an email address gov\'nor!!');
            return false;
        } else {
            setEmailValidation(false);
            setEmailValidationMessage('');
            return true;
        }
    }
    
    const onPasswordInput = (event) => {
        const v = event.target.value;
        checkPasswordValid(v);
    };

    const checkPasswordValid = (v) => {
        if (v && v.length > 0) {
            setPasswordValidation(false);
            setPasswordValidationMessage('');
            return true;
        } else {
            setPasswordValidation(true);
            setPasswordValidationMessage('Nooooooo! This is empty! You can\'t do this to me!');
            return false;
        }
    }

    const onLoginButtonClick = () => {
        if (checkEmailValid(email) && checkPasswordValid(password)) {
            alert('Yes!');
        } else {
            alert('No!');
        }
    }

    return (
        <div>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid className={classes.grid} item xs={12}>
                        <h1 className={classes.title}>Show me what you got!!</h1>
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <TextField className={classes.textField} id="emailTextField" label="What do they call you gov'nor?" value={email} onChange={(e)=>setEmail(e.target.value)} onBlur={onEmailInput} variant="outlined" error={emailValidation} helperText={emailValidationMessage} />
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <TextField className={classes.textField} id="passwordTextField" type="password" label="Fuck! I forgot the password!" value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined" onBlur={onPasswordInput} error={passwordValidation} helperText={passwordValidationMessage} />
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <Button variant="outlined" color="primary" startIcon={<SendIcon />} onClick={onLoginButtonClick}>Show time!</Button>
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