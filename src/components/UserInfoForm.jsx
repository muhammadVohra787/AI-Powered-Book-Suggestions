import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const UserInfoForm = ({ userInfo, setUserInfo }) => {


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo)
    //onSubmit(userInfo); // Pass userInfo to a parent or API call
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>User Information</Typography>
      
      {/* First Name */}
      <TextField
        fullWidth
        label="First Name"
        name="firstName"
        value={userInfo.firstName}
        onChange={handleChange}
        margin="normal"
      />

      {/* Last Name */}
      <TextField
        fullWidth
        label="Last Name"
        name="lastName"
        value={userInfo.lastName}
        onChange={handleChange}
        margin="normal"
      />

      {/* Country */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select
          name="country"
          value={userInfo.country}
          onChange={handleChange}
        >
          <MenuItem value="Canada">Canada</MenuItem>
          <MenuItem value="United States">United States</MenuItem>
          <MenuItem value="United Kingdom">United Kingdom</MenuItem>
          <MenuItem value="Australia">Australia</MenuItem>
          <MenuItem value="India">India</MenuItem>
          {/* Add more countries as needed */}
        </Select>
      </FormControl>

      {/* Address */}
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={userInfo.address}
        onChange={handleChange}
        margin="normal"
      />

      {/* Age */}
      <TextField
        fullWidth
        label="Age"
        name="age"
        type="number"
        value={userInfo.age}
        onChange={handleChange}
        margin="normal"
      />

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ marginTop: 2 }}>
        Save Info
      </Button>
    </Box>
  );
};

export default UserInfoForm;
