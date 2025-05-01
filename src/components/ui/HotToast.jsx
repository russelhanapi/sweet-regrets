import { Toaster } from 'react-hot-toast';

function HotToast() {
  return (
    <Toaster
      position='top-center'
      gutter={12}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '12px 22px',
          borderRadius: 'var(--radius-box)',
        },
      }}
    />
  );
}

export default HotToast;
