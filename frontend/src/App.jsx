import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cardapio from './pages/cardapio';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Cardapio />} />
                <Route path="/cardapio" element={<Cardapio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;