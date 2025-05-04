import React from 'react';

const TransactionResult = ({ success, message }) => {
    return (
        <div className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg ${success ? 'bg-green-100' : 'bg-red-100'}`}>
            <h2 className={`text-lg font-bold ${success ? 'text-green-800' : 'text-red-800'}`}>
                {success ? 'Transaction Successful' : 'Transaction Failed'}
            </h2>
            <p className="mt-2 text-center text-gray-700">
                {message}
            </p>
            <div className="mt-4">
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default TransactionResult;