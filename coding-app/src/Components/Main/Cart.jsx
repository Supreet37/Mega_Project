import React from 'react';

const Cart = ({ cartItems }) => {
  const total = cartItems.length;

  return (
    <div className=" border-t border-gray-300 p-30 py-4  mt-6   w-full">
      <h3 className="text-lg font-bold mb-2">🛒 Your Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">No courses added.</p>
      ) : (
        <ul className="list-disc pl-5 text-gray-800 space-y-1">
          {cartItems.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      )}
      <div className="mt-3 text-right font-medium">
        Total Courses: {total}
      </div>
    </div>
  );
};


export default Cart;
