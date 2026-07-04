import React from 'react'
import { handleLogout } from "@/src/processes/logout/model/logout";
import NavItems from '@/src/features/profile/ui/NavItems';
import { Container } from '@/src/shared/ui/layout/Container/Container';
import ProfileSidebar from './ProfileSidebar';
import ProfileSection from './ProfileSection';

const ProfileLayout = () => {
  return (
    <Container className='bg-white'>
      <div className="grid grid-cols-[300px_1fr] gap-4">
        <ProfileSidebar />
        <ProfileSection />
      </div>
    </Container>
  )
}

export default ProfileLayout