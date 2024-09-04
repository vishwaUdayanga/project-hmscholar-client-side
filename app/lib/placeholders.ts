import { date } from "zod"

export const keyCourses = [
    {
        id: 1,
        title: 'Management',
        background: 'bg-blue-200',
        text: 'text-blue-600'
    },
    {
        id: 2,
        title: 'Tourism',
        background: 'bg-fuchsia-200',
        text: 'text-fuchsia-600'
    },
    {
        id: 3,
        title: 'Hotel',
        background: 'bg-purple-200',
        text: 'text-purple-600'
    },
    {
        id: 4,
        title: 'Luxury',
        background: 'bg-sky-200',
        text: 'text-sky-600'
    },
    {
        id: 5,
        title: 'Culinary',
        background: 'bg-rose-200',
        text: 'text-rose-600'
    }
]

export const CourseList = [
    {
        id: 1,
        semester : 'Year 2 Semester 1',
        courses: [
            {
                id: 1,
                title: 'Introduction to Hospitality',
                lecturer: 'Mr. John Doe',
                credits: 3,
                image: '/dashboard/courses/1.jpg'
            },
            {
                id: 2,
                title: 'Introduction to Tourism',
                lecturer: 'Ms. Jane Doe',
                credits: 2,
                image: '/dashboard/courses/2.jpg'
            },
            {
                id: 3,
                title: 'Introduction to Culinary Arts',
                lecturer: 'Miss Mary Doe',
                credits: 1,
                image: '/dashboard/courses/3.jpg'
            },
            {
                id: 4,
                title: 'Introduction to Hotel Management',
                lecturer: 'Mr. John Doe',
                credits: 3,
                image: '/dashboard/courses/1.jpg'
            }
        ]
    },
    {
        id: 2,
        semester : 'Year 1 Semester 2',
        courses: [
            {
                id: 1,
                title: 'Introduction to Hospitality',
                lecturer: 'Mr. John Doe',
                credits: 4,
                image: '/dashboard/courses/2.jpg'
            },
            {
                id: 2,
                title: 'Introduction to Tourism',
                lecturer: 'Ms. Jane Doe',
                credits: 3,
                image: '/dashboard/courses/3.jpg'
            },
            {
                id: 3,
                title: 'Introduction to Culinary Arts',
                lecturer: 'Miss Mary Doe',
                credits: 1,
                image: '/dashboard/courses/1.jpg'
            },
            {
                id: 4,
                title: 'Introduction to Hotel Management',
                lecturer: 'Mr. John Doe',
                credits: 3,
                image: '/dashboard/courses/2.jpg'
            }
        ]
    }
]

export const announcements = [
    {
        id: 1,
        lecturer: 'Mr. John Doe',
        title: 'New Courses Available',
        description: 'We have added new courses to the curriculum. Check them out now!',
        date: new Date().toDateString(),
        image: '/dashboard/announcements/1.jpg',
        tag: 'Administraion',
        color: 'text-blue-600',
        time: '10:00 AM'
    },
    {
        id: 2,
        lecturer: 'Ms. Jane Doe',
        title: 'New Courses Available',
        description: 'We have added new courses to the curriculum. Check them out now!',
        date: new Date().toDateString(),
        image: '/dashboard/announcements/2.jpg',
        tag: 'Management',
        color: 'text-fuchsia-600',
        time: '10:00 AM'
    },
    {
        id: 3,
        lecturer: 'Mr. John Doe',
        title: 'New Courses Available',
        description: 'We have added new courses to the curriculum. Check them out now!',
        date: new Date().toDateString(),
        image: '/dashboard/announcements/3.jpg',
        tag: 'Hotels',
        color: 'text-purple-600',
        time: '10:00 AM'
    },
    {
        id: 4,
        lecturer: 'Mr. John Doe',
        title: 'New Courses Available',
        description: 'We have added new courses to the curriculum. Check them out now!',
        date: new Date().toDateString(),
        image: '/dashboard/announcements/4.jpg',
        tag: 'Administraion',
        color: 'text-sky-600',
        time: '10:00 AM'
    }
]