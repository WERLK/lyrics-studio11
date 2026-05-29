import { useState, useRef, useEffect } from 'react';
import { Image, Download, RefreshCw, Palette, Sparkles, Wand2 } from 'lucide-react';
import Button from '../ui/Button';

interface CoverGeneratorProps {
  theme: string;
  style: string;
  mood: string;
}

const COLOR_PALETTES = [
  { name: '日落余晖', colors: ['#FF6B6B', '#FEC89A', '#FFD93D'], gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FEC89A 50%, #FFD93D 100%)' },
  { name: '午夜星空', colors: ['#667eea', '#764ba2', '#f093fb'], gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' },
  { name: '深海之谜', colors: ['#0c3483', '#a2b6df', '#6b8cce'], gradient: 'linear-gradient(135deg, #0c3483 0%, #a2b6df 50%, #6b8cce 100%)' },
  { name: '森林秘境', colors: ['#11998e', '#38ef7d', '#56ab2f'], gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 50%, #56ab2f 100%)' },
  { name: '极光之舞', colors: ['#00c6ff', '#0072ff', '#5856d6'], gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 50%, #5856d6 100%)' },
  { name: '复古唱片', colors: ['#f5af19', '#f12711', '#ff6b6b'], gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 50%, #ff6b6b 100%)' },
];

const FONT_STYLES = [
  { name: '现代简约', font: 'font-sans', style: 'light' },
  { name: '优雅艺术', font: 'font-serif', style: 'italic' },
  { name: '个性手写', font: 'cursive', style: 'normal' },
  { name: '经典黑体', font: 'font-serif', style: 'bold' },
];

export default function CoverGenerator({ theme, style, mood }: CoverGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (theme && generatedImage) {
      generateCover();
    }
  }, [selectedPalette, selectedFont, theme]);

  const generateCover = async () => {
    if (!theme) return;
    
    setGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const canvas = canvasRef.current;
    if (!canvas) {
      setGenerating(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setGenerating(false);
      return;
    }

    canvas.width = 1080;
    canvas.height = 1080;

    const palette = COLOR_PALETTES[selectedPalette];
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    if (selectedPalette === 0) {
      gradient.addColorStop(0, palette.colors[0]);
      gradient.addColorStop(0.5, palette.colors[1]);
      gradient.addColorStop(1, palette.colors[2]);
    } else {
      gradient.addColorStop(0, palette.colors[0]);
      gradient.addColorStop(1, palette.colors[2]);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 100 + 50;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI);
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    }

    const fontStyle = FONT_STYLES[selectedFont];
    ctx.font = `bold ${fontStyle.style} 120px ${fontStyle.name === '现代简约' ? 'sans-serif' : fontStyle.name === '优雅艺术' ? 'serif' : fontStyle.name === '个性手写' ? 'cursive' : 'serif'}`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const maxWidth = 800;
    const words = theme.split('');
    let line = '';
    let lines = [];
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n];
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const lineHeight = 140;
    const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((lineText, index) => {
      ctx.fillText(lineText, canvas.width / 2, startY + index * lineHeight);
    });

    ctx.font = '36px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(`${style} · ${mood}`, canvas.width / 2, canvas.height - 120);

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height - 200, 80, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    const dataUrl = canvas.toDataURL('image/png');
    setGeneratedImage(dataUrl);
    setGenerating(false);
  };

  const downloadCover = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.download = `${theme || 'lyrics'}-cover.png`;
    link.href = generatedImage;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Image className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">智能封面生成</h3>
          <p className="text-sm text-purple-200/60">为你的歌词作品生成专业封面</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200/80 mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          选择配色方案
        </label>
        <div className="grid grid-cols-3 gap-3">
          {COLOR_PALETTES.map((palette, index) => (
            <button
              key={index}
              onClick={() => setSelectedPalette(index)}
              className={`relative h-20 rounded-xl overflow-hidden transition-all ${
                selectedPalette === index 
                  ? 'ring-2 ring-purple-500 scale-105' 
                  : 'hover:scale-102'
              }`}
            >
              <div 
                className="absolute inset-0"
                style={{ background: palette.gradient }}
              />
              {selectedPalette === index && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 text-center">
                {palette.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200/80 mb-3 flex items-center gap-2">
          <Wand2 className="w-4 h-4" />
          选择字体风格
        </label>
        <div className="grid grid-cols-2 gap-3">
          {FONT_STYLES.map((font, index) => (
            <button
              key={index}
              onClick={() => setSelectedFont(index)}
              className={`p-4 rounded-xl transition-all ${
                selectedFont === index
                  ? 'bg-purple-500/20 border-2 border-purple-500'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <p className={`text-white text-lg ${font.font}`}>
                {font.name}
              </p>
              <p className="text-xs text-purple-200/60 mt-1">
                {theme || '示例文字'}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Button 
        onClick={generateCover} 
        isLoading={generating}
        disabled={!theme}
        className="w-full"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        {generating ? '生成中...' : '生成封面'}
      </Button>

      {generatedImage && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={generatedImage} 
              alt="Generated cover"
              className="w-full h-auto"
            />
          </div>
          
          <div className="flex gap-3">
            <Button variant="secondary" onClick={generateCover} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              重新生成
            </Button>
            <Button onClick={downloadCover} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              下载封面
            </Button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
