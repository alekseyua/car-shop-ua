'use client';

import { useProfileStore } from '@/src/features/profile/model/profile.store'
import EditProfileSection from '@/src/features/profile/ui/EditProfileSection';
import ExitSection from '@/src/features/profile/ui/ExitSection';
import HistorySection from '@/src/features/profile/ui/HistorySection';
import OrderSection from '@/src/features/profile/ui/OrderSection';
import React from 'react'

const ProfileSection = () => {
    const { currentSection } = useProfileStore();

    const sections: Record<number, React.ReactNode> = {
      0: <OrderSection />,
      1: <HistorySection />,
      2: <EditProfileSection />,
      10: <ExitSection />,
    };
    return (
        <div>
            {sections[currentSection]}
        </div>
    )
}

export default ProfileSection