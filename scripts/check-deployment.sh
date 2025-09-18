#!/bin/bash

# 部署状态检查脚本
# 用法: ./scripts/check-deployment.sh

echo "🔍 检查部署状态..."
echo ""

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 当前分支: $CURRENT_BRANCH"

# 检查版本标签
echo ""
echo "🏷️  版本标签:"
git tag -l | sort -V

# 检查分支
echo ""
echo "🌿 版本分支:"
git branch -r | grep -E "(v[0-9]+\.[0-9]+\.[0-9]+-release)" | sort

# 检查工作流文件
echo ""
echo "⚙️  部署工作流:"
ls -la .github/workflows/deploy-*.yml 2>/dev/null || echo "  未找到部署工作流文件"

# 检查GitHub Actions状态
echo ""
echo "🚀 GitHub Actions状态:"
echo "   访问: https://github.com/YuheCC/MD/actions"

# 检查GitHub Pages状态
echo ""
echo "📄 GitHub Pages状态:"
echo "   访问: https://github.com/YuheCC/MD/settings/pages"

# 显示访问链接
echo ""
echo "🔗 访问链接:"
echo "   最新版本: https://yuhecc.github.io/MD/"
echo "   V1.0.0版本: https://yuhecc.github.io/MD/v1.0.0/"

# 检查本地更改
echo ""
echo "📝 本地更改状态:"
if [ -n "$(git status --porcelain)" ]; then
    echo "   ⚠️  有未提交的更改:"
    git status --short
else
    echo "   ✅ 工作目录干净"
fi

echo ""
echo "✅ 检查完成！"
