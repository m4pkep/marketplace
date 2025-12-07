import React from 'react';
import { Link } from 'react-router-dom'; // Добавляем Link
import './Header.css';

function Header() {
  const categories = [
    'Авто', 'Недвижимость', 'Работа', 'Услуги'
  ];

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">
            <h1>Авито</h1>
          </Link>
        </div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Найти товары и услуги"
            className="search-input"
          />
          <button className="search-button">Найти</button>
        </div>
        <div className="header-actions">
          <button className="header-btn">Войти</button>
          {/* Меняем на Link */}
          <Link to="/create-ad" className="create-ad-btn">
            Разместить объявление
          </Link>
        </div>
      </div>
      
      <nav className="categories-nav">
        <div className="all-categories">
          <span>Все категории</span>
        </div>
        {categories.map((category, index) => (
          <a key={index} href="#!" className="nav-link">{category}</a>
        ))}
      </nav>
    </header>
  );
}

export default Header;