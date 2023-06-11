import NavBar from "./components/NavBar";
import Homepage from "./containers/Homepage"
import ScoreBoard from "./containers/ScoreBoard"
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './containers/Game'
import Login from './containers/Login'
import Article from './containers/Article'
const pages = ['Home', 'ScoreBoard'];

const App = () => {

    return (
        <Router>
            <NavBar pages={pages}/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/scores" element={<ScoreBoard/>}/>
                <Route path="/game/:id" element={<Game/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/stories/:id" element={<Article/>}/>
            </Routes>
        </Router>
    );
}

export default App;
