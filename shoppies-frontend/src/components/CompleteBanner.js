import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  },
  bottom: {
    marginTop: '20%',
  },
  button: {
    marginTop: '2em',
    backgroundColor: 'black',
    color: 'gold',
    '&:hover': {
      background: 'gold',
      color: 'black',
    },
  },
  paper: {
    position: 'absolute',
    minWidth: '80vh',
    minHeight: '80vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: 'gold',
    border: '5px solid black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

export default function CompleteBanner(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Thank you for your nominations!</h2>
          <br></br>

          <p>
            You can share your nominations by copying this link:
            <br></br>
            <a href={`http://localhost:3000/${props.user.user.slug}`}>
              <span className={classes.link}>
                localhost:3000/
                {props.user.user.slug}
              </span>
            </a>
          </p>
          <p className={classes.bottom}>
            You may continue to edit your nominations<br></br>by removing one or
            more from your nominations list.
          </p>

          <Button
            style={modalStyle}
            onClick={props.handleClose}
            className={classes.button}
            variant="outlined"
          >
            Gotcha!
          </Button>
        </div>
      </Modal>
    </div>
  );
}
