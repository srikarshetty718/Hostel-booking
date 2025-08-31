import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';

interface FeaturedHostel {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number;
  description: string;
}

const featuredHostels: FeaturedHostel[] = [
  {
    id: 1,
    name: "Urban Backpackers Paradise",
    location: "Barcelona, Spain",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    rating: 4.8,
    price: 25,
    description: "Modern hostel in the heart of Barcelona with rooftop terrace"
  },
  {
    id: 2,
    name: "Seaside Hostel Haven",
    location: "Lisbon, Portugal",
    image: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg",
    rating: 4.9,
    price: 22,
    description: "Beautiful coastal views and vibrant community atmosphere"
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Prague, Czech Republic",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    rating: 4.7,
    price: 18,
    description: "Historic charm meets modern comfort in the city center"
  }
];

const FeaturedCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredHostels.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredHostels.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredHostels.length) % featuredHostels.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {featuredHostels.map((hostel, index) => (
        <div
          key={hostel.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${hostel.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm opacity-90">{hostel.location}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold mb-2">{hostel.name}</h3>
                <p className="text-gray-200 mb-4 text-sm md:text-base">{hostel.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{hostel.rating}</span>
                    </div>
                    <div className="text-lg font-bold">
                      €{hostel.price}<span className="text-sm font-normal opacity-90">/night</span>
                    </div>
                  </div>
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredHostels.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;