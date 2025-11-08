'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface CardLoginFormProps {
  onSignup: () => void;
}

export default function LoginForm({ onSignup }: CardLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createClient();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-4">
          <Lock size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
        <p className="text-sm text-gray-500">Access your account</p>
      </div>

      <form className="space-y-4">
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
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-10 font-medium">
          로그인
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="border-gray-200 hover:bg-gray-50 bg-transparent"
        >
          Google
        </Button>
      </div>

      <p className="text-center text-sm text-gray-600">
        계정이 없으신가요?{' '}
        <button
          onClick={onSignup}
          className="text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          회원가입
        </button>
      </p>
    </div>
  );
}
