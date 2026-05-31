import { useState } from 'react';
import { Sparkles, Video, Music, Globe, CheckCircle, ChevronRight, ChevronLeft, X } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: '🎵',
    title: '欢迎使用歌词工坊',
    description: '全球领先的AI智能歌词生成平台，让创作变得更简单',
    highlights: [
      '支持6种音乐风格',
      '智能情感分析',
      '海量歌词模板'
    ]
  },
  {
    icon: '✍️',
    title: '歌词创作',
    description: '输入主题和心情，AI自动为你生成专业歌词',
    highlights: [
      '多种曲风可选：流行、摇滚、民谣、说唱等',
      '智能押韵处理',
      '自动分段结构'
    ]
  },
  {
    icon: '🎬',
    title: 'MV视频生成',
    description: '一键生成专业级MV视频，多种风格可选',
    highlights: [
      '5种MV风格：电影、歌词、动画等',
      '多种分辨率输出',
      '一键发布到平台'
    ]
  },
  {
    icon: '🚀',
    title: '全球平台发布',
    description: '一键发布到全球100+音乐和视频平台',
    highlights: [
      '国内平台：QQ音乐、网易云、抖音、B站',
      '国际平台：YouTube、Spotify、TikTok',
      '自动格式化适配'
    ]
  }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete();
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const currentContent = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* 跳过按钮 */}
        <div className="text-right mb-8">
          <button
            onClick={skipOnboarding}
            className="text-purple-200/70 hover:text-white transition-colors text-sm flex items-center gap-2 ml-auto"
          >
            跳过
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 主内容卡片 */}
        <div className={`bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-5xl">{currentContent.icon}</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{currentContent.title}</h2>
            <p className="text-purple-200/80 text-lg max-w-2xl mx-auto">{currentContent.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {currentContent.highlights.map((highlight, idx) => (
              <div key={idx} className="bg-white/10 rounded-xl p-4 text-center">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-white text-sm">{highlight}</p>
              </div>
            ))}
          </div>

          {/* 步骤指示器 */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentStep
                    ? 'bg-purple-500 scale-125'
                    : idx < currentStep
                    ? 'bg-green-500'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-4">
            {currentStep > 0 && (
              <button
                onClick={goPrev}
                className="flex-1 py-4 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                上一步
              </button>
            )}
            <button
              onClick={goNext}
              className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  开始使用
                  <Sparkles className="w-5 h-5" />
                </>
              ) : (
                <>
                  下一步
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="mt-8 text-center text-purple-200/50 text-sm">
          <p>第 {currentStep + 1} / {steps.length} 步</p>
        </div>
      </div>
    </div>
  );
}
