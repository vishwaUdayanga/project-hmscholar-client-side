import {z} from 'zod'

export const SignInSchema = z.object({
    user_name : z
        .string({message: 'User name is required'})
        .min(5, {message: 'User name must be at least 5 characters long'})
        .max(20, {message: 'User name must be at most 20 characters long'}),
    password: z
        .string({message: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'})
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
        .string({ message: 'Title is required' })
        .min(5, { message: 'Title must be at least 5 characters long' })
        .max(20, { message: 'Title must be at most 20 characters long' }),
    description: z
        .string({ message: 'A description is required' })
        .min(5, { message: 'Description must be at least 5 characters long' })
        .max(20, { message: 'Description must be at most 20 characters long' }),
    files: z.array(z.object({
        name: z.string({ message: 'File name is required' }).min(1),
        file: z
            .any()
            .refine((fileList: FileList) => fileList.length > 0, { message: 'You must select a file' })
            .refine((fileList: FileList) => {
                const file = fileList[0];
                return file ? file.size < 5000000 : false;
            }, { message: 'File size should be less than 5MB' })
            .refine((fileList: FileList) => {
                const file = fileList[0];
                return file ? ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type) : false;
            }, { message: 'Only word documents and PDFs are allowed' }),
    })).max(5, { message: 'You can only upload up to 5 files' }),
});

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

export const AddQuizSchema = z.object({
    quiz_name: z
        .string({message: 'Quiz name is required'})
        .min(5, {message: 'Quiz name must be at least 5 characters long'})
        .max(20, {message: 'Quiz name must be at most 20 characters long'}),
    quiz_duration: z
        .string({message: 'Duration is required'})
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val >= 1 && val <= 120, {
            message: 'Duration must be between 1 and 120 minutes',
        }),
    quiz_total_marks: z
        .string({message: 'Total mark is required'})
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val >= 1 && val <= 100, {
            message: 'Total mark must be between 1 and 100',
        }),
    quiz_description: z
        .string({message: 'Description is required'})
        .min(5, {message: 'Description must be at least 5 characters long'})
        .max(20, {message: 'Description must be at most 20 characters long'}),
    quiz_password: z
        .string({message: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'})
        .max(20, {message: 'Password must be at most 20 characters long'}),
    quiz_number_of_questions: z
        .string({ message: 'Number of questions is required' })
        .transform((val) => parseInt(val, 10)) 
        .refine((val) => !isNaN(val) && val >= 1 && val <= 50, {
            message: 'Number of questions must be between 1 and 50',
        }), 
})

export const EditProfilePictureSchema = z.object({
    image: z
        .any()
        .refine((fileList: FileList) => fileList.length > 0, { message: 'You must select a file' })
        .refine((fileList: FileList) => {
            const file = fileList[0];
            return file ? file.size < 5000000 : false;
        }, { message: 'File size should be less than 5MB' })
        .refine((fileList: FileList) => {
            const file = fileList[0];
            return file ? ['image/jpeg', 'image/png'].includes(file.type) : false;
        }, { message: 'Only JPEG and PNG images are allowed' }),
})