interface LoadingSpinnerOptions {
    baseColor?: string;
    spinnerColor?: string;
}

const SPINNER_ANIMATION = 'embedded-checkout-loading-spinner-rotation';

const LoadingSpinner = ({
    baseColor = '#f3f3f3',
    spinnerColor = '#3498db',
}: LoadingSpinnerOptions) => {
    if (document.getElementById(SPINNER_ANIMATION)) {
        return;
    }

    const spinnerStyle = `
        border: 8px solid ${baseColor};
        border-top: 8px solid ${spinnerColor};
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: ${SPINNER_ANIMATION} 1s linear infinite;
    `;

    const style = document.createElement('style');
    style.id = SPINNER_ANIMATION;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    document.head?.appendChild(style);

    if (style.sheet instanceof CSSStyleSheet) {
        style.sheet.insertRule(
            `
                @keyframes ${SPINNER_ANIMATION} {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `,
            0,
        );
    }

    const loadingSpinnerElement = document.createElement('div');
    loadingSpinnerElement.setAttribute('style', spinnerStyle);

    return loadingSpinnerElement;
};

export default LoadingSpinner;
