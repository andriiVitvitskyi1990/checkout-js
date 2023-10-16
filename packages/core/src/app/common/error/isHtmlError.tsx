import { CustomError } from './index';

export default function isHtmlError(error: Error): error is CustomError {
    const customError = error as CustomError;

    return (
        customError &&
        customError.data &&
        typeof customError.data.shouldBeTranslatedAsHtml === 'boolean' &&
        typeof customError.data.translationKey === 'string'
    );
}
