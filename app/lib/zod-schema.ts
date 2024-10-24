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

export const EditSectionSchema = z.object({
    title: z
        .string({ message: 'Title is required' })
        .min(5, { message: 'Title must be at least 5 characters long' })
        .max(20, { message: 'Title must be at most 20 characters long' }),
    description: z
        .string({ message: 'A description is required' })
        .min(5, { message: 'Description must be at least 5 characters long' })
        .max(20, { message: 'Description must be at most 20 characters long' })
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

export const AddAdminAnnouncementSchema = z.object({
    title: z
        .string({message: 'Title is required'})
        .min(5, {message: 'Title must be at least 5 characters long'})
        .max(20, {message: 'Title must be at most 20 characters long'}),
    description: z
        .string({message: 'A description is required'})
        .min(5, {message: 'Description must be at least 5 characters long'})
        .max(50, {message: 'Description must be at most 20 characters long'}),
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
        .number({message: 'Duration is required'})
        .min(1, {message: 'Duration must be at least 1 minute'})
        .max(120, {message: 'Duration must be at most 120 minutes'}),
    quiz_total_marks: z
        .number({message: 'Total mark is required'})
        .min(1, {message: 'Total mark must be at least 1'})
        .max(100, {message: 'Total mark must be at most 100'}),
    quiz_description: z
        .string({message: 'Description is required'})
        .min(5, {message: 'Description must be at least 5 characters long'})
        .max(20, {message: 'Description must be at most 20 characters long'}),
    quiz_password: z
        .string({message: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'})
        .max(20, {message: 'Password must be at most 20 characters long'}),
    quiz_number_of_questions: z
        .number({ message: 'Number of questions is required' })
        .min(1, {message: 'Number of questions must be at least 1'})
        .max(50, {message: 'Number of questions must be at most 50'}),
});

export const AddQuizEditSchema = z.object({
    quiz_name: z
        .string({message: 'Quiz name is required'})
        .min(5, {message: 'Quiz name must be at least 5 characters long'})
        .max(20, {message: 'Quiz name must be at most 20 characters long'}),
    quiz_duration: z
        .number({message: 'Duration is required'})
        .min(1, {message: 'Duration must be at least 1 minute'})
        .max(120, {message: 'Duration must be at most 120 minutes'}),
    quiz_total_marks: z
        .number({message: 'Total mark is required'})
        .min(1, {message: 'Total mark must be at least 1'})
        .max(100, {message: 'Total mark must be at most 100'}),
    quiz_description: z
        .string({message: 'Description is required'})
        .min(5, {message: 'Description must be at least 5 characters long'})
        .max(20, {message: 'Description must be at most 20 characters long'}),
    quiz_password: z
        .string({message: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'})
        .max(20, {message: 'Password must be at most 20 characters long'}),
});


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

export const EditProfileSchema = z.object({
    lecturer_name: z
        .string({ message: 'User name is required' })
        .min(5, { message: 'User name must be at least 5 characters long' })
        .max(20, { message: 'User name must be at most 20 characters long' }),
    lecturer_nic: z
        .string({ message: 'NIC is required' })
        .min(10, { message: 'NIC must be at least 10 characters long' })
        .max(12, { message: 'NIC must be at most 12 characters long' }),
    lecturer_phone: z
        .string({ message: 'Phone number is required' })
        .min(10, { message: 'Phone number must be at least 10 characters long' })
        .max(10, { message: 'Phone number must be at most 10 characters long' }),
    lecturer_email: z
        .string({ message: 'Email is required' })
        .email({ message: 'Email is invalid' }),
})

export const EditMaterialSchema = z.object({
    material_name: z
        .string({ message: 'Material name is required' })
        .min(5, { message: 'Material name must be at least 5 characters long' })
        .max(20, { message: 'Material name must be at most 20 characters long' }),
    file: z
        .any()
        .optional()  // Make the file optional
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true; // Skip validation if no file is selected
            const file = fileList[0];
            return file.size < 5000000; // Validate file size if file is present
        }, {
            message: 'File size should be less than 5MB',
        })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true; // Skip validation if no file is selected
            const file = fileList[0];
            return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
        }, {
            message: 'Only word documents and PDFs are allowed',
        }),
})

export const EditCourseSchema = z.object({
    course_name: z
        .string({ message: 'Course name is required' })
        .min(5, { message: 'Course name must be at least 5 characters long' })
        .max(20, { message: 'Course name must be at most 20 characters long' }),
    enrollment_key: z
        .string({ message: 'Enrollment is required' })
        .min(5, { message: 'Enrollment must be at least 5 characters long' })
        .max(20, { message: 'Enrollment must be at most 20 characters long' }),
    course_description: z
        .string({ message: 'Description is required' })
        .min(5, { message: 'Description must be at least 5 characters long' })
        .max(20, { message: 'Description must be at most 20 characters long' }),
    course_image: z
        .any()
        .optional() 
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return file.size < 5000000;
        }, {
            message: 'File size should be less than 5MB',
        })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return ['image/jpeg', 'image/png'].includes(file.type);
        }, {
            message: 'Only JPEG and PNG images are allowed',
        }),
})

//Portal schemas

// name=Column(String,index=True)
//     address=Column(String,index=True)
//     gender=Column(String,index=True)
//     email=Column(String,index=True)
//     OL_path=Column(String,index=True)
//     AL_path=Column(String)
//     payment_path=Column(String,index=True)
//     program_id=Column(UUID, ForeignKey("program.program_id"),index=True)
//     date = Column(Date, default=datetime.date.today, index=True)

export const NewStudentSchema = z.object({
    name: z
        .string({ message: 'Name is required' })
        .min(5, { message: 'Name must be at least 5 characters long' })
        .max(50, { message: 'Name must be at most 50 characters long' }),
    address: z
        .string({ message: 'Address is required' })
        .min(5, { message: 'Address must be at least 5 characters long' })
        .max(50, { message: 'Address must be at most 50 characters long' }),
    email: z
        .string({ message: 'Email is required' })
        .email({ message: 'Email is invalid' }),
    OL_doc: z
        .any()
        .refine((fileList: FileList | undefined) => {
            return fileList && fileList.length > 0;
        }, { message: 'You must select a file' })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return file.size < 5000000;
        }, {
            message: 'File size should be less than 5MB',
        })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
        }, {
            message: 'Only word documents and PDFs are allowed',
        }),
    AL_doc: z
        .any()
        .refine((fileList: FileList | undefined) => {
            return fileList && fileList.length > 0;
        }, { message: 'You must select a file' })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return file.size < 5000000;
        }, {
            message: 'File size should be less than 5MB',
        })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
        }, {
            message: 'Only word documents and PDFs are allowed',
        }),
    payment_doc: z
        .any()
        .refine((fileList: FileList | undefined) => {
            return fileList && fileList.length > 0;
        }, { message: 'You must select a file' })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return file.size < 5000000;
        }, {
            message: 'File size should be less than 5MB',
        })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
        }, {
            message: 'Only word documents and PDFs are allowed',
        }),
})

export const PaymentUploadSchema = z.object({
    receipt_doc: z
        .any()
        .refine((fileList: FileList | undefined) => {
            return fileList && fileList.length > 0;
        }, { message: 'You must select a file' })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return file.size < 5000000;
        }, {
            message: 'File size should be less than 5MB',
        })
        .refine((fileList: FileList | undefined) => {
            if (!fileList || fileList.length === 0) return true;
            const file = fileList[0];
            return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
        }, {
            message: 'Only word documents and PDFs are allowed',
        }),
})