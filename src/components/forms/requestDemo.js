import React, { useState } from "react";

function RequestDemoForm() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send to server here
    alert(
      "Your request has been sent! \nWe'll get back to " +
        formData.email +
        " asap!"
    );
  };

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-lg mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl mb-6 font-semibold text-indigo-400 text-center">
            Request a Demo
          </h2>
          <div className="mb-4">
            <input
              className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-indigo-500"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default RequestDemoForm;
