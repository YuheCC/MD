# 🔧 GitHub Pages 环境配置指南

## 📋 当前需要配置的环境

### 1. 主环境（已配置）
- **环境名称**：`github-pages`
- **分支**：`main`
- **访问链接**：https://yuhecc.github.io/MD/

### 2. V1.0.0环境（需要配置）
- **环境名称**：`github-pages-v1.0.0`
- **分支**：`v1.0.0-release`
- **访问链接**：https://yuhecc.github.io/MD/v1.0.0/

## ⚙️ 配置步骤

### 步骤1：进入GitHub仓库设置
1. 访问：https://github.com/YuheCC/MD/settings/pages
2. 确保已登录GitHub账户

### 步骤2：配置V1.0.0环境
1. 在左侧菜单中点击 **"Environments"**
2. 点击 **"New environment"**
3. 输入环境名称：`github-pages-v1.0.0`
4. 点击 **"Configure environment"**

### 步骤3：设置环境保护规则（可选）
1. 在 **"Environment protection rules"** 部分：
   - **Required reviewers**：可以设置需要审核的人员
   - **Wait timer**：可以设置等待时间
   - **Deployment branches**：可以限制部署分支
2. 点击 **"Save protection rules"**

### 步骤4：配置部署源
1. 在 **"Source"** 部分选择 **"GitHub Actions"**
2. 确保环境设置正确

## 🚀 触发部署

### 自动触发
推送代码到对应分支会自动触发部署：
```bash
git checkout v1.0.0-release
git push origin v1.0.0-release
```

### 手动触发
1. 访问：https://github.com/YuheCC/MD/actions
2. 选择 **"Deploy V1.0.0"** 工作流
3. 点击 **"Run workflow"**
4. 选择分支：`v1.0.0-release`
5. 点击 **"Run workflow"**

## 🔍 验证部署

### 检查部署状态
1. **GitHub Actions**：https://github.com/YuheCC/MD/actions
2. **GitHub Pages设置**：https://github.com/YuheCC/MD/settings/pages
3. **环境状态**：在Environments页面查看部署历史

### 测试访问链接
- **V1.0.0版本**：https://yuhecc.github.io/MD/v1.0.0/
- **最新版本**：https://yuhecc.github.io/MD/

## 🛠️ 故障排除

### 部署失败
1. 检查GitHub Actions日志
2. 确认环境名称正确
3. 检查分支名称匹配
4. 验证工作流文件语法

### 访问404
1. 确认部署成功完成
2. 等待CDN更新（通常需要几分钟）
3. 检查base路径配置
4. 验证GitHub Pages设置

### 环境冲突
1. 确保每个版本使用独立环境
2. 检查环境名称唯一性
3. 验证分支配置正确

## 📊 监控和维护

### 定期检查
- 每周检查部署状态
- 监控访问链接可用性
- 查看GitHub Actions运行情况

### 版本管理
- 及时创建新版本环境
- 清理不再使用的环境
- 更新部署配置

## 🎯 最佳实践

1. **环境命名**：使用版本号作为环境名称
2. **分支管理**：每个版本使用独立分支
3. **自动化**：优先使用自动化部署
4. **监控**：定期检查部署状态
5. **文档**：及时更新配置文档

## 📞 支持资源

- **GitHub Pages文档**：https://docs.github.com/en/pages
- **GitHub Actions文档**：https://docs.github.com/en/actions
- **项目文档**：查看项目根目录的README.md
- **部署指南**：查看DEPLOYMENT_GUIDE.md
