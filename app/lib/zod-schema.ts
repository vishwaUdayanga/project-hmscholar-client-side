import {z} from 'zod'

export const SignInSchema = z.object({
    registration_number: z
        .string({message: 'Email is required'})
        .email({message: 'Email is invalid'}),
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

export const AddSectionSchema = z.object({
    title: z
        .string({message: 'Title is required'})
        .min(5, {message: 'Title must be at least 5 characters long'})
        .max(20, {message: 'Title must be at most 20 characters long'}),
    description: z
        .string({message: 'A description is required'})
        .min(5, {message: 'Description must be at least 5 characters long'})
        .max(20, {message: 'Description must be at most 20 characters long'}),
})

export const AddAnnouncementSchema = z.object({
    title: z
        .string({message: 'Title is required'})
        .min(5, {message: 'Title must be at least 5 characters long'})
        .max(20, {message: 'Title must be at most 20 characters long'}),
    description: z
        .string({message: 'A description is required'})
        .min(5, {message: 'Description must be at least 5 characters long'})
        .max(20, {message: 'Description must be at most 20 characters long'}),
})