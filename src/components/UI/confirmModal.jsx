import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmModal({children, confirmOpen, setConfirmOpen, ...props}) {

  return (
    <>
      <Dialog
        open={confirmOpen}
        fullWidth={true}
        maxWidth={'sm'}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setConfirmOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        sx={{zIndex: 99999}}
      >
        <DialogTitle>{children}</DialogTitle>
        <DialogActions>
          <button className='button' {...props}>Yes</button>
          <button className='reset' onClick={()=>setConfirmOpen(false)}>Cancel</button>
        </DialogActions>
      </Dialog>
    </>
  );
}