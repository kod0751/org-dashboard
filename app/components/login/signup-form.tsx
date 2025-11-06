'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
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
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-sm text-gray-500">Join and start today</p>
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

        <label className="flex items-center gap-2 cursor-pointer pt-2">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
          <span className="text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-indigo-600 hover:underline">
              Terms of Service
            </a>
          </span>
        </label>

        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-10 font-medium">
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={onLogin}
          className="text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
