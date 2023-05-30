import React from "react";
import { Navigate } from "react-router-dom";
import useSession from "./SessionProvider";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const session = useSession();
  return (
    <div>
      {session.isLoggedIn() ? <>{children}</> : <Navigate to="/login" />}
    </div>
  );
}
