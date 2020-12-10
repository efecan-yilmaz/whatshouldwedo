import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DirectionsIcon from '@material-ui/icons/Directions';
import useStyles from '../util/styles';
import Util from '../util/util';
import md5 from 'md5';
import firebase from '../util/firebase';

function Login(props) {
    const secretWord = 'd7de842da5db283355d91178c24a2b96';
    const classes = useStyles();
    const [emailValidation, setEmailValidation] = useState(false);
    const [emailValidationMessage, setEmailValidationMessage] = useState('');
    const [email, setEmail] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeatValidation, setPasswordRepeatValidation] = useState(false);
    const [passwordRepeatValidationMessage, setPasswordRepeatValidationMessage] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [secretValidation, setSecretValidation] = useState(false);
    const [secretValidationMessage, setSecretValidationMessage] = useState('');
    const [secret, setSecret] = useState('');

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
        
    const onPasswordRepeatInput = (event) => {
        const v = event.target.value;
        checkPasswordRepeatValid(v);
    };

    const checkPasswordRepeatValid = (v) => {
        if (v && v.length > 0 && v === password) {
            setPasswordRepeatValidation(false);
            setPasswordRepeatValidationMessage('');
            return true;
        } else if (v !== password) {
            setPasswordRepeatValidation(true);
            setPasswordRepeatValidationMessage('Nope! They should match!');
            return false;
        } else {
            setPasswordRepeatValidation(true);
            setPasswordRepeatValidationMessage('Nooooooo! This is empty! You can\'t do this to me!');
            return false;
        }
    }
            
    const onSecretInput = (event) => {
        const v = event.target.value;
        checkSecretValid(v);
    };

    const checkSecretValid = (v) => {
        var md5Check = md5(v) === secretWord;
        if (v && v.length > 0 && md5Check) {
            setSecretValidation(false);
            setSecretValidationMessage('');
            return true;
        } else if (!md5Check) {
            setSecretValidation(true);
            setSecretValidationMessage('No! >:(');
            return false;
        } else {
            setSecretValidation(true);
            setSecretValidationMessage('Nooooooo! This is empty! You can\'t do this to me!');
            return false;
        }
    }

    const onSignUpButtonClick = () => {
        if (checkEmailValid(email) && checkPasswordValid(password) && checkPasswordRepeatValid(passwordRepeat) && checkSecretValid(secret)) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            });
        }
    }

    return (
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={12}>
                    <h1 className={classes.title}>Welcome to the Club Kido!</h1>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="emailTextField" label="Give me your e-mail address! I need it!" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} onBlur={onEmailInput} error={emailValidation} helperText={emailValidationMessage}/>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="passwordTextField" type="password" label="Choose! Your! Password! Wisely!" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)} onBlur={onPasswordInput} error={passwordValidation} helperText={passwordValidationMessage}/>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="passwordRepeatTextField" type="password" label="Could you please repeat that m'lady?" variant="outlined" value={passwordRepeat} onChange={(e)=>setPasswordRepeat(e.target.value)} onBlur={onPasswordRepeatInput} error={passwordRepeatValidation} helperText={passwordRepeatValidationMessage}/>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="secretTextField" label="You shall not pass!" variant="outlined" value={secret} onChange={(e)=>setSecret(e.target.value)} onBlur={onSecretInput} error={secretValidation} helperText={secretValidationMessage}/>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <Button variant="outlined" color="primary" startIcon={<SendIcon />} onClick={onSignUpButtonClick}>Let's roll!</Button>
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