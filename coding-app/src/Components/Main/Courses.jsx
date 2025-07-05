import React, { useState, useEffect } from 'react';
import CourseNavbar from './CourseNavbar';
import CourseCard from './CourseCard';
import Sidebar from './Sidebar';
import { coursesData } from './data';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaFilter, FaShoppingCart } from 'react-icons/fa';

const Course = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState({ field: [], price: [], duration: [] });

  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo(0, 0); 
    }, []);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const addToCart = (course) => {
    let alreadyAdded = false;

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === course.id) {
        alreadyAdded = true;
        break;
      }
    }

    if (!alreadyAdded) {
      const newCart = cartItems.concat(course);
      setCartItems(newCart);
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    }
  };

  const handleFilter = (category, value) => {
    let updated = [];

    for (let i = 0; i < filters[category].length; i++) {
      if (filters[category][i] !== value) {
        updated.push(filters[category][i]);
      }
    }

    if (updated.length === filters[category].length) {
      updated.push(value);
    }

    const newFilters = {
      field: filters.field,
      price: filters.price,
      duration: filters.duration
    };

    newFilters[category] = updated;
    setFilters(newFilters);
  };

  const isCourseVisible = (course) => {
    const fieldMatch = filters.field.length === 0 || filters.field.includes(course.field);

    let priceMatch = false;
    if (filters.price.length === 0) priceMatch = true;
    for (let i = 0; i < filters.price.length; i++) {
      const range = filters.price[i].split("-");
      const min = parseInt(range[0]);
      const max = parseInt(range[1]);
      if (course.price >= min && course.price <= max) {
        priceMatch = true;
        break;
      }
    }

    let durationMatch = false;
    if (filters.duration.length === 0) durationMatch = true;
    for (let i = 0; i < filters.duration.length; i++) {
      let min, max;
      if (filters.duration[i].includes("+")) {
        min = 21;
        max = 1000;
      } else {
        const range = filters.duration[i].split("-");
        min = parseInt(range[0]);
        max = parseInt(range[1]);
      }
      if (course.duration >= min && course.duration <= max) {
        durationMatch = true;
        break;
      }
    }

    return fieldMatch && priceMatch && durationMatch;
  };

  const visibleCourses = coursesData.filter(isCourseVisible);

  return (
    <div className="min-h-screen bg-[#f8f9fb] relative">
      <CourseNavbar
        toggleSidebar={() => setShowSidebar(!showSidebar)}
      />

      <div className="flex relative">
        {showSidebar && (
          <div className="fixed inset-0 bg-white w-64 h-full z-50 shadow-lg max-sm:block">
            <Sidebar filters={filters} toggleFilter={handleFilter} />
          </div>
        )}

        <div className="grid grid-cols-3 gap-10 p-6 m-auto max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-2xl:grid-cols-4">
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} onEnroll={addToCart} />
          ))}
        </div>
      </div>

      
      <div className="fixed bottom-0 left-0 right-0 bg-[#2d3150] border-t shadow-md p-2 hidden justify-around items-center max-sm:flex z-50 ">
        <button
          className="flex flex-col items-center text-sm text-white"
          onClick={() => navigate("/coding")}
        >
          <FaHome className="text-lg" />
          Home
        </button>
        <button
          className="relative flex flex-col items-center text-sm text-white"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart className="text-lg" />
          Cart
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
        <button
          className="flex flex-col items-center text-sm text-white"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FaFilter className="text-lg" />
          Filter
        </button>
      </div>
    </div>
  );
};

export default Course;
