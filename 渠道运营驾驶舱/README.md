# 经销商经营驾驶舱

React 19 + TypeScript + Vite 6 + Tailwind CSS 4 开发的多级经销商运营数据下钻分析平台。

## 功能特点

- **多层级下钻**：全国 → 战区 → 作战部 → 作战分部，点击行可下钻，全国始终展开
- **总表**：渠道运营考核评估，7 大维度细项，支持展开/折叠，部门列 rowSpan 合并
- **明细表**：全维度细粒度指标，含基础情况、YTM履约情况、分销渠道占比、库存情况、窜货及低价次数、月初预付款情况、专职人员情况、利润情况
- **色灯**：总表实际分值 + 明细表关键指标（≥100%经销商占比 / 自营 / 经销商合格率）按四分位分档（top25%绿 → 25-50%黄 → 50-75%橙 → 75%以上红）

## 运行

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # 构建到 dist/
```

## 项目结构

- `src/App.tsx` — 主入口，标题栏 + 总表 + 明细表
- `src/components/OverviewScoreTable.tsx` — 总表组件
- `src/components/DetailDataTable.tsx` — 明细表组件
- `src/data/channelData.ts` — 4 级部门树模拟数据 + 指标标准定义
- `src/types.ts` — 类型定义

## 线上地址

https://craiglige-byte.github.io/dealer-dashboard/
