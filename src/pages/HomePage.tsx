import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import HostelCard from '../components/HostelCard';
import { Star, Users, Shield, Heart } from 'lucide-react';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (searchData: any) => {
    navigate('/hostels', { state: { searchData } });
  };

  const topRatedHostels = [
    {
      id: 1,
      name: "Central Backpackers",
      location: "Amsterdam, Netherlands",
      image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      rating: 4.9,
      price: 28,
      amenities: ['Wi-Fi', 'Breakfast', 'AC', 'Laundry'],
      reviews: 1247
    },
    {
      id: 2,
      name: "Coastal Dreams Hostel",
      location: "Barcelona, Spain",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      rating: 4.8,
      price: 32,
      amenities: ['Wi-Fi', 'Parking', 'Breakfast', 'AC'],
      reviews: 891
    },
    {
      id: 3,
      name: "Urban Explorer Hub",
      location: "Berlin, Germany",
      image: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg",
      rating: 4.7,
      price: 24,
      amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'AC'],
      reviews: 756
    }
  ];

  const features = [
    {
      icon: Star,
      title: "Top-Rated Hostels",
      description: "Curated selection of the best hostels worldwide with verified reviews"
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Connect with fellow travelers and create unforgettable memories"
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Safe and secure payment processing with instant confirmation"
    },
    {
      icon: Heart,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your peace of mind"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Hostel Experiences
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Book budget-friendly hostels worldwide and connect with travelers from around the globe
            </p>
            
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} className="max-w-5xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of exceptional hostels in the world's most exciting cities
            </p>
          </div>
          <FeaturedCarousel />
        </div>
      </section>

      {/* Top Rated Hostels */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Rated Hostels
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These highly-rated hostels offer exceptional experiences and great value
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRatedHostels.map((hostel, index) => (
              <div
                key={hostel.id}
                className={`transform transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <HostelCard hostel={hostel} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HostelHub?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We make hostel booking simple, secure, and social
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`text-center group transform transition-all duration-700 ${
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transform transition-all duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have found their perfect hostel through HostelHub
          </p>
          <button
            onClick={() => navigate('/hostels')}
            className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            Start Exploring Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;