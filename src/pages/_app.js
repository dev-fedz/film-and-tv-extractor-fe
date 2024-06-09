import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primeicons/primeicons.css';

import '@/styles/globals.css';

const AppContent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const App = (props) => {
  return (
    <AppContent {...props} />
  );
};

export default App;
