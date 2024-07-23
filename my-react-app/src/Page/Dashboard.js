import React from 'react'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Sidebar from "../Components/Sidebar";


const Dashboard = () => {
  return (
    <>
      <Box sx={{display:'flex'}}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}
        >
          <Typography variant="h4">Dashboard</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
