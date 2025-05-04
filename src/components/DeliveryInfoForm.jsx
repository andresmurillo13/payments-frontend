import React, { useState } from 'react';

const DeliveryInfoForm = ({ onSubmit }) => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ address, city, postalCode, contactNumber });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};

export default DeliveryInfoForm;