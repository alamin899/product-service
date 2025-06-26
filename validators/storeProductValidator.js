import { body } from 'express-validator';

export const productValidator = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),

    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a number greater than 0'),
];
