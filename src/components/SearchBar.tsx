import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (searchData: SearchData) => void;
  className?: string;
}

interface SearchData {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchData);
  };

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 mb-2">Where</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-200" />
            <input
              type="text"
              placeholder="City or hostel name"
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-200" />
            <input
              type="date"
              min={today}
              value={searchData.checkIn}
              onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-200" />
            <input
              type="date"
              min={searchData.checkIn || tomorrow}
              value={searchData.checkOut}
              onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-200" />
            <select
              value={searchData.guests}
              onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 appearance-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Search className="w-5 h-5" />
          <span>Search Hostels</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;