'use client'

import { useForm, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SignInSchema } from '@/app/lib/zod-schema'
import { useState, useEffect } from 'react'
import { redirect } from 'next/dist/server/api-utils'
import { loginToLms, loginToPortal } from '@/app/api/auth/authentication'
import { useRouter } from 'next/navigation';


type FormValues = z.infer<typeof SignInSchema>;

export default function SignInForm() {
    const router = useRouter()

    const [loginTo, setLoginTo] = useState('')
    const [isLoadingLms, setIsLoadingLms] = useState(false)
    const [isLoadingPortal, setIsLoadingPortal] = useState(false)
    const [buttonTextLms, setButtonTextLms] = useState("Login to Dashboard")
    const [buttonTextPortal, setButtonTextPortal] = useState("Go to Portal")

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SignInSchema),
        mode: 'onTouched',
        defaultValues: {
            user_name: '',
            password: '',
        }
    });

    
    const onSubmit = async (data: FormValues) => {
        console.log(loginTo)
        if (loginTo === 'lms') {
            setIsLoadingLms(true)
            setButtonTextLms('Logging in...')
            try {
                const response = await loginToLms({ user_name: data.user_name, password: data.password })
                const result = await response.json()
                if (result.type == "student") {
                    localStorage.setItem('token', result.access_token)
                    router.push('/dashboard')
                } else if (result.type == "lecturer") {
                    localStorage.setItem('token', result.access_token)
                    router.push('/lecturer/dashboard')
                } else if (result.type == "admin") {
                    localStorage.setItem('token', result.access_token)
                    router.push('/admin/dashboard')
                } else {
                    setButtonTextLms('Login to Dashboard')
                    setIsLoadingLms(false)
                    alert('Invalid credentials')
                }
                
            } catch (error) {
                setButtonTextLms('Login to Dashboard')
                setIsLoadingLms(false)
                alert('Invalid credentials')
            }
        } else {
            setIsLoadingPortal(true)
            setButtonTextPortal('Logging in...')
            try {
                const response = await loginToPortal({ user_name: data.user_name, password: data.password })
                const result = await response.json()
                if (result.type == "student") {
                    localStorage.setItem('token', result.access_token)
                    router.push('/current-student-portal/dashboard')
                } else if (result.type == "admin") {
                    localStorage.setItem('token', result.access_token)
                    router.push('/student-portal-admin/dashboard')
                } else {
                    setButtonTextPortal('Go to Portal')
                    setIsLoadingPortal(false)
                    alert('Invalid credentials')
                }
                
            } catch (error) {
                setButtonTextPortal('Go to Portal')
                setIsLoadingPortal(false)
                alert('Invalid credentials')
            }
        }
        
    }
    return (
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="user_name" className="block text-zinc-500 mb-1 text-sm sm:text-base">
                    User name
                </label>
                <Controller
                    name="user_name"
                    control={control}
                    render={({ field }) => (
                        <>
                            <div className="flex items-center p-2 border border-slate-600 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                                <input
                                    type="text"
                                    id="user_name"
                                    placeholder="Enter your user name"
                                    className="ml-2 text-black flex-1 outline-none text-sm sm:text-base"
                                    {...field}
                                />
                            </div>
                            {errors.user_name &&
                            <div className="flex gap-2 items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                </svg>
                                <p className="text-red-600 text-sm">{errors.user_name.message}</p>
                            </div>
                            }
                        </>
                    )}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-zinc-500 mb-1 text-sm sm:text-base">
                    Password
                </label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <>
                            <div className="flex items-center p-2 border border-slate-600 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                            </svg>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="ml-2 text-black flex-1 outline-none text-sm sm:text-base"
                                    {...field}
                                />
                                
                            </div>
                            {errors.password &&
                            <div className="flex gap-2 items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                </svg>
                                <p className="text-red-600 text-sm">{errors.password.message}</p>
                            </div>
                            }
                        </>
                    )}
                />
            </div>
            <button
                type="submit"
                onClick={() => setLoginTo('lms')}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 flex items-center justify-center text-sm sm:text-base mt-5"
                disabled={isLoadingLms}
            >
                {buttonTextLms}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <p className='w-full text-center mt-4 text-sm text-zinc-500'>OR SIGN IN TO THE PORTAL</p>
            <button
                type="submit"
                onClick={() => setLoginTo('portal')}
                className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-opacity-50 flex items-center justify-center text-sm sm:text-base mt-4"
            >
                {buttonTextPortal}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </form>
    )
}