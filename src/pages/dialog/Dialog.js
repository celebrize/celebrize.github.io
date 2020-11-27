import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function MyDialog({title, contentText, isOpen, handleClose, children}) {
    const maxWidth = "sm"
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (<Dialog
        maxWidth={maxWidth}
        open={isOpen}
        fullScreen={fullScreen}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogContent>
          { contentText && (<DialogContentText>{contentText}</DialogContentText>) }
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>)
}

export default MyDialog
