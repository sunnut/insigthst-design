import type { CSSProperties, FC, ReactNode } from 'react';
import { Card } from 'antd';
import styles from './view.module.css';

export type StatCardPresetTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'purple';

/** 自定义语义色：color 必填，bg 控制圆形图标底色 */
export interface StatCardCustomTone {
  color: string;
  bg?: string;
}

export type StatCardTone = StatCardPresetTone | StatCardCustomTone;

export interface StatCardProps {
  /** 主数值 */
  value: ReactNode;
  /** 标题文案 */
  label: ReactNode;
  /** 辅助说明 */
  description?: ReactNode;
  /** 左侧圆形图标 */
  icon?: ReactNode;
  /** 语义色，控制圆形图标底色与图标色 */
  tone?: StatCardTone;
  /** 覆盖主数值颜色 */
  valueColor?: string;
  className?: string;
  style?: CSSProperties;
  hoverable?: boolean;
  onClick?: () => void;
  /**
   * 是否占满父容器宽度。栅格内多卡并列时用默认 true；
   * 单独放一行时建议 false，避免整行拉满。
   */
  block?: boolean;
}

const toneClass: Record<StatCardPresetTone, string> = {
  primary: styles.tonePrimary,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
  neutral: styles.toneNeutral,
  purple: styles.tonePurple,
};

function isPresetTone(tone: StatCardTone): tone is StatCardPresetTone {
  return typeof tone === 'string';
}

function resolveIconTone(tone: StatCardTone): {
  preset?: StatCardPresetTone;
  color?: string;
  bg?: string;
} {
  if (isPresetTone(tone)) {
    return { preset: tone };
  }
  return {
    color: tone.color,
    bg: tone.bg ?? `color-mix(in srgb, ${tone.color} 12%, transparent)`,
  };
}

const StatCard: FC<StatCardProps> = ({
  value,
  label,
  description,
  icon,
  tone = 'primary',
  valueColor,
  className,
  style,
  hoverable,
  onClick,
  block = true,
}) => {
  const interactive = Boolean(onClick);
  const iconTone = resolveIconTone(tone);
  const layoutClass = block ? styles.rootFill : styles.rootCompact;
  const rootClass = [layoutClass, className, interactive ? styles.clickable : '']
    .filter(Boolean)
    .join(' ');

  const iconCircleStyle =
    iconTone.preset == null
      ? { background: iconTone.bg, color: iconTone.color }
      : undefined;

  return (
    <Card
      size="small"
      hoverable={hoverable ?? interactive}
      className={`${styles.card} ${rootClass}`}
      style={style}
      onClick={onClick}
    >
      <div className={`${styles.body} ${iconTone.preset ? toneClass[iconTone.preset] : ''}`}>
        {icon != null && (
          <div className={styles.iconCircle} style={iconCircleStyle}>
            {icon}
          </div>
        )}
        <div className={styles.content}>
          <span className={styles.label}>{label}</span>
          <div className={styles.value} style={valueColor ? { color: valueColor } : undefined}>
            {value}
          </div>
          {description != null && description !== '' && (
            <div className={styles.description}>{description}</div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
