import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "../Components/Sidebar";
import Button from "@mui/material/Button";

const Product = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="h4">Add Product</Typography>
          <Button variant="contained">Add Product</Button>
        </Box>
      </Box>
    </>
  );
};

export default Product;
