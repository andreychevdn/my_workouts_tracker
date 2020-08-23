import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '17px'
    },
    formControl: {
        marginTop: '10px',
        width: '100%'
    },
    wrapButtons: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    paper: {
        marginTop: '25px',
        padding: '10px 25px 15px',
        border: '1px solid grey'
    },
    wrapNumbersFields: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    numbersField: {
        width: '20%'
    },
    slider: {
        marginTop: '15px'
    },
}));

export default useStyles;