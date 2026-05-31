import { useState } from 'react';
import { Shield, Globe, Key, Smartphone, Wifi, AlertTriangle, Info, CheckCircle } from 'lucide-react';

export default function AccessGuide() {
  const [activeSection, setActiveSection] = useState('vpn');

  const sections = [
    { id: 'vpn', name: 'VPN 推荐', icon: '🔒' },
    { id: 'apple-id', name: '海外 Apple ID', icon: '🍎' },
    { id: 'proxy', name: '代理设置', icon: '🌐' },
    { id: 'dns', name: 'DNS 方案', icon: '📡' }
  ];

  const vpnServices = [
    { name: 'ExpressVPN', price: '~$12.95/月', features: ['快速稳定', '全球服务器', '支持多设备', '30天退款'], recommended: true },
    { name: 'NordVPN', price: '~$3.99/月', features: ['服务器多', '价格实惠', '安全可靠'], recommended: true },
    { name: 'Surfshark', price: '~$2.49/月', features: ['性价比高', '无限设备', '价格便宜'], recommended: false },
    { name: 'Clash (开源)', price: '免费', features: ['完全免费', '高度可定制', '需要技术基础'], recommended: false }
  ];

  const appleIdSteps = [
    '打开 Apple ID 官网 (appleid.apple.com)',
    '退出当前账号，点击"创建您的Apple ID"',
    '选择国家/地区（选择美国、香港、日本等）',
    '填写个人信息（可以用新邮箱）',
    '验证邮箱和手机号',
    '登录 App Store，同意条款',
    '购买礼品卡或绑定支付方式'
  ];

  const proxyTypes = [
    { name: 'Shadowsocks (SS)', description: '轻量级代理协议，适合日常使用', config: '需要服务器地址、端口、密码、加密方式' },
    { name: 'ShadowsocksR (SSR)', description: 'SS的改进版，混淆功能更强', config: '额外的混淆协议和参数' },
    { name: 'V2Ray', description: '功能强大，支持多种协议', config: 'VMess、TCP、WebSocket、TLS等' },
    { name: 'Trojan', description: '模拟HTTPS流量，难以检测', config: '需要域名和证书' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">国际平台访问指南</h1>
          <p className="text-purple-200/70 text-lg">解锁全球音乐平台的完整访问指南</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 rounded-2xl transition-all flex items-center gap-2 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <span className="font-medium">{section.name}</span>
            </button>
          ))}
        </div>

        {activeSection === 'vpn' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6" /> VPN 服务推荐
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {vpnServices.map((vpn, idx) => (
                  <div key={idx} className={`bg-white/5 rounded-2xl p-6 border ${vpn.recommended ? 'border-green-500/50' : 'border-white/10'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{vpn.name}</h3>
                      {vpn.recommended && <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">推荐</span>}
                    </div>
                    <p className="text-purple-200/70 mb-4">{vpn.price}</p>
                    <ul className="space-y-2">
                      {vpn.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-purple-200/80 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="text-yellow-200 font-semibold mb-2">注意事项</h3>
                  <p className="text-yellow-200/70 text-sm">
                    请遵守当地法律法规，VPN服务仅用于合法的学术研究、文化交流等目的。
                    部分服务在某些地区可能无法使用，请根据自身需求选择。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'apple-id' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Smartphone className="w-6 h-6" /> 海外 Apple ID 获取教程
              </h2>
              <div className="space-y-4">
                {appleIdSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-4">
                      <p className="text-purple-200">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-blue-200 font-semibold mb-2">小贴士</h3>
                  <p className="text-blue-200/70 text-sm">
                    可以通过淘宝、拼多多等平台购买礼品卡充值到海外 Apple ID，
                    然后就可以下载 Spotify、Apple Music 等海外应用了。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'proxy' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6" /> 代理协议类型
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {proxyTypes.map((proxy, idx) => (
                  <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">{proxy.name}</h3>
                    <p className="text-purple-200/70 text-sm mb-4">{proxy.description}</p>
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-purple-300/80 text-xs">{proxy.config}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'dns' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Wifi className="w-6 h-6" /> DNS 方案
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Cloudflare DNS</h3>
                  <div className="flex gap-4 text-purple-200">
                    <code className="px-3 py-2 bg-white/10 rounded">1.1.1.1</code>
                    <code className="px-3 py-2 bg-white/10 rounded">1.0.0.1</code>
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Google DNS</h3>
                  <div className="flex gap-4 text-purple-200">
                    <code className="px-3 py-2 bg-white/10 rounded">8.8.8.8</code>
                    <code className="px-3 py-2 bg-white/10 rounded">8.8.4.4</code>
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">OpenDNS</h3>
                  <div className="flex gap-4 text-purple-200">
                    <code className="px-3 py-2 bg-white/10 rounded">208.67.222.222</code>
                    <code className="px-3 py-2 bg-white/10 rounded">208.67.220.220</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
