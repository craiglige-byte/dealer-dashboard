import React, { useState } from 'react';
import { NATIONAL_ROOT, DepartmentNode } from './data/channelData';
import { OverviewScoreTable } from './components/OverviewScoreTable';
import { DetailDataTable } from './components/DetailDataTable';

export default function App() {
  const [currentNode, setCurrentNode] = useState<DepartmentNode>(NATIONAL_ROOT);
  const [quarter] = useState<string>('2026 Q3');

  const handleSelectNode = (node: DepartmentNode) => {
    setCurrentNode(node);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Export CSV handler for Table 2
  const handleExportCSV = () => {
    const headers = [
      '部门',
      '层级',
      '总分',
      '经销商数量',
      '合同总额(万)',
      '户均体量(万)',
      '≥1000万(家)',
      '500-1000万(家)',
      '300-500万(家)',
      '200-300万(家)',
      '＜200万(家)',
      '自营占比(%)',
      '网点占比(%)',
      '库存天数(天)',
      '库存合格占比(%)',
      '≥5次窜货(家)',
      '0次窜货(家)',
      '预付款合格率(%)',
      '户均专职人数',
      '月净利润率(%)',
      '月毛利率(%)',
      '汇财赋得分',
      '会员体系得分',
    ];

    const rows: string[] = [];
    rows.push(headers.join(','));

    function extractCSVRows(node: DepartmentNode) {
      const { scores, details } = node;
      const row = [
        `"${node.name}"`,
        `"${node.level}"`,
        scores.totalScore,
        details.dealerCount,
        details.totalContractAmount,
        details.avgAccountVolume,
        details.complianceTiers.over10M,
        details.complianceTiers.m5To10M,
        details.complianceTiers.m3To5M,
        details.complianceTiers.m2To3M,
        details.complianceTiers.under2M,
        details.distributionChannels.selfOperatedRatio,
        details.distributionChannels.outletRatio,
        details.inventory.inventoryDays,
        details.inventory.inventoryQualifiedRatio,
        details.crossRegionSales.times5Plus,
        details.crossRegionSales.times0,
        details.advancePayment.monthlyStartQualifiedRate,
        details.dedicatedStaff.avgStaffCount,
        details.profitability.monthlyReviewNetProfitMargin,
        details.profitability.monthlyReviewGrossProfitMargin,
        details.execution.huiCaiFuScore,
        details.execution.memberSystemScore,
      ];
      rows.push(row.join(','));

      if (node.children) {
        node.children.forEach(extractCSVRows);
      }
    }

    extractCSVRows(currentNode);

    const blob = new Blob(['﻿' + rows.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `渠道运营驾驶舱明细数据_${currentNode.name}_${quarter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans antialiased">
      {/* Header */}
      <header className="bg-slate-900 text-white py-5 px-6 shadow-md">
        <div className="max-w-[1700px] mx-auto">
          <h1 className="text-xl font-bold tracking-wide">渠道经营驾驶舱</h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        {/* Table 1: 上面的表 - 总表 */}
        <OverviewScoreTable
          currentNode={currentNode}
          onSelectNode={handleSelectNode}
        />

        {/* Table 2: 下面的表 - 明细数据表 */}
        <DetailDataTable
          currentNode={currentNode}
          onSelectNode={handleSelectNode}
        />
      </main>
    </div>
  );
}
