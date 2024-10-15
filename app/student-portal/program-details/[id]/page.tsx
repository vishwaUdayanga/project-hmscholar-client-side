'use client'

import Lottie from 'lottie-react';
import RightAnimation from '../../../../public/portal/animations/right.json';
import ProgramDetailsComp from '@/app/ui/portal/program-detail';

export default function ProgramDetails({params} : {params: {id: string}}) {
    const id = params.id;

    return (
        <div className="p-2 md:flex w-full">
            <div className='w-full md:w-1/2 mt-5'>
                <ProgramDetailsComp program_id={id} />
            </div>
            <div className='hidden w-1/2 md:block'>
                <Lottie animationData={RightAnimation} loop={true} />
            </div>
        </div>
    )
}