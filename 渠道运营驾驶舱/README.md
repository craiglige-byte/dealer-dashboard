# 渠道经营驾驶舱

React 19 + TypeScript + Vite 6 + Tailwind CSS 4 开发的多级渠道运营数据下钻分析平台。

## 功能特点

- **多层级下钻**：全国 → 战区 → 作战部 → 作战分部，点击行可下钻，全国始终展开
- **总表**：渠道运营考核评估，7 大维度细项，支持展开/折叠，部门列 rowSpan 合并
- **明细表**：全维度细粒度指标，含基础情况、履约、分销、库存、窜货、预付款、专职人员、利润等
- **满分标准**：各指标自定义满分标准展示

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
