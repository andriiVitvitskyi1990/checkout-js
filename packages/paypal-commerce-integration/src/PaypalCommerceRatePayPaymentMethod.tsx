import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react';

import {
    PaymentMethodProps,
    PaymentMethodResolveId,
    toResolvableComponent,
} from '@bigcommerce/checkout/payment-integration-api';
import { DynamicFormField, DynamicFormFieldType, FormContext } from '@bigcommerce/checkout/ui';
import { FormField } from '@bigcommerce/checkout-sdk';
import getPaypalCommerceRatePayValidationSchema from './validation-schemas/getPaypalCommerceRatePayValidationSchema';
import { LoadingSpinnerAnimation } from '../../ui/src/loading';

interface RatePayFieldValues {
    ratepayBirthDate: {
        getDate(): number;
        getMonth(): number;
        getFullYear(): number;
    };
    ratepayPhoneCountryCode: string;
    ratepayPhoneNumber: string;
}

const formFieldData: FormField[] = [
    {
        name: 'ratepayBirthDate',
        custom: false,
        id: 'ratepayBirthDate',
        label: 'payment.ratepay.birth_date',
        required: true,
        fieldType: DynamicFormFieldType.DATE,
    },
    {
        name: 'ratepayPhoneCountryCode',
        custom: false,
        id: 'ratepayPhoneCountryCode',
        label: 'payment.ratepay.phone_country_code',
        required: true,
        fieldType: DynamicFormFieldType.TEXT,
        type: 'string',
        maxLength: 2,
    },
    {
        name: 'ratepayPhoneNumber',
        custom: false,
        id: 'ratepayPhoneNumber',
        label: 'payment.ratepay.phone_number',
        required: true,
        fieldType: DynamicFormFieldType.TEXT,
        maxLength: 11,
        min: 8,
    }
];

const PaypalCommerceRatePayPaymentMethod: FunctionComponent<any> = ({
    method,
    checkoutService,
    paymentForm,
    onUnhandledError,
    paymentForm: {
        isSubmitted,
        setFieldValue,
        setValidationSchema,
        setSubmitted,
    },
    language,
    checkoutState,
}) => {
    const fieldsValues = useRef<Partial<RatePayFieldValues>>({});
    const isPaymentDataRequired = checkoutState.data.isPaymentDataRequired();

    if (!isPaymentDataRequired) {
        return null;
    }

    const initializePayment = async () => {
        try {
            await checkoutService.initializePayment({
                gatewayId: method.gateway,
                methodId: method.id,
                paypalcommerceratepay: {
                    container: '#checkout-payment-continue',
                    legalTextContainer: 'legal-text-container',
                    loadingSpinner: ()  => LoadingSpinnerAnimation({}),
                    getFieldsValues: () => fieldsValues.current,
                    onError: (error: Error) => {
                        paymentForm.disableSubmit(method, true);
                        onUnhandledError(error);
                    },
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                onUnhandledError(error);
            }
        }
    };

    const deinitializePayment = async () => {
        try {
            await checkoutService.deinitializePayment({
                gatewayId: method.gateway,
                methodId: method.id,
            });
        } catch (error) {
            if (error instanceof Error) {
                onUnhandledError(error);
            }
        }
    };

    useEffect(() => {
        void initializePayment();

        return () => {
            void deinitializePayment();
        };
    }, []);

    const handleChange = useCallback(
        (fieldId: string) => (value: string) => {
            setFieldValue(fieldId, value);
            updateFieldValues({ [fieldId]: value });
        },
        [setFieldValue],
    );

    const updateFieldValues = (field: { [key: string]: string }) => {
        fieldsValues.current = {...fieldsValues.current, ...field};
    }

    const validationSchema = useMemo(() =>
            getPaypalCommerceRatePayValidationSchema({
                formFieldData,
                language,
            })
        , [language, formFieldData]);

    useEffect(() => {
        setSubmitted(false);
        setValidationSchema(method, validationSchema);
    }, [validationSchema, method, setValidationSchema, setSubmitted]);

    return (
        <div style={{marginBottom:'20px'}}>
            <FormContext.Provider value={{ isSubmitted, setSubmitted }}>
                { formFieldData.map((field) => {
                        return  <DynamicFormField
                            extraClass={`dynamic-form-field--${field.id}`}
                            field={field}
                            key={field.id}
                            label={language.translate(field.label)}
                            onChange={handleChange(field.id)}
                        />
                    }
                )
                }
            </FormContext.Provider>
        </div>
    )
};

export default toResolvableComponent<PaymentMethodProps, PaymentMethodResolveId>(
    PaypalCommerceRatePayPaymentMethod,
    [{ gateway: 'paypalcommercealternativemethods', id:'ratepay' }],
);
