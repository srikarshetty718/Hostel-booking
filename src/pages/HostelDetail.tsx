import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Coffee, Snowflake, Utensils, WashingMachine, ChevronLeft, ChevronRight, Calendar, Users } from 'lucide-react';

const HostelDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [booking, setBooking] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'dorm'
  });

  const hostel = {
    id: 1,
    name: "Central Backpackers",
    location: "Amsterdam, Netherlands",
    images: [
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg",
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
    ],
    rating: 4.9,
    price: 28,
    description: "Experience the heart of Amsterdam at Central Backpackers, where modern comfort meets historic charm. Our beautifully renovated hostel offers the perfect base for exploring the city's famous canals, museums, and vibrant nightlife.",
    amenities: [
      { name: 'Free Wi-Fi', icon: Wifi },
      { name: 'Free Parking', icon: Car },
      { name: 'Breakfast Included', icon: Coffee },
      { name: 'Air Conditioning', icon: Snowflake },
      { name: 'Restaurant', icon: Utensils },
      { name: 'Laundry Service', icon: WashingMachine }
    ],
    roomTypes: [
      { type: 'dorm', name: '6-Bed Dorm', price: 28, description: 'Shared dormitory with 6 beds' },
      { type: 'private', name: 'Private Room', price: 65, description: 'Private room with ensuite bathroom' },
      { type: 'twin', name: 'Twin Room', price: 55, description: 'Twin beds with shared facilities' }
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah M.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Amazing hostel! Clean, friendly staff, and great location. Perfect for exploring Amsterdam."
      },
      {
        id: 2,
        author: "Mike T.",
        rating: 5,
        date: "1 month ago",
        comment: "Best hostel experience I've had in Europe. The breakfast was incredible and the common areas were perfect for meeting other travelers."
      },
      {
        id: 3,
        author: "Emma L.",
        rating: 4,
        date: "2 months ago",
        comment: "Great value for money. The location is unbeatable and the facilities are top-notch."
      }
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hostel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hostel.images.length) % hostel.images.length);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show booking confirmation
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    setShowBookingForm(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
          <img
            src={hostel.images[currentImageIndex]}
            alt={hostel.name}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          
          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {hostel.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.name}</h1>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{hostel.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{hostel.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">{hostel.reviews[0] ? `${hostel.reviews.length}+ reviews` : 'No reviews yet'}</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{hostel.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hostel.amenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Icon className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room Types */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Types</h2>
              <div className="space-y-4">
                {hostel.roomTypes.map((room) => (
                  <div
                    key={room.type}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                        <p className="text-gray-600 text-sm">{room.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">€{room.price}</div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
              <div className="space-y-6">
                {hostel.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.author[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.author}</h4>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600">€{hostel.price}</div>
                <div className="text-gray-500">per night</div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="date"
                        value={booking.checkIn}
                        onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
                        required
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="date"
                        value={booking.checkOut}
                        onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
                        required
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={booking.guests}
                      onChange={(e) => setBooking({ ...booking, guests: parseInt(e.target.value) })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} Guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                  <select
                    value={booking.roomType}
                    onChange={(e) => setBooking({ ...booking, roomType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    {hostel.roomTypes.map((room) => (
                      <option key={room.type} value={room.type}>
                        {room.name} - €{room.price}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Book Now
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>You won't be charged yet</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{hostel.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetail;