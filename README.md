# Insightst Design

洞察时空 UI 组件库.

## Structure

- `apps/docs`: 组件文档项目 (runs on port 3000)
- `apps/playground`: React playground for testing components (runs on port 3001)
- `packages/ui`: The main UI component library
- `packages/theme`: Design tokens and theme configuration
- `packages/icons`: Icon library (wrapping lucide-react)
- `packages/hooks`: Shared React hooks
- `packages/utils`: Helper functions

## Commands

- `npm run dev`: 调试组件
- `npm run docs`: 运行组件文档 (port 3000)
- `npm run build`: 编译组件代码
- `npm run clean`: Remove build artifacts

## 发布项目

- `npm adduser` 在 npm 仓库创建用户信息
- `npm install -D @changesets/cli` 安装 changesets 工具自动化发布，避免自己手动修改版本号
- `npx changeset init` 初始化 Changesets
- `npx changeset` 修改源码后，执行该命令进入版本控制交互流程
- `npx changeset version` 执行升级版本
- `npm login` 登录 npm 仓库
- `npx changeset publish` 发布项目至 npm 仓库

## Components

### Tabs

A customized version of Ant Design's Tabs component with a `borderless` variant.

### Panel

A customized version of Ant Design's Card component with configurable `shadow` levels and rounded corners.
