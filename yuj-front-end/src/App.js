import './App.css';
import { white, black } from 'tailwindcss/colors';
import { BrowserRouter, Routes } from 'react-router-dom/dist';
import { Route } from 'react-router-dom';
import MainRouter from './pages/MainRouter';
import ScrollToTop from './utils/ScrollRestoration';



function App() {
  return (
    // start div
    <div className="App" style={{background : white}}> 

      <BrowserRouter>
      {/* 이동 시 화면 최상단 스크롤 위치 */}
        <ScrollToTop />
        <Routes>
          <Route path='*' element={<MainRouter />}/>
        </Routes>
      </BrowserRouter>
      
      {/* end div */}
    </div>
  );
}

export default App;
