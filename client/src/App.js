import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Directory } from "./pages/Directory";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search"; 
import { AllPokemon } from "./components/AllPokemon";
import { PokemonsSearched } from "./pages/PokemonsSearched";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
	return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} /> 
                    <Route path="/search" element={<Search />} />
                    <Route path="/directory" element={<Directory />} />
                    {/* <Route path="/everything" element={<AllPokemon />} /> */}
                    <Route path="/pokemonSearched" element={<PokemonsSearched />} />
                </Routes>
                {/* <Footer /> */}
            </Router>
        </div>
    );
}

export default App;
