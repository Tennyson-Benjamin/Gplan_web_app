// components/Toast.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { hideToast } from "../redux/features/toast/toast.slice";
import "./components.css";
const Toast: React.FC = () => {
  const { isVisible, message, type } = useSelector(
    (state: RootState) => state.toast,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  return (
    <div className={`toast toast-${type} ${isVisible ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default Toast;
