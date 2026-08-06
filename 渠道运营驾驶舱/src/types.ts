export type RegionLevel = 'national' | 'region' | 'department' | 'branch';

// Node in the hierarchy tree
export interface DepartmentNode {
  id: string;
  name: string;
  level: RegionLevel;
  parentId?: string;
  children?: DepartmentNode[];

  // Table 1: Summary / Score Data
  scores: {
    totalScore: number; // 总分
    complianceRatio: number; // 履约达百经销商比例 (0-20分)
    complianceRatioValue: number; // 实际比例 %
    inventoryQualifiedRatio: number; // 库存合格经销商占比 (0-15分)
    inventoryQualifiedRatioValue: number; // 实际占比 %
    cityManagerAvgScore: number; // 城市经理汇财赋均分 (0-15分)
    cityManagerAvgScoreValue: number; // 实际均分
    memberSystemScore: number; // 会员体系得分 (0-15分)
    memberSystemScoreValue: number; // 实际得分
    crossRegionSalesAvg: number; // 户均窜货次数 (0-15分)
    crossRegionSalesAvgValue: number; // 实际户均次数
    advancePaymentQualifiedRate: number; // 预付款合格率 (0-10分)
    advancePaymentQualifiedRateValue: number; // 实际合格率 %
    over3MDealerRatio: number; // 300万以上经销商占比 (0-10分)
    over3MDealerRatioValue: number; // 实际占比 %
  };

  // Table 2: Detailed Data
  details: {
    // 基础情况
    dealerCount: number; // 经销商数量 (家)
    totalContractAmount: number; // 合同总额 (万元)
    avgAccountVolume: number; // 户均体量 (万元/户)

    // 履约情况 (经销商规模梯队分布)
    complianceTiers: {
      over10M: number; // ≥1000万 (家)
      m5To10M: number; // 500-1000万 (家)
      m3To5M: number; // 300-500万 (家)
      m2To3M: number; // 200-300万 (家)
      under2M: number; // ＜200万 (家)
    };

    // 分销情况
    distributionChannels: {
      selfOperatedRatio: number; // 自营占比 (%)
      outletRatio: number; // 网点占比 (%)
      wholesaleRatio: number; // 批发占比 (%)
      distributorRatio: number; // 分销占比 (%)
      otherRatio: number; // 其他占比 (%)
    };

    // 库存
    inventory: {
      inventoryDays: number; // 库存天数 (天)
      inventoryQualifiedRatio: number; // 库存合格占比 (%)
      quarterlyGreenBadgeRatio: number; // (季度)绿牌占比 (%)
      inventoryDiscrepancyRateByCategory: number; // 库存差异率(分品类) (%)
      inventoryDiscrepancyRatio: number; // 库存差异占比 (%)
    };

    // 窜货
    crossRegionSales: {
      times5Plus: number; // ≥5次 (家)
      times3To4: number; // 3-4次 (家)
      times1To2: number; // 1-2次 (家)
      times0: number; // 0次 (家)
    };

    // 预付款资金
    advancePayment: {
      monthlyStartQualifiedRate: number; // 当月月初预付款合格率 (%)
      ytmQualifiedRate: number; // YTM合格率 (%)
    };

    // 专职人员
    dedicatedStaff: {
      avgStaffCount: number; // 户均人数 (人)
      onDutyRate: number; // 在岗率 (%)
      qualificationRate: number; // 合格率 (%)
    };

    // 利润情况
    profitability: {
      monthlyReviewNetProfitMargin: number; // 当月回顾月净利润率 (%)
      monthlyReviewGrossProfitMargin: number; // 当月回顾月毛利率 (%)
      ytmNetProfitMargin: number; // YTM净利润率 (%)
      ytmGrossProfitMargin: number; // YTM毛利率 (%)
    };

    // 执行情况
    execution: {
      huiCaiFuScore: number; // 汇财赋得分 (分)
      memberSystemScore: number; // 会员体系得分 (分)
    };

    // 返利
    rebates: {
      regularQuarterlyRate: number; // 常规季度获得率 (%)
      extraQuarterlyRate: number; // 额外季度获得率 (%)
    };

    // 整改
    rectification: {
      lastQuarterRectificationRatio: number; // 上季度整改占比 (%)
      ytmRectificationRatio: number; // YTM整改占比 (%)
    };
  };
}

// Criteria standards interface for Table 1
export interface MetricCriterion {
  key: keyof DepartmentNode['scores'];
  valueKey: keyof DepartmentNode['scores'];
  name: string;
  maxScore: number;
  benchmark: string;
  unit: string;
  description: string;
}

export type TableViewMode = 'hierarchical' | 'flat' | 'comparison';
