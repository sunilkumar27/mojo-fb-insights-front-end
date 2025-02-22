import { useFacebookAuth } from '../../../hooks/useFacebookAuth';
import { useNavigate } from 'react-router-dom';

/**
 * This is the login page with a button to connect to facebook.
 */
export default function Login() {
  const { login } = useFacebookAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Facebook Page Insights
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect with Facebook to view your page insights
          </p>
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-facebook hover:bg-facebook-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-facebook"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-facebook-hover group-hover:text-facebook"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </span>
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}