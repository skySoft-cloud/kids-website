/** 站点配置 —— 导航、栏目信息统一在这里维护 */

export const SITE = {
  name: '亲子育儿规划',
  tagline: '家庭成长志',
  edition: '第 6 期',
  lastUpdated: '2026 年 9 月',
  description:
    '围绕三岁半女儿的成长规划：亲子游戏（素养启蒙）、无敏食谱、园内成长、健康守护、家庭生活、长期规划，可分享、可复用、持续更新。',
} as const;

export interface NavItem {
  href: string;
  label: string;
}

/** 主导航（改菜单只改这里，全站生效） */
export const mainNav: NavItem[] = [
  { href: '/', label: '首页' },
  { href: '/kindergarten/', label: '园内成长' },
  { href: '/games/', label: '亲子游戏' },
  { href: '/meals/', label: '无敏食谱' },
  { href: '/health/', label: '健康守护' },
  { href: '/family/', label: '家庭生活' },
  { href: '/planning/', label: '长期规划' },
];

/** 园内成长子导航（kindergarten 与 kg-* 系列页共用，顺序：成长三力 → 日常运营 → 入园回顾） */
export const kgSubNav: NavItem[] = [
  { href: '/kindergarten/', label: '总览' },
  { href: '/kg-social/', label: '社交力' },
  { href: '/kg-habits/', label: '习惯力' },
  { href: '/kg-cognition/', label: '认知启蒙' },
  { href: '/kg-allergy/', label: '过敏管理' },
  { href: '/kg-grandparents/', label: '老人接送' },
  { href: '/kg-communication/', label: '家校沟通' },
  { href: '/kg-items/', label: '物品准备' },
  { href: '/kg-first-week/', label: '第一周逐日' },
  { href: '/kg-ability/', label: '能力训练' },
  { href: '/kg-psychology/', label: '心理准备' },
];
