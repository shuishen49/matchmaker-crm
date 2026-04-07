# Matchmaker CRM

婚恋机构 CRM 前端演示工作台（React + Vite），覆盖销售、服务、财务、记录、管理、设置全流程页面，可本地预览，也可发布到 GitHub Pages。

## 功能亮点

- **销售全链路**：待分配资源、我的资源、到店预测/登记、面谈、协作、公海、回收站、合同、收款、短信记录
- **服务全链路**：待分配客户、我的客户、约见管理、关单库、嘉宾库、服务合同
- **财务全链路**：合同管理、收款管理、退款管理、红娘业绩（含目标/完成度）
- **运营支持**：跟进小记、导入/导出记录、部门/角色/红娘管理、话术库/模板/套餐/账号设置
- **演示可用**：关键页面均有真实演示数据，不含“开发中/暂无数据”空壳

## 项目截图

### 登录页
![登录页](./docs/screenshots/login.png)

### 数据首页
![数据首页](./docs/screenshots/dashboard.png)

### 销售管理（资源）
![销售管理](./docs/screenshots/resources.png)

### 服务 / 财务
![服务与财务](./docs/screenshots/service-finance.png)

### 记录 / 设置
![记录与设置](./docs/screenshots/records-settings.png)

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址（Vite）：`http://127.0.0.1:3000/`

## 本地预览（生产构建）

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

预览地址：`http://127.0.0.1:4173/matchmaker-crm/`

## 在线地址（GitHub Pages）

- 预期访问地址：`https://shuishen49.github.io/matchmaker-crm/`
- 已配置工作流：`.github/workflows/deploy.yml`
- 推送 `main` 分支后自动部署

## 项目结构

```text
matchmaker-crm/
├─ components/             # 页面组件
├─ docs/screenshots/       # README 截图
├─ scripts/                # 自动截图脚本
├─ .github/workflows/      # GitHub Pages 部署工作流
├─ App.tsx
├─ vite.config.ts
└─ package.json
```

## 说明

若仓库名不是 `matchmaker-crm`，构建时请指定 base：

```powershell
$env:VITE_BASE_PATH='/你的仓库名/'; npm run build
```

避免 GitHub Pages 资源路径 404。
