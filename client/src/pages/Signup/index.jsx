import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../../api/authApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Wrapper } from "./styles";
const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    setLoading(true);

    try {
      const res = await authApi.signup({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Wrapper>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
        />
        <TextField
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          disabled={loading}
          sx={{ my: 2 }}
        />
        <TextField
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2, py: 1.5 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Signup
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to="/login"
        sx={{
          textTransform: "none",

          width: "fit-content",
          textAlign: "end",
        }}
      >
        Already have an account? Login
      </Button>
    </Wrapper>
  );
};

export default Signup;
