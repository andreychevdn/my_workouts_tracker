import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    wrapItems: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    span: {
        fontWeight: 'bold',
        color: 'blue',
    },
    iconButton: {
        fontSize: '20px',
        color: 'blue',
    },
  }));

  export default useStyles;