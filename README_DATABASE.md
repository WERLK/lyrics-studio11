# 歌词工坊 - 后端数据库去重系统

## 新增功能

### 后端API服务

新增了完整的后端服务，使用 SQLite 数据库存储生成的歌词，防止重复。

## 快速开始

### 1. 环境准备

```bash
# 安装依赖
npm install
```

### 2. 启动后端服务

```bash
# 单独启动后端
npm run dev:server

# 或同时启动前端和后端
npm run dev:both
```

### 3. 启动前端（单独）

```bash
npm run dev
```

## 功能特性

### 数据库去重

系统会自动检测并防止生成重复的歌词：

- 每次生成歌词时，根据提示词哈希 + 风格 + 心情 + 长度进行去重检测
- 如果检测到相同参数已生成过类似内容，会尝试不同的变体
- 最多尝试 10 次生成不同的变体

### API 端点

#### POST /api/generate
生成歌词，自动去重

**请求体：**
```json
{
  "theme": "爱情",
  "style": "pop",
  "mood": "happy",
  "length": "medium"
}
```

**响应：**
```json
{
  "success": true,
  "lyrics": "...",
  "isNew": true,
  "totalVariations": 5
}
```

#### GET /api/stats
获取统计数据

**响应：**
```json
{
  "totalLyrics": 100,
  "popularQueries": [...]
}
```

#### GET /api/health
健康检查

### 降级策略

如果后端服务不可用，系统会自动降级到本地生成模式，确保功能不受影响。

## 文件结构

```
/workspace
├── server/
│   └── index.js          # 后端服务主文件
├── src/
│   ├── api/
│   │   └── client.ts      # API 客户端
│   └── services/
│       └── lyricsGenerator.ts  # 更新的歌词生成器
├── .env.example         # 环境变量示例
└── lyrics.db            # SQLite 数据库（自动创建）
```

## 数据库结构

### lyrics 表
存储所有生成的歌词

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| prompt_hash | TEXT | 提示词哈希 |
| style | TEXT | 风格 |
| mood | TEXT | 心情 |
| length | TEXT | 长度 |
| lyrics_text | TEXT | 歌词内容 |
| created_at | DATETIME | 创建时间 |

### usage_stats 表
统计使用情况

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| prompt_hash | TEXT | 提示词哈希 |
| style | TEXT | 风格 |
| mood | TEXT | 心情 |
| length | TEXT | 长度 |
| count | INTEGER | 使用次数 |
| last_used | DATETIME | 最后使用时间 |

## 配置

### 环境变量

```env
VITE_API_URL=http://localhost:3001
```

复制 `.env.example` 为 `.env` 并根据需要修改。

## 使用说明

### 正常使用

1. 确保后端服务运行在 `http://localhost:3001`
2. 启动前端应用
3. 像往常一样生成歌词，系统会自动处理去重

### 仅使用本地模式

如果不想使用后端，只要不启动 `dev:server` 即可，系统会自动使用本地生成。

## 注意事项

1. **数据库文件**：`lyrics.db` 会自动在项目根目录创建
2. **端口占用**：确保 3001 端口未被占用
3. **降级模式**：网络不通时会自动降级到本地生成

## 开发

### 后端技术栈

- Node.js + Express
- SQLite (better-sqlite3)
- CORS 支持

### 前端技术栈

- React + TypeScript + Vite
- Zustand 状态管理
- React Router 路由
