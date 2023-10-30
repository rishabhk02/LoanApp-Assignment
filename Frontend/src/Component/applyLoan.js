import React, { useEffect, useState } from "react";
import { Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button } from "@mui/material";
import axios from "axios";

const token = localStorage.getItem('token');
// const token = (tokenMatch) ? tokenMatch[1] : null;
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export function ViewLoans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    // Fetch user's loans from the /myloans API (replace with your actual API endpoint)
    axiosInstance
    .get(`http://localhost:8000/myloans`)
    .then((response) => {
      setLoans(response.data.loans);
      console.log(response.data.loans);
    })
    .catch((error) => {
      console.error("Failed to fetch user's loans:", error);
    });
      
  }, []);

  // useEffect(() => {
   
  //   const mockData = [
  //     {
  //       _id: "1",
  //       loanAmount: 1000,
  //       term: 12,
  //       status: "Pending",
  //       installments: [
  //         {
  //           id: 1,
  //           dueDate: "2023-11-01",
  //           dueAmount: 100,
  //           status: "Due",
  //         },
        
  //       ],
  //     },

  //   ];

  //   setLoans(mockData);
  // }, []);

  return (
    <div className="mt-4">
       <Container>
       <Alert className="text-center">View Loans</Alert>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Loan ID</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Term (week)</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell>Installments</TableCell> */}
              {/* <TableCell>Pay</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan._id}>
                <TableCell>{loan._id}</TableCell>
                <TableCell>${loan.loanAmount}</TableCell>
                <TableCell>{loan.term}</TableCell>
                <TableCell>{loan.status}</TableCell>
              
                {/* <TableCell>
                  <ul>
                    {loan.installments.map((installment) => (
                      <li key={installment.id}>
                        ID: {installment.id}, Due Date: {installment.dueDate}, Due Amount: ${installment.dueAmount}, Status: {installment.status}
                      </li>
                    ))}
                  </ul>
                </TableCell> */}
                {/* <TableCell><Button>Check</Button></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       </Container>
    </div>
  );
}
