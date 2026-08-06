import React, { useState } from 'react';
import { DepartmentNode, METRIC_CRITERIA } from '../data/channelData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from 'recharts';
import { BarChart2, PieChart, TrendingUp, Layers } from 'lucide-react';

interface DepartmentComparisonChartProps {
  currentNode: DepartmentNode;
  onSelectNode: (node: DepartmentNode) => void;
}

export const DepartmentComparisonChart: React.FC<DepartmentComparisonChartProps> = ({
  currentNode,
  onSelectNode,
}) => {
  const [chartType, setChartType] = useState<'bar' | 'radar' | 'scale'>('bar');

  const children = currentNode.children || [];

  if (children.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 text-center text-slate-500">
        当前部门（{currentNode.name}）已处于末级作战分部，暂无子部门对比图表。
      </div>
    );
  }

  // Data for total score comparison
  const barData = children.map((c) => ({
    name: c.name,
    totalScore: c.scores.totalScore,
    complianceRatio: c.scores.complianceRatio,
    inventoryQualifiedRatio: c.scores.inventoryQualifiedRatio,
    cityManagerAvgScore: c.scores.cityManagerAvgScore,
    memberSystemScore: c.scores.memberSystemScore,
    crossRegionSalesAvg: c.scores.crossRegionSalesAvg,
    advancePaymentQualifiedRate: c.scores.advancePaymentQualifiedRate,
    over3MDealerRatio: c.scores.over3MDealerRatio,
    node: c,
  }));

  // Data for scale comparison
  const scaleData = children.map((c) => ({
    name: c.name,
    dealerCount: c.details.dealerCount,
    contractAmount: Number((c.details.totalContractAmount / 10000).toFixed(2)), // 亿元
  }));

  // Data for radar comparison (averages of children or top 3)
  const radarData = METRIC_CRITERIA.map((criterion) => {
    const item: Record<string, any> = {
      metric: criterion.name,
      maxScore: criterion.maxScore,
    };
    children.forEach((c) => {
      item[c.name] = c.scores[criterion.key];
    });
    return item;
  });

  const COLORS = [
    '#3b82f6',
    '#10b981',
    '#8b5cf6',
    '#f59e0b',
    '#ec4899',
    '#06b6d4',
    '#f97316',
    '#64748b',
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            <span>【可视化对比】{currentNode.name} 下辖各下级单位运营指标分析</span>
          </h3>
          <p className="text-xs text-slate-500">
            包含 {children.length} 个下辖单位在各项考核维度与体量规模的直观对比。
          </p>
        </div>

        {/* Chart type switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              chartType === 'bar' ? 'bg-white text-blue-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            综合得分排行
          </button>
          <button
            onClick={() => setChartType('scale')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              chartType === 'scale' ? 'bg-white text-blue-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            规模体量对比
          </button>
          <button
            onClick={() => setChartType('radar')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              chartType === 'radar' ? 'bg-white text-blue-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            多维考核雷达
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full">
        {chartType === 'bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#475569' }} />
              <Tooltip
                formatter={(value: any) => [`${value} 分`, '综合得分']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="totalScore" radius={[8, 8, 0, 0]} barSize={40}>
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    onClick={() => onSelectNode(entry.node)}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'scale' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scaleData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
              <YAxis yAxisId="left" orientation="left" stroke="#2563eb" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#059669" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="dealerCount"
                name="经销商数量 (家)"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="contractAmount"
                name="签约合同额 (亿元)"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'radar' && (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#334155' }} />
              <PolarRadiusAxis angle={30} domain={[0, 20]} />
              {children.slice(0, 5).map((c, idx) => (
                <Radar
                  key={c.id}
                  name={c.name}
                  dataKey={c.name}
                  stroke={COLORS[idx % COLORS.length]}
                  fill={COLORS[idx % COLORS.length]}
                  fillOpacity={0.2}
                />
              ))}
              <Legend />
              <Tooltip contentStyle={{ borderRadius: '12px' }} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
