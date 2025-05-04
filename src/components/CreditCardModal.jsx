import React, { useState } from 'react';
import Modal from 'react-modal';
import { usePaymentStore } from '../hooks/usePaymentStore'; 
Modal.setAppElement('#root');

const CreditCardModal = ({ isOpen, onRequestClose, product }) => {
    const { createCardToken, processPayment } = usePaymentStore(); 
    const [formValues, setFormValues] = useState({
        cardNumber: '4242424242424242',
        cardHolder: 'Juan Perez',
        expiryDate: '12/29',
        cvv: '123',
        email: 'test@example.com',
        address: 'Calle 123 #45-67, Bogotá', 
    });
    const [error, setError] = useState('');

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const onExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; 
        }
        setFormValues({
            ...formValues,
            expiryDate: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { cardNumber, cardHolder, expiryDate, cvv, email, address } = formValues;

 
        if (!cardNumber || !cardHolder || !expiryDate || !cvv || !email || !address) {
            setError('All fields are required');
            return;
        }

        try {
            setError('');
            const [expMonth, expYear] = expiryDate.split('/');

            const cardDetails = {
                number: cardNumber,
                cvc: cvv,
                exp_month: expMonth,
                exp_year: expYear,
                card_holder: cardHolder,
            };

           
            const token = await createCardToken(cardDetails);
            console.log('Card token created:', token);

           
            const paymentDetails = {
                token,
                productId: product.id,
                amount: Math.round(product.price),
                customerEmail: email,
                customerName: cardHolder,
                address: address,
                paymentMethod: 'CARD',
            };
            console.log('Payment details:', paymentDetails);
            const paymentResponse = await processPayment(paymentDetails);
            console.log('Payment processed:', paymentResponse);

            alert('Payment successful!');
            onRequestClose(); 
        } catch (err) {
            console.error(err);
            setError('Failed to process payment. Please try again.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <h2 className="text-lg font-bold mb-4">Enter Credit Card Information</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formValues.cardNumber}
                    onChange={onInputChange}
                    className="border p-2 rounded w-full"
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="cardHolder"
                    placeholder="Card Holder Name"
                    value={formValues.cardHolder}
                    onChange={onInputChange}
                    className="border p-2 rounded w-full"
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date (MM/YY)"
                    value={formValues.expiryDate}
                    onChange={onExpiryDateChange}
                    className="border p-2 rounded w-full"
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formValues.cvv}
                    onChange={onInputChange}
                    className="border p-2 rounded w-full"
                    autoComplete="off"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formValues.email}
                    onChange={onInputChange}
                    className="border p-2 rounded w-full"
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formValues.address}
                    onChange={onInputChange}
                    className="border p-2 rounded w-full"
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
};

export default CreditCardModal;