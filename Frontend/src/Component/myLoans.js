import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export function MyLoans() {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8000/myloans")
      .then((response) => {
        let allLoans = response.data.loans;
        let res = [];
        for(const loan of allLoans){
          if(loan.status==='Approved'){
            res.push(loan);
          }
        }
        setLoans(res);
        
        console.log(loans[0]._id);
      })
      .catch((error) => {
        console.error("Failed to fetch user's loans:", error);
      });
  }, []);

  return (
    <>
      <Container>
        <div className="mt-5">
          <h2 className="text-center">Current Loans</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Loan ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Term</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((loan,index) => (
                  <TableRow key={loan._id}>
                    <TableCell>{loan._id}</TableCell>
                    <TableCell>{loan.loanAmount}</TableCell>
                    <TableCell>{loan.term}</TableCell>
                    <TableCell>{loan.completionStatus}</TableCell>
                    <TableCell>
                      {loan.completionStatus === "Due" && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => navigate(`/installments/${loan._id}`)}
                        >
                          Check Installments
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
  );
}
