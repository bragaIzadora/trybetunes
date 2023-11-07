import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
    return <p>Carregando...</p>;
  }

  return (
    <header data-testid="header-component">
      <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
      <p data-testid="header-user-name">
        Welcome,
        {userName}
      </p>
    </header>
  );
}

export default Header;
