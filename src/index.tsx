import ReactDOM from 'react-dom/client';

import { Root } from '@/components/Root';

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
if (import.meta.env.DEV) {
  import('./mockEnv.ts');
}

import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(<Root/>);
