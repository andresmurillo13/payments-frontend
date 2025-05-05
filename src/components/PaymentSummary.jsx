import React from 'react';

const PaymentSummary = ({ productPrice, baseFee, deliveryFee }) => {
    const validProductPrice = isNaN(productPrice) ? 0 : Number(productPrice);
    const validBaseFee = isNaN(baseFee) ? 0 : Number(baseFee);
    const validDeliveryFee = isNaN(deliveryFee) ? 0 : Number(deliveryFee);

    const total = validProductPrice + validBaseFee + validDeliveryFee;

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
            <div className="flex justify-between mb-2">
                <span>Product Price:</span>
                <span>${validProductPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Base Fee:</span>
                <span>${validBaseFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Delivery Fee:</span>
                <span>${validDeliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default PaymentSummary;