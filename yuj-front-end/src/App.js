import './App.css';
import { BrowserRouter } from 'react-router-dom'
import ComponentsTest from './pages/ComponentsTest'

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <ComponentsTest />

      </div>
    </BrowserRouter>
  );
}

export default App;
