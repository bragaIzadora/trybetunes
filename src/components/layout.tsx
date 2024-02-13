import { Outlet } from 'react-router-dom';
import Header from './header';
import './style.css';

function Layout() {
  return (
    <div className="div">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
