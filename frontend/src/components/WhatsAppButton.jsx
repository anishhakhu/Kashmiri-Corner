import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '919810721166'; // Include country code (91 for India)
  const message = "Hello Kashmiri Corner, I'm interested in your products and would like to check availability.";
  
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      
      {/* Tooltip */}
      <span className="absolute right-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us on WhatsApp
      </span>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
    </button>
  );
};

export default WhatsAppButton;
