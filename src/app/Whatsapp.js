"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsApp = () => {
  const phoneNumber = '9320738940';
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };
  return (
    <div>
      <button onClick={handleWhatsAppClick} className="whatsapp-button">
        <FontAwesomeIcon icon={faWhatsapp} size="2x" className='text-green-600'/>
      </button>
    </div>
  );
};

export default WhatsApp;
