import StartPage from '@/pages/StartPage/StartPage';
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage';
import DocumentPage from '@/pages/DocumentPage/DocumentPage';
import NewContractPage from '@/pages/NewContractPage/NewContractPage';

export const routes = [
  { path: '/', Component: StartPage },
  { path: '/registration', Component: RegistrationPage },
  { path: '/documents', Component: DocumentPage },
  { path: '/new-contract', Component: NewContractPage }
];
