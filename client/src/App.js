import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Directory } from "./pages/Directory";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";

function App() {
	return (
        <div className="App">
            
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} /> 
                    <Route path="/directory" element={<Directory />} />
                </Routes>
            </Router>
			<Directory />
        </div>
    );
}

export default App;
