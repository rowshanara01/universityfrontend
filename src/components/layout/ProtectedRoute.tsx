import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { logout, useCurrentToken } from "../../redux/Features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/Features/hooks";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  // redux theke use nicchi na, token k verrify korchi
  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
