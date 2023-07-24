import {
    Cart,
    Checkout,
    Consignment,
    Coupon,
    Customer,
    Discount,
    GiftCertificate,
    Tax,
} from '@bigcommerce/checkout-sdk';

export function getPaypalCommerceRatePayMethodMock() {
    return {
        clientToken: 'token',
        config: {
            cardCode: true,
            displayName: 'RatePay',
            enablePaypal: undefined,
            hasDefaultStoredInstrument: false,
            helpText: '',
            is3dsEnabled: undefined,
            isHostedFormEnabled: false,
            isVaultingCvvEnabled: undefined,
            isVaultingEnabled: false,
            isVisaCheckoutEnabled: undefined,
            logo: undefined,
            merchantId: '',
            requireCustomerCode: false,
            testMode: true,
        },
        gateway: 'paypalcommercealternativemethods',
        id: 'ratepay',
        initializationData: {
            attributionId: 'BC_id',
            availableAlternativePaymentMethods: [],
            clientId: 'asd123',
            enabledLocalPaymentMethods: [],
            intent: 'capture',
            isComplete: false,
            isDeveloperModeApplicable: false,
            isHostedCheckoutEnabled: true,
            isInlineCheckoutEnabled: false,
            isPayPalCreditAvailable: true,
            isVenmoEnabled: true,
            merchantId: 'XdasdQWe1123',
            orderId: undefined,
            shouldRenderFields: true,
            showOnlyOnMobileDevices: false,
        },
        initializationStrategy: {
            type: 'not_applicable',
        },
        logoUrl: 'http://logo_url_path',
        method: 'braintree',
        nonce: undefined,
        returnUrl: undefined,
        supportedCards: [
            'PAYPAL',
            'PAYPALCREDIT',
            'VISA',
            'MC',
            'AMEX',
            'DISCOVER',
            'VENMO',
            'APPLEPAY',
        ],
        type: 'PAYMENT_TYPE_API',
    };
}

export function getCheckoutMock(): Checkout {
    return {
        id: '1',
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        cart: {
            currency: {
                code: 'USD',
                decimalPlaces: 2,
            },
        } as Cart,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        customer: {} as Customer,
        customerMessage: '',
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        consignments: [{}] as Consignment[],
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        taxes: [{}] as Tax[],
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        discounts: [{}] as Discount[],
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        coupons: [{}] as Coupon[],
        isStoreCreditApplied: false,
        shippingCostTotal: 0,
        shippingCostBeforeDiscount: 0,
        shouldExecuteSpamCheck: false,
        handlingCostTotal: 0,
        outstandingBalance: 1,
        taxTotal: 0,
        subtotal: 0,
        grandTotal: 1,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        giftCertificates: [{}] as GiftCertificate[],
        balanceDue: 0,
        createdTime: '',
        updatedTime: '',
        giftWrappingCostTotal: 0,
        channelId: 1,
    };
}
