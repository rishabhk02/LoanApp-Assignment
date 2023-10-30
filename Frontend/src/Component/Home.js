import React, { useState } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Paper } from "@mui/material";
import axios from "axios";
import { Alert, Col, Container, Row } from "react-bootstrap";


export function Home() {
  const [formData, setFormData] = useState({
    loanAmount: 0,
    term: 0,
  });

  const [loanId, setLoanId] = useState(""); // State to store the loan ID

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const token = localStorage.getItem('token');
  console.log(token);
  // const token = (tokenMatch) ? tokenMatch[1] : null;
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axiosInstance
      .post("http://localhost:8000/loan-apply", formData)
      .then((response) => {
        console.log(response);
        // After a successful loan application, save the loan ID to browser storage
        const newLoanId = response.data.loanId; // Replace 'loanId' with the actual key in your response data
        localStorage.setItem("loanId", newLoanId);

        // Set the loan ID in the state
        setLoanId(newLoanId);
      })
      .catch((error) => {
        console.error("Loan application failed:", error);
      });
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={4}></Col>
          <Col lg={4}>
            <Paper elevation={4} className="p-4">
              <h2 className="text-center">Apply For Loan</h2>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Loan Amount"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={handleChange}
                />
                <TextField
                  label="Term"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="term"
                  type="number"
                  value={formData.term}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Apply for Loan
                </Button>
              </form>
            </Paper>
          </Col>
          <Col lg={4}></Col>
        </Row>
      </Container>
      <Container>
     
      </Container>
    </>
  );
}
