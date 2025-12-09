import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import './CreateAdPage.css';

const API_URL = 'http://localhost:8000/api';

function CreateAdPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'used',
    location: '',
    phone: '',
  });
  
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = [
    { id: 1, name: 'Электроника', icon: '📱' },
    { id: 2, name: 'Одежда и обувь', icon: '👕' },
    { id: 3, name: 'Дом и сад', icon: '🏠' },
    { id: 4, name: 'Авто', icon: '🚗' },
    { id: 5, name: 'Недвижимость', icon: '🏢' },
    { id: 6, name: 'Услуги', icon: '🔧' },
    { id: 7, name: 'Хобби и отдых', icon: '🎮' },
    { id: 8, name: 'Животные', icon: '🐕' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isMain: images.length === 0 // Первое фото главное
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const setMainImage = (index) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isMain: i === index
    }));
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // 1. Создаем объявление
      const adResponse = await fetch(`${API_URL}/ads/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (!adResponse.ok) {
        throw new Error('Ошибка при создании объявления');
      }
      
      const adData = await adResponse.json();
      
      // 2. Загружаем изображения
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const imageData = new FormData();
          imageData.append('image', images[i].file);
          imageData.append('ad', adData.id);
          imageData.append('is_main', images[i].isMain);
          
          await fetch(`${API_URL}/ads/${adData.id}/upload-image/`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: imageData,
          });
        }
      }
      
      setSuccess(true);
      setTimeout(() => {
        navigate(`/ad/${adData.id}`);
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Что-то пошло не так');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-ad-page">
      <Header />
      
      <div className="create-ad-container">
        <div className="create-ad-card">
          <h1 className="page-title">Разместить объявление</h1>
          
          {success ? (
            <div className="success-message">
              <h2>🎉 Объявление успешно создано!</h2>
              <p>Перенаправляем на страницу объявления...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ad-form">
              {/* Основная информация */}
              <div className="form-section">
                <h2>Основная информация</h2>
                
                <div className="form-group">
                  <label>Название объявления *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Например: iPhone 13 Pro 256GB"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Описание *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Опишите товар подробно..."
                    rows="6"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Цена (₽) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Категория *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Состояние</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                    >
                      <option value="new">Новое</option>
                      <option value="used">Б/У</option>
                      <option value="broken">Требует ремонта</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Фотографии */}
              <div className="form-section">
                <h2>Фотографии</h2>
                <p className="section-subtitle">Добавьте до 10 фотографий. Первая фотография будет основной</p>
                
                <div className="image-upload-area">
                  <label className="upload-button">
                    📸 Загрузить фото
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden-input"
                    />
                  </label>
                  
                  <div className="image-preview-grid">
                    {images.map((image, index) => (
                      <div key={index} className="image-preview-item">
                        <img src={image.preview} alt={`Preview ${index}`} />
                        <div className="image-actions">
                          <button
                            type="button"
                            onClick={() => setMainImage(index)}
                            className={`main-btn ${image.isMain ? 'active' : ''}`}
                          >
                            {image.isMain ? '⭐ Основное' : 'Сделать основным'}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="remove-btn"
                          >
                            ❌ Удалить
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Контактная информация */}
              <div className="form-section">
                <h2>Контактная информация</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Город/Местоположение *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Например: Москва, центр"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Телефон для связи *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Ошибки и загрузка */}
              {error && <div className="error-message">❌ {error}</div>}
              
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="cancel-btn"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Создание...' : '✅ Опубликовать объявление'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateAdPage;