import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('请输入邮箱地址');
      return;
    }

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">邮件已发送</h1>
          <p className="text-sm sm:text-base text-purple-200/70 mb-6 sm:mb-8">
            请检查您的邮箱，我们已发送密码重置链接
          </p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/login')} className="w-full">
              返回登录
            </Button>
            <button 
              onClick={() => setIsSent(false)}
              className="w-full py-3 sm:py-4 text-purple-400 hover:text-purple-300 transition-colors text-sm"
            >
              发送到其他邮箱
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <button 
            onClick={() => navigate('/login')}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">忘记密码</h1>
        </div>

        <p className="text-sm sm:text-base text-purple-200/70 mb-4 sm:mb-6">
          输入您的邮箱地址，我们将发送密码重置链接
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {error && (
            <div className="flex items-start gap-2 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">邮箱</label>
            <div className="relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱地址"
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-colors text-sm sm:text-base"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            {isLoading ? '发送中...' : '发送重置链接'}
          </Button>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm text-purple-200/70">
            想起密码了？{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              返回登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
