import { Container } from "@/src/shared/ui/layout/Container/Container";
import ProfileSidebar from "./ProfileSidebar";
import ProfileSection from "./ProfileSection";

const ProfileLayout = () => {
  return (
    <Container className="bg-white">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[300px_1fr]">
        <ProfileSidebar />
        <ProfileSection />
      </div>
    </Container>
  );
};

export default ProfileLayout;
