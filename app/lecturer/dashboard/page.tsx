'use client'

import React from 'react';
import withAuth from '@/app/protection/protect';

const DashboardLayout: React.FC = () => {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default withAuth(DashboardLayout);