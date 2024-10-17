'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateLoginToLms } from '../api/auth/authentication';

import Lottie from 'lottie-react';
import MainLoading from '../../public/animations/main-loading.json';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const Wrapper: React.FC<P> = (props: P) => {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
        const router = useRouter();

        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            console.log('Checking token expiration...');
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const exp = decodedToken.exp * 1000;
                    if (Date.now() >= exp) {
                        localStorage.removeItem('token');
                        router.push('/');
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('token');
                    router.push('/');
                }
            }
        };

        useEffect(() => {
            const verifyToken = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/')
                } else {
                    try {
                        const decodedToken = JSON.parse(atob(token.split('.')[1]));
                        const exp = decodedToken.exp * 1000;
                        const email = decodedToken.sub;
                        const password = decodedToken.password;

                        console.log(decodedToken)

                        const response = await validateLoginToLms({ user_name: email, password: password });

                        if (response.status === 200) {
                            setIsAuthenticated(true);
                        } else {
                            localStorage.removeItem('token');
                            router.push('/');
                        }


                        if (Date.now() < exp) {
                            setIsAuthenticated(true);
                        } else {
                            console.log('Token has expired.');
                            localStorage.removeItem('token');
                            router.push('/');
                        }
                    } catch (error) {
                        console.error('Error decoding token:', error);
                        localStorage.removeItem('token');
                        router.push('/');
                    }
                }
            };

            verifyToken();
            const interval = setInterval(() => checkTokenExpiration(), 60000);
            return () => clearInterval(interval);
        }, [router]);

        if (!isAuthenticated) {
            return <div className='w-full h-screen flex items-center justify-center'>
                <Lottie animationData={MainLoading} loop={true} className='w-40 h-40'/>
            </div>;
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
