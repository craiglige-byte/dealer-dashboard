import React, { useState } from 'react';
import { DepartmentNode, METRIC_CRITERIA } from '../data/channelData';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface OverviewScoreTableProps {
  currentNode: DepartmentNode;
  onSelectNode: (node: DepartmentNode) => void;
}

export const OverviewScoreTable: React.FC<OverviewScoreTableProps> = ({
  currentNode,
  onSelectNode,
}) => {
  // Tree expansion state for department hierarchy
  const [expandedTreeIds, setExpandedTreeIds] = useState<Record<string, boolean>>({
    [currentNode.id]: true,
  });

  // Metric breakdown expansion state (default: empty = all collapsed)
  const [expandedMetricDeptIds, setExpandedMetricDeptIds] = useState<Record<string, boolean>>({});

  const toggleDeptExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedTreeIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleMetricExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMetricDeptIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Build recursive flat list of department nodes matching tree expansion
  const buildDisplayRows = (
    node: DepartmentNode,
    depth: number = 0
  ): { node: DepartmentNode; depth: number }[] => {
    const result: { node: DepartmentNode; depth: number }[] = [{ node, depth }];
    if (expandedTreeIds[node.id] && node.children && node.children.length > 0) {
      for (const child of node.children) {
        result.push(...buildDisplayRows(child, depth + 1));
      }
    }
    return result;
  };

  const displayRows = buildDisplayRows(currentNode);

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'national':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'region':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'department':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'branch':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'national':
        return '全国';
      case 'region':
        return '战区';
      case 'department':
        return '作战部';
      case 'branch':
        return '作战分部';
      default:
        return '部门';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs mb-8 overflow-hidden text-sm">
      {/* Table Header Bar */}
      <div className="px-5 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
          <h2 className="text-base font-bold text-slate-900">
            【总表】渠道运营考核评估
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          说明：判断项默认折叠，点击“展开细项”可查看各项指标分值 | 点击“下钻”可切换至该部门视角
        </span>
      </div>

      {/* Spacious Ant Design Style Table */}
      <div className="overflow-x-auto min-w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/90 text-slate-800 font-bold border-b border-slate-300 text-sm">
              <th className="py-3.5 px-5 border-r border-slate-200 min-w-[280px]">
                部门
              </th>
              <th className="py-3.5 px-5 border-r border-slate-200 min-w-[280px]">
                判断项
              </th>
              <th className="py-3.5 px-5 border-r border-slate-200 text-right w-36">
                实际分值
              </th>
              <th className="py-3.5 px-5 border-r border-slate-200 text-right w-36">
                满分标准
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {displayRows.map(({ node, depth }) => {
              const hasChildren = node.children && node.children.length > 0;
              const isExpanded = expandedTreeIds[node.id];
              const showMetrics = expandedMetricDeptIds[node.id];

              return (
                <React.Fragment key={node.id}>
                  {/* Department Main Summary Row */}
                  <tr className="hover:bg-blue-50/40 transition-colors bg-white font-medium">
                    {/* Department Name & Expand Toggle */}
                    <td
                      className="py-3.5 px-5 border-r border-slate-200"
                      style={{ paddingLeft: `${depth * 22 + 16}px` }}
                      rowSpan={showMetrics ? METRIC_CRITERIA.length + 1 : 1}
                    >
                      <div className="flex items-center space-x-2">
                        {hasChildren ? (
                          <button
                            onClick={(e) => toggleDeptExpand(node.id, e)}
                            className="p-1 hover:bg-slate-200/80 rounded text-slate-500 hover:text-blue-600 transition-colors"
                            title={isExpanded ? '折叠下级部门' : '展开下级部门'}
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-600 stroke-[2.5]" />
                            )}
                          </button>
                        ) : (
                          <span className="w-4 inline-block shrink-0" />
                        )}

                        <span className="font-bold text-slate-900 text-base">
                          {node.name}
                        </span>

                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded border ${getLevelBadgeClass(
                            node.level
                          )}`}
                        >
                          {getLevelLabel(node.level)}
                        </span>
                      </div>
                    </td>

                    {/* Judgment Item & Toggle Breakdown */}
                    <td className="py-3.5 px-5 border-r border-slate-200 text-slate-900 font-semibold">
                      <div className="flex items-center space-x-3">
                        <span>渠道运营综合评估 (总分)</span>
                        <button
                          onClick={(e) => toggleMetricExpand(node.id, e)}
                          className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                        >
                          {showMetrics ? '折叠细项 ▲' : '展开细项 ▼'}
                        </button>
                      </div>
                    </td>

                    {/* Total Score */}
                    <td className="py-3.5 px-5 border-r border-slate-200 text-right font-extrabold text-blue-600 text-base">
                      {node.scores.totalScore}
                    </td>

                    {/* Standard Score */}
                    <td className="py-3.5 px-5 border-r border-slate-200 text-right text-slate-600 font-medium">
                      100 分
                    </td>

                  </tr>

                  {/* Optional Expanded Metric Sub-rows */}
                  {showMetrics &&
                    METRIC_CRITERIA.map((criterion) => {
                      const score = node.scores[criterion.key] as number;

                      return (
                        <tr
                          key={`${node.id}-${criterion.key}`}
                          className="bg-slate-50/70 text-slate-700 text-xs hover:bg-slate-100/60 transition-colors"
                        >
                          {/* Criterion Name */}
                          <td className="py-2 px-5 border-r border-slate-200 text-slate-800 font-medium">
                            {criterion.name}
                          </td>

                          {/* Criterion Actual Score */}
                          <td className="py-2 px-5 border-r border-slate-200 text-right font-bold text-slate-900">
                            {score}
                          </td>

                          {/* Criterion Max Score */}
                          <td className="py-2 px-5 border-r border-slate-200 text-right text-slate-500 font-normal">
                            {criterion.maxScore} 分
                          </td>

                        </tr>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
