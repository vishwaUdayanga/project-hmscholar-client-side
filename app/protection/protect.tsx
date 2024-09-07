'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const Wrapper: React.FC<P> = (props: P) => {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
        const router = useRouter();

        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const exp = decodedToken.exp * 1000;
                    if (Date.now() >= exp) {
                        localStorage.removeItem('token');
                        router.push('/lecturer/login');
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('token');
                    router.push('/lecturer/login');
                }
            }
        };

        useEffect(() => {
            const verifyToken = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/lecturer/login');
                } else {
                    try {
                        const decodedToken = JSON.parse(atob(token.split('.')[1]));
                        console.log('Decoded Token:', decodedToken);
                        const exp = decodedToken.exp * 1000;
                        console.log('Token Expiry Time:', new Date(exp));
                        console.log('Current Time:', new Date());

                        if (Date.now() < exp) {
                            setIsAuthenticated(true);
                        } else {
                            console.log('Token has expired.');
                            localStorage.removeItem('token');
                            router.push('/lecturer/login');
                        }
                    } catch (error) {
                        console.error('Error decoding token:', error);
                        localStorage.removeItem('token');
                        router.push('/lecturer/login');
                    }
                }
            };

            verifyToken();
            const interval = setInterval(checkTokenExpiration, 60000);
            return () => clearInterval(interval);
        }, [router]);

        if (!isAuthenticated) {
            return <div>Redirecting...</div>;
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
