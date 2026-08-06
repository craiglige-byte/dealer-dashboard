import React from 'react';
import { DepartmentNode } from '../types';
import {
  Award,
  Users,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Percent,
} from 'lucide-react';

interface KpiCardsProps {
  currentNode: DepartmentNode;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ currentNode }) => {
  const { scores, details } = currentNode;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 65) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return '优秀 (S级)';
    if (score >= 75) return '良好 (A级)';
    if (score >= 65) return '达标 (B级)';
    return '整改 (C级)';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Score Card */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-4 shadow-md border border-slate-800 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Award className="w-24 h-24 text-blue-400" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              {currentNode.name} · 综合运营评分
            </span>
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {getScoreBadge(scores.totalScore)}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold tracking-tight text-white">
              {scores.totalScore}
            </span>
            <span className="text-slate-400 text-sm font-medium">/ 100 满分</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
          <span>下属单位数: {currentNode.children?.length || 1} 个</span>
          <span className="text-emerald-400 font-medium">环比 +1.8 分</span>
        </div>
      </div>

      {/* Basic Capacity Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">基础规模体量</span>
            <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {details.dealerCount.toLocaleString()}
                <span className="text-xs text-slate-500 font-normal ml-0.5">家</span>
              </div>
              <div className="text-xs text-slate-500">经销商总数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {(details.totalContractAmount / 10000).toFixed(2)}
                <span className="text-xs text-slate-500 font-normal ml-0.5">亿元</span>
              </div>
              <div className="text-xs text-slate-500">签约合同总额</div>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>户均体量:</span>
          <span className="font-semibold text-slate-800">{details.avgAccountVolume} 万元/户</span>
        </div>
      </div>

      {/* Compliance & Scale Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">履约与核心商结构</span>
            <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>
              <div className="text-2xl font-bold text-emerald-600">
                {scores.complianceRatioValue}%
              </div>
              <div className="text-xs text-slate-500">履约达百占比</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {scores.over3MDealerRatioValue}%
              </div>
              <div className="text-xs text-slate-500">≥300万商占比</div>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>≥1000万大商:</span>
          <span className="font-semibold text-emerald-700">
            {details.complianceTiers.over10M} 家
          </span>
        </div>
      </div>

      {/* Health & Risk Control Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">风控与资金合规</span>
            <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {scores.advancePaymentQualifiedRateValue}%
              </div>
              <div className="text-xs text-slate-500">预付款合格率</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {scores.crossRegionSalesAvgValue}
                <span className="text-xs text-slate-500 font-normal ml-0.5">次</span>
              </div>
              <div className="text-xs text-slate-500">户均窜货频率</div>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>库存合格率:</span>
          <span className="font-semibold text-slate-800">
            {details.inventory.inventoryQualifiedRatio}%
          </span>
        </div>
      </div>
    </div>
  );
};
