import type { User, Membership, PointsHistory, LotteryPrize, ExchangeItem } from '../types/auth';

const POINTS_STORAGE_KEY = 'lyrics_studio_points';
const HISTORY_STORAGE_KEY = 'lyrics_studio_points_history';
const MEMBERSHIP_STORAGE_KEY = 'lyrics_studio_membership';

const POINTS_PER_AD = 10;
const LOTTERY_COST = 50;

export const membershipService = {
  getMembershipLevel(level: 'free' | 'basic' | 'pro' | 'vip') {
    const levels = {
      free: { name: '免费用户', color: 'text-gray-400', benefits: ['每日5次歌词生成', '基础模板'] },
      basic: { name: '基础会员', color: 'text-blue-400', benefits: ['每日20次歌词生成', '高级模板', '优先客服支持'] },
      pro: { name: '专业会员', color: 'text-purple-400', benefits: ['无限歌词生成', '全部模板', '专属素材库', 'API接口调用'] },
      vip: { name: 'VIP会员', color: 'text-yellow-400', benefits: ['全部功能', '专属客服', '定制服务', '线下活动邀请'] }
    };
    return levels[level];
  },

  async getPoints(): Promise<number> {
    return new Promise((resolve) => {
      const stored = localStorage.getItem(POINTS_STORAGE_KEY);
      resolve(stored ? parseInt(stored) : 100);
    });
  },

  async addPoints(amount: number, source: string, description: string): Promise<number> {
    return new Promise((resolve) => {
      const currentPoints = parseInt(localStorage.getItem(POINTS_STORAGE_KEY) || '0');
      const newPoints = currentPoints + amount;
      localStorage.setItem(POINTS_STORAGE_KEY, newPoints.toString());

      const history = this.getPointsHistory();
      history.unshift({
        id: Date.now().toString(),
        type: 'earn',
        amount,
        source,
        timestamp: Date.now(),
        description
      });
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));

      resolve(newPoints);
    });
  },

  async spendPoints(amount: number, reason: string): Promise<boolean> {
    return new Promise((resolve) => {
      const currentPoints = parseInt(localStorage.getItem(POINTS_STORAGE_KEY) || '0');
      if (currentPoints < amount) {
        resolve(false);
        return;
      }

      const newPoints = currentPoints - amount;
      localStorage.setItem(POINTS_STORAGE_KEY, newPoints.toString());

      const history = this.getPointsHistory();
      history.unshift({
        id: Date.now().toString(),
        type: 'spend',
        amount: -amount,
        source: 'spend',
        timestamp: Date.now(),
        description: reason
      });
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));

      resolve(true);
    });
  },

  getPointsHistory(): PointsHistory[] {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getPointsPerAd(): number {
    return POINTS_PER_AD;
  },

  getLotteryCost(): number {
    return LOTTERY_COST;
  }
};

export const adService = {
  async watchAd(): Promise<{ success: boolean; points: number; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem('lyrics_studio_ad_last_watch');
        const lastWatch = stored ? parseInt(stored) : 0;
        const now = Date.now();
        const cooldown = 30 * 1000;

        if (now - lastWatch < cooldown) {
          const remaining = Math.ceil((cooldown - (now - lastWatch)) / 1000);
          resolve({
            success: false,
            points: 0,
            message: `请 ${remaining} 秒后再试`
          });
          return;
        }

        localStorage.setItem('lyrics_studio_ad_last_watch', now.toString());
        membershipService.addPoints(POINTS_PER_AD, 'ad_watch', `观看广告获得 ${POINTS_PER_AD} 积分`);

        resolve({
          success: true,
          points: POINTS_PER_AD,
          message: `恭喜获得 ${POINTS_PER_AD} 积分！`
        });
      }, 3000);
    });
  },

  getAdCooldown(): number {
    const stored = localStorage.getItem('lyrics_studio_ad_last_watch');
    if (!stored) return 0;
    const lastWatch = parseInt(stored);
    const now = Date.now();
    const cooldown = 30 * 1000;
    return Math.max(0, cooldown - (now - lastWatch));
  }
};

export const lotteryService = {
  getPrizes(): LotteryPrize[] {
    return [
      { id: '1', name: '50积分', points: 50, probability: 0.3, type: 'points' },
      { id: '2', name: '100积分', points: 100, probability: 0.2, type: 'points' },
      { id: '3', name: '200积分', points: 200, probability: 0.15, type: 'points' },
      { id: '4', name: '1天VIP', points: 0, probability: 0.1, type: 'vip' },
      { id: '5', name: '7天VIP', points: 0, probability: 0.05, type: 'vip' },
      { id: '6', name: '5折优惠券', points: 0, probability: 0.2, type: 'discount' }
    ];
  },

  async spin(): Promise<{ success: boolean; prize: LotteryPrize | null; message: string }> {
    const canAfford = await membershipService.spendPoints(LOTTERY_COST, '转盘抽奖');
    if (!canAfford) {
      return {
        success: false,
        prize: null,
        message: `积分不足，需要 ${LOTTERY_COST} 积分`
      };
    }

    const prizes = this.getPrizes();
    const random = Math.random();
    let cumulative = 0;
    let selectedPrize: LotteryPrize | null = null;

    for (const prize of prizes) {
      cumulative += prize.probability;
      if (random <= cumulative) {
        selectedPrize = prize;
        break;
      }
    }

    if (!selectedPrize) {
      selectedPrize = prizes[0];
    }

    if (selectedPrize.type === 'points') {
      await membershipService.addPoints(selectedPrize.points, 'lottery', `转盘抽奖获得 ${selectedPrize.name}`);
    } else if (selectedPrize.type === 'vip') {
      const currentMembership = this.getMembership();
      if (currentMembership.level !== 'vip') {
        const days = selectedPrize.name.includes('1天') ? 1 : 7;
        const expiryDate = Date.now() + days * 24 * 60 * 60 * 1000;
        this.upgradeMembership('vip', expiryDate);
      } else {
        const days = selectedPrize.name.includes('1天') ? 1 : 7;
        const currentExpiry = currentMembership.expiryDate || Date.now();
        this.upgradeMembership('vip', currentExpiry + days * 24 * 60 * 60 * 1000);
      }
    }

    return {
      success: true,
      prize: selectedPrize,
      message: `恭喜获得 ${selectedPrize.name}！`
    };
  },

  getMembership(): Membership {
    const stored = localStorage.getItem(MEMBERSHIP_STORAGE_KEY);
    if (stored) {
      const membership = JSON.parse(stored);
      if (membership.expiryDate && membership.expiryDate < Date.now()) {
        return { level: 'free', expiryDate: null, benefits: [] };
      }
      return membership;
    }
    return { level: 'free', expiryDate: null, benefits: [] };
  },

  upgradeMembership(level: 'basic' | 'pro' | 'vip', expiryDate: number): Membership {
    const membership: Membership = {
      level,
      expiryDate,
      benefits: membershipService.getMembershipLevel(level).benefits
    };
    localStorage.setItem(MEMBERSHIP_STORAGE_KEY, JSON.stringify(membership));
    return membership;
  }
};

export const exchangeService = {
  getExchangeItems(): ExchangeItem[] {
    return [
      {
        id: '1',
        name: '1天VIP会员',
        description: '体验全部VIP功能',
        pointsRequired: 100,
        type: 'vip',
        duration: '1天',
        icon: '👑'
      },
      {
        id: '2',
        name: '7天VIP会员',
        description: '一周VIP特权',
        pointsRequired: 500,
        type: 'vip',
        duration: '7天',
        icon: '👑'
      },
      {
        id: '3',
        name: '30天VIP会员',
        description: '一个月VIP特权',
        pointsRequired: 2000,
        type: 'vip',
        duration: '30天',
        icon: '👑'
      },
      {
        id: '4',
        name: '无限歌词生成',
        description: '解锁无限生成次数',
        pointsRequired: 500,
        type: 'feature',
        icon: '♾️'
      },
      {
        id: '5',
        name: '高级模板包',
        description: '独家高级歌词模板',
        pointsRequired: 300,
        type: 'feature',
        icon: '📦'
      },
      {
        id: '6',
        name: '定制服务',
        description: '专属定制歌词服务',
        pointsRequired: 1000,
        type: 'gift',
        icon: '🎁'
      }
    ];
  },

  async exchangeItem(item: ExchangeItem): Promise<{ success: boolean; message: string }> {
    const canAfford = await membershipService.spendPoints(item.pointsRequired, `兑换 ${item.name}`);
    if (!canAfford) {
      return {
        success: false,
        message: `积分不足，需要 ${item.pointsRequired} 积分`
      };
    }

    if (item.type === 'vip') {
      const days = parseInt(item.duration || '1');
      const currentMembership = lotteryService.getMembership();
      const currentExpiry = currentMembership.expiryDate || Date.now();
      const newExpiry = Math.max(currentExpiry, Date.now()) + days * 24 * 60 * 60 * 1000;
      lotteryService.upgradeMembership('vip', newExpiry);
    }

    return {
      success: true,
      message: `成功兑换 ${item.name}！`
    };
  }
};
