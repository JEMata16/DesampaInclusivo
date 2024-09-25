// components/AuthOptionsButtons.tsx

import { FC } from 'react';
import Link from 'next/link';

const AuthOptionsButtons: FC = () => {
  return (
    <div className="flex space-x-4">
      <Link 
      href="/sign-in"
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
          Sign In
      </Link>
      <Link 
      href="/sign-up"
      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300">
        Sign up
      </Link>
    </div>
  );
};

export default AuthOptionsButtons;
