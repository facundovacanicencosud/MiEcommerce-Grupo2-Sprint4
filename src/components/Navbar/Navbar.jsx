import React from 'react';
import { Link } from 'react-router-dom';
import style from './navbar.module.css';

const Navbar = () => {
  return (
    <header>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/products">products</Link>
            <Link to="/products/1">productsId</Link>
            <Link to="/products/new">productsNew</Link>
        </nav>
    </header>
  )
}

export default Navbar