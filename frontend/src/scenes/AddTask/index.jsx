import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddNoteDialog({ open, onClose, onSubmit }) {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    contents: Yup.string().required('Contents are required'),
  });

  const formik = useFormik({
    initialValues: { title: '', contents: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a New Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          margin="dense"
          name="contents"
          label="Contents"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={formik.values.contents}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contents && Boolean(formik.errors.contents)}
          helperText={formik.touched.contents && formik.errors.contents}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={formik.handleSubmit} color="primary" disabled={!formik.isValid || formik.isSubmitting}>
          Add Note
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNoteDialog;
