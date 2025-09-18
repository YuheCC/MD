# MD - 分子动力学分析平台

一个现代化的分子动力学分析平台，支持盐和溶剂配置、分析计算和结果展示。

## 🚀 快速开始

### 在线访问
- **最新版本**：https://yuhecc.github.io/MD/
- **V1.0.0版本**：https://yuhecc.github.io/MD/v1.0.0/

### 本地开发
```bash
# 克隆仓库
git clone https://github.com/YuheCC/MD.git
cd MD

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 📋 功能特性

### 🔬 配置功能
- **盐配置**：支持多种阳离子和阴离子选择
- **溶剂配置**：SMILES字符串输入和分数类型选择
- **实时验证**：输入验证和错误提示
- **配置摘要**：实时显示配置信息

### ⚡ 分析计算
- **3分钟计算模拟**：真实的计算过程体验
- **进度显示**：计算状态和进度提示
- **自动跳转**：计算完成后自动跳转到结果页面

### 📊 结果展示
- **系统属性**：密度、粘度、电导率等指标
- **聚类分析**：离子聚类统计和分类
- **分析图表**：径向分布函数和均方位移
- **文件下载**：JSON格式的分析结果

### 📚 记录管理
- **历史记录**：保存所有分析配置
- **详情查看**：完整的配置和结果信息
- **记录删除**：管理历史分析记录

## 🏗️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **UI组件**：Shadcn/ui + Tailwind CSS
- **图标库**：Lucide React
- **部署平台**：GitHub Pages

## 📁 项目结构

```
MD/
├── src/
│   ├── components/          # React组件
│   │   ├── ui/             # 基础UI组件
│   │   ├── SaltConfiguration.tsx
│   │   ├── SolventConfiguration.tsx
│   │   ├── FormulationPage.tsx
│   │   ├── ResultsPage.tsx
│   │   └── AnalysisRecords.tsx
│   ├── styles/             # 样式文件
│   └── main.tsx           # 应用入口
├── scripts/               # 自动化脚本
│   ├── create-version.sh  # 版本创建脚本
│   └── check-deployment.sh # 部署检查脚本
├── .github/workflows/     # GitHub Actions
└── docs/                 # 文档
```

## 🔄 版本管理

### 当前版本
- **V1.0.0**：基础功能版本，包含完整的配置和分析流程

### 创建新版本
```bash
# 使用自动化脚本
./scripts/create-version.sh v1.1.0

# 检查部署状态
./scripts/check-deployment.sh
```

### 版本访问
- 每个版本都有独立的访问链接
- 历史版本永久保存
- 版本间完全隔离

## 📖 文档

- [版本访问说明](VERSION_ACCESS.md) - 详细的版本管理指南
- [部署操作指南](DEPLOYMENT_GUIDE.md) - 完整的部署流程说明

## 🛠️ 开发指南

### 环境要求
- Node.js 18+
- npm 或 yarn

### 开发命令
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
npm run lint         # 代码检查
```

### 代码规范
- 使用TypeScript进行类型检查
- 遵循ESLint规则
- 使用Prettier格式化代码

## 🚀 部署

### 自动部署
- 推送到main分支自动部署最新版本
- 推送到版本分支自动部署对应版本

### 手动部署
- 使用GitHub Actions手动触发部署
- 支持多环境部署配置

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

MIT License

## 📞 支持

如有问题或建议，请：
1. 查看文档
2. 检查GitHub Issues
3. 创建新的Issue

---

**项目地址**：https://github.com/YuheCC/MD  
**在线演示**：https://yuhecc.github.io/MD/