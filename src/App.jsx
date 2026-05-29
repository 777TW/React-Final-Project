import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Lobby from './pages/Lobby.jsx';
import Play from './pages/Play.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:mapTitle" element={<Lobby />} />
                <Route path="/play/:mapTitle" element={<Play />} />
            </Routes>
        </Router>
    );
}

export default App;
