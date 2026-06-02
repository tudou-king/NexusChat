<p align="center">
  <br>
  <b><font size="6">NexusChat</font></b>
  <br><br>
  <b>在浏览器中运行的多模型 AI 聊天界面</b><br>
  零配置、零成本，填入 API Key 即可开始使用
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

## 预览截图

![NexusChat 预览](https://raw.githubusercontent.com/tudou-king/NexusChat/main/preview.png)

---

## 项目简介

NexusChat 是一个漂亮的轻量级 AI 聊天界面，**完全在浏览器中运行**。使用你自己的 API Key 连接多个 AI 供应商，无需服务器、无需注册、无需追踪。

### 为什么选择 NexusChat？

- **完全免费** - 纯静态网站，可部署到 GitHub Pages、Netlify、Vercel 等免费平台
- **隐私安全** - API Key 和聊天记录都保存在你的浏览器本地，不会上传到任何服务器
- **多模型支持** - 一个界面切换 OpenAI、Claude、Gemini、DeepSeek 等多个 AI 模型
- **开箱即用** - 无需安装任何依赖，打开网页就能用

---

## 功能特点

### 核心功能

- **多供应商支持** - OpenAI、Claude（通过 OpenRouter）、Gemini、DeepSeek、Llama、Mistral 等 100+ 模型
- **流式输出** - 逐 token 实时响应，带流畅的打字光标动画
- **Markdown 渲染** - 完整 GFM 支持，代码块语法高亮，一键复制代码
- **对话管理** - 新建对话、重命名、删除，所有对话本地保存
- **停止生成** - 随时停止 AI 回复

### 界面设计

- **iOS 暗黑主题** - 毛玻璃效果、圆角卡片、丝滑动画
- **响应式布局** - 完美适配桌面、平板和手机
- **多语言支持** - 中文、English、日本語 三语切换
- **快捷键** - Enter 发送，Shift+Enter 换行，Escape 关闭弹窗

### 技术特点

- **零后端** - 纯静态站点，无需服务器
- **轻量级** - 无框架依赖，纯 JavaScript + 2 个 CDN 库（marked.js + highlight.js）
- **本地存储** - 所有数据保存在浏览器 localStorage
- **一键部署** - 支持 GitHub Pages、Netlify、Vercel、Docker 等多种部署方式

---

## 快速开始

### 方式一：使用在线版本（推荐）

1. 访问 [在线演示](https://tudou-king.github.io/NexusChat)
2. 点击右上角的 **设置** 图标（齿轮图标）
3. 输入任意供应商的 API Key
4. 点击 **New Chat** 开始聊天

### 方式二：部署到 GitHub Pages

1. **Fork** 本仓库到你的 GitHub 账号
2. 进入 Fork 后的仓库，点击 **Settings → Pages**
3. 在 **Source** 中选择 **main** 分支，文件夹选择 **/ (root)**
4. 点击 **Save**
5. 等待 1-2 分钟，访问 `https://你的用户名.github.io/NexusChat`
6. 在设置中添加 API Key，开始聊天

### 方式三：部署到自己的服务器

#### 方法 A：直接上传静态文件

只需要 3 个文件：`index.html`、`style.css`、`app.js`

```bash
# 将这 3 个文件上传到你的 Web 服务器根目录
# 然后访问你的域名即可
```

#### 方法 B：使用 Docker

```bash
# 构建镜像
docker build -t nexuschat .

# 运行容器
docker run -p 8080:80 nexuschat

# 或者使用 docker-compose
docker-compose up -d

# 访问 http://localhost:8080
```

#### 方法 C：使用 Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/NexusChat;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 方法 D：使用部署脚本

```bash
# Linux/Mac
./deploy.sh 8080

# Windows
deploy.bat 8080

# 访问 http://localhost:8080
```

---

## API Key 获取指南

### OpenAI（GPT-4o、GPT-4 Turbo 等）

1. 访问 [platform.openai.com](https://platform.openai.com)
2. 注册/登录账号
3. 进入 **API Keys** 页面
4. 点击 **Create new secret key**
5. 复制生成的 Key（以 `sk-` 开头）

**推荐模型：** GPT-4o（最新、最强）、GPT-4o Mini（便宜、快速）

### OpenRouter（Claude、Llama、Mistral 等 100+ 模型）

1. 访问 [openrouter.ai](https://openrouter.ai)
2. 注册/登录账号
3. 进入 **Keys** 页面
4. 点击 **Create Key**
5. 复制生成的 Key（以 `sk-or-` 开头）

**推荐模型：**
- Claude Sonnet 4 - 最强编程助手
- Claude 3.5 Sonnet - 性价比之选
- Llama 4 Maverick - Meta 最新开源模型
- DeepSeek V3 - 中文能力强

### Google Gemini

1. 访问 [aistudio.google.com](https://aistudio.google.com)
2. 登录 Google 账号
3. 点击 **Get API key**
4. 创建新的 API Key
5. 复制生成的 Key（以 `AIza` 开头）

**推荐模型：** Gemini 2.5 Flash（快速）、Gemini 2.5 Pro（最强）

### DeepSeek

1. 访问 [platform.deepseek.com](https://platform.deepseek.com)
2. 注册/登录账号
3. 进入 **API Keys** 页面
4. 点击 **Create API Key**
5. 复制生成的 Key（以 `sk-` 开头）

**推荐模型：** DeepSeek Chat（通用）、DeepSeek Reasoner（推理能力强）

---

## 使用教程

### 基本使用

1. **添加 API Key**
   - 点击右上角齿轮图标打开设置
   - 在对应供应商下输入你的 API Key
   - 关闭设置面板

2. **选择模型**
   - 点击顶部的模型选择器
   - 从下拉菜单中选择你想使用的模型

3. **开始聊天**
   - 点击左侧 **+** 按钮新建对话
   - 在底部输入框输入消息
   - 按 Enter 或点击发送按钮

4. **管理对话**
   - 左侧面板显示所有对话列表
   - 点击对话切换
   - 右键点击对话可以重命名或删除

### 高级功能

#### 切换语言

- 点击右上角的语言选择器（English/中文/日本語）
- 或者在设置中切换语言

#### 设置系统提示词

1. 打开设置面板
2. 在 **System Prompt** 中输入你想要的 AI 角色设定
3. 例如：`你是一个专业的编程助手，擅长 Python 和 JavaScript`

#### 调整温度参数

- 温度范围：0.0 - 2.0
- 0.0：回答最确定、最保守
- 0.7：平衡创造性与准确性（默认）
- 2.0：回答最随机、最有创造性

#### 自定义 Base URL

如果你使用第三方 API 代理或自建 API 服务：

1. 打开设置面板
2. 在 **Base URL** 中输入你的 API 地址
3. 例如：`https://api.example.com/v1`

---

## 支持的供应商

| 供应商 | 模型 | 获取 API Key |
|--------|------|-------------|
| **OpenAI** | GPT-4o, GPT-4o Mini, GPT-4 Turbo, o1 | [platform.openai.com](https://platform.openai.com) |
| **OpenRouter** | Claude, Gemini, Llama, Mistral, 100+ | [openrouter.ai](https://openrouter.ai) |
| **Gemini** | Gemini 2.5 Pro, Gemini 2.5 Flash, 2.0 Flash | [aistudio.google.com](https://aistudio.google.com) |
| **DeepSeek** | DeepSeek Chat, DeepSeek Reasoner | [platform.deepseek.com](https://platform.deepseek.com) |

> **提示：** 使用 OpenRouter 可以用一个 API Key 访问 Claude、Llama、Mistral 等众多模型，推荐新手使用。

---

## 隐私安全

- 所有 API Key **仅保存在你的浏览器本地**（localStorage）
- API Key **只会发送到你选择的 AI 供应商**，不会发送到其他任何服务器
- 所有对话记录**仅保存在你的浏览器本地**
- **无追踪、无分析、无 Cookie**
- 项目代码完全开源，可自行审查

---

## 部署选项

| 平台 | 免费额度 | 部署方式 |
|------|---------|---------|
| [GitHub Pages](https://pages.github.com) | ✅ 完全免费 | Fork 后在 Settings → Pages 开启 |
| [Netlify](https://netlify.com) | ✅ 免费额度 | 连接 Git 仓库自动部署 |
| [Vercel](https://vercel.com) | ✅ 免费额度 | 连接 Git 仓库自动部署 |
| [Cloudflare Pages](https://pages.cloudflare.com) | ✅ 完全免费 | 连接 Git 仓库自动部署 |
| [Firebase Hosting](https://firebase.google.com/docs/hosting) | ✅ 免费额度 | 使用 Firebase CLI 部署 |
| [Surge.sh](https://surge.sh) | ✅ 完全免费 | `surge .` |
| [Render](https://render.com) | ✅ 免费额度 | 连接 Git 仓库自动部署 |
| 自己的服务器 | - | 上传 3 个静态文件即可 |
| Docker | - | `docker build -t nexuschat . && docker run -p 8080:80 nexuschat` |

---

## 项目结构

```
NexusChat/
├── index.html              # 主页面
├── style.css               # 样式（iOS 暗黑主题）
├── app.js                  # 应用逻辑（含 i18n）
├── preview.png             # 预览截图
├── README.md               # 项目说明
├── LICENSE                 # MIT 开源协议
├── .nojekyll               # GitHub Pages 配置
├── .github/workflows/      # GitHub Actions 自动部署
├── deploy.sh               # Linux/Mac 部署脚本
├── deploy.bat              # Windows 部署脚本
├── Dockerfile              # Docker 部署配置
├── docker-compose.yml      # Docker Compose 配置
├── nginx.conf              # Nginx 配置
├── netlify.toml            # Netlify 配置
└── vercel.json             # Vercel 配置
```

---

## 技术栈

- **Vanilla JavaScript** - 无框架依赖，轻量高效
- **marked.js** - Markdown 渲染
- **highlight.js** - 代码语法高亮
- **CSS Custom Properties** - 主题系统和响应式设计

---

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个 Pull Request

---

## 开源协议

MIT License - 详见 [LICENSE](LICENSE)

---

<p align="center">
  <sub>如果这个项目对你有帮助，请给一个 Star 支持一下！</sub>
</p>