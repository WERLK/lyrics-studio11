import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Github, Chrome, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthFormProps {
  onLogin: (data: any) => void;
  onRegister: (data: any) => void;
}

export default function AuthForm({ onLogin, onRegister }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

    if (!isLogin) {
      if (!formData.username || formData.username.length < 3) {
        newErrors.username = '用户名至少需要3个字符';
      }
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符';
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '两次密码输入不一致';
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = '请同意用户协议和隐私政策';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (isLogin) {
      onLogin({ email: formData.email, password: formData.password });
    } else {
      onRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
    }

    setIsLoading(false);
  };

  const handleGithubLogin = () => {
    // GitHub OAuth 登录
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&scope=read:user user:email';
  };

  const handleGoogleLogin = () => {
    // Google OAuth 登录
    console.log('Google登录');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? '欢迎回来' : '创建账号'}
          </h1>
          <p className="text-purple-200/70">
            {isLogin ? '登录以继续使用歌词工坊' : '加入我们，开始创作'}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          {/* Tab 切换 */}
          <div className="flex gap-2 mb-6 bg-white/10 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-purple-200'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-purple-200'
              }`}
            >
              注册
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 用户名 - 仅注册时显示 */}
            {!isLogin && (
              <div>
                <label className="block text-purple-200/80 text-sm mb-2">用户名</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="请输入用户名"
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-300/50 focus:outline-none ${
                      errors.username ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.username}
                  </p>
                )}
              </div>
            )}

            {/* 邮箱 */}
            <div>
              <label className="block text-purple-200/80 text-sm mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="请输入邮箱"
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-300/50 focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-purple-200/80 text-sm mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="请输入密码"
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-300/50 focus:outline-none ${
                    errors.password ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* 确认密码 - 仅注册时显示 */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-purple-200/80 text-sm mb-2">确认密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="请再次输入密码"
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-300/50 focus:outline-none ${
                        errors.confirmPassword ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-purple-500 bg-white/10 text-purple-500 focus:ring-purple-500"
                  />
                  <label htmlFor="agreeTerms" className="text-purple-200/70 text-sm">
                    我已阅读并同意
                    <a href="#" className="text-purple-400 hover:text-purple-300">《用户协议》</a>
                    和
                    <a href="#" className="text-purple-400 hover:text-purple-300">《隐私政策》</a>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.agreeTerms}
                  </p>
                )}
              </>
            )}

            {/* 忘记密码 */}
            {isLogin && (
              <div className="text-right">
                <a href="/forgot-password" className="text-purple-400 hover:text-purple-300 text-sm">
                  忘记密码？
                </a>
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  处理中...
                </span>
              ) : (
                isLogin ? '登录' : '注册'
              )}
            </button>
          </form>

          {/* 分隔线 */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-purple-200/50 text-sm">或</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* 第三方登录 */}
          <div className="space-y-3">
            <button
              onClick={handleGithubLogin}
              className="w-full py-3 bg-white/10 border border-white/10 rounded-xl text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              使用 GitHub 登录
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-white/10 border border-white/10 rounded-xl text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Chrome className="w-5 h-5" />
              使用 Google 登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
