import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const LogoutPage = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(['userToken']);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        removeCookie('userToken', { path: '/' });
        router.push('/my-account/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    handleLogout();
  }, [router]);

  return (
    <p style={{ margin: '0 auto', textAlign: 'center', paddingTop: '32px' }}>
      Logging out...
    </p>
  );
};

export default LogoutPage;
