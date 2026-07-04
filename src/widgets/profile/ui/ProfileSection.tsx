import { useProfileStore } from '@/src/features/profile/model/profile.store'
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