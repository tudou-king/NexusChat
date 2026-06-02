/* ============================================
   NexusChat - Main Application (i18n: EN/ZH/JA)
   ============================================ */

// ---- Translations ----
const I18N = {
  en: {
    welcome: "Welcome to NexusChat",
    welcomeDesc: "Connect your API key and start chatting with AI models.",
    newChat: "New Chat",
    settings: "Settings",
    messagePlaceholder: "Message NexusChat...",
    send: "Send",
    stop: "Stop",
    thinking: "Thinking...",
    generating: "Generating...",
    stopped: "Stopped",
    copied: "Copied to clipboard",
    error: "Error",
    noApiKey: "No API key for {provider}. Please add one in Settings.",
    rename: "Rename",
    delete: "Delete",
    renamePrompt: "Rename conversation:",
    noConversations: "No conversations yet",
    you: "You",
    assistant: "Assistant",
    systemPrompt: "System Prompt",
    temperature: "Temperature",
    apiKey: "API Key",
    baseUrl: "Base URL",
    general: "General",
    language: "Language",
    copy: "Copy",
    copiedBtn: "Copied!",
  },
  zh: {
    welcome: "欢迎使用 NexusChat",
    welcomeDesc: "填入你的 API Key，开始和 AI 模型对话。",
    newChat: "新建对话",
    settings: "设置",
    messagePlaceholder: "输入消息...",
    send: "发送",
    stop: "停止",
    thinking: "思考中...",
    generating: "生成中...",
    stopped: "已停止",
    copied: "已复制到剪贴板",
    error: "错误",
    noApiKey: "没有 {provider} 的 API Key，请在设置中添加。",
    rename: "重命名",
    delete: "删除",
    renamePrompt: "重命名对话：",
    noConversations: "暂无对话",
    you: "你",
    assistant: "AI 助手",
    systemPrompt: "系统提示词",
    temperature: "温度",
    apiKey: "API Key",
    baseUrl: "Base URL",
    general: "通用",
    language: "语言",
    copy: "复制",
    copiedBtn: "已复制！",
  },
  ja: {
    welcome: "NexusChat へようこそ",
    welcomeDesc: "APIキーを入力して、AIモデルとチャットを始めましょう。",
    newChat: "新しいチャット",
    settings: "設定",
    messagePlaceholder: "メッセージを入力...",
    send: "送信",
    stop: "停止",
    thinking: "考え中...",
    generating: "生成中...",
    stopped: "停止しました",
    copied: "クリップボードにコピーしました",
    error: "エラー",
    noApiKey: "{provider} のAPIキーがありません。設定で追加してください。",
    rename: "名前変更",
    delete: "削除",
    renamePrompt: "会話名を変更：",
    noConversations: "まだ会話がありません",
    you: "あなた",
    assistant: "アシスタント",
    systemPrompt: "システムプロンプト",
    temperature: "温度",
    apiKey: "APIキー",
    baseUrl: "ベースURL",
    general: "一般",
    language: "言語",
    copy: "コピー",
    copiedBtn: "コピー済み！",
  },
};

function t(key, params) {
  const lang = app ? app.settings.language : "en";
  let str = I18N[lang]?.[key] || I18N.en[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(`{${k}}`, v);
    }
  }
  return str;
}

// ---- Provider & Model Configuration ----
const PROVIDERS = {
  openai: {
    name: "OpenAI",
    endpoint: "https://api.openai.com/v1/chat/completions",
    models: [
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
      { id: "o1", name: "o1" },
      { id: "o1-mini", name: "o1 Mini" },
    ],
  },
  openrouter: {
    name: "OpenRouter",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    models: [
      { id: "anthropic/claude-sonnet-4", name: "Claude Sonnet 4" },
      { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet" },
      { id: "google/gemini-2.5-flash", name: "Gemini 2.5 Flash" },
      { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro" },
      { id: "meta-llama/llama-4-maverick", name: "Llama 4 Maverick" },
      { id: "deepseek/deepseek-chat-v3-0324", name: "DeepSeek V3" },
      { id: "mistralai/mistral-large-2411", name: "Mistral Large" },
    ],
  },
  gemini: {
    name: "Gemini",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models",
    models: [
      { id: "gemini-2.5-flash-preview-05-20", name: "Gemini 2.5 Flash" },
      { id: "gemini-2.5-pro-preview-05-06", name: "Gemini 2.5 Pro" },
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
    ],
  },
  deepseek: {
    name: "DeepSeek",
    endpoint: "https://api.deepseek.com/v1/chat/completions",
    models: [
      { id: "deepseek-chat", name: "DeepSeek Chat" },
      { id: "deepseek-reasoner", name: "DeepSeek Reasoner" },
    ],
  },
};

// ---- Storage Helper ----
const Store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem("nc_" + key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("nc_" + key, JSON.stringify(value)); } catch {}
  },
};

// ---- Markdown Setup ----
function setupMarked() {
  if (typeof marked === "undefined") return;
  const renderer = new marked.Renderer();
  renderer.code = function (code, lang) {
    let text = typeof code === "object" ? code.text : code;
    let language = typeof code === "object" ? code.lang : lang;
    language = language || "plaintext";
    let highlighted = text;
    if (typeof hljs !== "undefined") {
      try {
        if (hljs.getLanguage(language)) {
          highlighted = hljs.highlight(text, { language }).value;
        } else {
          highlighted = hljs.highlightAuto(text).value;
        }
      } catch {}
    }
    return `<pre><div class="code-header"><span>${language}</span><button onclick="copyCode(this)" data-code="${btoa(unescape(encodeURIComponent(text)))}">${t("copy")}</button></div><code class="hljs language-${language}">${highlighted}</code></pre>`;
  };
  marked.setOptions({ renderer, gfm: true, breaks: true });
}

window.copyCode = function (btn) {
  const raw = decodeURIComponent(escape(atob(btn.dataset.code)));
  navigator.clipboard.writeText(raw).then(() => {
    btn.textContent = t("copiedBtn");
    btn.classList.add("copied");
    setTimeout(() => { btn.textContent = t("copy"); btn.classList.remove("copied"); }, 2000);
  });
};

function renderMarkdown(text) {
  if (typeof marked === "undefined") return escapeHtml(text);
  try { return marked.parse(text); } catch { return escapeHtml(text); }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---- Main App Class ----
class NexusChat {
  constructor() {
    this.conversations = Store.get("conversations", []);
    this.activeId = Store.get("activeId", null);
    this.settings = Store.get("settings", {
      keys: {},
      urls: {},
      systemPrompt: "You are a helpful assistant.",
      temperature: 0.7,
      currentModel: "openai/gpt-4o",
      language: "en",
    });
    this.isStreaming = false;
    this.abortController = null;
    this.init();
  }

  init() {
    setupMarked();
    this.cacheDom();
    this.bindEvents();
    this.populateModels();
    this.renderSidebar();
    this.loadActiveChat();
    this.loadSettingsToUI();
    this.applyLanguage();
  }

  cacheDom() {
    this.sidebar = document.getElementById("sidebar");
    this.sidebarOverlay = document.getElementById("sidebar-overlay");
    this.convList = document.getElementById("conversation-list");
    this.messages = document.getElementById("messages");
    this.welcome = document.getElementById("welcome");
    this.input = document.getElementById("message-input");
    this.sendBtn = document.getElementById("send-btn");
    this.stopBtn = document.getElementById("stop-btn");
    this.modelSelect = document.getElementById("model-select");
    this.settingsModal = document.getElementById("settings-modal");
    this.contextMenu = document.getElementById("context-menu");
    this.statusText = document.getElementById("status-text");
    this.langSelect = document.getElementById("lang-select");
    this.settingsLangSelect = document.getElementById("settings-lang");
  }

  bindEvents() {
    document.getElementById("sidebar-toggle").onclick = () => this.toggleSidebar();
    this.sidebarOverlay.onclick = () => this.toggleSidebar(false);
    document.getElementById("new-chat-btn").onclick = () => this.createChat();
    document.getElementById("settings-btn").onclick = () => this.openSettings();
    document.getElementById("header-settings").onclick = () => this.openSettings();
    document.getElementById("close-settings").onclick = () => this.closeSettings();
    this.settingsModal.onclick = (e) => { if (e.target === this.settingsModal) this.closeSettings(); };
    this.modelSelect.onchange = () => { this.settings.currentModel = this.modelSelect.value; this.saveSettings(); };
    this.sendBtn.onclick = () => this.sendMessage();
    this.stopBtn.onclick = () => this.stopStreaming();
    this.input.addEventListener("input", () => this.autoResize());
    this.input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); this.sendMessage(); } });

    document.querySelectorAll(".welcome .chip").forEach((chip) => {
      chip.onclick = () => {
        const provider = chip.dataset.provider;
        this.openSettings();
        setTimeout(() => { const input = document.getElementById("key-" + provider); if (input) input.focus(); }, 100);
      };
    });

    document.addEventListener("click", () => this.hideContextMenu());
    document.addEventListener("contextmenu", (e) => {
      const item = e.target.closest(".conv-item");
      if (item) { e.preventDefault(); this.showContextMenu(e, item.dataset.id); }
    });

    this.contextMenu.querySelectorAll("button").forEach((btn) => {
      btn.onclick = () => {
        const action = btn.dataset.action;
        const id = this.contextMenu.dataset.targetId;
        if (action === "rename") this.renameChat(id);
        if (action === "delete") this.deleteChat(id);
        this.hideContextMenu();
      };
    });

    this.settingsModal.addEventListener("input", () => this.saveSettingsFromUI());

    const tempSlider = document.getElementById("temperature");
    const tempValue = document.getElementById("temp-value");
    if (tempSlider) tempSlider.oninput = () => { tempValue.textContent = tempSlider.value; };

    // Language selectors
    if (this.langSelect) {
      this.langSelect.value = this.settings.language || "en";
      this.langSelect.onchange = () => {
        this.settings.language = this.langSelect.value;
        this.saveSettings();
        if (this.settingsLangSelect) this.settingsLangSelect.value = this.settings.language;
        this.applyLanguage();
        this.renderSidebar();
        this.loadActiveChat();
      };
    }

    if (this.settingsLangSelect) {
      this.settingsLangSelect.value = this.settings.language || "en";
      this.settingsLangSelect.onchange = () => {
        this.settings.language = this.settingsLangSelect.value;
        this.saveSettings();
        if (this.langSelect) this.langSelect.value = this.settings.language;
        this.applyLanguage();
        this.renderSidebar();
        this.loadActiveChat();
      };
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { this.closeSettings(); this.hideContextMenu(); }
    });
  }

  applyLanguage() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    if (this.input) this.input.placeholder = t("messagePlaceholder");
    document.title = "NexusChat - " + t("settings");
  }

  toggleSidebar(force) {
    const isOpen = this.sidebar.classList.contains("open");
    const shouldOpen = force !== undefined ? force : !isOpen;
    this.sidebar.classList.toggle("open", shouldOpen);
    this.sidebarOverlay.classList.toggle("active", shouldOpen);
  }

  renderSidebar() {
    if (this.conversations.length === 0) {
      this.convList.innerHTML = `<div style="padding: 20px 12px; text-align: center; color: var(--text-quaternary); font-size: 13px;">${t("noConversations")}</div>`;
      return;
    }
    this.convList.innerHTML = this.conversations.map((c) => `
      <div class="conv-item ${c.id === this.activeId ? "active" : ""}" data-id="${c.id}" onclick="app.switchChat('${c.id}')">
        <div class="conv-icon">${c.id === this.activeId ? "?" : "○"}</div>
        <div class="conv-info">
          <div class="conv-title">${escapeHtml(c.title)}</div>
          ${c.messages.length > 0 ? `<div class="conv-preview">${escapeHtml(this.getLastUserMessage(c))}</div>` : ""}
        </div>
        <button class="conv-delete" onclick="event.stopPropagation(); app.deleteChat('${c.id}')" title="${t("delete")}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`).join("");
  }

  getLastUserMessage(conv) {
    const userMsgs = conv.messages.filter((m) => m.role === "user");
    if (userMsgs.length === 0) return t("newChat");
    const text = userMsgs[userMsgs.length - 1].content;
    return text.length > 50 ? text.slice(0, 50) + "..." : text;
  }

  createChat() {
    const id = "c_" + Date.now();
    const [provider, ...modelParts] = (this.settings.currentModel || "openai/gpt-4o").split("/");
    const conv = { id, title: t("newChat"), provider, model: modelParts.join("/"), messages: [], createdAt: Date.now() };
    this.conversations.unshift(conv);
    this.activeId = id;
    this.saveConversations();
    this.renderSidebar();
    this.loadActiveChat();
    this.toggleSidebar(false);
    this.input.focus();
  }

  switchChat(id) {
    if (this.isStreaming) return;
    this.activeId = id;
    Store.set("activeId", id);
    this.renderSidebar();
    this.loadActiveChat();
    this.toggleSidebar(false);
  }

  deleteChat(id) {
    this.conversations = this.conversations.filter((c) => c.id !== id);
    if (this.activeId === id) this.activeId = this.conversations.length > 0 ? this.conversations[0].id : null;
    this.saveConversations();
    this.renderSidebar();
    this.loadActiveChat();
  }

  renameChat(id) {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv) return;
    const newTitle = prompt(t("renamePrompt"), conv.title);
    if (newTitle && newTitle.trim()) { conv.title = newTitle.trim(); this.saveConversations(); this.renderSidebar(); }
  }

  getActiveConv() { return this.conversations.find((c) => c.id === this.activeId) || null; }
  saveConversations() { Store.set("conversations", this.conversations); Store.set("activeId", this.activeId); }

  loadActiveChat() {
    const conv = this.getActiveConv();
    if (!conv) {
      this.messages.innerHTML = "";
      this.messages.appendChild(this.welcome);
      this.welcome.classList.remove("hidden");
      this.sendBtn.disabled = true;
      return;
    }
    this.welcome.classList.add("hidden");
    this.renderMessages(conv);
    const modelKey = conv.provider + "/" + conv.model;
    if (this.modelSelect.querySelector(`option[value="${modelKey}"]`)) {
      this.modelSelect.value = modelKey;
      this.settings.currentModel = modelKey;
    }
  }

  renderMessages(conv) {
    const existing = this.messages.querySelectorAll(".message, .messages-inner");
    existing.forEach((el) => el.remove());
    if (conv.messages.length === 0) {
      this.welcome.classList.remove("hidden");
      this.messages.appendChild(this.welcome);
      this.sendBtn.disabled = false;
      this.input.focus();
      return;
    }
    this.welcome.classList.add("hidden");
    const wrapper = document.createElement("div");
    wrapper.className = "messages-inner";
    conv.messages.forEach((msg, i) => { wrapper.appendChild(this.createMessageEl(msg, i)); });
    this.messages.appendChild(wrapper);
    this.scrollToBottom();
    this.sendBtn.disabled = false;
  }

  createMessageEl(msg, index) {
    const div = document.createElement("div");
    div.className = `message ${msg.role}`;
    div.dataset.index = index;
    const avatarText = msg.role === "user" ? "U" : "AI";
    div.innerHTML = `
      <div class="message-avatar">${avatarText}</div>
      <div class="message-content">
        <div class="message-role">${msg.role === "user" ? t("you") : t("assistant")}</div>
        <div class="message-body">${msg.role === "user" ? escapeHtml(msg.content) : renderMarkdown(msg.content)}</div>
        <div class="message-actions">
          <button onclick="app.copyMessage(${index})" title="${t("copy")}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            ${t("copy")}
          </button>
        </div>
      </div>`;
    return div;
  }

  copyMessage(index) {
    const conv = this.getActiveConv();
    if (!conv || !conv.messages[index]) return;
    navigator.clipboard.writeText(conv.messages[index].content).then(() => { this.setStatus(t("copied")); setTimeout(() => this.setStatus(""), 2000); });
  }

  appendStreamingMessage() {
    let wrapper = this.messages.querySelector(".messages-inner");
    if (!wrapper) { wrapper = document.createElement("div"); wrapper.className = "messages-inner"; this.messages.appendChild(wrapper); }
    const div = document.createElement("div");
    div.className = "message assistant streaming";
    div.id = "streaming-msg";
    div.innerHTML = `
      <div class="message-avatar">AI</div>
      <div class="message-content">
        <div class="message-role">${t("assistant")}</div>
        <div class="message-body"><div class="thinking"><div class="thinking-dot"></div><div class="thinking-dot"></div><div class="thinking-dot"></div></div></div>
      </div>`;
    wrapper.appendChild(div);
    this.scrollToBottom();
    return div;
  }

  updateStreamingMessage(el, content) {
    const body = el.querySelector(".message-body");
    body.innerHTML = renderMarkdown(content) + '<span class="streaming-cursor"></span>';
    this.scrollToBottom();
  }

  finalizeStreamingMessage(el, content) {
    const body = el.querySelector(".message-body");
    body.innerHTML = renderMarkdown(content);
    el.classList.remove("streaming");
    el.removeAttribute("id");
  }

  scrollToBottom() { requestAnimationFrame(() => { this.messages.scrollTop = this.messages.scrollHeight; }); }
  autoResize() { this.input.style.height = "auto"; this.input.style.height = Math.min(this.input.scrollHeight, 160) + "px"; this.sendBtn.disabled = !this.input.value.trim() && !this.getActiveConv(); }
  setStatus(text) { this.statusText.textContent = text; }

  async sendMessage() {
    const text = this.input.value.trim();
    if (!text || this.isStreaming) return;
    let conv = this.getActiveConv();
    if (!conv) { this.createChat(); conv = this.getActiveConv(); }
    if (conv.messages.length === 0) conv.title = text.length > 40 ? text.slice(0, 40) + "..." : text;
    const modelKey = this.modelSelect.value || this.settings.currentModel || "openai/gpt-4o";
    const [provider, ...modelParts] = modelKey.split("/");
    conv.provider = provider;
    conv.model = modelParts.join("/");
    conv.messages.push({ role: "user", content: text });
    this.input.value = "";
    this.autoResize();
    this.saveConversations();
    this.renderMessages(conv);
    this.renderSidebar();
    const apiMessages = [];
    if (this.settings.systemPrompt) apiMessages.push({ role: "system", content: this.settings.systemPrompt });
    conv.messages.forEach((m) => { apiMessages.push({ role: m.role, content: m.content }); });
    this.isStreaming = true;
    this.sendBtn.classList.add("hidden");
    this.stopBtn.classList.remove("hidden");
    this.setStatus(t("thinking"));
    this.abortController = new AbortController();
    const streamEl = this.appendStreamingMessage();
    let fullContent = "";
    try {
      await this.streamResponse(provider, conv.model, apiMessages, (chunk) => { fullContent += chunk; this.updateStreamingMessage(streamEl, fullContent); this.setStatus(t("generating")); }, this.abortController.signal);
      conv.messages.push({ role: "assistant", content: fullContent });
      this.finalizeStreamingMessage(streamEl, fullContent);
      this.saveConversations();
      this.setStatus("");
    } catch (err) {
      if (err.name === "AbortError") {
        if (fullContent) { conv.messages.push({ role: "assistant", content: fullContent }); this.finalizeStreamingMessage(streamEl, fullContent); this.saveConversations(); } else streamEl.remove();
        this.setStatus(t("stopped"));
      } else {
        const errorMsg = err.message || t("error");
        streamEl.querySelector(".message-body").innerHTML = `<div style="color: var(--red);">${t("error")}: ${escapeHtml(errorMsg)}</div>`;
        this.setStatus(t("error") + ": " + errorMsg);
      }
    } finally {
      this.isStreaming = false;
      this.sendBtn.classList.remove("hidden");
      this.stopBtn.classList.add("hidden");
      this.sendBtn.disabled = !this.input.value.trim();
      this.abortController = null;
      setTimeout(() => this.setStatus(""), 5000);
    }
  }

  stopStreaming() { if (this.abortController) this.abortController.abort(); }

  async streamResponse(provider, model, messages, onChunk, signal) {
    const key = this.settings.keys[provider];
    if (!key) throw new Error(t("noApiKey", { provider: PROVIDERS[provider]?.name || provider }));
    if (provider === "gemini") return this.streamGemini(model, messages, key, onChunk, signal);
    const baseUrl = this.settings.urls[provider] || PROVIDERS[provider].endpoint;
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${key}` };
    if (provider === "openrouter") { headers["HTTP-Referer"] = window.location.origin; headers["X-Title"] = "NexusChat"; }
    const body = { model, messages, stream: true, temperature: parseFloat(this.settings.temperature) || 0.7 };
    if (model.startsWith("o1")) { body.stream = false; delete body.temperature; }
    const res = await fetch(baseUrl, { method: "POST", headers, body: JSON.stringify(body), signal });
    if (!res.ok) { let errMsg = `API error ${res.status}`; try { const errData = await res.json(); errMsg = errData.error?.message || errData.message || errMsg; } catch {} throw new Error(errMsg); }
    if (!body.stream) { const data = await res.json(); onChunk(data.choices?.[0]?.message?.content || ""); return; }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);
        if (data === "[DONE]") return;
        try { const json = JSON.parse(data); if (json.choices?.[0]?.delta?.content) onChunk(json.choices[0].delta.content); } catch {}
      }
    }
  }

  async streamGemini(model, messages, apiKey, onChunk, signal) {
    const url = `${PROVIDERS.gemini.endpoint}/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
    const contents = [];
    for (const m of messages) { if (m.role === "system") continue; contents.push({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }); }
    const systemInstruction = messages.find((m) => m.role === "system");
    const body = { contents, generationConfig: { temperature: parseFloat(this.settings.temperature) || 0.7 } };
    if (systemInstruction) body.systemInstruction = { parts: [{ text: systemInstruction.content }] };
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal });
    if (!res.ok) { let errMsg = `Gemini API error ${res.status}`; try { const errData = await res.json(); errMsg = errData.error?.message || errMsg; } catch {} throw new Error(errMsg); }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        try { const json = JSON.parse(trimmed.slice(6)); const text = json.candidates?.[0]?.content?.parts?.[0]?.text; if (text) onChunk(text); } catch {}
      }
    }
  }

  populateModels() {
    this.modelSelect.innerHTML = "";
    for (const [key, provider] of Object.entries(PROVIDERS)) {
      const group = document.createElement("optgroup");
      group.label = provider.name;
      provider.models.forEach((m) => { const opt = document.createElement("option"); opt.value = key + "/" + m.id; opt.textContent = m.name; group.appendChild(opt); });
      this.modelSelect.appendChild(group);
    }
    if (this.settings.currentModel) this.modelSelect.value = this.settings.currentModel;
  }

  openSettings() { this.settingsModal.classList.remove("hidden"); }
  closeSettings() { this.settingsModal.classList.add("hidden"); }

  loadSettingsToUI() {
    ["openai", "openrouter", "gemini", "deepseek"].forEach((p) => {
      const keyInput = document.getElementById("key-" + p);
      const urlInput = document.getElementById("url-" + p);
      if (keyInput) keyInput.value = this.settings.keys[p] || "";
      if (urlInput) urlInput.value = this.settings.urls[p] || "";
    });
    const sp = document.getElementById("system-prompt");
    if (sp) sp.value = this.settings.systemPrompt || "";
    const temp = document.getElementById("temperature");
    const tempVal = document.getElementById("temp-value");
    if (temp) { temp.value = this.settings.temperature ?? 0.7; if (tempVal) tempVal.textContent = temp.value; }
    if (this.langSelect) this.langSelect.value = this.settings.language || "en";
    if (this.settingsLangSelect) this.settingsLangSelect.value = this.settings.language || "en";
  }

  saveSettingsFromUI() {
    ["openai", "openrouter", "gemini", "deepseek"].forEach((p) => {
      const keyInput = document.getElementById("key-" + p);
      const urlInput = document.getElementById("url-" + p);
      if (keyInput && keyInput.value.trim()) this.settings.keys[p] = keyInput.value.trim();
      if (urlInput && urlInput.value.trim()) this.settings.urls[p] = urlInput.value.trim();
    });
    const sp = document.getElementById("system-prompt");
    if (sp) this.settings.systemPrompt = sp.value;
    const temp = document.getElementById("temperature");
    if (temp) this.settings.temperature = parseFloat(temp.value);
    this.saveSettings();
  }

  saveSettings() { Store.set("settings", this.settings); }

  showContextMenu(e, id) {
    this.contextMenu.dataset.targetId = id;
    this.contextMenu.classList.remove("hidden");
    const x = Math.min(e.clientX, window.innerWidth - 160);
    const y = Math.min(e.clientY, window.innerHeight - 100);
    this.contextMenu.style.left = x + "px";
    this.contextMenu.style.top = y + "px";
  }

  hideContextMenu() { this.contextMenu.classList.add("hidden"); }
}

let app;
document.addEventListener("DOMContentLoaded", () => { app = new NexusChat(); });
