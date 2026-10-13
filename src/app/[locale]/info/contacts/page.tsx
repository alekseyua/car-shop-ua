import ContactsInfo from '@/src/pagesContent/contacts/Contacts';
import { Container } from '@/src/shared/ui/layout/Container/Container';

const Contacts = () => {
  
  
  return (
    <Container
      className="bg-white mx-auto flex w-full max-w-7xl flex-1 flex-col"
      noPadding
    >
      <ContactsInfo />
    </Container>
  );
}

export default Contacts;