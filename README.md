# 经销商数据看板 & 渠道经营驾驶舱

> 项目状态：🚀 持续迭代  
> 创建日期：2026-07-22  
> 最新更新：2026-08-06

## 项目概述

本项目包含两个 Demo：

| Demo | 技术栈 | 说明 |
|------|--------|------|
| 渠道经营驾驶舱 | React 19 + Vite 6 + Tailwind CSS 4 | 多级下钻分析系统（全国→战区→作战部→分部），总表+明细表 |
| 经销商数据看板 | 纯 HTML + ECharts 5.5 | 单经销商详情页，雷达图 + 进销存模块 |

## 项目结构

```
经销商看板/
├── README.md                              ← 项目说明（本文件）
├── index.html                             ← GitHub Pages 入口（驾驶舱构建产物）
├── assets/                                ← 驾驶舱构建产物
├── docs/
│   ├── prd/
│   │   └── PRD-01-经销商评估看板.md        ← 产品需求文档
│   ├── iteration/
│   │   └── ITERATION-01.md                ← 迭代日志
│   └── conversations/                     ← 对话记录
├── prototype/
│   └── index.html                         ← 经销商数据看板（静态原型）
└── 渠道运营驾驶舱/                          ← 渠道经营驾驶舱（React 应用）
    ├── src/
    │   ├── App.tsx
    │   ├── components/
    │   │   ├── OverviewScoreTable.tsx       ← 总表
    │   │   └── DetailDataTable.tsx          ← 明细表
    │   └── data/
    │       └── channelData.ts               ← 模拟数据 + 指标定义
    ├── package.json
    └── vite.config.ts
```

## 线上地址

| Demo | URL |
|------|-----|
| 渠道经营驾驶舱 | https://craiglige-byte.github.io/dealer-dashboard/ |
| 经销商数据看板 | https://craiglige-byte.github.io/dealer-dashboard/prototype/index.html |

## 运行方式

### 驾驶舱（React）

```bash
cd 渠道运营驾驶舱
npm install
npm run dev        # 开发 → http://localhost:3000
npm run build      # 构建 → dist/
```

### 数据看板（静态）

浏览器直接打开 `prototype/index.html`，无需构建。

## 迭代记录

| 日期 | 版本 | 内容 |
|------|------|------|
| 2026-07-22 | v0.1 | 项目初始化、数据看板原型搭建、PRD 编写 |
| 2026-07-28 | v0.2 | 数据看板悬浮交互、进销存等模块扩展 |
| 2026-08-05 | v1.0 | 驾驶舱 React 项目搭建，4级下钻，总表+明细表 |
| 2026-08-06 | v1.1 | 精简驾驶舱（移除顶栏/KPI/图表），两表联动，满分标准更新 |

---

*产品经理 Agent 维护*
