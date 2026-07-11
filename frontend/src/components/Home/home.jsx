import "./home.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import onlineBookstore from "../../../assets/images.jpeg";

import { useEffect, useState } from "react";
import { getBooks } from "../../services/bookApi";
import BookCard from "../BookCard/BookCard";

const categories = [
  {
    icon: "📖",
    title: "Fiction",
  },
  {
    icon: "🔬",
    title: "Science",
  },
  {
    icon: "👤",
    title: "Biographies",
  },
  {
    icon: "🧒",
    title: "Children's Books",
  },
];

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const token = Cookies.get("user_token");
    const role = localStorage.getItem("role");

    if (!token) return;

    switch (role) {
        case "user":
            navigate("/user/home");
            break;

        case "seller":
            navigate("/seller/home");
            break;

        case "admin":
            navigate("/admin/home");
            break;

        default:
            break;
    }

    const fetchBooks = async () => {
        try {
            const { data } = await getBooks();
            setBooks(data.books.slice(0, 4));
        } catch (error) {
            console.log(error);
        }
    };

    fetchBooks();
}, [navigate]);
  return (
    <div className="home-container">

      <nav className="navbar">

        <div className="logo-container">
          <img
            src={onlineBookstore}
            alt="logo"
            className="logo-image"
          />

          <h2 className="logo">BookVerse</h2>
        </div>

        <div className="nav-links">

          <Link to="/login">
            <button className="user-btn">Login</button>
          </Link>

        </div>

      </nav>

      <section className="hero">

        <h1>
          Your Gateway to Infinite Stories
        </h1>

        <p>
          Discover captivating books, connect with passionate sellers,
          and fuel your love for reading — only at BookVerse.
        </p>

        <Link to="/register">
          <button className="explore-btn">
            Start Exploring
          </button>
        </Link>

      </section>

      <section className="category-section">

        <h2>Explore by Category</h2>

        <div className="category-grid">

          {categories.map((item, index) => (

            <div className="category-card" key={index}>

              <span className="category-icon">
                {item.icon}
              </span>

              <h3>{item.title}</h3>

            </div>

          ))}

        </div>

      </section>

      <section className="featured-books">

        <h2>Featured Books</h2>

        <div className="books-grid">
            {
                books.map(book => (
                    <BookCard
                        key={book._id}
                        book={book}
                    />
                ))
            }
        </div>

      </section>

      {/* Contact */}

      <section className="contact">

        <button className="contact-btn">
          Contact Us
        </button>

      </section>

      {/* Footer */}

      <footer className="footer">

        <p>
          © {new Date().getFullYear()} BookVerse. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
};

export default Home;