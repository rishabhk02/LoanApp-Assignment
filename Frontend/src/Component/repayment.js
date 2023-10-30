import React, { useState, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import axios from "axios";
import { Alert, Col, Container, Row } from "react-bootstrap";

export function PayInstallment() {
  const [installmentId, setInstallmentId] = useState(""); // State to store the selected installment ID
  const [installments, setInstallments] = useState([]); // State to store the user's installments

  // Retrieve user ID and loan ID from browser storage
  const userId = localStorage.getItem("userId");
  const loanId = localStorage.getItem("loanId");

  useEffect(() => {
    // Fetch the user's installments using the user ID and loan ID
    axios
      .get(`http://localhost:4500/myloans?userId=${userId}&loanId=${loanId}`)
      .then((response) => {
        console.log("Fetched user's installments:", response.data.installments);
        setInstallments(response.data.installments);
      })
      .catch((error) => {
        console.error("Failed to fetch user's installments:", error);
      });
  }, [userId, loanId]);

  // Handle installment payment
  const handlePayInstallment = () => {
    // Make an API request to pay the selected installment
    axios
      .post("http://localhost:4500/payInstallment", {
        userId: userId,
        loanId: loanId,
        installmentId: installmentId,
      })
      .then((response) => {
        console.log("Installment payment successful:", response.data);

        // Refresh the list of installments after payment
        // You may also update the installment status in the state
        // and re-render the component to reflect the changes
      })
      .catch((error) => {
        console.error("Installment payment failed:", error);
      });
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={4}></Col>
          <Col lg={4}>
            <Paper elevation={4} className="p-4">
              <h2 className="text-center">Pay Installment</h2>

              <select
                value={installmentId}
                onChange={(event) => setInstallmentId(event.target.value)}
              >
                <option value="">Select Installment</option>
                {installments.map((installment) => (
                  <option key={installment.id} value={installment.id}>
                    Installment {installment.id}
                  </option>
                ))}
              </select>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePayInstallment}
              >
                Pay Installment
              </Button>
            </Paper>
          </Col>
          <Col lg={4}></Col>
        </Row>
      </Container>
    </>
  );
}
