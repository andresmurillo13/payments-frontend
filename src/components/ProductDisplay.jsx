import React, { useState } from 'react';
import { useProductStore } from '../hooks/useProcuctStore';
import CreditCardModal from './CreditCardModal';

const ProductDisplay = () => {
    const { products } = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setModalOpen(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="border p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <p className="text-gray-700">{product.description}</p>
                            <p className="text-lg font-bold">${parseFloat(product.price).toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                            <button
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => handleOpenModal(product)}
                            >
                                Pay with Credit Card
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No products available.</p>
                )}
            </div>

            {isModalOpen && selectedProduct && (
                <CreditCardModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    product={selectedProduct}
                />
            )}
        </div>
    );
};

export default ProductDisplay;