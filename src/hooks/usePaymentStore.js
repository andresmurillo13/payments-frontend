import axios from 'axios';
import wompiApi from '../api/wompiApi';

export const usePaymentStore = () => {
    const createCardToken = async (cardDetails) => {
        try {
            const { number, cvc, exp_month, exp_year, card_holder } = cardDetails;
            const response = await axios.post(
                'https://api-sandbox.co.uat.wompi.dev/v1/tokens/cards',
                {
                    number,
                    cvc,
                    exp_month,
                    exp_year,
                    card_holder,
                },
                {
                    headers: {
                        Authorization: 'Bearer pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7',
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Card token created:', response.data);
            return response.data.data.id;
        } catch (error) {
            console.error('Error creating card token:', error);
            throw new Error('Failed to create card token');
        }
    };

    const processPayment = async (paymentDetails) => {
        
        try {
            const { token, productId, amount, paymentMethod, customerEmail, customerName, address } = paymentDetails;
            const response = await wompiApi.post('/payments', {
                token,
                productId,
                amount,
                paymentMethod,
                customerEmail,
                customerName,
                address,

            });
            console.log('Payment processed:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error processing payment:', error);
            throw new Error('Failed to process payment');
        }
    };

    return {
        createCardToken,
        processPayment,
    };
};