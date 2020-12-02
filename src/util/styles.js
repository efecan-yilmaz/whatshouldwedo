import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
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
            fontSize: 50,
            color: '#800000'
        },
        textField: {
            width: '60%'
        },
        lineBreak: {
            border: '2px solid #BDBDBD',
            width: '80%',
            borderRadius: '5px'
        }
    })
);

export default useStyles;