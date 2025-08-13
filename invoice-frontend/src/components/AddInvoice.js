import { useState } from "react";
import { TextField, Typography, Box, Button, styled } from "@mui/material";
import { saveInvoice } from "../services/api";
import { toast } from "react-toastify";

const Component = styled(Box)(({ theme }) => ({
  marginTop: 20,
  '& > p': { fontSize: 26, marginBottom: 10 },
  '& > div > div': { marginRight: 20, minWidth: 200, marginBottom: 15 },
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const defaultInvoice = {
  vendorName: '',
  productName: '',
  amount: '',
  invoiceDate: '',
  action: 'pending',
};

const defaultErrors = {
  vendorName: '',
  productName: '',
  amount: '',
  invoiceDate: '',
  general: '',
};

const AddInvoice = ({ onInvoiceAdded }) => {
  const [invoice, setInvoice] = useState(defaultInvoice);
  const [errors, setErrors] = useState(defaultErrors);

  const onValueChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '', general: '' });
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!invoice.vendorName) {
      newErrors.vendorName = "Vendor name is required.";
      isValid = false;
    }
    if (!invoice.productName) {
      newErrors.productName = "Product name is required.";
      isValid = false;
    }
    if (!invoice.invoiceDate) {
      newErrors.invoiceDate = "Invoice date is required.";
      isValid = false;
    }
    if (isNaN(Number(invoice.amount)) || Number(invoice.amount) <= 0) {
      newErrors.amount = "Please enter a valid positive amount.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addNewInvoice = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await saveInvoice({
        ...invoice,
        amount: String(invoice.amount),
      });

      toast.success("Invoice added successfully!");
      setInvoice(defaultInvoice);
      setErrors(defaultErrors);
      onInvoiceAdded(); // Notify the parent component
    } catch (err) {
      console.error("Failed to save invoice:", err);
      toast.error("Failed to save invoice. Please try again.");
    }
  };

  return (
    <Component>
      <Typography>Add Invoice</Typography>
      <TextField
        name="vendorName"
        variant="standard"
        label="Vendor"
        value={invoice.vendorName}
        onChange={onValueChange}
        error={!!errors.vendorName}
        helperText={errors.vendorName}
      />
      <TextField
        name="productName"
        variant="standard"
        label="Product"
        value={invoice.productName}
        onChange={onValueChange}
        error={!!errors.productName}
        helperText={errors.productName}
      />
      <TextField
        name="amount"
        variant="standard"
        label="Amount (Rs)"
        type="number"
        inputProps={{ min: 0, step: "0.01" }}
        value={invoice.amount}
        onChange={onValueChange}
        error={!!errors.amount}
        helperText={errors.amount}
      />
      <TextField
        name="invoiceDate"
        variant="standard"
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={invoice.invoiceDate}
        onChange={onValueChange}
        error={!!errors.invoiceDate}
        helperText={errors.invoiceDate}
      />
      <Button variant="contained" onClick={addNewInvoice}>Add Invoice</Button>
    </Component>
  );
};

export default AddInvoice;