import React, { useState } from 'react';
import { Star, MapPin, Wifi, Car, Coffee, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Hostel {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number;
  amenities: string[];
  reviews: number;
}

interface HostelCardProps {
  hostel: Hostel;
  className?: string;
}

const amenityIcons: { [key: string]: React.ComponentType<any> } = {
  'Wi-Fi': Wifi,
  'Parking': Car,
  'Breakfast': Coffee,
  'AC': Snowflake,
};

const HostelCard: React.FC<HostelCardProps> = ({ hostel, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hostel.image}
          alt={hostel.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{hostel.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {hostel.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">€{hostel.price}</div>
            <div className="text-sm text-gray-500">per night</div>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{hostel.location}</span>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          {hostel.reviews} reviews
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-3 mb-4">
          {hostel.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity] || Wifi;
            return (
              <div key={amenity} className="flex items-center space-x-1 text-gray-500">
                <Icon className="w-4 h-4" />
                <span className="text-xs">{amenity}</span>
              </div>
            );
          })}
        </div>

        {/* Book Now Button */}
        <Link
          to={`/hostel/${hostel.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default HostelCard;