import { z } from 'zod';

const createUserValidateSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z
            .string({
                invalid_type_error: 'Email must be a string',
            })
            .email('Invalid email format. Please enter a valid email address'),
        password: z
            .string({
                invalid_type_error: 'Password must be a string',
            })
            .min(6),
    }),
});

const loginUserValidateSchema = z.object({
    body: z.object({
        email: z
            .string({
                invalid_type_error: 'Email must be a string',
            })
            .email('Invalid email format. Please enter a valid email address'),
        password: z
            .string({
                invalid_type_error: 'Password must be a string',
            })
            .min(6),
    }),
});

export const UserValidations = {
    createUserValidateSchema,
    loginUserValidateSchema,
};
