import React, { useState, useEffect } from 'react';
import './Banner.css';
import banner1 from '../assets/banner-viettel1.png';
import banner2 from '../assets/banner-viettel2.jpg';


const Banner = () => {
  const images = [banner1, banner2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 giây đổi ảnh 1 lần
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="banner-container">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className={`banner-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
      
      {/* THÊM MỚI: Cụm hiển thị 1/2 và vạch kẻ ngang */}
      <div className="banner-indicator">
        <span className="indicator-number">{currentIndex + 1}/{images.length}</span>
        <div className="indicator-track">
          {images.map((_, idx) => (
            <div key={idx} className={`indicator-bar ${idx === currentIndex ? 'active' : ''}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;