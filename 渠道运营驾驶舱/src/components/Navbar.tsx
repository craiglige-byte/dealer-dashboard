import React, { useState } from 'react';
import { DepartmentNode, getAllNodesFlat } from '../data/channelData';
import {
  Compass,
  Search,
  RefreshCw,
  Download,
  BarChart3,
  Layers,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

interface NavbarProps {
  rootNode: DepartmentNode;
  currentNode: DepartmentNode;
  onSelectNode: (node: DepartmentNode) => void;
  onReset: () => void;
  quarter: string;
  onQuarterChange: (q: string) => void;
  onExport: () => void;
  showChart: boolean;
  onToggleChart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  rootNode,
  currentNode,
  onSelectNode,
  onReset,
  quarter,
  onQuarterChange,
  onExport,
  showChart,
  onToggleChart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const allNodes = getAllNodesFlat(rootNode);
  const searchResults = searchQuery.trim()
    ? allNodes.filter(
        (node) =>
          node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectResult = (node: DepartmentNode) => {
    onSelectNode(node);
    setSearchQuery('');
    setIsSearching(false);
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
        return '';
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-[1700px] mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-inner text-white flex items-center justify-center">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-100">
                渠道运营驾驶舱
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                2026 Q3
              </span>
            </div>
            <p className="text-xs text-slate-400">
              四级下钻分析 · 总分评估与全景明细监控
            </p>
          </div>
        </div>

        {/* Middle: Search Box */}
        <div className="relative flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索战区、作战部、作战分部 (如：浙江作战部)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800/90 text-slate-100 placeholder-slate-400 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Search dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto">
              <div className="p-2 text-xs text-slate-400 border-b border-slate-700">
                找到 {searchResults.length} 个部门节点
              </div>
              {searchResults.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleSelectResult(node)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-700/70 text-slate-200 flex items-center justify-between border-b border-slate-700/40 last:border-0"
                >
                  <span className="font-medium text-blue-300">{node.name}</span>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">
                      {getLevelLabel(node.level)}
                    </span>
                    <span>得分: {node.scores.totalScore}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Tools */}
        <div className="flex items-center space-x-3">
          {/* Quarter selector */}
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs font-medium">
            {['2026 Q3', '2026 Q2', '2026 YTD'].map((q) => (
              <button
                key={q}
                onClick={() => onQuarterChange(q)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  quarter === q
                    ? 'bg-blue-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Toggle Comparison Chart */}
          <button
            onClick={onToggleChart}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center space-x-1.5 transition-all ${
              showChart
                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{showChart ? '隐藏分析图表' : '对比分析图表'}</span>
          </button>

          {/* Export button */}
          <button
            onClick={onExport}
            className="px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center space-x-1 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>导出明细</span>
          </button>

          {/* Reset button */}
          <button
            onClick={onReset}
            title="重置到全国最高级"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
