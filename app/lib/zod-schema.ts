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

export const AddLecturersSchema = z.object({
    lecturer_name: z
        .string({message: 'Name is required'})
        .min(5, {message: 'Name must be at least 5 characters long'})
        .max(20, {message: 'Name must be at most 20 characters long'}),
    lecturer_nic: z
        .string({message: 'NIC is required'})
        .min(10, {message: 'NIC must be at least 10 characters long'})
        .max(12, {message: 'NIC must be at most 12 characters long'}),
    lecturer_phone: z
        .string({message: 'Phone number is required'})
        .min(10, {message: 'Phone number must be at least 10 characters long'})
        .max(10, {message: 'Phone number must be at most 10 characters long'}),
    lecturer_email: z
        .string({message: 'Email is required'})
        .email({message: 'Email is invalid'}),
    lecturer_password: z
        .string({message: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'})
        .max(20, {message: 'Password must be at most 20 characters long'}),
})

export const AddCourseSchema = z.object({
    course_name: z
        .string({message: 'Course name is required'})
        .min(5, {message: 'Course name must be at least 5 characters long'})
        .max(20, {message: 'Course name must be at most 20 characters long'}),
    enrollment_key: z
        .string({message: 'Enrollment is required'})
        .min(5, {message: 'Enrollment must be at least 5 characters long'})
        .max(20, {message: 'Enrollment must be at most 20 characters long'}),
    course_description: z
        .string({message: 'Description is required'})
        .min(5, {message: 'Description must be at least 5 characters long'})
        .max(20, {message: 'Description must be at most 20 characters long'}),
})

export const AddStudentsSchema = z.object({
    email: z
        .string({message: 'Email is required'})
        .email({message: 'Email is invalid'}),
    password: z
        .string({message: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'})
        .max(20, {message: 'Password must be at most 20 characters long'}),
})