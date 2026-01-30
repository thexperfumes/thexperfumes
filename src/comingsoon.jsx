import React, { useEffect, useState } from "react";
import "./comingsoon.css";

const LAUNCH_DATE = new Date("2026-02-14T00:00:00");

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = LAUNCH_DATE - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="coming-soon">
      <div className={`overlay ${fadeIn ? "fade-in" : ""}`}>
        <h1 className="brand">THE-X-PERFUMES</h1>

        <p className="tagline">
          Luxury fragrances crafted to leave a lasting impression
        </p>

        <h2 className="soon">Launching In</h2>

        <div className="countdown">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className="time-box">
              <span className="number">
                {timeLeft[unit] ?? "00"}
              </span>
              <span className="label">{unit}</span>
            </div>
          ))}
        </div>

        <form className="notify-form">
          <input type="email" placeholder="Enter your email" />
          <button>Notify Me</button>
        </form>

        <p className="footer">
          © {new Date().getFullYear()} thexperfumes
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
