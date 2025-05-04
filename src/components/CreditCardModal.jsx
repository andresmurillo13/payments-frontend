import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { usePaymentStore } from '../hooks/usePaymentStore';
import visaLogo from '../assets/visa.png'; 
import mastercardLogo from '../assets/mastercard.png';

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
    const [cardType, setCardType] = useState(''); 
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const detectCardType = (number) => {
        if (number.startsWith('4')) {
            return 'VISA';
        } else if (
            (number.startsWith('51') || number.startsWith('52') || number.startsWith('53') || number.startsWith('54') || number.startsWith('55')) ||
            (parseInt(number.slice(0, 4)) >= 2221 && parseInt(number.slice(0, 4)) <= 2720)
        ) {
            return 'MasterCard';
        }
        return '';
    };

    

    const onInputChange = (e) => {
        const { name, value } = e.target;

      
        if (name === 'cardNumber') {
            const cardTypeDetected = detectCardType(value);
            setCardType(cardTypeDetected);
        }

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(() => {
        const initialCardType = detectCardType(formValues.cardNumber);
        setCardType(initialCardType);
    }, [formValues.cardNumber]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { cardNumber, cardHolder, expiryDate, cvv, email, address } = formValues;

        if (!cardNumber || !cardHolder || !expiryDate || !cvv || !email || !address) {
            setError('All fields are required');
            return;
        }

        try {
            setError('');
            setIsLoading(true);
            const [expMonth, expYear] = expiryDate.split('/');

            const cardDetails = {
                number: cardNumber,
                cvc: cvv,
                exp_month: expMonth,
                exp_year: expYear,
                card_holder: cardHolder,
            };

            const token = await createCardToken(cardDetails);

            const paymentDetails = {
                token,
                productId: product.id,
                amount: Math.round(product.price),
                customerEmail: email,
                customerName: cardHolder,
                address: address,
                paymentMethod: 'CARD',
            };

            await processPayment(paymentDetails);

            Swal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'Your payment has been processed successfully!',
                confirmButtonText: 'OK',
            });

            onRequestClose();
        } catch (err) {
            console.error(err);
            setError('Failed to process payment. Please try again.');
        } finally {
            setIsLoading(false);
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
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                    <p className="ml-2">Processing payment...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={formValues.cardNumber}
                            onChange={onInputChange}
                            className="border p-2 rounded w-full"
                            autoComplete="off"
                        />
                        {cardType && (
                            <img
                                src={cardType === 'VISA' ? visaLogo : mastercardLogo}
                                alt={cardType}
                                className="absolute right-2 top-2 w-8 h-8"
                            />
                        )}
                    </div>
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
                        onChange={onInputChange}
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
            )}
        </Modal>
    );
};

export default CreditCardModal;