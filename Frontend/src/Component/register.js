import { Button, Container, Input, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Col, Row } from "react-bootstrap";

export function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:8000/register", formData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate("/");
      }).catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  const handleSign = () => {
    navigate("/signin");
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={4}></Col>
   
          <Col lg={4}>
            <Paper elevation={3} className="p-4">
              <h2 className="text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="userName"
                  type="text"
                  value={formData.userName}
                  onChange={handleChange}
                />
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
                <Select
                  className="mt-2"
                  label="Role"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register
                </Button>
                <Button onClick={handleSign} fullWidth>
                  Sign In
                </Button>
              </form>
            </Paper>

          </Col>
          <Col lg={4}></Col>

        </Row>

      </Container>

    </>
  );
}
