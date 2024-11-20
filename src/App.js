import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//components
import AgendamentosPage from './pages/AgendamentosPage';
import HomePage from './pages/HomePage';
import { AuthProvider } from './contexts/GeralContext';
import ServiceSelect from './components/ServiceSelect';
import CongratsPage from './pages/CongratsPage';      


function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path='/:configText/congrats' element={<CongratsPage></CongratsPage>}></Route>
          <Route path='/:configText' element={<AgendamentosPage></AgendamentosPage>}></Route>
          <Route path=''></Route>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;