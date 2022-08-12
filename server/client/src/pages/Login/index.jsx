import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../../api/authApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    setLoading(true);

    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <>
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

        <LoadingButton
          sx={{ mt: 1, mb: 2, py: 1.5 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Login
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to="/signup"
        sx={{
          textTransform: "none",

          width: "fit-content",
          textAlign: "end",
        }}
      >
        Don't have an account? Signup
      </Button>
    </>
  );
};

export default Login;
