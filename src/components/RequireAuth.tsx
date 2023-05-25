import React from "react";
import { Navigate } from "react-router-dom";
import SessionHandler from "src/utils/SessionHandler";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  return (
    <div>
      {SessionHandler.isLoggedIn() ? <>{children}</> : <Navigate to="/login" />}
    </div>
  );
}
