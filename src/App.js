import './App.css';
import IhorPage from "./pages/ihor/IhorPage";
import { Routes, Route, Link } from "react-router-dom";
import { AppRoutes, redirectRoutes } from "./components/routing/AppRoutes";

const App = () => {
    return (
        <>
            <div>
                <h1>Navbar</h1>
                <Link to={AppRoutes.MAIN}>main</Link>
                <br/>
                <Link to={AppRoutes.DASHBOARD}>dashboard</Link>
                <Link to={redirectRoutes.IHOR}>Ihor</Link>
            </div>

            <Routes>
                <Route exact path={AppRoutes.MAIN} element={<h1>Home screen</h1>}/>
                <Route exact path={AppRoutes.DASHBOARD} element={<h1>Dashboard</h1>}/>
                <Route path={AppRoutes.IHOR} element={<IhorPage />} exact />
                <Route path={AppRoutes.NOT_FOUND_PAGE}  element={<h1>404</h1>}/>
                <Route path="*" element={<h1>404</h1>}/>

            </Routes>
        </>
    );
}

export default App;
