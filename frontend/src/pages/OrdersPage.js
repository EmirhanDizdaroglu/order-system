import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getOrders } from "../services/orderService";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", width: 150 },
    { field: "status", headerName: "Status", width: 150 }, // Durum bilgisi
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            getRowId={(row) => row.id}
          />
        </div>
      )}
    </Container>
  );
};

export default OrdersPage;
