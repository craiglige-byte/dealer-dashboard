# 渠道运营考核评估系统 (Channel Operations Assessment System)

这是一个基于 React 18 + TypeScript + Vite + Tailwind CSS 开发的现代化渠道运营考核与多维数据下钻分析平台。

## 项目特点

- **多层级视角下钻**：支持“全国 - 战区 - 作战部 - 作战分部”4级架构自由下钻与面包屑层级导航。
- **总表考核评估**：显示综合评估分值及7大维度考核细项（基础履约、分销网络、库存动销、窜货管控、资金及人员、利润及执行、返利整改），支持默认折叠与按需展开细项。
- **明细数据表**：全维度细粒度指标展示，跨各类型数据项（履约、分销、库存差异、窜货频次、预付款资金、专职人员、利润率等）。
- **指标卡片 (KPI Summary)**：实时统计当前所选部门的下属单位数、平均分、满分达标率及最高/最低分等关键KPI。

## 运行环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

## 快速启动指南

1. **安装依赖**：
   ```bash
   npm install
   ```

2. **启动开发服务器**：
   ```bash
   npm run dev
   ```
   启动后，在浏览器访问控制台提示的本地地址（如 `http://localhost:3000` 或 `http://localhost:5173`）。

3. **项目构建与预览**：
   ```bash
   npm run build
   npm run preview
   ```

## 项目结构说明

- `/src/data/channelData.ts`: 4级部门树结构模拟数据及考核细项标准定义
- `/src/components/OverviewScoreTable.tsx`: 【总表】渠道运营考核评估组件
- `/src/components/DetailDataTable.tsx`: 【明细表】渠道运营明细数据组件
- `/src/components/KpiCards.tsx`: 顶部关键指标统计卡片组件
- `/src/components/Breadcrumb.tsx`: 层级下钻与路径导航组件
- `/src/App.tsx`: 主页面入口与状态调度
