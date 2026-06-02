<p align="center">
  <br>
  <b><font size="6">NexusChat</font></b>
  <br><br>
  <b>Multi-model AI chat in your browser.</b><br>
  Zero setup. Zero cost. Just add your API key and go.
  <br><br>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o-black?style=flat-square&logo=openai" alt="OpenAI">
  <img src="https://img.shields.io/badge/Claude-via__OpenRouter-purple?style=flat-square&logo=anthropic" alt="Claude">
  <img src="https://img.shields.io/badge/Gemini-2.5-blue?style=flat-square&logo=google" alt="Gemini">
  <img src="https://img.shields.io/badge/DeepSeek-Chat-green?style=flat-square" alt="DeepSeek">
  <img src="https://img.shields.io/badge/Llama-via__OpenRouter-orange?style=flat-square&logo=meta" alt="Llama">
  <img src="https://img.shields.io/badge/Language-EN%20%7C%20%E4%B8%AD%E6%96%87%20%7C%20%E6%97%A5%E6%9C%AC%E8%AA%9E-blue?style=flat-square" alt="i18n">
</p>

---

## English

### What is NexusChat?

A beautiful, lightweight AI chat interface that runs entirely in your browser. Connect to multiple AI providers with your own API keys. No server, no signup, no tracking.

### Features

- **Multi-Provider** — OpenAI, Claude (via OpenRouter), Gemini, DeepSeek, Llama, Mistral and more
- **Streaming** — Real-time token-by-token response with smooth cursor animation
- **Markdown** — Full GFM support with syntax-highlighted code blocks and one-click copy
- **Dark Theme** — iOS-inspired design with frosted glass effects and smooth animations
- **Conversation History** — All chats saved locally in your browser (localStorage)
- **Zero Backend** — Pure static site, deploy anywhere for free
- **Lightweight** — No framework, no build step, just vanilla JS + 2 CDN libs
- **Responsive** — Works on desktop, tablet, and mobile
- **Multi-Language** — English, Chinese, Japanese

---

## 中文

### NexusChat 是什么？

一个漂亮的轻量级 AI 聊天界面，完全在浏览器中运行。使用你自己的 API Key 连接多个 AI 供应商。无需服务器，无需注册，无需追踪。

### 功能特点

- **多供应商支持** — OpenAI、Claude（通过 OpenRouter）、Gemini、DeepSeek、Llama、Mistral 等
- **流式输出** — 逐 token 实时响应，带流畅的光标动画
- **Markdown 支持** — 完整 GFM 支持，代码块语法高亮，一键复制
- **暗黑主题** — iOS 风格设计，毛玻璃效果，丝滑动画
- **对话历史** — 所有聊天本地保存在浏览器 (localStorage)
- **零后端** — 纯静态站点，免费部署到任何地方
- **轻量级** — 无框架，无构建步骤，纯 JS + 2 个 CDN 库
- **响应式** — 支持桌面、平板和手机
- **多语言** — 英语、中文、日语

---

## 日本語

### NexusChat とは？

ブラウザで完結する、美しい軽量AIチャットインターフェース。ご自身のAPIキーで複数のAIプロバイダーに接続できます。サーバー不要、登録不要、追跡なし。

### 機能

- **マルチプロバイダー** — OpenAI、Claude（OpenRouter経由）、Gemini、DeepSeek、Llama、Mistralなど
- **ストリーミング** — リアルタイムのトークン単位レスポンス、スムーズなカーソルアニメーション
- **Markdown** — 完全なGFMサポート、シンタックスハイライト付きコードブロック、ワンクリックコピー
- **ダークテーマ** — iOS風デザイン、フロストガラスエフェクト、スムーズなアニメーション
- **会話履歴** — すべてのチャットはブラウザのlocalStorageにローカル保存
- **ゼロバックエンド** — 純粋な静的サイト、どこでも無料デプロイ
- **軽量** — フレームワークなし、ビルドステップなし、バニラJS + CDNライブラリ2つのみ
- **レスポンシブ** — デスクトップ、タブレット、モバイルに対応
- **多言語対応** — 英語、中国語、日本語

---

## Quick Start

### 1. GitHub Pages (Free)

1. **Fork** this repository
2. Go to **Settings > Pages** in your fork
3. Set source to **main branch** / **root**
4. Visit https://yourusername.github.io/NexusChat

### 2. Netlify / Vercel / Cloudflare Pages (Free)

1. Fork this repository
2. Go to [netlify.com](https://netlify.com), [vercel.com](https://vercel.com), or [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect your Git repo and deploy
4. Done! You get a free URL

### 3. Your Own Server

`ash
# Quick start with Python
git clone https://github.com/yourusername/NexusChat.git
cd NexusChat
./deploy.sh 8080        # Linux/Mac
deploy.bat 8080         # Windows

# Or with Node.js
npx serve . -p 8080

# Or with Docker
docker build -t nexuschat .
docker run -p 8080:80 nexuschat

# Or with Nginx
sudo cp -r * /var/www/html/
`

### 4. Static File Hosting

Since NexusChat is pure static files (HTML + CSS + JS), you can upload to ANY web hosting:

- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Surge.sh](https://surge.sh) — surge .
- [Render](https://render.com)
- AWS S3 + CloudFront
- Azure Static Web Apps
- Any web server (Apache, Nginx, Caddy, etc.)

Just upload index.html, style.css, and pp.js to your server.

---

## Supported Providers

| Provider | Models | How to get API key |
|----------|--------|-------------------|
| **OpenAI** | GPT-4o, GPT-4o Mini, o1 | [platform.openai.com](https://platform.openai.com) |
| **OpenRouter** | Claude, Gemini, Llama, Mistral, 100+ | [openrouter.ai](https://openrouter.ai) |
| **Gemini** | Gemini 2.5 Pro, Gemini 2.5 Flash | [aistudio.google.com](https://aistudio.google.com) |
| **DeepSeek** | DeepSeek Chat, DeepSeek Reasoner | [platform.deepseek.com](https://platform.deepseek.com) |

> **Tip:** Use OpenRouter to access Claude, Llama, Mistral and many more models with a single API key.

---

## Privacy

- All API keys are stored **locally** in your browser's localStorage
- Keys are **never** sent to any server except the AI provider you choose
- Conversations are stored **locally** — nothing leaves your browser
- No analytics, no tracking, no cookies

---

## Tech Stack

- **Vanilla JavaScript** — No framework, no build step
- **marked.js** — Markdown rendering
- **highlight.js** — Code syntax highlighting
- **CSS Custom Properties** — Theming and responsive design

## Project Structure

`
NexusChat/
├── index.html          # Main HTML file
├── style.css           # Styles (iOS dark theme)
├── app.js              # Application logic (i18n)
├── README.md           # This file
├── LICENSE             # MIT License
├── .nojekyll           # GitHub Pages config
├── .github/workflows/  # GitHub Actions auto-deploy
├── deploy.sh           # Linux/Mac deploy script
├── deploy.bat          # Windows deploy script
├── Dockerfile          # Docker deployment
├── docker-compose.yml  # Docker Compose config
├── nginx.conf          # Nginx configuration
├── netlify.toml        # Netlify configuration
└── vercel.json         # Vercel configuration
`

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <sub>Made with care by developers, for developers.</sub>
</p>