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

### 1. 开发新功能
```bash
# 在main分支上开发
git checkout main
# 进行开发...
git add .
git commit -m "Add new features"
git push origin main
```

### 2. 创建新版本分支
```bash
# 创建新版本分支（例如v1.1.0）
git checkout -b v1.1.0-release
git push origin v1.1.0-release
```

### 3. 创建版本标签
```bash
git tag -a v1.1.0 -m "Version 1.1.0 - New features"
git push origin v1.1.0
```

### 4. 创建部署工作流
创建 `.github/workflows/deploy-v1.1.0.yml` 文件，内容参考 `deploy-v1.0.0.yml`，修改：
- 分支名：`v1.1.0-release`
- 部署路径：`/MD/v1.1.0/`

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

## 📝 注意事项

- 每个版本都有独立的访问链接
- 历史版本不会受到新开发的影响
- 可以同时维护多个版本
- 版本间完全隔离，互不影响
