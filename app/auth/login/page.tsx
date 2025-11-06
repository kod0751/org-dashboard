'use client';

import LoginForm from '@/app/components/login/login-form';
import CardSignupForm from '@/app/components/login/signup-form';
import { useState } from 'react';

export default function CardPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm font-['NanumSquareNeo']">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-auto">
          {!isSignup && (
            <div className="animate-slide-in-left">
              <LoginForm onSignup={() => setIsSignup(true)} />
            </div>
          )}
          {isSignup && (
            <div className="animate-slide-in-right">
              <CardSignupForm onLogin={() => setIsSignup(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
