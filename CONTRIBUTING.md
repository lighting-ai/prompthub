# 贡献指南

感谢您考虑为PromptHub做出贡献！这是一个开源项目，我们欢迎社区的贡献和参与。

## 如何贡献

### 报告Bug

如果您发现了bug，请通过GitHub issues报告，并包含以下信息：

1. 问题的简要描述
2. 重现步骤
3. 预期行为
4. 实际行为
5. 截图（如适用）
6. 您的环境信息（操作系统、浏览器等）

### 功能请求

如果您有新功能的想法，请通过GitHub issues提交，并尽可能详细地描述该功能。

### 提交Pull Request

1. Fork仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 开发设置

### 前提条件

- Node.js 16.x或更高版本
- npm 8.x或更高版本

### 本地开发

1. 克隆仓库
   \`\`\`bash
   git clone https://github.com/yourusername/prompthub.git
   cd prompthub
   \`\`\`

2. 安装依赖
   \`\`\`bash
   npm install
   \`\`\`

3. 设置环境变量
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   编辑`.env.local`文件设置必要的环境变量。

4. 启动开发服务器
   \`\`\`bash
   npm run dev
   \`\`\`

## 代码规范

- 使用ESLint和Prettier保持代码风格一致
- 编写有意义的提交消息
- 为新功能添加适当的测试
- 更新文档以反映任何更改

## Pull Request流程

1. 确保您的PR针对`main`分支
2. 链接相关的issue（如适用）
3. 包含对更改的清晰描述
4. 确保所有测试通过
5. 获得至少一个维护者的批准

## 许可证

通过贡献您的代码，您同意您的贡献将根据项目的[MIT许可证](LICENSE)进行许可。
\`\`\`

现在，让我们添加一个.gitignore文件：

```text file=".gitignore"
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea/
.vscode/
*.swp
*.swo
