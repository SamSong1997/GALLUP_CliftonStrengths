# Gallup Strengths Finder Web App (盖洛普优势识别器)

一个基于 React 构建的现代化盖洛普优势识别（CliftonStrengths）Web 应用程序。该系统旨在帮助用户通过标准的 180 道测试题，发现并了解自己的 Top 5 核心优势及完整 34 项才干排序。

## ✨ 核心功能

*   **沉浸式测评体验**：
    *   完整复刻官方 180 道测试题。
    *   支持“A vs B”倾向性选择及中立选项。
    *   提供“速通测试”模式（开发调试用）。
    *   自动跳转与进度管理。

*   **科学评分引擎**：
    *   内置复杂的加权评分算法。
    *   实时计算 34 项才干得分。
    *   自动处理平分（Tie-breaking）逻辑。

*   **高保真专业报告**：
    *   **官方风格**：完美复刻 Gallup 官方报告的视觉风格（字体、配色、排版）。
    *   **DNA 条形码**：生成个性化的才干 DNA 可视化图表。
    *   **四大领域分类**：自动将才干归类为执行力、影响力、关系建立、战略思维四大领域，并使用标准色码。
    *   **深度解读**：提供 Top 5 优势的详细定义、个性化洞察及行动指南。

*   **导出与分享**：
    *   **Web 预览**：支持在新窗口中查看完整的 HTML 报告。
    *   **PDF 导出**：支持一键调用浏览器打印功能，将报告另存为高清晰度 PDF（自动保留背景色和样式）。

## 🛠 技术栈

*   **前端框架**：[React](https://reactjs.org/) (v18)
*   **构建工具**：[Vite](https://vitejs.dev/)
*   **样式方案**：Vanilla CSS (原生 CSS，模块化设计，无外部 UI 库依赖)
*   **图标库**：[Lucide React](https://lucide.dev/)
*   **字体**：Lora (衬线体) + Noto Sans SC (无衬线体)

## 🚀 快速开始

### 环境要求

*   Node.js (推荐 v16+)
*   npm 或 yarn

### 安装

1.  克隆项目到本地：
    ```bash
    git clone <repository-url>
    cd 盖洛普测试系统-Web应用
    ```

2.  安装依赖：
    ```bash
    npm install
    ```

### 运行开发服务器

```bash
npm run dev
```
启动后访问 `http://localhost:5173` 即可开始使用。

### 构建生产版本

```bash
npm run build
```
构建产物将输出到 `dist` 目录。

## ☁️ 部署 (Deployment)

本项目推荐使用 **Vercel** 进行部署（最简单、免费且速度快）。

1.  访问 [Vercel](https://vercel.com) 并使用 GitHub 账号登录。
2.  点击 **"Add New..."** -> **"Project"**。
3.  在列表中找到 `GALLUP_CliftonStrengths` 仓库，点击 **"Import"**。
4.  Vercel 会自动识别这是一个 Vite 项目：
    *   **Framework Preset**: Vite
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
5.  点击 **"Deploy"** 按钮。
6.  等待约 1 分钟，部署完成后，您将获得一个类似 `https://your-project.vercel.app` 的永久访问链接。

### 其他部署方式

由于本项目是纯静态的单页应用 (SPA)，您也可以将其部署到：
*   **Netlify**: 流程与 Vercel 类似，直接导入 GitHub 仓库即可。
*   **GitHub Pages**: 需要配置 GitHub Actions。
*   **Nginx/Apache**: 执行 `npm run build` 后，将 `dist` 目录下的所有文件上传到服务器的 Web 根目录即可。

## 📂 项目结构

```
src/
├── components/        # UI 组件
│   ├── WelcomeScreen.jsx  # 首页
│   ├── QuizScreen.jsx     # 答题页
│   ├── QuestionCard.jsx   # 题目卡片
│   ├── ProcessingScreen.jsx # 计算过渡页
│   └── ReportScreen.jsx   # 报告生成页
├── utils/             # 工具类
│   ├── data.js            # 数据加载器
│   ├── gallupData.js      # 题库与才干定义数据
│   ├── scoring.js         # 评分算法引擎
│   └── ai.js              # (预留) AI 接口层
├── App.jsx            # 主应用入口
├── App.css            # 全局样式
└── main.jsx           # 渲染入口
```

## 🎨 报告样式说明

报告生成器 (`ReportScreen.jsx`) 采用内联 CSS 方案，确保生成的 HTML 报告是完全独立的（Self-contained），可以直接保存为 HTML 文件或打印为 PDF，无需依赖外部样式表文件。

## 📄 许可证

MIT License
