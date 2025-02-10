import AuthForm from '@/components/auth-form';

export default function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-md'>
        <AuthForm />
      </div>
    </div>
  );
}
