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
    height: '470px',
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
    margin: '0px 18px 0 18px',
  },
  title: {
    margin: '0 18px',
    padding: '5px 0',
    display: 'flex',
    fontSize: '18px',
    height: '20px',
  },
  cardContent: {
    margin: '0 18px',
    padding: '5px 0',
    display: 'flex',
    height: '110px',
  },
  cardActions: {
    padding: '30px 5px 8px 5px',
    display: 'block',
    justifyContent: 'space-between',
  },
  overlay3: {
    position: 'absolute',
    bottom: '5px',
    left: '13px',
    color: 'white',
  },
  overlay4: {
    position: 'absolute',
    bottom: '5px',
    right: '13px',
    color: 'white',
  },
});
