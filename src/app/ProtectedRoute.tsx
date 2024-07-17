import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../redux/features/auth/authSlice";
import { AppDispatch } from "../redux/store";

interface DecodedToken{
  exp: number;
}
export const ProtectedRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  /* const token = useSelector((store: RootState) => store?.auth?.token); */
  const token = useSelector((state: RootState) => state.auth.token);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkToken = async () => {
      const localStorageToken = localStorage.getItem('access_token');
      if (localStorageToken) {
        try {
          const decoded: DecodedToken = jwtDecode(localStorageToken);
          const currentTime = Date.now() / 1000;
          const timeLeft = decoded.exp - currentTime;

          if (timeLeft > 20) {
            setIsAuthenticated(true);
          } else {
            const resultAction = await dispatch(refreshToken());
            if (refreshToken.fulfilled.match(resultAction)) {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          }
        } catch (error) {
          console.error("Error decoding token or refreshing:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkToken();
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  
  // If authenticated, render the child routes
  return <Outlet />;
};
