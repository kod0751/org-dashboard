'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from '@/components/login/login-form';
import CardSignupForm from '@/components/login/signup-form';
import AuthBrand from '@/components/login/auth-brand';

export default function CardPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl font-['NanumSquareNeo']">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* 좌측 Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-10"
          >
            <AuthBrand />
          </motion.div>

          {/* 우측 Form */}
          <div className="relative flex items-center justify-center p-6 min-h-[600px]">
            <AnimatePresence mode="wait">
              {!isSignup && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full max-w-sm"
                >
                  <LoginForm onSignup={() => setIsSignup(true)} />
                </motion.div>
              )}

              {isSignup && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full max-w-sm"
                >
                  <CardSignupForm onLogin={() => setIsSignup(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
