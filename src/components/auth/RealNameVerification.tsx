import { useState } from 'react';
import { Shield, Camera, Upload, CheckCircle, AlertCircle, FileText, User, Phone, Mail } from 'lucide-react';

interface VerificationData {
  realName: string;
  idCardNumber: string;
  phoneNumber: string;
  email: string;
  frontIdCard: string | null;
  backIdCard: string | null;
  handIdCard: string | null;
}

interface VerificationProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function RealNameVerification({ onComplete, onSkip }: VerificationProps) {
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationData, setVerificationData] = useState<VerificationData>({
    realName: '',
    idCardNumber: '',
    phoneNumber: '',
    email: '',
    frontIdCard: null,
    backIdCard: null,
    handIdCard: null
  });
  const [errors, setErrors] = useState<any>({});

  const validateStep1 = () => {
    const newErrors: any = {};

    if (!verificationData.realName) {
      newErrors.realName = '请输入真实姓名';
    } else if (verificationData.realName.length < 2) {
      newErrors.realName = '姓名格式不正确';
    }

    if (!verificationData.idCardNumber) {
      newErrors.idCardNumber = '请输入身份证号';
    } else if (!/^\d{17}[\dXx]$/.test(verificationData.idCardNumber)) {
      newErrors.idCardNumber = '身份证号格式不正确';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};

    if (!verificationData.phoneNumber) {
      newErrors.phoneNumber = '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(verificationData.phoneNumber)) {
      newErrors.phoneNumber = '手机号格式不正确';
    }

    if (!verificationData.email) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(verificationData.email)) {
      newErrors.email = '邮箱格式不正确';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: any = {};

    if (!verificationData.frontIdCard) {
      newErrors.frontIdCard = '请上传身份证正面';
    }
    if (!verificationData.backIdCard) {
      newErrors.backIdCard = '请上传身份证背面';
    }
    if (!verificationData.handIdCard) {
      newErrors.handIdCard = '请上传手持身份证照片';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsVerifying(true);
    
    // 模拟验证过程
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsVerifying(false);
    setIsVerified(true);
    
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const handleFileUpload = (field: keyof VerificationData) => {
    // 模拟文件上传
    const mockUrl = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"><rect fill="#ddd" width="200" height="150"/><text x="100" y="75" text-anchor="middle" dy=".3em" fill="#666">${field}</text></svg>`)}`;
    setVerificationData({ ...verificationData, [field]: mockUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">实名认证</h1>
          <p className="text-purple-200/70">完成实名认证，解锁更多功能</p>
        </div>

        {isVerified ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 text-center border border-green-500/30">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">认证成功！</h2>
            <p className="text-purple-200/70">您的实名认证已通过审核</p>
          </div>
        ) : (
          <>
            {/* 步骤指示器 */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= step
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
                      : 'bg-white/10 text-purple-300'
                  }`}>
                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && <div className={`w-20 h-1 rounded ${s < step ? 'bg-green-500' : 'bg-white/20'}`} />}
                </div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-4">基本信息</h2>
                  
                  <div>
                    <label className="block text-purple-200/80 text-sm mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      真实姓名
                    </label>
                    <input
                      type="text"
                      value={verificationData.realName}
                      onChange={(e) => setVerificationData({ ...verificationData, realName: e.target.value })}
                      placeholder="请输入您的真实姓名"
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-300/50 focus:outline-none ${
                        errors.realName ? 'border-red-500' : 'border-white/10 focus:border-green-500'
                      }`}
                    />
                    {errors.realName && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.realName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-purple-200/80 text-sm mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      身份证号码
                    </label>
                    <input
                      type="text"
                      value={verificationData.idCardNumber}
                      onChange={(e) => setVerificationData({ ...verificationData, idCardNumber: e.target.value })}
                      placeholder="请输入18位身份证号码"
                      maxLength={18}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-300/50 focus:outline-none ${
                        errors.idCardNumber ? 'border-red-500' : 'border-white/10 focus:border-green-500'
                      }`}
                    />
                    {errors.idCardNumber && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.idCardNumber}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-4">联系方式</h2>
                  
                  <div>
                    <label className="block text-purple-200/80 text-sm mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      手机号码
                    </label>
                    <input
                      type="tel"
                      value={verificationData.phoneNumber}
                      onChange={(e) => setVerificationData({ ...verificationData, phoneNumber: e.target.value })}
                      placeholder="请输入11位手机号码"
                      maxLength={11}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-300/50 focus:outline-none ${
                        errors.phoneNumber ? 'border-red-500' : 'border-white/10 focus:border-green-500'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-purple-200/80 text-sm mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      电子邮箱
                    </label>
                    <input
                      type="email"
                      value={verificationData.email}
                      onChange={(e) => setVerificationData({ ...verificationData, email: e.target.value })}
                      placeholder="请输入常用邮箱"
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-300/50 focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-green-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-4">证件上传</h2>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* 身份证正面 */}
                    <div>
                      <label className="block text-purple-200/80 text-sm mb-2">身份证正面</label>
                      <div
                        onClick={() => handleFileUpload('frontIdCard')}
                        className={`aspect-video bg-white/10 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/20 transition-all ${
                          errors.frontIdCard ? 'border-red-500' : verificationData.frontIdCard ? 'border-green-500' : 'border-white/20'
                        }`}
                      >
                        {verificationData.frontIdCard ? (
                          <img src={verificationData.frontIdCard} alt="正面" className="w-full h-full object-cover rounded" />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-purple-400 mb-2" />
                            <span className="text-purple-300 text-sm">点击上传</span>
                          </>
                        )}
                      </div>
                      {errors.frontIdCard && (
                        <p className="text-red-400 text-sm mt-1">{errors.frontIdCard}</p>
                      )}
                    </div>

                    {/* 身份证背面 */}
                    <div>
                      <label className="block text-purple-200/80 text-sm mb-2">身份证背面</label>
                      <div
                        onClick={() => handleFileUpload('backIdCard')}
                        className={`aspect-video bg-white/10 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/20 transition-all ${
                          errors.backIdCard ? 'border-red-500' : verificationData.backIdCard ? 'border-green-500' : 'border-white/20'
                        }`}
                      >
                        {verificationData.backIdCard ? (
                          <img src={verificationData.backIdCard} alt="背面" className="w-full h-full object-cover rounded" />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-purple-400 mb-2" />
                            <span className="text-purple-300 text-sm">点击上传</span>
                          </>
                        )}
                      </div>
                      {errors.backIdCard && (
                        <p className="text-red-400 text-sm mt-1">{errors.backIdCard}</p>
                      )}
                    </div>

                    {/* 手持身份证 */}
                    <div>
                      <label className="block text-purple-200/80 text-sm mb-2">手持身份证</label>
                      <div
                        onClick={() => handleFileUpload('handIdCard')}
                        className={`aspect-video bg-white/10 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/20 transition-all ${
                          errors.handIdCard ? 'border-red-500' : verificationData.handIdCard ? 'border-green-500' : 'border-white/20'
                        }`}
                      >
                        {verificationData.handIdCard ? (
                          <img src={verificationData.handIdCard} alt="手持" className="w-full h-full object-cover rounded" />
                        ) : (
                          <>
                            <Camera className="w-8 h-8 text-purple-400 mb-2" />
                            <span className="text-purple-300 text-sm">点击上传</span>
                          </>
                        )}
                      </div>
                      {errors.handIdCard && (
                        <p className="text-red-400 text-sm mt-1">{errors.handIdCard}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <p className="text-yellow-200/90 text-sm">
                      <strong>温馨提示：</strong>
                      <br />1. 请确保上传的照片清晰可辨
                      <br />2. 手持身份证需清晰显示身份证信息和本人面部
                      <br />3. 照片需为真实拍摄，不可使用截图
                    </p>
                  </div>
                </div>
              )}

              {/* 按钮 */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all"
                  >
                    上一步
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={isVerifying}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {isVerifying ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      验证中...
                    </span>
                  ) : step === 3 ? (
                    '提交认证'
                  ) : (
                    '下一步'
                  )}
                </button>
              </div>

              {/* 跳过 */}
              <div className="text-center mt-4">
                <button
                  onClick={onSkip}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  稍后认证，跳过此步骤
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
