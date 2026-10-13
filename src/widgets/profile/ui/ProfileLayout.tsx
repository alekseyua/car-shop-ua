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