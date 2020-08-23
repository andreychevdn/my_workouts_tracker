import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    wrapFields: {
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 20px 10px',
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    textField: {
        marginTop: '5px',
    },
    wrapButtons: {
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    datePickers: {
        marginTop: '10px',
        width: '100%',
        padding: '15px',
        boxSizing: 'border-box',
        border: '1px solid rgb(148, 150, 153, 0.5)',
        borderRadius: '3px',
    },
    iconButton: {
        marginTop: '10px',
        boxSizing: 'border-box',
        border: '1px solid rgb(148, 150, 153, 0.5)',
        borderRadius: '3px',
    },
    icon: {
        fontSize: '30px',
        color: 'blue',
    },
}));

export default useStyles;