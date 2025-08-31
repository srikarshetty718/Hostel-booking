import React, { useState } from 'react';
import { Filter as FilterIcon, Star, DollarSign, X } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  priceRange: [number, number];
  minRating: number;
  amenities: string[];
  sortBy: string;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    minRating: 0,
    amenities: [],
    sortBy: 'rating',
  });

  const amenitiesList = ['Wi-Fi', 'Parking', 'Breakfast', 'AC', 'Laundry', 'Kitchen'];
  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
  ];

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (index: number, value: number) => {
    const newPriceRange: [number, number] = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    const newFilters = { ...filters, priceRange: newPriceRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: number) => {
    const newFilters = { ...filters, minRating: rating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters: FilterState = {
      priceRange: [0, 100],
      minRating: 0,
      amenities: [],
      sortBy: 'rating',
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
      >
        <FilterIcon className="w-4 h-4" />
        <span>Filters</span>
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-80 z-50 animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Price Range: €{filters.priceRange[0]} - €{filters.priceRange[1]}
            </label>
            <div className="flex space-x-3">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                className="flex-1"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Rating</label>
            <div className="flex space-x-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    filters.minRating === rating
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-3 h-3" />
                  <span>{rating === 0 ? 'Any' : `${rating}+`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;