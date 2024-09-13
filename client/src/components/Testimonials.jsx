import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    text: "MotoDrive's cars are incredibly reliable and energy-efficient. The future of driving is here!",
    avatar: "https://i1.sndcdn.com/avatars-1PwFf2tsTgPuOGvK-ZzyuVw-t240x240.jpg"
  },
  {
    id: 2,
    name: "Samantha Lee",
    text: "MotoDrive made owning an advanced car possible. The driving experience is smooth and dependable.",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbHzefOHDHimp9MLo4Ev-0tsoPNMm3I_bZg&s"
  },
  {
    id: 3,
    name: "Marcus Chen",
    text: "The AI-assisted features in my MotoDrive vehicle are outstanding. It's like having a co-pilot!",
    avatar: "https://static5.depositphotos.com/1010683/424/i/950/depositphotos_4241802-stock-photo-asian-man-with-glass.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="testimonial-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="avatar-container">
              <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <h3 className="testimonial-name">{testimonial.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;