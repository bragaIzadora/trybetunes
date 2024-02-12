import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Login from './components/login';
import Search from './components/search';
import Album from './components/album';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route
          path="/"
          element={ <Layout /> }
        >
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
