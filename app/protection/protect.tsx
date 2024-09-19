'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateLecturer, validateAdmin } from '../api/auth/authentication';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const Wrapper: React.FC<P> = (props: P) => {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
        const router = useRouter();

        const checkTokenExpiration = ({type}: {type: string}) => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const exp = decodedToken.exp * 1000;
                    if (Date.now() >= exp) {
                        localStorage.removeItem('token');
                        if (type == 'lecturer') {
                            router.push('/lecturer/login');
                        }
                        if (type == 'admin') {
                            router.push('/admin/login');
                        }
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('token');
                    if (type == 'lecturer') {
                        router.push('/lecturer/login');
                    }
                    if (type == 'admin') {
                        router.push('/admin/login');
                    }
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
                        const exp = decodedToken.exp * 1000;
                        const email = decodedToken.sub;
                        const password = decodedToken.password;
                        const type = decodedToken.type;

                        if (type == 'lecturer') {
                            const lecturer_response = await validateLecturer({ email, password });
                            if (!lecturer_response.ok) {
                                console.error('Failed to validate token:', lecturer_response.statusText);
                                localStorage.removeItem('token');
                                router.push('/lecturer/login');
                                return;
                            }
                        }

                        if (type == 'admin') {
                            const admin_response = await validateAdmin({ email, password });
                            if (!admin_response.ok) {
                                console.error('Failed to validate token:', admin_response.statusText);
                                localStorage.removeItem('token');
                                router.push('/admin/login');
                                return;
                            }
                        }

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
            const interval = setInterval(() => checkTokenExpiration({ type: 'lecturer' }), 60000);
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
