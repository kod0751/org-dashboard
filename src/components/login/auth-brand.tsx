import { Sparkles } from 'lucide-react';

export default function AuthBrand() {
  return (
    <div className="flex flex-col items-center gap-3 py-8 animate-fade-in-down">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
        <Sparkles className="text-white" size={28} />
      </div>

      <div className="text-center">
        <h1 className="text-xl font-bold text-white tracking-tight">
          TeamBase
        </h1>
      </div>
    </div>
  );
}
