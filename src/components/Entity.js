import React, { useState, useEffect } from 'react';
import AppBar from './AppBar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../util/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DetailsIcon from '@material-ui/icons/ZoomIn';
import RefreshIcon from '@material-ui/icons/Refresh';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddDialog from './AddDialog';
import { firebaseDatabase } from '../util/firebase';
import Util from '../util/util';
import ProgressIndicator from './ProgressIndicator';
import { useAuth } from '../contexts/AuthContext';
import Alert from './Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import DetailsDialog from './DetailsDialog';
import IconButton from '@material-ui/core/IconButton';

const useLocalStyles = makeStyles((theme: Theme) =>
    createStyles({
        localButton: {
            margin: theme.spacing(3),
        },
        table: {
            maxWidth: 650,
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)',
            marginRight: '-50%',
            marginTop: '2rem'
        },
        tableWrapper: {
            position: 'relative',
            height: '100vh',
            width: '100%'
        }
    }),
);

export default function Entity(props) {
    const [state, setState] = useState({
        addDialogOpen: false,
        detailsDialog: {
            open: false,
            data: {}
        },
        showProgress: false,
        showAlert: false,
        alertText: '',
        alertType: 'success',
        tableData: {}
    });
    const classes = useStyles();
    const localClasses = useLocalStyles();
    const { currentUser } = useAuth();
    let entityTypeCapital = props.entityType.charAt(0).toUpperCase() + props.entityType.slice(1);

    useEffect(() => {
        const dbRef = firebaseDatabase.ref(props.dbEntity);
        dbRef.on('value', (snapshot) => {
            const data = snapshot.val();

            firebaseDatabase.ref('users/').once('value').then((snapshot) => {
                const users = snapshot.val();

                for (var d in data) {
                    if (data.hasOwnProperty(d)) {
                        data[d].userName = users[data[d].user].name;
                    }
                }

                console.log(data);

                setState(prevState => ({
                    ...prevState,
                    tableData: data
                }))
            });
        });

        return function cleanup() {
            dbRef.off('value');
        };
    }, []);

    const addMovie = () => {
        setState(prevState => ({
            ...prevState,
            addDialogOpen: true
        }));
    };

    const onDialogClose = () => {
        setState(prevState => ({
            ...prevState,
            addDialogOpen: false
        }));
    };

    const onDialogOKPressed = (data) => {
        setState(prevState => ({
            ...prevState,
            showProgress: true
        }));

        firebaseDatabase.ref(props.dbEntity + Util.createID()).set({
            title: data.name,
            comment: data.comment,
            linkTo: data.linkTo,
            user: currentUser.uid
        }, function(error) {
            if (error) {
                console.log(error);
                setState(prevState => ({
                    ...prevState,
                    showAlert: true,
                    alertText: 'Nooo! Something is wrong!! Check the console you nerd!',
                    alertType: 'error'
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    showAlert: true,
                    alertText: 'Yay! ' + entityTypeCapital + ' is saved!',
                    alertType: 'success'
                }));
            }
            setState(prevState => ({
                ...prevState,
                showProgress: false,
                addDialogOpen: false
            }));
        });        
    };

    const onDetailsClick = (event, key) => {
        setState(prevState => ({
            ...prevState,
            detailsDialog: {
                open: true,
                data: prevState.tableData[key]
            }
        }));
    };

    const onDetailsDialogClose = () => {
        setState(prevState => ({
            ...prevState,
            detailsDialog: {
                open: false,
                data: {}
            }
        }));
    };

    return (
        <div>
            <AppBar />
            <Alert open={state.showAlert} message={state.alertText} type={state.alertType}/>
            <ProgressIndicator open={state.showProgress} />
            <AddDialog open={state.addDialogOpen} title={'Add a ' + entityTypeCapital} text={'Fill in the blanks to add a ' + props.entityType + '. You know the drill!! Yay!!'} onClose={onDialogClose} 
                onOKPressed={onDialogOKPressed} mainAddFieldText={entityTypeCapital + ' Title'} linkToText={props.linkToLabel}
            />
            <DetailsDialog open={state.detailsDialog.open} data={state.detailsDialog.data} onClose={onDetailsDialogClose}/>
            <Typography variant="h2" className={classes.pageTitle}>
                {props.entityTitle}
            </Typography>
            <hr className={classes.lineBreak}/>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={6}>
                    <Button
                        className={localClasses.localButton}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        color="primary"
                        onClick={addMovie}
                    >Add a {entityTypeCapital}</Button>
                </Grid>
                <Grid className={classes.grid} item xs={6}>
                <Button
                        className={localClasses.localButton}
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        color="secondary"
                        onClick={() => {}}
                    >Suggest Random</Button>
                </Grid>
            </Grid>
            <hr className={classes.lineBreak}/>
            <Typography variant="h4" className={classes.pageTitle}>
                {entityTypeCapital} List
            </Typography>
            <div className={localClasses.tableWrapper}>
                <TableContainer component={Paper} className={localClasses.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Creator</TableCell>
                                <TableCell align="right">Details</TableCell>
                                <TableCell>{props.doneTitle}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                state.tableData ? Object.keys(state.tableData).map((key)=>(
                                    <TableRow key={key}>
                                        <TableCell>
                                            {state.tableData[key].title}
                                        </TableCell>
                                        <TableCell >
                                            {state.tableData[key].userName}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="details" onClick={(event) => onDetailsClick(event, key)}><DetailsIcon /></IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Checkbox disabled={true} color="primary" checked={state.tableData[key].done}/>
                                        </TableCell>
                                    </TableRow>
                                )) : <TableRow><TableCell><Typography variant="h5" className={classes.pageTitle}>Nothing to see here! Add something!!</Typography></TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
