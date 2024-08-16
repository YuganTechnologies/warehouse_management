import { useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddProduct = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      product_id: '',
      date: '',
      bale_no: '',
      rfd_white: '',
      order_no: '',
      location: '',
      no_of_pcs: '',
      construction: '',
      width: '',
      weave: '',
      colour: '',
      pcs_mtr: '',
      meter: '',
      dispatch_meter: '',
      available_meter: '',
    },
    validationSchema: Yup.object({
      product_id: Yup.string().required('Product ID is required'),
      date: Yup.date().required('Date is required'),
      bale_no: Yup.string().required('Bale No is required'),
      rfd_white: Yup.string().required('RFD White is required'),
      order_no: Yup.string().required('Order No is required'),
      location: Yup.string().required('Location is required'),
      no_of_pcs: Yup.number().required('Number of Pieces is required').positive('Must be positive').integer('Must be an integer'),
      construction: Yup.string().required('Construction is required'),
      width: Yup.number().required('Width is required').positive('Must be positive'),
      weave: Yup.string().required('Weave is required'),
      colour: Yup.string().required('Colour is required'),
      pcs_mtr: Yup.number().required('Pieces Meter is required').positive('Must be positive'),
      meter: Yup.number().required('Meter is required').positive('Must be positive'),
      dispatch_meter: Yup.number().required('Dispatch Meter is required').positive('Must be positive'),
      available_meter: Yup.number().required('Available Meter is required').positive('Must be positive'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/Product/addProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Handle successful response
        const result = await response.json();
        console.log('Product added successfully:', result);

        // Redirect to products page
        router.push('/products');
      } catch (err) {
        console.error('Error adding product:', err);
        setError('Failed to add product');
      }
    },
  });

  return (
    <>
      <Head>
        <title>Add Product | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Add Product
          </Typography>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={formik.handleSubmit}>
            {[
              { name: 'product_id', label: 'Product ID' },
              { name: 'date', label: 'Date', type: 'date', shrink: true },
              { name: 'bale_no', label: 'Bale No' },
              { name: 'rfd_white', label: 'RFD White' },
              { name: 'order_no', label: 'Order No' },
              { name: 'location', label: 'Location' },
              { name: 'no_of_pcs', label: 'Count', type: 'number' },
              { name: 'construction', label: 'Construction' },
              { name: 'width', label: 'Width', type: 'number' },
              { name: 'weave', label: 'Weave' },
              { name: 'colour', label: 'Colour' },
              { name: 'pcs_mtr', label: 'Pieces Meter', type: 'number' },
              { name: 'meter', label: 'Meter', type: 'number' },
              { name: 'dispatch_meter', label: 'Dispatch Meter', type: 'number' },
              { name: 'available_meter', label: 'Available Meter', type: 'number' },
            ].map((field) => (
              <TextField
                key={field.name}
                fullWidth
                label={field.label}
                margin="normal"
                name={field.name}
                type={field.type || 'text'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                variant="outlined"
                InputLabelProps={field.shrink ? { shrink: true } : undefined}
                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                helperText={formik.touched[field.name] && formik.errors[field.name]}
              />
            ))}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Add Product
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddProduct;
