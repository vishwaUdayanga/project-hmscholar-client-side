import {z} from 'zod'

export const SignInSchema = z.object({
    registration_number: z
        .string({message: 'Registration number is required'})
        .min(10, {message: '10 character must be provided'})
        .max(10, {message: 'It must be at most 10 characters long'}),
    password: z
        .string({message: 'Password is required'})
        .min(10, {message: 'Password must be at least 8 characters long'})
        .max(20, {message: 'Password must be at most 20 characters long'}),
})

export const SignInSchemaLecturer = z.object({
    registration_number: z
        .string({message: 'Email is required'})
        .email({message: 'Email is invalid'}),
    password: z
        .string({message: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'})
        .max(20, {message: 'Password must be at most 20 characters long'}),
})