import React from 'react';
import { DepartmentNode, getBreadcrumbs } from '../data/channelData';
import { ChevronRight, Home, ArrowLeft, Layers, CornerDownRight } from 'lucide-react';

interface BreadcrumbsProps {
  rootNode: DepartmentNode;
  currentNode: DepartmentNode;
  onSelectNode: (node: DepartmentNode) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  rootNode,
  currentNode,
  onSelectNode,
}) => {
  const crumbs = getBreadcrumbs(rootNode, currentNode.id);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'national':
        return { label: '全国总览', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' };
      case 'region':
        return { label: '战区层级', color: 'bg-blue-500/10 text-blue-700 border-blue-200' };
      case 'department':
        return { label: '作战部', color: 'bg-purple-500/10 text-purple-700 border-purple-200' };
      case 'branch':
        return { label: '作战分部', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' };
      default:
        return { label: '部门', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const levelBadge = getLevelBadge(currentNode.level);

  // Parent node if available
  const parentNode = crumbs.length > 1 ? crumbs[crumbs.length - 2] : null;

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs px-4 py-3">
      <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb Path */}
        <div className="flex items-center space-x-2 text-sm overflow-x-auto py-1 scrollbar-none">
          {parentNode && (
            <button
              onClick={() => onSelectNode(parentNode)}
              className="mr-2 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回上级({parentNode.name})</span>
            </button>
          )}

          <div className="flex items-center space-x-1 font-medium">
            {crumbs.map((node, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <React.Fragment key={node.id}>
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mx-0.5" />
                  )}
                  {index === 0 ? (
                    <button
                      onClick={() => onSelectNode(node)}
                      className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-colors ${
                        isLast
                          ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5 text-blue-600" />
                      <span>{node.name}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectNode(node)}
                      className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                        isLast
                          ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {node.name}
                    </button>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <span
            className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded border ${levelBadge.color}`}
          >
            {levelBadge.label}
          </span>
        </div>

        {/* Quick Child Drill-down Chips */}
        {currentNode.children && currentNode.children.length > 0 && (
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium flex items-center space-x-1">
              <CornerDownRight className="w-3.5 h-3.5 text-blue-500" />
              <span>快速下钻到子部门:</span>
            </span>
            <div className="flex items-center space-x-1.5 overflow-x-auto max-w-xl py-1">
              {currentNode.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => onSelectNode(child)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-full font-medium transition-all shadow-2xs whitespace-nowrap"
                >
                  {child.name}
                  <span className="ml-1 opacity-75 font-normal">
                    ({child.scores.totalScore}分)
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
