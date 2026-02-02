import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formState, setFormState] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        setFormState('success');
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormState('idle');
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 4000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState('error');
      setErrorMessage(
        error.response?.data?.detail || 
        'Failed to submit inquiry. Please try calling us directly.'
      );
      
      // Reset error state after 5 seconds
      setTimeout(() => {
        setFormState('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-600 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-white/90">
            We'd love to hear from you. Reach out to us for any inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Have questions about our products or want to place an order?
                We're here to help! Contact us through any of the following
                methods.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <a
                href="tel:9810721166"
                className="block bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-amber-600"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-600">9810721166</p>
                  </div>
                </div>
              </a>

              <div className="block bg-white p-6 rounded-2xl shadow-md border-l-4 border-amber-600">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600">thekashmiricorner@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="block bg-white p-6 rounded-2xl shadow-md border-l-4 border-amber-600">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Location
                    </h3>
                    <p className="text-gray-600">Kashmir, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-50 p-6 rounded-2xl border border-amber-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex justify-between">
                  <span>Monday - Saturday:</span>
                  <span className="font-medium">9:00 AM - 7:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">Closed</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            {formState === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll get back to you soon via email or phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none disabled:bg-gray-100"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {formState === 'error' && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full flex items-center justify-center px-6 py-4 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {formState === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
