'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

interface CardSignupFormProps {
  onLogin: () => void;
}

export default function CardSignupForm({ onLogin }: CardSignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-4">
          <User size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
      </div>

      <form className="space-y-4">
        <div>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              type="text"
              placeholder="Full name"
              className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              type="email"
              placeholder="Email address"
              className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="pl-10 pr-10 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm password"
              className="pl-10 pr-10 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
            />
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-10 font-medium">
          회원가입
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{' '}
        <button
          onClick={onLogin}
          className="text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          로그인
        </button>
      </p>
    </div>
  );
}
