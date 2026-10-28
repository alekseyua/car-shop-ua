import GoogleAuthSuccess from "@/src/features/auth-by-email/ui/GoogleAuthSuccess";
import { Container } from "@/src/shared/ui/layout/Container/Container";

export default function GoogleAuthSuccessPage() {
  return <Container className="flex flex-col h-full min-h-screen" noPadding>
      <GoogleAuthSuccess />;
  </Container> 
}
