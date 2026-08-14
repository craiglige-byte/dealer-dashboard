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
      '≥100%经销商占比(%)',
      '90%-100%经销商占比(%)',
      '80%-90%经销商占比(%)',
      '<80%经销商占比(%)',
      '自营占比(%)',
      '直销网点占比(%)',
      '直销批发商占比(%)',
      '直销分销商占比(%)',
      '其他占比(%)',
      '库存天数(天)',
      '绿牌占比(%)',
      '线上窜货(家)',
      '线下一级窜货(家)',
      '线下二级窜货(家)',
      '低价(家)',
      '经销商合格率(%)',
      '专职人员合格率(%)',
      '当月回顾毛利率(%)',
      '当月回顾净利润(%)',
      'YTM回顾毛利率(%)',
      'YTM回顾净利率(%)',
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
        details.ytmComplianceTiers.over100Pct,
        details.ytmComplianceTiers.m90to100Pct,
        details.ytmComplianceTiers.m80to90Pct,
        details.ytmComplianceTiers.under80Pct,
        details.distributionChannels.selfOperatedRatio,
        details.distributionChannels.outletRatio,
        details.distributionChannels.wholesaleRatio,
        details.distributionChannels.distributorRatio,
        details.distributionChannels.otherRatio,
        details.inventory.inventoryDays,
        details.inventory.quarterlyGreenBadgeRatio,
        details.crossRegionSales.onlineCrossRegion,
        details.crossRegionSales.offlineLevel1,
        details.crossRegionSales.offlineLevel2,
        details.crossRegionSales.lowPrice,
        details.advancePayment.monthlyStartQualifiedRate,
        details.dedicatedStaff.qualificationRate,
        details.profitability.monthlyReviewGrossProfitMargin,
        details.profitability.monthlyReviewNetProfitMargin,
        details.profitability.ytmGrossProfitMargin,
        details.profitability.ytmNetProfitMargin,
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
          <h1 className="text-xl font-bold tracking-wide">经销商经营驾驶舱</h1>
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
