import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full flex flex-col">
      <Quote className="w-8 h-8 text-gold-light mb-4" />
      <p className="text-gray-600 italic flex-grow">"{testimonial.quote}"</p>
      <div className="flex items-center mt-6">
        <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
        <div className="ms-4">
          <p className="font-bold text-gray-800">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
