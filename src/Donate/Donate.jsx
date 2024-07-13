import React, { useState } from "react";

const Donate = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    restaurantName: "",
    contactNumber: "",
    address: "",
    ingredients: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="container md:min-h-screen md:max-h-screen flex md:flex-row flex-col md:pt-24 text-justify gap-10">
      <div className="body basis-2/5 mt-10 md:mt-0 caption space-y-2">
        <span className="text-red-600">Instructions: </span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti fuga
        qui quia, placeat non, asperiores provident voluptatibus commodi ab ut a
        vitae saepe nam quibusdam deserunt recusandae dolorum, itaque est nemo
        illum fugiat. Ipsa eos magni distinctio blanditiis corporis dolorum
        architecto nihil reiciendis necessitatibus quaerat! Quam error hic aut
        ea, earum eligendi expedita assumenda architecto nostrum, explicabo
        enim. Consequatur id asperiores perferendis ipsam pariatur, adipisci
        animi.
        <br />
        <p className="text-red-600">Food should not be spoiled.</p>
        <p className="text-red-600">Specify the ingredients.</p>
        <p className="text-red-600">Specify the address.</p>
        <p className="text-red-600">
          Provide address and contact details for smooth procedure.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-orange-50 border-2 section basis-3/5 overflow-y-auto"
      >
        <div className="mb-4">
          <label htmlFor="foodName" className="block font-medium mb-1">
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block font-medium mb-1">
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block font-medium mb-1">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="restaurantName" className="block font-medium mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block font-medium mb-1">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-medium mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block font-medium mb-1">
            Ingredients
          </label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Donate;
