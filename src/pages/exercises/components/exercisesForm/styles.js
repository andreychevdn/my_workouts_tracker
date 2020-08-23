import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapFields: {
        width: '500px',
        display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    formControl: {
        marginTop: '20px',
    },
    textField: {
        marginTop: '20px',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    wrapButtons: {
        marginTop: '185px',
        display: 'flex',
        justifyContent: 'space-between',

    },
  }));

  export default useStyles;