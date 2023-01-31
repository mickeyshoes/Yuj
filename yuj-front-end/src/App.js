import logo from './logo.svg';
import './App.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { BrowserRouter as BrRouter, Route, Navigate, Routes, Outlet } from 'react-router-dom'
import Vidu from './Vidu'

function App() {
  return (
    <div className="App">
      <AccountBoxIcon />

      <BrRouter>
        <Routes>
            <Route path='/' element={<Vidu/>}>
            </Route>
            <Route path='/chat/*' element={<Outlet/> }>
                <Route path='stage' element={<Vidu/>}></Route>
            </Route>
            <Route path='/*' element={ <Navigate to='/'/>} />
        </Routes>
      </BrRouter>

    </div>
  );
}

export default App;
