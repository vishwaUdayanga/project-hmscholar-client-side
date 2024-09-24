import React, { Suspense } from 'react';
import dynamic from "next/dynamic";

const Account = dynamic(() => import('@/app/ui/lecturer/account'), {
    suspense: true
});

export default function MyAccount() {
    
    return (
        <div className="flex flex-col px-4">
            <p className="text-lg mb-3"><span className="font-bold">IHMA</span> lecturer profile</p>
            <Suspense fallback={<div>Loading...</div>}>
                <Account />
            </Suspense>
        </div>
    )
}