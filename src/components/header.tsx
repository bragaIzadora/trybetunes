import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './style.css';

function Header() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getUser();
        setUserName(user.name);
      } catch (error) {
        console.error('Error fetching user data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return <p className="loading2">Carregando...</p>;
  }

  return (
    <header data-testid="header-component" className="aside">
      <h1 className="h1">TrybeTunes</h1>
      <p data-testid="header-user-name" className="email">
        Welcome,
        {userName}
      </p>
      {/* <img src="Sound-Image.png" alt="" className="frequency" /> */}
      <NavLink
        to="/search"
        data-testid="link-to-search"
        className="links"
      >
        <img src="loupe.png" alt="Search" className="linkImg" />
        Search
      </NavLink>
      <NavLink
        to="/favorites"
        data-testid="link-to-favorites"
        className="links"
      >
        <img src="favorites.png" alt="Favorites" className="linkImg" />
        Favorites
      </NavLink>
      <NavLink
        to="/profile"
        data-testid="link-to-profile"
        className="links"
      >
        <img src="perfilGrey.png" alt="Profile" className="linkImg" />
        Profile
      </NavLink>
    </header>
  );
}

export default Header;
