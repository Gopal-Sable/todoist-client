import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Components/Login";
import Home from "./Pages/Home";
import ProtectedRoute from "./utils/ProtectedRoutes";
import ProjectPage from "./Pages/ProjectPage";

const App = () => {
    return (
        <BrowserRouter>
            <nav>this is nav bar</nav>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/project/:id"
                    element={
                        <ProtectedRoute>
                            <ProjectPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
