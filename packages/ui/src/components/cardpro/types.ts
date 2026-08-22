import type { CSSProperties, ReactNode } from 'react';
import type { MenuProps } from 'antd';

export type CardProPresetTone = 'success' | 'warning' | 'neutral' | 'danger';

/** 自定义语义色：color 必填，bg / bar 可选 */
export interface CardProCustomTone {
  color: string;
  bg?: string;
  bar?: string;
}

export type CardProStatusTone = CardProPresetTone | CardProCustomTone;

export interface CardProStatus {
  label: string;
  tone: CardProStatusTone;
}

export interface CardProMeta {
  creator: string;
  time: string;
  avatar?: ReactNode;
  /** 完全自定义菜单项（与 onEdit/onDelete 二选一，优先 menuItems） */
  menuItems?: MenuProps['items'];
  /** 自定义 menuItems 时，统一在此处理点击（按 key 分发）；冒泡由 CardPro 内部拦截 */
  onMenuClick?: MenuProps['onClick'];
}

export interface CardProMarketTag {
  label: string;
  icon?: ReactNode;
  /** 有值时以 "label: value | ..." 文本格式渲染整个标签列表 */
  value?: unknown;
}

/** 次要标签行：渲染在 tags 下方，结构为 label / icon / value */
export interface CardProOtherTag {
  label: string;
  icon?: ReactNode;
  value?: unknown;
}

export interface CardProStat {
  label: string;
  value: number | string;
}

interface CardProBase {
  className?: string;
  style?: CSSProperties;
  hoverable?: boolean;
  onClick?: () => void;
  /** 快捷：编辑回调，自动生成默认菜单项 */
  onEdit?: () => void;
  /** 快捷：删除回调，自动生成默认菜单项 */
  onDelete?: () => void;
}

export type CardProProps = CardProBase &
  (
    | {
        variant: 'model';
        title: string;
        description?: string;
        status?: CardProStatus;
        meta: CardProMeta;
        muted?: boolean;
        /** true 公有 / false 私有，显示在状态标签前 */
        visibility?: boolean;
        tags?: CardProMarketTag[] | null;
        /** 次要标签，渲染在 tags 下一行 */
        otherTags?: CardProOtherTag[] | null;
      }
    | {
        variant: 'market';
        title: string;
        id?: string;
        description?: string;
        status?: CardProStatus;
        tags?: CardProMarketTag[] | null;
        /** 次要标签，渲染在 tags 下一行 */
        otherTags?: CardProOtherTag[] | null;
        meta: CardProMeta;
        /** true 公有 / false 私有，显示在状态标签前 */
        visibility?: boolean;
        /** 下载数，≥1000 自动转为 K/M 格式 */
        downloads?: number;
      }
    | {
        variant: 'entity';
        title: string;
        domain: string;
        status?: CardProStatus;
        stats: CardProStat[];
        meta: CardProMeta;
      }
    | {
        variant: 'dataset';
        title: string;
        description: string;
        temporal: string;
        tags?: string[] | null;
        cover?: ReactNode;
        /**
         * 封面背景（无 cover 节点时使用）：
         * - CSS 渐变，如 linear-gradient(...)
         * - 图片 URL，如 /images/dataset.jpg 或 https://...
         * - 完整 CSS，如 url(...) / #color
         */
        coverGradient?: string;
      }
  );
