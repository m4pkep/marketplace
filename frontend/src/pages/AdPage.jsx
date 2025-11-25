// src/components/pages/AdPage.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import './AdPage.css';

function AdPage() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  // Данные объявления
  const adData = {
    id: 1,
    title: 'iPhone 13 Pro 256GB Sierra Blue',
    price: '75 000 ₽',
    originalPrice: '85 000 ₽',
    category: 'Электроника → Телефоны и аксессуары → Apple iPhone',
    description: 'Продам iPhone 13 Pro 256GB. Состояние идеальное, как новый. Полный комплект: наушники, зарядное устройство, документы. Телефон защищен стеклом и чехлом с первого дня. Продаю в связи с переходом на новую модель.',
    location: 'Москва, м. Проспект Мира',
    date: 'Сегодня в 14:30',
    views: 154,
    seller: {
      name: 'Александр',
      rating: 4.8,
      reviews: 47,
      registered: 'На Авито с 2019',
      phone: '+7 (915) 123-45-67',
      otherAds: 12
    },
    images: ['📱', '📱', '📱', '📱'],
    characteristics: [
      { name: 'Бренд', value: 'Apple' },
      { name: 'Модель', value: 'iPhone 13 Pro' },
      { name: 'Память', value: '256 ГБ' },
      { name: 'Цвет', value: 'Sierra Blue' },
      { name: 'Состояние', value: 'Идеальное' },
      { name: 'Гарантия', value: 'До 12.2024' }
    ]
  };

  const similarAds = [
    { id: 2, title: 'iPhone 14 Pro 128GB', price: '85 000 ₽', location: 'Москва', date: 'Вчера' },
    { id: 3, title: 'iPhone 12 Pro Max 256GB', price: '65 000 ₽', location: 'Москва', date: 'Сегодня' },
    { id: 4, title: 'iPhone 13 128GB Pink', price: '60 000 ₽', location: 'Москва', date: '2 дня назад' },
  ];

  return (
    <div className="ad-page">
      <Header />
      
      {/* Хлебные крошки */}
      <nav className="breadcrumbs">
        <Link to="/">Авито</Link>
        <span> › </span>
        <Link to="/">Электроника</Link>
        <span> › </span>
        <span>Телефоны Apple</span>
      </nav>

      <div className="ad-container">
        {/* Левая колонка */}
        <div className="ad-left">
          {/* Галерея */}
          <div className="gallery">
            <div className="main-image">
              <div className="image-placeholder large">{adData.images[activeImage]}</div>
            </div>
            <div className="image-thumbnails">
              {adData.images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <div className="image-placeholder small">{img}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Описание */}
          <section className="description-section">
            <h3>Описание</h3>
            <p>{adData.description}</p>
          </section>

          {/* Характеристики */}
          <section className="specs-section">
            <h3>Характеристики</h3>
            <div className="specs-grid">
              {adData.characteristics.map((spec, index) => (
                <div key={index} className="spec-item">
                  <span className="spec-name">{spec.name}:</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Похожие объявления */}
          <section className="similar-ads">
            <h3>Похожие объявления</h3>
            <div className="similar-grid">
              {similarAds.map(ad => (
                <Link key={ad.id} to={`/ad/${ad.id}`} className="similar-ad-card">
                  <div className="similar-ad-image">
                    <div className="image-placeholder">📱</div>
                  </div>
                  <div className="similar-ad-info">
                    <h4>{ad.title}</h4>
                    <p className="similar-price">{ad.price}</p>
                    <div className="similar-meta">
                      <span>{ad.location}</span>
                      <span>{ad.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Правая колонка */}
        <div className="ad-right">
          <div className="price-card">
            <div className="price-section">
              <h1 className="ad-title">{adData.title}</h1>
              <div className="prices">
                <span className="current-price">{adData.price}</span>
                {adData.originalPrice && (
                  <span className="original-price">{adData.originalPrice}</span>
                )}
              </div>
              <div className="ad-meta">
                <span className="location">📍 {adData.location}</span>
                <span className="date">📅 {adData.date}</span>
                <span className="views">👁️ {adData.views} просмотров</span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-primary">📞 Показать телефон</button>
              <button className="btn-secondary">💬 Написать сообщение</button>
              <button className="btn-outline">❤️ Добавить в избранное</button>
            </div>

            {/* Информация о продавце */}
            <div className="seller-info">
              <h3>Продавец</h3>
              <div className="seller-details">
                <div className="seller-name-rating">
                  <span className="seller-name">{adData.seller.name}</span>
                  <span className="seller-rating">⭐ {adData.seller.rating} ({adData.seller.reviews})</span>
                </div>
                <p className="seller-registered">{adData.seller.registered}</p>
                <p className="seller-other-ads">Еще {adData.seller.otherAds} объявлений</p>
                <button className="btn-outline seller-btn">Все объявления продавца</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdPage;