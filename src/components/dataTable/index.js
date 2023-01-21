import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { FiEdit } from 'react-icons/fi';
import { CircularProgress, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import EditModal from './editModal';

export default function DataTable() {
  const { data, mutate } = useSWR('https://jsonplaceholder.typicode.com/posts');
  const dirStyle = useSelector((state) => state.stylesState.dirStyle);

  const [itemId, setItemId] = useState(null);
  const [loading, setLoadnig] = useState(false);
  const [filterItem, setFilterItem] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(0);

  // modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = (id) => {
    setOpen(true);
    setItemId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // remove Item of table
  const removeItem = async () => {
    try {
      setLoadnig(true);
      const res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${itemId}`);
      setLoadnig(false);
      console.log(res.data);
      setItemId(null);
      handleClose();
      toast.success('Removed Successfully');
    } catch (error) {
      setLoadnig(false);
      console.log(error);
      toast.error('!warning');
    }
  };

  // disabled show more btn
  let statusBtn = true;
  if (filterItem < 20) {
    statusBtn = false;
  }

  // show more data btn
  const showMore = () => {
    if (filterItem < 20) {
      setFilterItem(filterItem + 5);
      mutate(data);
    }
  };

  // if (!data) <CircularProgress disableShrink size={40} />;
  // else
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Body</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.filter((items, idx) => idx < filterItem)
              .map((item, index) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align={dirStyle ? 'left' : 'right'}>
                    {item.title.length < 30 ? item.title : `${item.title.slice(0, 30)}...`}
                  </TableCell>
                  <TableCell align={dirStyle ? 'left' : 'right'}>
                    {item.body.length < 50 ? item.body : `${item.body.slice(0, 50)}...`}
                  </TableCell>
                  <TableCell align="center">
                    <FiEdit
                      onClick={() => setEditModalOpen(item.id)}
                      style={{ fontSize: '1.8rem', margin: '0 .5rem', cursor: 'pointer' }}
                    />
                    <DeleteIcon
                      onClick={() => handleClickOpen(item.id)}
                      style={{ fontSize: '2rem', cursor: 'pointer' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Grid style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '3rem 0' }}>
          <Button variant="outlined" onClick={showMore} style={{ width: '40%' }} disabled={statusBtn}>
            {data ? 'Show More' : <CircularProgress disableShrink size={30} />}
            {/* Show More */}
          </Button>
        </Grid>
      </TableContainer>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {!loading ? (
            <>
              <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this item?'}</DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={removeItem} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </>
          ) : (
            <DialogTitle id="alert-dialog-title">
              <CircularProgress disableShrink size={40} />
            </DialogTitle>
          )}
        </Dialog>
      </div>

      <div>
        <EditModal
          data={data}
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          loading={loading}
          setLoadnig={setLoadnig}
        />
      </div>
    </>
  );
}
