import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function PrivateRoute({ children }) {
  const { user } = useAuth()

  return user ? children : <Navigate to="/login" replace />
}


/*
1. User tries to open /chat
2. PrivateRoute checks:
3. Is user logged in?
4. If YES → render the page
5. If NO → redirect to /login
*/