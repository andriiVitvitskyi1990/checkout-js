import { createCheckoutService, LanguageService } from '@bigcommerce/checkout-sdk';
import { render } from '@testing-library/react';
import React, { FunctionComponent } from 'react';

import {PaymentFormService, PaymentMethodProps} from '@bigcommerce/checkout/payment-integration-api';

import { getPaypalCommerceRatePayMethodMock } from './mocks/paypalCommerceRatePayMocks';
import PaypalCommerceRatePayPaymentMethod from './PaypalCommerceRatePayPaymentMethod';
import { FormContext } from '@bigcommerce/checkout/ui';
import { Formik } from 'formik';

describe('PaypalCommerceRatePayPaymentMethod', () => {
    let PaypalCommerceRatePayPaymentMethodTest: FunctionComponent<PaymentMethodProps>;
    const checkoutService = createCheckoutService();
    const checkoutState = checkoutService.getState();
    const props = {
        method: getPaypalCommerceRatePayMethodMock(),
        checkoutService,
        checkoutState,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        paymentForm: {
            setSubmitted: jest.fn(),
            setValidationSchema: jest.fn(),
        } as unknown as PaymentFormService,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        language: { translate: jest.fn() } as unknown as LanguageService,
        onUnhandledError: jest.fn(),
    };

    beforeEach(() => {
        PaypalCommerceRatePayPaymentMethodTest = (props: PaymentMethodProps) => (
            <Formik initialValues={{}} onSubmit= {expect.any(Function)}>
                <FormContext.Provider value={{ isSubmitted: true, setSubmitted: jest.fn() }}>
                    <PaypalCommerceRatePayPaymentMethod {...props} />
                </FormContext.Provider>
            </Formik>
        );
    });

    it('successfully initializes payment with required props', () => {
        const initializePayment = jest
            .spyOn(checkoutService, 'initializePayment')
            .mockResolvedValue(checkoutState);

        render(<PaypalCommerceRatePayPaymentMethodTest {...props} />);

        expect(initializePayment).toHaveBeenCalledWith({
            gatewayId: props.method.gateway,
            methodId: props.method.id,
            paypalcommerceratepay: {
                container: '#checkout-payment-continue',
                legalTextContainer: 'legal-text-container',
                getFieldsValues: expect.any(Function),
                onRenderButton: expect.any(Function),
                onError: expect.any(Function),
            },
        });
    });

    it('deinitializes PaypalCommerceRatePayPaymentMethod', () => {
        const deinitializePayment = jest
            .spyOn(checkoutService, 'deinitializePayment')
            .mockResolvedValue(checkoutState);
        const component = render(<PaypalCommerceRatePayPaymentMethodTest {...props} />);

        component.unmount();

        expect(deinitializePayment).toHaveBeenCalledWith({
            gatewayId: props.method.gateway,
            methodId: props.method.id,
        });
    });

    it('catches error during PaypalCommerceRatePayPaymentMethod initialization', async () => {
        jest.spyOn(checkoutService, 'initializePayment').mockRejectedValue(new Error('test error'));
        render(<PaypalCommerceRatePayPaymentMethodTest {...props} />);

        await new Promise((resolve) => process.nextTick(resolve));

        expect(props.onUnhandledError).toHaveBeenCalled();
    });

    it('catches error during PaypalCommerceRatePayPaymentMethod deinitialization', async () => {
        jest.spyOn(checkoutService, 'deinitializePayment').mockRejectedValue(
            new Error('test error'),
        );

        const component = render(<PaypalCommerceRatePayPaymentMethodTest {...props} />);

        await new Promise((resolve) => process.nextTick(resolve));

        component.unmount();

        await new Promise((resolve) => process.nextTick(resolve));

        expect(props.onUnhandledError).toHaveBeenCalled();
    });

    it('test', async () => {
        render(<PaypalCommerceRatePayPaymentMethodTest {...props} />);
        const option = document.getElementById('radio-paypalcommercealternativemethods-ratepay');
        console.log('OPTION', option);
        option?.click();

    });
});

