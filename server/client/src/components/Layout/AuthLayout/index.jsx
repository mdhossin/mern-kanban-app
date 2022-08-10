import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import assets from "../../../assets";
import authUtils from "../../../utils/authUtils";
import Loading from "../../Common/Loading";

const AuthLayout = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();

      if (!isAuth) {
        setLoading(false);
      } else {
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);
  return (
    <>
      {loading ? (
        <Loading fullHeight />
      ) : (
        <Container
          component="main"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                background: "#212121",
                py: 4,
                px: 5,

                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 4,
                }}
              >
                <img
                  src={assets.images.logoDark}
                  style={{ width: "150px" }}
                  alt="app logo"
                />
              </Box>
              <Outlet />
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default AuthLayout;
