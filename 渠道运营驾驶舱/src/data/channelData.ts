import { DepartmentNode, MetricCriterion } from '../types';

export type { DepartmentNode };

// Table 1 Judgment Criteria Metadata
export const METRIC_CRITERIA: MetricCriterion[] = [
  {
    key: 'complianceRatio',
    valueKey: 'complianceRatioValue',
    name: '履约达百经销商比例',
    maxScore: 20,
    standard: '100%',
    benchmark: '履约达成率≥85%',
    unit: '%',
    description: '年度或季度协议履约率达到100%及以上的经销商所占比例',
  },
  {
    key: 'inventoryQualifiedRatio',
    valueKey: 'inventoryQualifiedRatioValue',
    name: '库存合格经销商占比',
    maxScore: 15,
    standard: '100%',
    benchmark: '合格占比≥90%',
    unit: '%',
    description: '库存结构合理、无积压爆仓且库存天数处于健康区间的经销商占比',
  },
  {
    key: 'cityManagerAvgScore',
    valueKey: 'cityManagerAvgScoreValue',
    name: '城市经理汇财赋均分',
    maxScore: 15,
    standard: '100',
    benchmark: '均分≥88分',
    unit: '分',
    description: '城市经理使用汇财赋系统进行渠道精细化运营与客情维护的考核均分',
  },
  {
    key: 'memberSystemScore',
    valueKey: 'memberSystemScoreValue',
    name: '会员体系得分',
    maxScore: 15,
    standard: '100',
    benchmark: '得分≥85分',
    unit: '分',
    description: '终端会员注册率、动销率及复购率综合评分',
  },
  {
    key: 'crossRegionSalesAvg',
    valueKey: 'crossRegionSalesAvgValue',
    name: '户均窜货次数',
    maxScore: 15,
    standard: '0',
    benchmark: '户均次数≤0.5次',
    unit: '次/户',
    description: '辖区内经销商平均发生的跨区域违规窜货事件频率（越低得分越高）',
  },
  {
    key: 'advancePaymentQualifiedRate',
    valueKey: 'advancePaymentQualifiedRateValue',
    name: '预付款合格率',
    maxScore: 10,
    standard: '100%',
    benchmark: '合格率≥92%',
    unit: '%',
    description: '按合同约定按时足额缴纳货款及预付款的资金达标率',
  },
  {
    key: 'over3MDealerRatio',
    valueKey: 'over3MDealerRatioValue',
    name: '300万以上经销商占比',
    maxScore: 10,
    standard: '100%',
    benchmark: '占比≥35%',
    unit: '%',
    description: '年提货额或合同体量在300万以上的大型核心经销商占比',
  },
];

// Helper to calculate score based on metric values
function calculateScore(metricKey: string, val: number): number {
  switch (metricKey) {
    case 'complianceRatio':
      return Math.min(20, Number(((val / 85) * 20).toFixed(1)));
    case 'inventoryQualifiedRatio':
      return Math.min(15, Number(((val / 90) * 15).toFixed(1)));
    case 'cityManagerAvgScore':
      return Math.min(15, Number(((val / 88) * 15).toFixed(1)));
    case 'memberSystemScore':
      return Math.min(15, Number(((val / 85) * 15).toFixed(1)));
    case 'crossRegionSalesAvg':
      // lower is better. 0 times = 15 points, 0.5 times = 12 points, 1.0 = 8 points, 2.0 = 0
      if (val <= 0.2) return 15;
      if (val <= 0.5) return 13.5;
      if (val <= 1.0) return 9.5;
      return Math.max(0, Number((15 - val * 7.5).toFixed(1)));
    case 'advancePaymentQualifiedRate':
      return Math.min(10, Number(((val / 92) * 10).toFixed(1)));
    case 'over3MDealerRatio':
      return Math.min(10, Number(((val / 35) * 10).toFixed(1)));
    default:
      return 0;
  }
}

// Data seed generator for branches
function createBranchNode(
  id: string,
  name: string,
  parentId: string,
  dealerBase: number,
  contractBase: number
): DepartmentNode {
  const dealerCount = dealerBase;
  const totalContractAmount = contractBase;
  const avgAccountVolume = Number((totalContractAmount / dealerCount).toFixed(1));

  // Scale distribution
  const over10M = Math.round(dealerCount * 0.08);
  const m5To10M = Math.round(dealerCount * 0.15);
  const m3To5M = Math.round(dealerCount * 0.22);
  const m2To3M = Math.round(dealerCount * 0.28);
  const under2M = Math.max(0, dealerCount - over10M - m5To10M - m3To5M - m2To3M);

  // Ratios
  const complianceRatioValue = Math.min(100, Math.round(75 + Math.random() * 20));
  const inventoryQualifiedRatioValue = Math.min(100, Math.round(80 + Math.random() * 18));
  const cityManagerAvgScoreValue = Number((82 + Math.random() * 15).toFixed(1));
  const memberSystemScoreValue = Number((80 + Math.random() * 16).toFixed(1));
  const crossRegionSalesAvgValue = Number((Math.random() * 0.8).toFixed(2));
  const advancePaymentQualifiedRateValue = Number((88 + Math.random() * 10).toFixed(1));
  const over3MDealerRatioValue = Number((((over10M + m5To10M + m3To5M) / dealerCount) * 100).toFixed(1));

  const cScore = calculateScore('complianceRatio', complianceRatioValue);
  const iScore = calculateScore('inventoryQualifiedRatio', inventoryQualifiedRatioValue);
  const cmScore = calculateScore('cityManagerAvgScore', cityManagerAvgScoreValue);
  const mScore = calculateScore('memberSystemScore', memberSystemScoreValue);
  const crsScore = calculateScore('crossRegionSalesAvg', crossRegionSalesAvgValue);
  const apScore = calculateScore('advancePaymentQualifiedRate', advancePaymentQualifiedRateValue);
  const o3mScore = calculateScore('over3MDealerRatio', over3MDealerRatioValue);

  const totalScore = Number((cScore + iScore + cmScore + mScore + crsScore + apScore + o3mScore).toFixed(1));

  return {
    id,
    name,
    level: 'branch',
    parentId,
    scores: {
      totalScore,
      complianceRatio: cScore,
      complianceRatioValue,
      inventoryQualifiedRatio: iScore,
      inventoryQualifiedRatioValue,
      cityManagerAvgScore: cmScore,
      cityManagerAvgScoreValue,
      memberSystemScore: mScore,
      memberSystemScoreValue,
      crossRegionSalesAvg: crsScore,
      crossRegionSalesAvgValue,
      advancePaymentQualifiedRate: apScore,
      advancePaymentQualifiedRateValue,
      over3MDealerRatio: o3mScore,
      over3MDealerRatioValue,
    },
    details: {
      dealerCount,
      totalContractAmount,
      avgAccountVolume,
      complianceTiers: {
        over10M,
        m5To10M,
        m3To5M,
        m2To3M,
        under2M,
      },
      distributionChannels: {
        selfOperatedRatio: 18,
        outletRatio: 42,
        wholesaleRatio: 15,
        distributorRatio: 20,
        otherRatio: 5,
      },
      inventory: {
        inventoryDays: Math.round(28 + Math.random() * 12),
        inventoryQualifiedRatio: inventoryQualifiedRatioValue,
        quarterlyGreenBadgeRatio: Number((85 + Math.random() * 12).toFixed(1)),
        inventoryDiscrepancyRateByCategory: Number((1.2 + Math.random() * 2).toFixed(1)),
        inventoryDiscrepancyRatio: Number((0.8 + Math.random() * 1.5).toFixed(1)),
      },
      crossRegionSales: {
        times5Plus: Math.round(dealerCount * 0.02),
        times3To4: Math.round(dealerCount * 0.05),
        times1To2: Math.round(dealerCount * 0.12),
        times0: Math.round(dealerCount * 0.81),
      },
      advancePayment: {
        monthlyStartQualifiedRate: advancePaymentQualifiedRateValue,
        ytmQualifiedRate: Number((advancePaymentQualifiedRateValue + 1.5).toFixed(1)),
      },
      dedicatedStaff: {
        avgStaffCount: Number((2.8 + Math.random() * 1.2).toFixed(1)),
        onDutyRate: Number((92 + Math.random() * 7).toFixed(1)),
        qualificationRate: Number((88 + Math.random() * 10).toFixed(1)),
      },
      profitability: {
        monthlyReviewNetProfitMargin: Number((8.5 + Math.random() * 4).toFixed(1)),
        monthlyReviewGrossProfitMargin: Number((22.0 + Math.random() * 6).toFixed(1)),
        ytmNetProfitMargin: Number((9.1 + Math.random() * 3.5).toFixed(1)),
        ytmGrossProfitMargin: Number((23.2 + Math.random() * 5).toFixed(1)),
      },
      execution: {
        huiCaiFuScore: cityManagerAvgScoreValue,
        memberSystemScore: memberSystemScoreValue,
      },
      rebates: {
        regularQuarterlyRate: Number((90 + Math.random() * 8).toFixed(1)),
        extraQuarterlyRate: Number((35 + Math.random() * 25).toFixed(1)),
      },
      rectification: {
        lastQuarterRectificationRatio: Number((92 + Math.random() * 7).toFixed(1)),
        ytmRectificationRatio: Number((95 + Math.random() * 4).toFixed(1)),
      },
    },
  };
}

// Aggregator helper to sum/average children into parent node
function aggregateChildren(
  id: string,
  name: string,
  level: 'national' | 'region' | 'department',
  parentId: string | undefined,
  children: DepartmentNode[]
): DepartmentNode {
  const count = children.length || 1;

  const dealerCount = children.reduce((acc, c) => acc + c.details.dealerCount, 0);
  const totalContractAmount = Number(
    children.reduce((acc, c) => acc + c.details.totalContractAmount, 0).toFixed(1)
  );
  const avgAccountVolume = dealerCount ? Number((totalContractAmount / dealerCount).toFixed(1)) : 0;

  const over10M = children.reduce((acc, c) => acc + c.details.complianceTiers.over10M, 0);
  const m5To10M = children.reduce((acc, c) => acc + c.details.complianceTiers.m5To10M, 0);
  const m3To5M = children.reduce((acc, c) => acc + c.details.complianceTiers.m3To5M, 0);
  const m2To3M = children.reduce((acc, c) => acc + c.details.complianceTiers.m2To3M, 0);
  const under2M = children.reduce((acc, c) => acc + c.details.complianceTiers.under2M, 0);

  const avgVal = (fn: (c: DepartmentNode) => number) =>
    Number((children.reduce((acc, c) => acc + fn(c), 0) / count).toFixed(1));

  const complianceRatioValue = avgVal((c) => c.scores.complianceRatioValue);
  const inventoryQualifiedRatioValue = avgVal((c) => c.scores.inventoryQualifiedRatioValue);
  const cityManagerAvgScoreValue = avgVal((c) => c.scores.cityManagerAvgScoreValue);
  const memberSystemScoreValue = avgVal((c) => c.scores.memberSystemScoreValue);
  const crossRegionSalesAvgValue = Number(
    (children.reduce((acc, c) => acc + c.scores.crossRegionSalesAvgValue, 0) / count).toFixed(2)
  );
  const advancePaymentQualifiedRateValue = avgVal((c) => c.scores.advancePaymentQualifiedRateValue);
  const over3MDealerRatioValue = dealerCount
    ? Number((((over10M + m5To10M + m3To5M) / dealerCount) * 100).toFixed(1))
    : 0;

  const cScore = calculateScore('complianceRatio', complianceRatioValue);
  const iScore = calculateScore('inventoryQualifiedRatio', inventoryQualifiedRatioValue);
  const cmScore = calculateScore('cityManagerAvgScore', cityManagerAvgScoreValue);
  const mScore = calculateScore('memberSystemScore', memberSystemScoreValue);
  const crsScore = calculateScore('crossRegionSalesAvg', crossRegionSalesAvgValue);
  const apScore = calculateScore('advancePaymentQualifiedRate', advancePaymentQualifiedRateValue);
  const o3mScore = calculateScore('over3MDealerRatio', over3MDealerRatioValue);

  const totalScore = Number((cScore + iScore + cmScore + mScore + crsScore + apScore + o3mScore).toFixed(1));

  return {
    id,
    name,
    level,
    parentId,
    children,
    scores: {
      totalScore,
      complianceRatio: cScore,
      complianceRatioValue,
      inventoryQualifiedRatio: iScore,
      inventoryQualifiedRatioValue,
      cityManagerAvgScore: cmScore,
      cityManagerAvgScoreValue,
      memberSystemScore: mScore,
      memberSystemScoreValue,
      crossRegionSalesAvg: crsScore,
      crossRegionSalesAvgValue,
      advancePaymentQualifiedRate: apScore,
      advancePaymentQualifiedRateValue,
      over3MDealerRatio: o3mScore,
      over3MDealerRatioValue,
    },
    details: {
      dealerCount,
      totalContractAmount,
      avgAccountVolume,
      complianceTiers: {
        over10M,
        m5To10M,
        m3To5M,
        m2To3M,
        under2M,
      },
      distributionChannels: {
        selfOperatedRatio: avgVal((c) => c.details.distributionChannels.selfOperatedRatio),
        outletRatio: avgVal((c) => c.details.distributionChannels.outletRatio),
        wholesaleRatio: avgVal((c) => c.details.distributionChannels.wholesaleRatio),
        distributorRatio: avgVal((c) => c.details.distributionChannels.distributorRatio),
        otherRatio: avgVal((c) => c.details.distributionChannels.otherRatio),
      },
      inventory: {
        inventoryDays: Math.round(avgVal((c) => c.details.inventory.inventoryDays)),
        inventoryQualifiedRatio: inventoryQualifiedRatioValue,
        quarterlyGreenBadgeRatio: avgVal((c) => c.details.inventory.quarterlyGreenBadgeRatio),
        inventoryDiscrepancyRateByCategory: avgVal((c) => c.details.inventory.inventoryDiscrepancyRateByCategory),
        inventoryDiscrepancyRatio: avgVal((c) => c.details.inventory.inventoryDiscrepancyRatio),
      },
      crossRegionSales: {
        times5Plus: children.reduce((acc, c) => acc + c.details.crossRegionSales.times5Plus, 0),
        times3To4: children.reduce((acc, c) => acc + c.details.crossRegionSales.times3To4, 0),
        times1To2: children.reduce((acc, c) => acc + c.details.crossRegionSales.times1To2, 0),
        times0: children.reduce((acc, c) => acc + c.details.crossRegionSales.times0, 0),
      },
      advancePayment: {
        monthlyStartQualifiedRate: advancePaymentQualifiedRateValue,
        ytmQualifiedRate: avgVal((c) => c.details.advancePayment.ytmQualifiedRate),
      },
      dedicatedStaff: {
        avgStaffCount: avgVal((c) => c.details.dedicatedStaff.avgStaffCount),
        onDutyRate: avgVal((c) => c.details.dedicatedStaff.onDutyRate),
        qualificationRate: avgVal((c) => c.details.dedicatedStaff.qualificationRate),
      },
      profitability: {
        monthlyReviewNetProfitMargin: avgVal((c) => c.details.profitability.monthlyReviewNetProfitMargin),
        monthlyReviewGrossProfitMargin: avgVal((c) => c.details.profitability.monthlyReviewGrossProfitMargin),
        ytmNetProfitMargin: avgVal((c) => c.details.profitability.ytmNetProfitMargin),
        ytmGrossProfitMargin: avgVal((c) => c.details.profitability.ytmGrossProfitMargin),
      },
      execution: {
        huiCaiFuScore: cityManagerAvgScoreValue,
        memberSystemScore: memberSystemScoreValue,
      },
      rebates: {
        regularQuarterlyRate: avgVal((c) => c.details.rebates.regularQuarterlyRate),
        extraQuarterlyRate: avgVal((c) => c.details.rebates.extraQuarterlyRate),
      },
      rectification: {
        lastQuarterRectificationRatio: avgVal((c) => c.details.rectification.lastQuarterRectificationRatio),
        ytmRectificationRatio: avgVal((c) => c.details.rectification.ytmRectificationRatio),
      },
    },
  };
}

// Construct tree
// Level 3: 作战分部 (Branches) -> 作战部 (Departments) -> 8大战区 (Regions) -> 全国 (National)

// 华东战区
const zhejiangBranches = [
  createBranchNode('b-nb', '宁波作战分部', 'dep-zj', 42, 18500),
  createBranchNode('b-wz', '温州作战分部', 'dep-zj', 38, 15200),
  createBranchNode('b-hz', '湖州作战分部', 'dep-zj', 24, 8900),
  createBranchNode('b-qz', '衢州作战分部', 'dep-zj', 18, 5600),
  createBranchNode('b-hangz', '杭州作战分部', 'dep-zj', 55, 24000),
  createBranchNode('b-jh', '金华作战分部', 'dep-zj', 32, 12800),
];

const sunanBranches = [
  createBranchNode('b-sz', '苏州作战分部', 'dep-sunan', 48, 21000),
  createBranchNode('b-wx', '无锡作战分部', 'dep-sunan', 36, 14500),
  createBranchNode('b-cz', '常州作战分部', 'dep-sunan', 28, 10200),
];

const subeiBranches = [
  createBranchNode('b-nj', '南京作战分部', 'dep-subei', 45, 19200),
  createBranchNode('b-xz', '徐州作战分部', 'dep-subei', 35, 12000),
  createBranchNode('b-nt', '南通作战分部', 'dep-subei', 30, 11500),
];

const zhejiangDep = aggregateChildren('dep-zj', '浙江作战部', 'department', 'reg-hd', zhejiangBranches);
const sunanDep = aggregateChildren('dep-sunan', '苏南作战部', 'department', 'reg-hd', sunanBranches);
const subeiDep = aggregateChildren('dep-subei', '苏北作战部', 'department', 'reg-hd', subeiBranches);

const huadongRegion = aggregateChildren('reg-hd', '华东战区', 'region', 'nat-1', [
  zhejiangDep,
  sunanDep,
  subeiDep,
]);

// 华北战区
const beijingBranches = [
  createBranchNode('b-bj-c', '朝阳作战分部', 'dep-bj', 30, 16000),
  createBranchNode('b-bj-h', '海淀作战分部', 'dep-bj', 28, 14800),
];
const hebeiBranches = [
  createBranchNode('b-sjz', '石家庄作战分部', 'dep-hb', 32, 11000),
  createBranchNode('b-ts', '唐山作战分部', 'dep-hb', 25, 9200),
];
const beijingDep = aggregateChildren('dep-bj', '北京作战部', 'department', 'reg-hb', beijingBranches);
const hebeiDep = aggregateChildren('dep-hb', '河北作战部', 'department', 'reg-hb', hebeiBranches);
const huabeiRegion = aggregateChildren('reg-hb', '华北战区', 'region', 'nat-1', [beijingDep, hebeiDep]);

// 华南战区
const guangdongBranches = [
  createBranchNode('b-gz', '广州作战分部', 'dep-gd', 50, 23000),
  createBranchNode('b-szh', '深圳作战分部', 'dep-gd', 48, 25000),
  createBranchNode('b-fs', '佛山作战分部', 'dep-gd', 35, 13800),
];
const guangxiBranches = [
  createBranchNode('b-nn', '南宁作战分部', 'dep-gx', 28, 8900),
  createBranchNode('b-gl', '桂林作战分部', 'dep-gx', 20, 5800),
];
const guangdongDep = aggregateChildren('dep-gd', '广东作战部', 'department', 'reg-hn', guangdongBranches);
const guangxiDep = aggregateChildren('dep-gx', '广西作战部', 'department', 'reg-hn', guangxiBranches);
const huananRegion = aggregateChildren('reg-hn', '华南战区', 'region', 'nat-1', [guangdongDep, guangxiDep]);

// 西南战区
const sichuanBranches = [
  createBranchNode('b-cd', '成都作战分部', 'dep-sc', 52, 21500),
  createBranchNode('b-my', '绵阳作战分部', 'dep-sc', 26, 8200),
];
const chongqingBranches = [
  createBranchNode('b-cq-y', '渝中作战分部', 'dep-cq', 30, 12500),
  createBranchNode('b-cq-j', '江北作战分部', 'dep-cq', 28, 11000),
];
const sichuanDep = aggregateChildren('dep-sc', '四川作战部', 'department', 'reg-xn', sichuanBranches);
const chongqingDep = aggregateChildren('dep-cq', '重庆作战部', 'department', 'reg-xn', chongqingBranches);
const xinanRegion = aggregateChildren('reg-xn', '西南战区', 'region', 'nat-1', [sichuanDep, chongqingDep]);

// 鲁豫皖战区
const shandongBranches = [
  createBranchNode('b-jn', '济南作战分部', 'dep-sd', 40, 16800),
  createBranchNode('b-qd', '青岛作战分部', 'dep-sd', 42, 18200),
  createBranchNode('b-wf', '潍坊作战分部', 'dep-sd', 30, 11000),
];
const henanBranches = [
  createBranchNode('b-zz', '郑州作战分部', 'dep-henan', 46, 19000),
  createBranchNode('b-ly', '洛阳作战分部', 'dep-henan', 28, 9800),
];
const anhuiBranches = [
  createBranchNode('b-hf', '合肥作战分部', 'dep-ah', 38, 14200),
  createBranchNode('b-wh', '芜湖作战分部', 'dep-ah', 22, 7500),
];
const shandongDep = aggregateChildren('dep-sd', '山东作战部', 'department', 'reg-lyw', shandongBranches);
const henanDep = aggregateChildren('dep-henan', '河南作战部', 'department', 'reg-lyw', henanBranches);
const anhuiDep = aggregateChildren('dep-ah', '安徽作战部', 'department', 'reg-lyw', anhuiBranches);
const luyuwanRegion = aggregateChildren('reg-lyw', '鲁豫皖战区', 'region', 'nat-1', [
  shandongDep,
  henanDep,
  anhuiDep,
]);

// 华中战区
const hubeiBranches = [
  createBranchNode('b-wuh', '武汉作战分部', 'dep-hb-c', 48, 20500),
  createBranchNode('b-xf', '襄阳作战分部', 'dep-hb-c', 25, 8500),
];
const hunanBranches = [
  createBranchNode('b-cs', '长沙作战分部', 'dep-hn-c', 44, 18000),
  createBranchNode('b-zz-h', '株洲作战分部', 'dep-hn-c', 22, 7200),
];
const hubeiDep = aggregateChildren('dep-hb-c', '湖北作战部', 'department', 'reg-hz', hubeiBranches);
const hunanDep = aggregateChildren('dep-hn-c', '湖南作战部', 'department', 'reg-hz', hunanBranches);
const huazhongRegion = aggregateChildren('reg-hz', '华中战区', 'region', 'nat-1', [hubeiDep, hunanDep]);

// 西北战区
const shaanxiBranches = [
  createBranchNode('b-xa', '西安作战分部', 'dep-sx', 42, 17200),
  createBranchNode('b-xy', '咸阳作战分部', 'dep-sx', 24, 7800),
];
const shaanxiDep = aggregateChildren('dep-sx', '陕西作战部', 'department', 'reg-xb', shaanxiBranches);
const xibeiRegion = aggregateChildren('reg-xb', '西北战区', 'region', 'nat-1', [shaanxiDep]);

// 东北战区
const liaoningBranches = [
  createBranchNode('b-sy', '沈阳作战分部', 'dep-ln', 38, 14500),
  createBranchNode('b-dl', '大连作战分部', 'dep-ln', 35, 14000),
];
const liaoningDep = aggregateChildren('dep-ln', '辽宁作战部', 'department', 'reg-db', liaoningBranches);
const dongbeiRegion = aggregateChildren('reg-db', '东北战区', 'region', 'nat-1', [liaoningDep]);

// 全国根节点
export const NATIONAL_ROOT: DepartmentNode = aggregateChildren('nat-1', '全国', 'national', undefined, [
  huadongRegion,
  huabeiRegion,
  huananRegion,
  xinanRegion,
  luyuwanRegion,
  huazhongRegion,
  xibeiRegion,
  dongbeiRegion,
]);

// Helper lookup functions
export function findNodeById(root: DepartmentNode, id: string): DepartmentNode | null {
  if (root.id === id) return root;
  if (!root.children) return null;
  for (const child of root.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}
