# 🚀 部署操作指南

## 📋 当前状态

### 已完成的设置：
- ✅ V1.0.0版本分支：`v1.0.0-release`
- ✅ V1.0.0部署工作流：`.github/workflows/deploy-v1.0.0.yml`
- ✅ V1.1.0部署模板：`.github/workflows/deploy-v1.1.0.yml`
- ✅ 自动化脚本：`scripts/create-version.sh`
- ✅ 版本管理文档：`VERSION_ACCESS.md`

## ⚙️ GitHub Pages环境设置

### 1. 进入GitHub仓库设置
访问：https://github.com/YuheCC/MD/settings/pages

### 2. 创建V1.0.0环境
1. 点击左侧菜单的 **"Environments"**
2. 点击 **"New environment"**
3. 输入环境名称：`github-pages-v1.0.0`
4. 点击 **"Configure environment"**
5. 在 **"Environment protection rules"** 中：
   - 可以设置 **"Required reviewers"**（可选）
   - 可以设置 **"Wait timer"**（可选）
6. 点击 **"Save protection rules"**

### 3. 配置部署分支
1. 在 **"Source"** 部分选择 **"GitHub Actions"**
2. 确保 **"Environments"** 设置为 `github-pages-v1.0.0`

## 🔄 触发部署

### 方法一：自动触发（推荐）
推送代码到对应分支会自动触发部署：
```bash
git checkout v1.0.0-release
git push origin v1.0.0-release
```

### 方法二：手动触发
1. 进入GitHub仓库的 **"Actions"** 标签
2. 选择 **"Deploy V1.0.0"** 工作流
3. 点击 **"Run workflow"**
4. 选择分支：`v1.0.0-release`
5. 点击 **"Run workflow"**

## 📍 访问链接

### V1.0.0版本
- **在线访问**：https://yuhecc.github.io/MD/v1.0.0/
- **GitHub代码**：https://github.com/YuheCC/MD/tree/v1.0.0-release
- **部署状态**：https://github.com/YuheCC/MD/actions

### 最新开发版本
- **在线访问**：https://yuhecc.github.io/MD/
- **GitHub代码**：https://github.com/YuheCC/MD

## 🆕 创建新版本

### 使用自动化脚本
```bash
# 创建V1.1.0版本
./scripts/create-version.sh v1.1.0

# 创建V1.2.0版本
./scripts/create-version.sh v1.2.0
```

### 手动创建步骤
1. **开发新功能**（在main分支）
2. **创建版本分支**：`git checkout -b v1.1.0-release`
3. **创建版本标签**：`git tag -a v1.1.0 -m "Version 1.1.0"`
4. **推送分支和标签**：`git push origin v1.1.0-release && git push origin v1.1.0`
5. **在GitHub设置中创建对应环境**：`github-pages-v1.1.0`

## 🔍 故障排除

### 部署失败
1. 检查GitHub Actions日志
2. 确认环境设置正确
3. 检查分支名称和标签是否匹配

### 访问链接404
1. 确认部署成功完成
2. 检查GitHub Pages设置
3. 等待几分钟让CDN更新

### 版本冲突
1. 确保每个版本使用独立的环境
2. 检查工作流文件中的环境名称
3. 确认分支名称正确

## 📊 监控部署状态

### GitHub Actions
- 访问：https://github.com/YuheCC/MD/actions
- 查看部署状态和日志

### GitHub Pages
- 访问：https://github.com/YuheCC/MD/settings/pages
- 查看部署历史和状态

## 🎯 最佳实践

1. **版本命名**：使用语义化版本号（v1.0.0, v1.1.0, v2.0.0）
2. **分支管理**：每个版本使用独立分支
3. **环境隔离**：每个版本使用独立GitHub Pages环境
4. **自动化**：优先使用自动化脚本创建版本
5. **文档更新**：及时更新版本访问文档

## 📞 支持

如果遇到问题，可以：
1. 查看GitHub Actions日志
2. 检查GitHub Pages设置
3. 参考 `VERSION_ACCESS.md` 文档
4. 使用自动化脚本重新创建版本
