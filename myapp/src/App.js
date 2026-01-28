import { Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PrivateRoute from "./routes/PrivateRoute"
import ChatPage from "./pages/ChatPage"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/chatpage"
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default App
