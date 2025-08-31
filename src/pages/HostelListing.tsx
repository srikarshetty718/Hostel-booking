import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HostelCard from '../components/HostelCard';
import Filter, { FilterState } from '../components/Filter';
import SearchBar from '../components/SearchBar';
import { Search } from 'lucide-react';

const HostelListing = () => {
  const [hostels, setHostels] = useState<any[]>([]);
  const [filteredHostels, setFilteredHostels] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    minRating: 0,
    amenities: [],
    sortBy: 'rating',
  });
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Mock hostel data
  const mockHostels = [
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
    },
    {
      id: 4,
      name: "Riverside Retreat",
      location: "Prague, Czech Republic",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      rating: 4.6,
      price: 20,
      amenities: ['Wi-Fi', 'Breakfast', 'Kitchen'],
      reviews: 634
    },
    {
      id: 5,
      name: "City Center Lodge",
      location: "Budapest, Hungary",
      image: "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg",
      rating: 4.5,
      price: 18,
      amenities: ['Wi-Fi', 'AC', 'Laundry'],
      reviews: 512
    },
    {
      id: 6,
      name: "Alpine Adventure Base",
      location: "Vienna, Austria",
      image: "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg",
      rating: 4.8,
      price: 35,
      amenities: ['Wi-Fi', 'Parking', 'Kitchen', 'AC'],
      reviews: 923
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setHostels(mockHostels);
      setFilteredHostels(mockHostels);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, hostels]);

  const applyFilters = () => {
    let filtered = [...hostels];

    // Price filter
    filtered = filtered.filter(
      (hostel) => hostel.price >= filters.priceRange[0] && hostel.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter((hostel) => hostel.rating >= filters.minRating);
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((hostel) =>
        filters.amenities.every((amenity) => hostel.amenities.includes(amenity))
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredHostels(filtered);
  };
  // ⬇️ ADD THIS FUNCTION
const handleSearch = (query: string) => {
  const results = hostels.filter((hostel) =>
    hostel.name.toLowerCase().includes(query.toLowerCase()) ||
    hostel.location.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredHostels(results);
};


  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300" />
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-12 bg-gray-300 rounded" />
          ))}
        </div>
        <div className="h-10 bg-gray-300 rounded" />
      </div>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen">
      {/* Search Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Hostel</h1>
            <p className="text-blue-100 text-lg">Discover amazing places to stay around the world</p>
          </div>
          <SearchBar onSearch={handleSearch} className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter and Results Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLoading ? 'Loading...' : `${filteredHostels.length} hostels found`}
              </h2>
              <p className="text-gray-600">
                Showing the best hostels for your search
              </p>
            </div>
            <Filter onFilterChange={setFilters} />
          </div>

          {/* Hostel Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredHostels.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hostels found</h3>
              <p className="text-gray-600">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHostels.map((hostel, index) => (
                <div
                  key={hostel.id}
                  className="transform transition-all duration-500 opacity-0 translate-y-10 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <HostelCard hostel={hostel} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HostelListing;
