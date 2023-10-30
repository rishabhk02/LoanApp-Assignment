
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from "@mui/material";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";


const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export function InstallmentList() {
  const params = useParams();
  const loanId = params.loanId;
  const [installments, setInstallments] = useState([]);
  const [idx, setIdx] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = (index) => {
    setShowModal(true);
    setIdx(index);
    console.log(index);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // setIdx(null);
  };

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8000/myloans")
      .then((response) => {
        let currentLoan = response.data.loans;
        currentLoan = currentLoan.filter((loan) => loan._id === loanId);

        setInstallments(currentLoan[0].installments);
      })
      .catch((error) => {
        console.error("Failed to fetch user's loans:", error);
      });

  }, [loanId]);

  function onFormSubmit() {
    axiosInstance
      .post("http://localhost:8000/payInstallment", { installmentid: idx, loanId: loanId })
      .then((response) => {
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Failed to fetch user's loans:", error);
      });
  }

  return (
    <>
      <Container>
        <div className="mt-5">
          <h2 className="text-center">Installments</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Due Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {installments.map((installment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{installment.dueDate}</TableCell>
                    <TableCell>{installment.dueAmount}</TableCell>
                    {installment.status == 'Paid' && <TableCell>Paid</TableCell>}
                    {installment.status == 'Due' && <Button onClick={()=>handleOpenModal(index)}>Pay</Button>}

                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Pay Installment</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const amountToPay = e.target.elements['amountToPay'].value;

                          if (amountToPay >= installment.dueAmount) {
                            onFormSubmit();
                            handleCloseModal();
                          } else {

                          }
                        }}>
                          <input type="number" name='amountToPay' placeholder="Enter amount to pay" min={installment.dueAmount} />
                          <button type="submit">Pay</button>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleCloseModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
