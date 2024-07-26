import React, { FunctionComponent, useEffect } from 'react';

import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';
import { withCheckout } from '../checkout';
import { PaymentMethod } from '@bigcommerce/checkout-sdk';

export interface WithCheckoutProps {
    providerWithCustomCheckout?: string;
    getPaymentMethod: (methodId: string) => PaymentMethod | undefined;
}

interface FastlaneWatermarkOptions {
    includeAdditionalInfo: boolean
}

interface FastlaneWatermarkComponent {
    FastlaneWatermarkComponent: (options?: FastlaneWatermarkOptions) => Promise<FastlanePrivacySettings>
}

declare global {
    interface Window {
        paypalFastlane: FastlaneWatermarkComponent;
        braintreeFastlane: FastlaneWatermarkComponent;
    }
}

interface FastlanePrivacySettings {
    render(container: string): void;
}

const EmailWatermark: FunctionComponent<WithCheckoutProps> = (props: WithCheckoutProps) => {
    const {
        getPaymentMethod,
        providerWithCustomCheckout,
    } = props;

    useEffect(() => {
        if (
            providerWithCustomCheckout === 'braintree' ||
            providerWithCustomCheckout === 'braintreeacceleratedcheckout' ||
            providerWithCustomCheckout === 'paypalcommerce' ||
            providerWithCustomCheckout === 'paypalcommerceacceleratedcheckout'
        ) {
            const paymentMethod = getPaymentMethod(providerWithCustomCheckout);

            if(paymentMethod?.initializationData?.isFastlanePrivacySettingEnabled) {
                const fastlane = window.braintreeFastlane || window.paypalFastlane;
                fastlane.FastlaneWatermarkComponent({
                    includeAdditionalInfo: true,
                })
                    .then((result: FastlanePrivacySettings) => {
                        result.render('#emailWatermark');
                    });
            }
        }
    }, []);

    return <div className='emailWatermark-container'>
                <div id='emailWatermark' data-test-id='emailWatermark' />
           </div>
}

const mapToCheckoutProps = ({ checkoutState }: CheckoutContextProps): WithCheckoutProps => {
    return {
        getPaymentMethod: checkoutState.data.getPaymentMethod,
        providerWithCustomCheckout: checkoutState.data.getConfig()?.checkoutSettings?.providerWithCustomCheckout || '',
    };
}

export default withCheckout(mapToCheckoutProps)(EmailWatermark);