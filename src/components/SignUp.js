import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DirectionsIcon from '@material-ui/icons/Directions';
import useStyles from '../util/styles';
import Util from '../util/util';
import md5 from 'md5';
import {firebaseAuth} from '../util/firebase';

function Login(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        email: {
            val: '',
            error: false,
            message: ''
        }, 
        password: {
            val: '',
            error: false,
            message: ''
        }, 
        passwordRepeat: {
            val: '',
            error: false,
            message: ''
        },
        secret: {
            val: '',
            error: false,
            message: ''
        }
    });

    const onEmailInput = (event) => {
        var v = event.target.value;
        checkEmailValid(v);
    };

    const checkEmailValid = (v) => {
        if (!(v && v.length) || !Util().checkEmailRegex(v)) {
            setState(prevState => ({
                ...prevState,
                email: {
                    ...prevState.email,
                    error: true,
                    message: 'That is not an email address gov\'nor!!'
                }
            }));
            return false;
        } else {
            setState(prevState => ({
                ...prevState,
                email: {
                    ...prevState.email,
                    error: false,
                    message: ''
                }
            }));
            return true;
        }
    }
    
    const onPasswordInput = (event) => {
        const v = event.target.value;
        checkPasswordValid(v);
    };

    const checkPasswordValid = (v) => {
        if (v && v.length > 0) {
            setState(prevState => ({
                ...prevState,
                password: {
                    ...prevState.password,
                    error: false,
                    message: ''
                }
            }));
            return true;
        } else {
            setState(prevState => ({
                ...prevState,
                password: {
                    ...prevState.password,
                    error: true,
                    message: 'Nooooooo! This is empty! You can\'t do this to me!'
                }
            }));
            return false;
        }
    }
        
    const onPasswordRepeatInput = (event) => {
        const v = event.target.value;
        checkPasswordRepeatValid(v);
    };

    const checkPasswordRepeatValid = (v) => {
        if (v && v.length > 0 && v === state.password.val) {
            setState(prevState => ({
                ...prevState,
                passwordRepeat: {
                    ...prevState.passwordRepeat,
                    error: false,
                    message: ''
                }
            }));
            return true;
        } else if (v !== state.password.val) {
            setState(prevState => ({
                ...prevState,
                passwordRepeat: {
                    ...prevState.passwordRepeat,
                    error: true,
                    message: 'Nope! They should match!'
                }
            }));
            return false;
        } else {
            setState(prevState => ({
                ...prevState,
                passwordRepeat: {
                    ...prevState.passwordRepeat,
                    error: true,
                    message: 'Nooooooo! This is empty! You can\'t do this to me!'
                }
            }));
            return false;
        }
    }
            
    const onSecretInput = (event) => {
        const v = event.target.value;
        checkSecretValid(v);
    };

    const checkSecretValid = (v) => {
        var md5Check = md5(v) === process.env.REACT_APP_SECRET_WORD;
        if (v && v.length > 0 && md5Check) {
            setState(prevState => ({
                ...prevState,
                secret: {
                    ...prevState.secret,
                    error: false,
                    message: ''
                }
            }));
            return true;
        } else if (!md5Check) {
            setState(prevState => ({
                ...prevState,
                secret: {
                    ...prevState.secret,
                    error: true,
                    message: 'No! >:('
                }
            }));
            return false;
        } else {
            setState(prevState => ({
                ...prevState,
                secret: {
                    ...prevState.secret,
                    error: true,
                    message: 'Nooooooo! This is empty! You can\'t do this to me!'
                }
            }));
            return false;
        }
    }

    const onSignUpButtonClick = () => {
        if (checkEmailValid(state.email.val) && checkPasswordValid(state.password.val) && checkPasswordRepeatValid(state.passwordRepeat.val) && checkSecretValid(state.secret.val)) {
            firebaseAuth.createUserWithEmailAndPassword(state.email.val, state.password.val)
            .then((user) => {
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
        }
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={12}>
                    <h1 className={classes.title}>Welcome to the Club Kido!</h1>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="emailTextField" label="Feed me your e-mail address!" value={state.email.val} onChange={(e)=>setState(prevState => ({...prevState, email: { ...prevState.email, val: e.target.value}}))} onBlur={onEmailInput} variant="outlined" error={state.email.error} helperText={state.email.message} />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="passwordTextField" type="password" label="Choose! Your! Password! Wisely!" value={state.password.val} onChange={(e)=>setState(prevState => ({...prevState, password: { ...prevState.password, val: e.target.value}}))} variant="outlined" onBlur={onPasswordInput} error={state.password.error} helperText={state.password.message} />
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="passwordRepeatTextField" type="password" label="Could you please repeat that m'lady?" variant="outlined" value={state.passwordRepeat.val} onChange={(e)=>setState(prevState => ({...prevState, passwordRepeat: { ...prevState.passwordRepeat, val: e.target.value}}))} onBlur={onPasswordRepeatInput} error={state.passwordRepeat.error} helperText={state.passwordRepeat.message}/>
                </Grid>
                <Grid className={classes.grid} item xs={12}>
                    <TextField className={classes.textField} id="secretTextField" label="You shall not pass!" variant="outlined" value={state.secret.val} onChange={(e)=>setState(prevState => ({...prevState, secret: { ...prevState.secret, val: e.target.value}}))} onBlur={onSecretInput} error={state.secret.error} helperText={state.secret.message}/>
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