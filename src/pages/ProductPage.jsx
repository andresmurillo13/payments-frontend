/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import DeliveryInfoForm from '../components/DeliveryInfoForm';
import TransactionResult from '../components/TransactionResult';

import CreditCardModal from '../components/CreditCardModal';
import ProductDisplay from '../components/ProductDisplay';
import { useProductStore } from '../hooks/useProcuctStore';

export const ProductPage = () => {
    const { startLoadingProducts, products } = useProductStore();
    const [isModalOpen, setModalOpen] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    const [transactionResult, setTransactionResult] = useState(null);

    useEffect(() => {
        startLoadingProducts();
    }, []);

    const handlePayment = (paymentData) => {
    
        const result = { success: true, message: 'Payment successful!' };
        setTransactionResult(result);
        setModalOpen(false);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Product Page</h1>
            <ProductDisplay products={products} />
        
            {isModalOpen && (
                <CreditCardModal
                    onClose={() => setModalOpen(false)}
                    onPayment={handlePayment}
                />
            )}
            {deliveryInfo && <DeliveryInfoForm setDeliveryInfo={setDeliveryInfo} />}
            {transactionResult && <TransactionResult result={transactionResult} />}
           
        </div>
    );
};

export default ProductPage;