import React from 'react';
import ProductDisplay from '../components/ProductDisplay';
import DeliveryInfoForm from '../components/DeliveryInfoForm';

import CreditCardModal from '../components/CreditCardModal';
import TransactionResult from '../components/TransactionResult';

const HomePage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product Payment Onboarding</h1>
            <ProductDisplay />
            <DeliveryInfoForm />

            <CreditCardModal />
            <TransactionResult />
        </div>
    );
};

export default HomePage;