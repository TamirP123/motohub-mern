import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_FEATURED_CARS } from "../utils/queries";
import "../styles/FeaturedCars.css";

const FeaturedCars = () => {
  const { loading, error, data } = useQuery(QUERY_FEATURED_CARS, {
    onError: (error) => console.error("GraphQL error:", error),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("Featured Cars Data:", data);

  const featuredCars = data.featuredCars;

  const getImagePath = (car) => {
    let modelPath = car.model.toLowerCase().replace(/\s+/g, "-");
    if (
      car.make.toLowerCase() === "mazda" &&
      car.model.toLowerCase().includes("mx-5")
    ) {
      modelPath = "mx5-miata";
    }
    return `/images/${car.make.toLowerCase()}-${modelPath}/${car.images[0]}`;
  };

  return (
    <section className="featured-cars">
      <div className="container">
        <h2 className="section-title">Featured Performance Deals</h2>
        <div className="car-grid">
          {featuredCars.map((car) => (
            <div key={car._id} className="car-card">
              <img
                src={getImagePath(car)}
                alt={`${car.name}`}
                className="car-image"
                onError={(e) => {
                  console.error(
                    `Failed to load image for ${car.name}:`,
                    e.target.src
                  );
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.png";
                }}
              />
              <div className="car-details">
                <h3>{car.name}</h3>
                <p>{car.year}</p>
                <p className="price">${car.price.toLocaleString()}</p>
                <Link to={`/car/${car._id}`} className="view-details-btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
