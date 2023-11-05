import { Route, Routes } from 'react-router-dom';
import Login from './components/login';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <div>
        <Routes>
          <Route path="/" element={ <Login /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
