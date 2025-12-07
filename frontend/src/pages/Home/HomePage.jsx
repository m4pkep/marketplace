// src/components/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './HomePage.css';

function HomePage() {
  const categories = [
    { name: 'Авто', subcategories: ['Легковые', 'Мото', 'Грузовики'] },
    { name: 'Недвижимость', subcategories: ['Квартиры', 'Дома', 'Коммерческая'] },
    { name: 'Работа', subcategories: ['Вакансии', 'Резюме'] },
    { name: 'Электроника', subcategories: ['Телефоны', 'Ноутбуки', 'Техника'] },
  ];

  const recommendations = [
    { id: 1, title: 'iPhone 13 Pro', price: '75 000 ₽', location: 'Москва', date: 'Сегодня' },
    { id: 2, title: 'MacBook Air M1', price: '85 000 ₽', location: 'Санкт-Петербург', date: 'Вчера' },
    { id: 3, title: 'Квартира 45 м²', price: '12 000 000 ₽', location: 'Москва', date: '2 дня назад' },
    { id: 4, title: 'Toyota Camry 2018', price: '1 800 000 ₽', location: 'Казань', date: 'Сегодня' },
    
    { id: 5, title: 'Toyota Camry 2018', price: '1 800 000 ₽', location: 'Казань', date: 'Сегодня' },
    { id: 6, title: 'Toyota Camry 2018', price: '1 800 000 ₽', location: 'Казань', date: 'Сегодня' },
    { id: 7, title: 'Toyota Camry 2018', price: '1 800 000 ₽', location: 'Казань', date: 'Сегодня' },
    { id: 8, title: 'Toyota Camry 2018', price: '1 800 000 ₽', location: 'Казань', date: 'Сегодня' },
  ];

  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* Баннер */}
          <section className="banner">
            <div className="bank-banner">
              <h2>Получайте кэшбэк 10% на Авито</h2>
              <p>С картой "Домашний Банк"</p>
              <button className="banner-button">Узнать больше</button>
            </div>
          </section>

          {/* Категории */}
          <section className="categories-section">
            <h2>Все категории</h2>
            <div className="categories-grid">
              {categories.map((category, index) => (
                <div key={index} className="category-card">
                  <div className="category-icon">📦</div>
                  <span className="category-name">{category.name}</span>
                  {category.subcategories.length > 0 && (
                    <div className="subcategories">
                      {category.subcategories.map((sub, subIndex) => (
                        <a key={subIndex} href="#!" className="subcategory-link">{sub}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Рекомендации */}
          <section className="recommendations">
            <h2>Рекомендации для вас</h2>
            <div className="ads-grid">
              {recommendations.map(item => (
                <Link key={item.id} to={`/ad/${item.id}`} className="ad-card">
                  <div className="ad-image">
                    <div className="image-placeholder">📷</div>
                  </div>
                  <div className="ad-info">
                    <h3 className="ad-title">{item.title}</h3>
                    <p className="ad-price">{item.price}</p>
                    <div className="ad-meta">
                      <span className="ad-location">{item.location}</span>
                      <span className="ad-date">{item.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Подвал */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Авито. Все права защищены.</p>
          <div className="footer-links">
            <a href="#!">Помощь</a>
            <a href="#!">Безопасность</a>
            <a href="#!">Реклама</a>
            <a href="#!">О компании</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;