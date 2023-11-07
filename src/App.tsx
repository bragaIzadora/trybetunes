import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Search from './components/search';
import Album from './components/album';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <div>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/search" element={ <Search /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
