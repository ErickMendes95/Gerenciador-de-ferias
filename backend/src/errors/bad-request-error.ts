import { ApplicationError } from "../protocols";

export function badResquestError(message: string): ApplicationError {
    return {
        name: 'BadRequestError',
        message
    };
}