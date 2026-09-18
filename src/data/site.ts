/** 站点配置 —— 导航、栏目信息统一在这里维护 */

export const SITE = {
  name: '亲子育儿规划',
  tagline: '家庭成长志',
  edition: '第 5 期',
  lastUpdated: '2026 年 9 月',
  description:
    '围绕三岁半女儿的成长规划：幼儿园适应、亲子游戏、无敏食谱、健康守护、家庭生活、长期规划，可分享、可复用、持续更新。',
} as const;

export interface NavItem {
  href: string;
  label: string;
}

/** 主导航（改菜单只改这里，全站生效） */
export const mainNav: NavItem[] = [
  { href: '/', label: '首页' },
  { href: '/kindergarten/', label: '幼儿园适应' },
  { href: '/games/', label: '亲子游戏' },
  { href: '/meals/', label: '无敏食谱' },
  { href: '/health/', label: '健康守护' },
  { href: '/family/', label: '家庭生活' },
  { href: '/planning/', label: '长期规划' },
];

/** 幼儿园专题子导航（kg-* 系列页共用） */
export const kgSubNav: NavItem[] = [
  { href: '/kindergarten/', label: '总览' },
  { href: '/kg-items/', label: '物品准备' },
  { href: '/kg-allergy/', label: '过敏管理' },
  { href: '/kg-first-week/', label: '第一周逐日' },
  { href: '/kg-grandparents/', label: '老人接送' },
  { href: '/kg-ability/', label: '能力训练' },
  { href: '/kg-psychology/', label: '心理准备' },
  { href: '/kg-communication/', label: '家校沟通' },
];
