import { Button, Container, Input, Paper, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Col, Row } from "react-bootstrap";

// const tokenMatch = document.cookie.match(/token=([^;]+)/);
// const token = tokenMatch[1];
// const axiosInstance = axios.create({
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
       navigate('/');

    axios
      .post("http://localhost:8000/login", formData)
      .then((response) => {     
        const token = response.data.token;  
        localStorage.setItem('token', token);
      })
      .catch((error) => {
        console.error("Login failed:", error);       
      });
  };

  return (
    <>
      <Container className="pt-5 pb-2 d-flex justify-content-center align-item-center">
          <Row>
              <Col lg={3}></Col>
            <Col lg={6}>
              <Paper elevation={3} className="p-4">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
              </Col>
              <Col lg={3}></Col>
          </Row>
      </Container>
    </>
  );
}
