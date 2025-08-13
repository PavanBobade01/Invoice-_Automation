import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress, Container } from "@mui/material";
import AddInvoice from "../components/AddInvoice";
import Invoices from "../components/Invoices";
import { getAllInvoices } from "../services/api";
import { toast } from 'react-toastify';

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchAllInvoices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllInvoices();
      setInvoices(response);
      toast.success("Invoices loaded successfully!");
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      toast.error("Failed to fetch invoices. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllInvoices();
  }, [fetchAllInvoices]);

  const handleInvoiceAdded = () => {
    setShowAddForm(false);
    fetchAllInvoices();
  };

  const handleToggleForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">Invoice Processing</Typography>
          <Button
            variant="contained"
            onClick={handleToggleForm}
          >
            {showAddForm ? 'View Invoices' : 'Add New Invoice'}
          </Button>
        </Box>

        {showAddForm ? (
          <AddInvoice onInvoiceAdded={handleInvoiceAdded} />
        ) : (
          <Box>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Invoices invoices={invoices} />
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;