import React, { useState } from 'react';
import { DepartmentNode } from '../types';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface DetailDataTableProps {
  currentNode: DepartmentNode;
  onSelectNode: (node: DepartmentNode) => void;
}

export const DetailDataTable: React.FC<DetailDataTableProps> = ({
  currentNode,
  onSelectNode,
}) => {
  const [expandedRowIds, setExpandedRowIds] = useState<Record<string, boolean>>({
    [currentNode.id]: true,
  });

  // 全国和战区层级始终展开，不可折叠
  const isAlwaysExpanded = (level: string) => level === 'national';

  const toggleRowExpand = (id: string, level: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAlwaysExpanded(level)) return;
    setExpandedRowIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const buildFlatDisplayRows = (
    node: DepartmentNode,
    depth: number = 0
  ): { node: DepartmentNode; depth: number }[] => {
    const result: { node: DepartmentNode; depth: number }[] = [{ node, depth }];
    if ((expandedRowIds[node.id] || isAlwaysExpanded(node.level)) && node.children && node.children.length > 0) {
      for (const child of node.children) {
        result.push(...buildFlatDisplayRows(child, depth + 1));
      }
    }
    return result;
  };

  const displayRows = buildFlatDisplayRows(currentNode);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-sm mb-8">
      {/* Table Header Bar */}
      <div className="px-5 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
          <h2 className="text-base font-bold text-slate-900">
            【明细表】渠道运营明细数据
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          说明：支持左右横向滚动查看全维度指标 | 点击部门名称可钻取该视角
        </span>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto max-w-full">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-slate-100/90 text-slate-800 font-bold border-b border-slate-300">
            {/* Header Level 1 */}
            <tr className="border-b border-slate-200 text-center text-xs uppercase tracking-wider font-bold">
              <th className="py-3 px-4 sticky left-0 bg-slate-100 z-20 border-r border-slate-200 min-w-[240px] text-left text-sm font-bold text-slate-900 shadow-xs">
                部门
              </th>
              <th colSpan={3} className="py-2.5 px-3 border-r border-slate-200 bg-slate-200/50 text-slate-800 font-bold">基础情况</th>
              <th colSpan={5} className="py-2.5 px-3 border-r border-slate-200 bg-blue-50/60 text-blue-950 font-bold">履约情况</th>
              <th colSpan={5} className="py-2.5 px-3 border-r border-slate-200 bg-amber-50/60 text-amber-950 font-bold">分销情况</th>
              <th colSpan={3} className="py-2.5 px-3 border-r border-slate-200 bg-slate-200/50 text-slate-800 font-bold">库存</th>
              <th colSpan={4} className="py-2.5 px-3 border-r border-slate-200 bg-rose-50/60 text-rose-950 font-bold">窜货</th>
              <th colSpan={1} className="py-2.5 px-3 border-r border-slate-200 bg-indigo-50/60 text-indigo-950 font-bold">预付款资金</th>
              <th colSpan={1} className="py-2.5 px-3 border-r border-slate-200 bg-slate-200/50 text-slate-800 font-bold">专职人员</th>
              <th colSpan={4} className="py-2.5 px-3 border-r border-slate-200 bg-emerald-50/60 text-emerald-950 font-bold">利润情况</th>
            </tr>

            {/* Header Level 2 Sub-columns */}
            <tr className="text-right text-slate-700 bg-slate-100 font-semibold text-xs whitespace-nowrap">
              <th className="py-3 px-4 sticky left-0 bg-slate-100 z-20 border-r border-slate-200 text-left font-bold text-slate-900 shadow-xs">
                部门名称
              </th>
              {/* 基础情况 */}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[100px]">经销商数量(家)</th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[120px]">合同总额(万元)</th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[110px]">户均体量(万元)</th>
              {/* 履约情况 */}
              <th className="py-2.5 px-3 border-r border-slate-200">≥1000万</th>
              <th className="py-2.5 px-3 border-r border-slate-200">500-1000万</th>
              <th className="py-2.5 px-3 border-r border-slate-200">300-500万</th>
              <th className="py-2.5 px-3 border-r border-slate-200">200-300万</th>
              <th className="py-2.5 px-3 border-r border-slate-200">＜200万</th>
              {/* 分销情况 */}
              <th className="py-2.5 px-3 border-r border-slate-200">自营占比</th>
              <th className="py-2.5 px-3 border-r border-slate-200">网点占比</th>
              <th className="py-2.5 px-3 border-r border-slate-200">批发占比</th>
              <th className="py-2.5 px-3 border-r border-slate-200">分销占比</th>
              <th className="py-2.5 px-3 border-r border-slate-200">其他占比</th>
              {/* 库存 */}
              <th className="py-2.5 px-3 border-r border-slate-200">库存天数</th>
              <th className="py-2.5 px-3 border-r border-slate-200">库存合格占比</th>
              <th className="py-2.5 px-3 border-r border-slate-200">(季度)绿牌占比</th>
              {/* 窜货 */}
              <th className="py-2.5 px-3 border-r border-slate-200 text-slate-800">≥5次</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-slate-800">3-4次</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-slate-800">1-2次</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-slate-800">0次</th>
              {/* 预付款资金 */}
              <th className="py-2.5 px-3 border-r border-slate-200">当月月初预付款合格率</th>
              {/* 专职人员 */}
              <th className="py-2.5 px-3 border-r border-slate-200">合格率</th>
              {/* 利润情况 */}
              <th className="py-2.5 px-3 border-r border-slate-200">当月回顾月净利润率</th>
              <th className="py-2.5 px-3 border-r border-slate-200">当月回顾月毛利率</th>
              <th className="py-2.5 px-3 border-r border-slate-200">YTM净利润率</th>
              <th className="py-2.5 px-3 border-r border-slate-200">YTM毛利率</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-slate-800 text-sm">
            {displayRows.map(({ node, depth }) => {
              const hasChildren = node.children && node.children.length > 0;
              const isExpanded = expandedRowIds[node.id];
              const { details } = node;

              return (
                <tr key={node.id} className="hover:bg-blue-50/30 transition-colors">
                  {/* Department Name with Expand Toggle */}
                  <td
                    className="py-3 px-4 sticky left-0 z-10 bg-white border-r border-slate-200 shadow-2xs whitespace-nowrap"
                    style={{ paddingLeft: `${depth * 20 + 16}px` }}
                  >
                    <div className="flex items-center space-x-1.5">
                      {hasChildren && !isAlwaysExpanded(node.level) ? (
                        <button
                          onClick={(e) => toggleRowExpand(node.id, node.level, e)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600 transition-colors"
                          title={isExpanded ? '折叠下级' : '展开下级'}
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-600 stroke-[2.5]" />
                          )}
                        </button>
                      ) : (
                        <span className="w-4 inline-block" />
                      )}

                      <button
                        onClick={() => onSelectNode(node)}
                        className="font-bold text-slate-900 hover:text-blue-600 hover:underline transition-colors text-left"
                      >
                        {node.name}
                      </button>
                    </div>
                  </td>

                  {/* 基础情况 */}
                  <td className="py-3 px-3 text-right border-r border-slate-200 text-slate-800">{details.dealerCount}</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200 font-bold text-slate-900">{details.totalContractAmount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200 text-slate-800">{details.avgAccountVolume}</td>

                  {/* 履约情况 */}
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.complianceTiers.over10M}</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.complianceTiers.m5To10M}</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.complianceTiers.m3To5M}</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.complianceTiers.m2To3M}</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.complianceTiers.under2M}</td>

                  {/* 分销情况 */}
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.distributionChannels.selfOperatedRatio}%</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.distributionChannels.outletRatio}%</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.distributionChannels.wholesaleRatio}%</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.distributionChannels.distributorRatio}%</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.distributionChannels.otherRatio}%</td>

                  {/* 库存 */}
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.inventory.inventoryDays} 天</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.inventory.inventoryQualifiedRatio}%</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.inventory.quarterlyGreenBadgeRatio}%</td>

                  {/* 窜货 */}
                  <td className="py-3 px-3 text-right border-r border-slate-200 text-slate-800">{details.crossRegionSales.times5Plus}</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200 text-slate-800">{details.crossRegionSales.times3To4}</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200 text-slate-800">{details.crossRegionSales.times1To2}</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200 text-slate-800">{details.crossRegionSales.times0}</td>

                  {/* 预付款资金 */}
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.advancePayment.monthlyStartQualifiedRate}%</td>

                  {/* 专职人员 */}
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.dedicatedStaff.qualificationRate}%</td>

                  {/* 利润情况 */}
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.profitability.monthlyReviewNetProfitMargin}%</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.profitability.monthlyReviewGrossProfitMargin}%</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.profitability.ytmNetProfitMargin}%</td>
                  <td className="py-3 px-3 text-right border-r border-slate-200">{details.profitability.ytmGrossProfitMargin}%</td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
