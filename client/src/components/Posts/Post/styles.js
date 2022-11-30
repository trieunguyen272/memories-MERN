import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    display: 'flex',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    margin: '13px',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '5px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 18px',
  },
  title: {
    padding: '5px 18px',
    display: 'flex',
    fontSize: '18px',
    height: '20px',
  },
  cardContent: {
    padding: '10px 18px',
    display: 'flex',
    height: '60px',
  },
  cardActions: {
    padding: '0 15px 8px 15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
