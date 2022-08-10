import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../../utils/authUtils";
import Loading from "../../Common/Loading";
import Sidebar from "../../Common/Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/authSlice";
const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, sertLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();

      if (!user) {
        navigate("/login");
      } else {
        // save user
        dispatch(setUser(user));
        sertLoading(false);
      }
    };

    checkAuth();
  }, [navigate, dispatch]);
  return (
    <>
      {loading ? (
        <Loading fullHeight />
      ) : (
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              p: 1,
              width: "max-content",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};

export default AppLayout;
