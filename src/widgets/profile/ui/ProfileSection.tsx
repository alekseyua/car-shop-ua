'use client';

import { useProfileStore } from '@/src/features/profile/model/profile.store'
import OrderSection from '@/src/features/profile/ui/OrderSection';
import React from 'react'

const ProfileSection = () => {
    const { currentSection } = useProfileStore();

    const sections: Record<number,React.ReactNode> = {
        0: <OrderSection />
    }
    return (
        <div>
            {sections[currentSection]}
        </div>
    )
}

export default ProfileSection