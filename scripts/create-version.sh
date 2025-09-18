#!/bin/bash

# 版本创建脚本
# 用法: ./scripts/create-version.sh <version>
# 例如: ./scripts/create-version.sh v1.1.0

if [ $# -eq 0 ]; then
    echo "用法: $0 <version>"
    echo "例如: $0 v1.1.0"
    exit 1
fi

VERSION=$1
BRANCH_NAME="${VERSION}-release"
WORKFLOW_FILE=".github/workflows/deploy-${VERSION}.yml"

echo "🚀 创建版本 $VERSION..."

# 1. 创建版本分支
echo "📝 创建分支 $BRANCH_NAME..."
git checkout -b $BRANCH_NAME
git push origin $BRANCH_NAME

# 2. 创建版本标签
echo "🏷️  创建标签 $VERSION..."
git tag -a $VERSION -m "Version $VERSION"
git push origin $VERSION

# 3. 创建部署工作流文件
echo "⚙️  创建部署工作流..."
cat > $WORKFLOW_FILE << EOF
name: Deploy $VERSION

on:
  push:
    branches: [ $BRANCH_NAME ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: $BRANCH_NAME

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
          VITE_BASE_PATH: /MD/$VERSION/

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages-$VERSION
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# 4. 提交工作流文件
echo "💾 提交工作流文件..."
git add $WORKFLOW_FILE
git commit -m "Add deployment workflow for $VERSION"
git push origin $BRANCH_NAME

# 5. 切换回main分支
echo "🔄 切换回main分支..."
git checkout main

echo "✅ 版本 $VERSION 创建完成！"
echo ""
echo "📋 访问链接："
echo "  - 代码: https://github.com/YuheCC/MD/tree/$BRANCH_NAME"
echo "  - 在线: https://yuhecc.github.io/MD/$VERSION/ (部署完成后)"
echo ""
echo "📝 下一步："
echo "  1. 在GitHub仓库设置中启用 Pages 环境 'github-pages-$VERSION'"
echo "  2. 等待自动部署完成"
echo "  3. 访问 https://yuhecc.github.io/MD/$VERSION/ 查看结果"
