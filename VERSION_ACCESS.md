# 版本访问说明

## 📍 当前版本访问链接

### V1.0.0版本（稳定版本）
- **在线访问**：https://yuhecc.github.io/MD/v1.0.0/
- **GitHub代码**：https://github.com/YuheCC/MD/tree/v1.0.0-release
- **功能**：完整的loading页面，3分钟计算模拟

### 最新开发版本（main分支）
- **在线访问**：https://yuhecc.github.io/MD/
- **GitHub代码**：https://github.com/YuheCC/MD
- **功能**：最新开发功能

## 🔄 如何创建新版本

### 方法一：使用自动化脚本（推荐）
```bash
# 使用脚本自动创建版本
./scripts/create-version.sh v1.1.0
```

### 方法二：手动创建
#### 1. 开发新功能
```bash
# 在main分支上开发
git checkout main
# 进行开发...
git add .
git commit -m "Add new features"
git push origin main
```

#### 2. 创建新版本分支
```bash
# 创建新版本分支（例如v1.1.0）
git checkout -b v1.1.0-release
git push origin v1.1.0-release
```

#### 3. 创建版本标签
```bash
git tag -a v1.1.0 -m "Version 1.1.0 - New features"
git push origin v1.1.0
```

#### 4. 创建部署工作流
创建 `.github/workflows/deploy-v1.1.0.yml` 文件，内容参考 `deploy-v1.0.0.yml`，修改：
- 分支名：`v1.1.0-release`
- 部署路径：`/MD/v1.1.0/`
- 环境名：`github-pages-v1.1.0`

## 📋 版本管理最佳实践

1. **版本命名**：使用语义化版本号（如 v1.0.0, v1.1.0, v2.0.0）
2. **分支命名**：`{version}-release`
3. **标签命名**：`{version}`
4. **部署路径**：`/MD/{version}/`

## 🚀 自动化部署

每个版本分支都有独立的GitHub Actions工作流，会自动：
1. 监听对应分支的推送
2. 构建项目
3. 部署到对应的子路径
4. 更新在线访问链接

## ⚙️ GitHub Pages环境设置

每个版本需要独立的GitHub Pages环境：

1. **进入GitHub仓库设置**
   - 访问：https://github.com/YuheCC/MD/settings/pages

2. **创建新环境**
   - 点击 "Environments" 标签
   - 点击 "New environment"
   - 输入环境名：`github-pages-v1.0.0`（对应版本）
   - 设置保护规则（可选）

3. **配置部署分支**
   - 选择对应的版本分支
   - 设置部署路径

## 📝 注意事项

- 每个版本都有独立的访问链接
- 历史版本不会受到新开发的影响
- 可以同时维护多个版本
- 版本间完全隔离，互不影响
- 首次部署需要手动在GitHub设置中启用对应环境
