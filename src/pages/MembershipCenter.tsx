import { useState, useEffect } from 'react';
import { Star, Gift, Video, Trophy, TrendingUp, Clock } from 'lucide-react';
import { membershipService, adService, lotteryService, exchangeService } from '../services/membershipService';

export default function MembershipCenter() {
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'earn' | 'lottery' | 'exchange'>('overview');
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [adCooldown, setAdCooldown] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<any>(null);
  const [showPrize, setShowPrize] = useState(false);
  const [exchangeItems] = useState(exchangeService.getExchangeItems());

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      const cooldown = adService.getAdCooldown();
      setAdCooldown(cooldown);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const pts = await membershipService.getPoints();
    setPoints(pts);
    setHistory(membershipService.getPointsHistory());
  };

  const handleWatchAd = async () => {
    setIsWatchingAd(true);
    const result = await adService.watchAd();
    setIsWatchingAd(false);
    alert(result.message);
    if (result.success) {
      loadData();
    }
  };

  const handleSpin = async () => {
    if (points < lotteryService.getLotteryCost()) {
      alert(`积分不足！需要 ${lotteryService.getLotteryCost()} 积分`);
      return;
    }
    setIsSpinning(true);
    const result = await lotteryService.spin();
    if (result.success && result.prize) {
      setPrize(result.prize);
      setShowPrize(true);
      setTimeout(() => {
        setShowPrize(false);
        loadData();
      }, 3000);
    } else {
      alert(result.message);
    }
    setIsSpinning(false);
  };

  const handleExchange = async (item: any) => {
    if (points < item.pointsRequired) {
      alert(`积分不足！需要 ${item.pointsRequired} 积分`);
      return;
    }
    const result = await exchangeService.exchangeItem(item);
    alert(result.message);
    if (result.success) {
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">会员中心</h1>
              <p className="text-purple-200/70">积分系统 · 广告积分 · 转盘抽奖</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-yellow-400 mb-1">
                <Star className="w-6 h-6" />
                <span className="text-2xl font-bold">{points}</span>
              </div>
              <p className="text-purple-200/70 text-sm">我的积分</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`p-4 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">概览</p>
            </button>
            <button
              onClick={() => setActiveTab('earn')}
              className={`p-4 rounded-xl transition-all ${
                activeTab === 'earn'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <Video className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">赚积分</p>
            </button>
            <button
              onClick={() => setActiveTab('lottery')}
              className={`p-4 rounded-xl transition-all ${
                activeTab === 'lottery'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <Gift className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">转盘抽奖</p>
            </button>
            <button
              onClick={() => setActiveTab('exchange')}
              className={`p-4 rounded-xl transition-all ${
                activeTab === 'exchange'
                  ? 'bg-green-500 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <Trophy className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">积分兑换</p>
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">积分记录</h2>
              <div className="space-y-3">
                {history.length === 0 ? (
                  <p className="text-purple-200/70 text-center py-8">暂无积分记录</p>
                ) : (
                  history.slice(0, 10).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.type === 'earn' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.type === 'earn' ? '+' : '-'}
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.description}</p>
                          <p className="text-purple-200/70 text-sm">{item.amount} 积分</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${item.type === 'earn' ? 'text-green-400' : 'text-red-400'}`}>
                          {item.type === 'earn' ? '+' : ''}{item.amount}
                        </p>
                        <p className="text-purple-200/70 text-xs">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earn' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">观看广告赚积分</h2>
              <p className="text-white/80 mb-6">观看30秒广告，获得 {membershipService.getPointsPerAd()} 积分</p>
              <button
                onClick={handleWatchAd}
                disabled={isWatchingAd || adCooldown > 0}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isWatchingAd ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 animate-spin" />
                    广告播放中...
                  </span>
                ) : adCooldown > 0 ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {Math.ceil(adCooldown / 1000)}秒后可再次观看
                  </span>
                ) : (
                  '立即观看广告'
                )}
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">赚积分方式</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white/5 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">观看广告</p>
                    <p className="text-purple-200/70 text-sm">每次 {membershipService.getPointsPerAd()} 积分，30秒冷却</p>
                  </div>
                  <span className="text-green-400 font-bold">+{membershipService.getPointsPerAd()}</span>
                </div>
                <div className="p-4 bg-white/5 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Gift className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">转盘抽奖</p>
                    <p className="text-purple-200/70 text-sm">消耗 {lotteryService.getLotteryCost()} 积分，最高可中200积分</p>
                  </div>
                  <span className="text-yellow-400 font-bold">🎰</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lottery' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">积分转盘</h2>
              <p className="text-white/80 mb-6">每次抽奖消耗 {lotteryService.getLotteryCost()} 积分</p>
              <button
                onClick={handleSpin}
                disabled={isSpinning || points < lotteryService.getLotteryCost()}
                className="px-8 py-4 bg-white text-yellow-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSpinning ? '🎰 抽奖中...' : '🎰 开始抽奖'}
              </button>
            </div>

            {showPrize && prize && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-center max-w-md w-full">
                  <div className="text-8xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold text-white mb-2">恭喜获得</h3>
                  <p className="text-4xl font-bold text-yellow-300 mb-4">{prize.name}</p>
                  <button
                    onClick={() => setShowPrize(false)}
                    className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold"
                  >
                    领取奖励
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">奖品列表</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {lotteryService.getPrizes().map((prize) => (
                  <div key={prize.id} className="p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-2xl mb-2">
                      {prize.type === 'points' ? '💰' : prize.type === 'vip' ? '👑' : '🎫'}
                    </p>
                    <p className="text-white font-medium">{prize.name}</p>
                    <p className="text-purple-200/70 text-sm">{Math.round(prize.probability * 100)}%概率</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exchange' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">积分兑换</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exchangeItems.map((item) => (
                  <div key={item.id} className="p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-purple-200/70 text-sm mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-bold">{item.pointsRequired}</span>
                      </div>
                      <button
                        onClick={() => handleExchange(item)}
                        disabled={points < item.pointsRequired}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        兑换
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
