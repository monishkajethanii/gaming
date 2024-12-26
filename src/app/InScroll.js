"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";

export default function Carousel() {
  useEffect(() => {
    import("bootstrap").then((bootstrap) => {
      const carouselElement = document.getElementById(
        "carouselExampleIndicators"
      );
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 8000,
        ride: "carousel",
      });
      return () => {
        if (carousel) {
          carousel.dispose();
        }
      };
    });
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mt-10"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators text-black">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active text-black"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          className="text-black"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          className="text-black"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="3"
          className="text-black"
          aria-label="Slide 4"
        ></button>
        <button
          className="text-black"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="gow.jpeg"
            className="d-block w-100 img-fluid"
            style={{ maxHeight: "750px" }}
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="Black.jpeg"
            className="d-block w-100 img-fluid"
            style={{ maxHeight: "750px" }}
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="fortnite.jpeg"
            className="d-block w-100 img-fluid"
            style={{ maxHeight: "750px" }}
            alt="Third slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="fc25m.avif"
            className="d-block w-100 img-fluid"
            style={{ maxHeight: "750px" }}
            alt="Fourth slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="fifa22m.jpg"
            className="d-block w-100 img-fluid"
            style={{ maxHeight: "750px" }}
            alt="Sixth slide"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev relative"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <FontAwesomeIcon
          icon={faBackward}
          aria-hidden="true"
          className="lg:text-4xl text-2xl text-red-700"
        />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <FontAwesomeIcon
          icon={faForward}
          aria-hidden="true"
          className="lg:text-4xl text-2xl text-red-700"
        />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}