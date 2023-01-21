import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputUnstyled from '@mui/base/InputUnstyled';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import './style.css';

export default function EditModal({ data, editModalOpen, setEditModalOpen, loading, setLoadnig }) {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState({ title: '', body: '' });

  useEffect(() => {
    const newItem = data?.find((item) => item.id === editModalOpen);
    setEditItem({ title: newItem?.title, body: newItem?.body });
  }, [open]);

  useEffect(() => {
    if (editModalOpen !== 0) {
      setOpen(true);
    }
  }, [editModalOpen]);

  const handleClose = () => {
    setOpen(false);
    setEditModalOpen(0);
  };

  const handleEdit = async () => {
    try {
      setLoadnig(true);
      const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${editModalOpen}`, editItem);
      setLoadnig(false);
      console.log('Edite post', res);
      toast.success('Edited Successfully');
    } catch (error) {
      setLoadnig(false);
      console.log(error);
      toast.error('Warning');
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {!loading ? (
          <>
            <DialogTitle>Edit Data</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                value={editItem.title}
                onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
              />
            </DialogContent>
            <DialogContent>
              <InputUnstyled
                id="body"
                name="body"
                className="textarea"
                placeholder="Body"
                value={editItem.body}
                onChange={(e) => setEditItem({ ...editItem, body: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEdit}>Subscribe</Button>
            </DialogActions>
          </>
        ) : (
          <DialogTitle id="alert-dialog-title">
            <CircularProgress disableShrink size={40} />
          </DialogTitle>
        )}
      </Dialog>
    </div>
  );
}
