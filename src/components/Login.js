import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import useStyles from '../util/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import Util from '../util/util';
import { firebaseAuth } from '../util/firebase';

function Login(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        email: {
            val: '',
            validation: false,
            message: ''
        },
        password: {
            val: '',
            validation: false,
            message: ''
        }
    });

    const onEmailInput = (event) => {
        var v = event.target.value;
        checkEmailValid(v);
    };

    const checkEmailValid = (v) => {
        if (!(v && v.length) || !Util.checkEmailRegex(v)) {
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

    const onLoginButtonClick = () => {
        if (checkEmailValid(state.email.val) && checkPasswordValid(state.password.val)) {
            firebaseAuth.signInWithEmailAndPassword(state.email.val, state.password.val)
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
            <div>
                <Grid container spacing={3}>
                    <Grid className={classes.grid} item xs={12}>
                        <h1 className={classes.title}>Show me what you got!!</h1>
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <TextField className={classes.textField} id="emailTextField" label="What do they call you gov'nor?" value={state.email.val} onChange={(e)=>setState(prevState => ({...prevState, email: { ...prevState.email, val: e.target.value}}))} onBlur={onEmailInput} variant="outlined" error={state.email.error} helperText={state.email.message} />
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <TextField className={classes.textField} id="passwordTextField" type="password" label="Fuck! I forgot the password!" value={state.password.val} onChange={(e)=>setState(prevState => ({...prevState, password: { ...prevState.password, val: e.target.value}}))} variant="outlined" onBlur={onPasswordInput} error={state.password.error} helperText={state.password.message} />
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