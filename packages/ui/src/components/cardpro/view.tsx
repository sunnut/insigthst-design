import type { CSSProperties, FC, MouseEvent, ReactNode } from 'react';
import type { MenuProps } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { Card, Tag, Typography, Dropdown, Popover } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@insightst-design/icons';
import type {
  CardProMeta,
  CardProProps,
  CardProStatus,
  CardProPresetTone,
  CardProStatusTone,
  CardProMarketTag,
  CardProOtherTag,
} from './types';
import styles from './view.module.css';

const { Text } = Typography;

const MAX_VISIBLE_TAGS = 3;

function hasChinese(text: string): boolean {
  return /[一-龥]/.test(text);
}

function TagLabel({ text }: { text: string }) {
  const maxLen = hasChinese(text) ? 4 : 10;
  const needsEllipsis = text.length > maxLen;
  return (
    <Text
      style={needsEllipsis ? { maxWidth: 80 } : undefined}
      ellipsis={needsEllipsis ? { tooltip: text } : false}
    >
      {text}
    </Text>
  );
}

function CardTagList<T>({
  tags,
  getKey,
  renderTag,
  getTagText,
  compact,
  className,
}: {
  tags: T[];
  getKey: (tag: T, index: number) => string;
  renderTag: (tag: T) => ReactNode;
  /** 用于 Popover 溢出时显示纯文本，以 `、` 连接 */
  getTagText?: (tag: T) => string;
  compact?: boolean;
  className?: string;
}) {
  const baseClass = [
    styles.tagList,
    compact ? styles.tagListCompact : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (tags.length === 0) {
    return null;
  }

  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTags = tags.slice(MAX_VISIBLE_TAGS);

  const popoverContent = getTagText
    ? (
      <div style={{ maxWidth: 500, wordBreak: 'break-word', whiteSpace: 'normal' }}>
        {hiddenTags.map(getTagText).join('、')}
      </div>
    )
    : (
      <div className="ds-popover-content">
        {hiddenTags.map((tag, index) => (
          <span key={getKey(tag, index + MAX_VISIBLE_TAGS)}>{renderTag(tag)}</span>
        ))}
      </div>
    );

  return (
    <div className={baseClass}>
      {visibleTags.map((tag, index) => (
        <span key={getKey(tag, index)}>{renderTag(tag)}</span>
      ))}
      {hiddenTags.length > 0 && (
        <Popover
          trigger="hover"
          placement="top"
          classNames={{ root: 'ds-popover' }}
          content={popoverContent}
        >
          <Tag className={`${styles.chipTag} ${styles.moreTag}`}>+{hiddenTags.length}</Tag>
        </Popover>
      )}
    </div>
  );
}

function formatOtherTagText(tag: CardProOtherTag): string {
  return tag.value !== undefined && tag.value !== null
    ? `${tag.label}: ${String(tag.value)}`
    : tag.label;
}

function renderOtherTag(tag: CardProOtherTag) {
  return (
    <Tag className={`${styles.chipTag} ${styles.chipTagWithIcon}`}>
      {tag.icon && <span>{tag.icon}</span>}
      <TagLabel text={tag.label} />
      {tag.value !== undefined && tag.value !== null && (
        <span>: {String(tag.value)}</span>
      )}
    </Tag>
  );
}

const toneStyles: Record<
  CardProPresetTone,
  { color: string; bg: string; bar: string }
> = {
  success: {
    color: 'var(--ds-success)',
    bg: 'var(--ds-success-bg)',
    bar: 'var(--ds-success)',
  },
  warning: {
    color: 'var(--ds-warning)',
    bg: 'var(--ds-warning-bg)',
    bar: 'var(--ds-warning)',
  },
  neutral: {
    color: 'var(--ds-neutral)',
    bg: 'var(--ds-neutral-bg)',
    bar: 'var(--ds-border)',
  },
  danger: {
    color: 'var(--ds-danger)',
    bg: 'var(--ds-danger-bg)',
    bar: 'var(--ds-danger)',
  },
};

function isPresetTone(tone: CardProStatusTone): tone is CardProPresetTone {
  return typeof tone === 'string';
}

function resolveToneStyles(tone: CardProStatusTone): {
  color: string;
  bg: string;
  bar: string;
} {
  if (isPresetTone(tone)) {
    return toneStyles[tone];
  }
  return {
    color: tone.color,
    bg: tone.bg ?? `color-mix(in srgb, ${tone.color} 12%, transparent)`,
    bar: tone.bar ?? tone.color,
  };
}

function StatusBadge({ status }: { status: CardProStatus }) {
  const tone = resolveToneStyles(status.tone);
  return (
    <span
      className={styles.statusBadge}
      style={{ color: tone.color, background: tone.bg }}
    >
      {status.label}
    </span>
  );
}

function VisibilityBadge({ visible }: { visible: boolean }) {
  return (
    <span className={styles.visibilityBadge}>
      {visible ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M3,21C2.44772005,21,2,20.552299,2,20L2,4C2,3.44772005,2.44772005,3,3,3L10.4141998,3L12.4142,5L20,5C20.552299,5,21,5.4477201,21,6L21,9L19,9L19,7L11.5858002,7L9.5857897,5L4,5L4,16.997999L5.5,11L22.5,11L20.1894,20.2425C20.0781,20.6877,19.678101,21,19.2192,21L3,21ZM19.9384,13L7.0615501,13L5.5615501,19L18.4384,19L19.9384,13Z" fill="#8a8f99" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M10.4141998,3L12.4142,5L21,5C21.552299,5,22,5.4477201,22,6L22,20C22,20.552299,21.552299,21,21,21L3,21C2.44772005,21,2,20.552299,2,20L2,4C2,3.44772005,2.44772005,3,3,3L10.4141998,3ZM9.5857897,5L4,5L4,19L20,19L20,7L11.5858002,7L9.5857897,5ZM12,9C13.1046,9,14,9.8954296,14,11C14,11.7398005,13.5983,12.3858004,13.0011,12.7318001L13,17L11,17L10.9998999,12.7323999C10.4021997,12.3865995,10,11.7403002,10,11C10,9.8954296,10.8954,9,12,9Z" fill="#8a8f99" />
        </svg>
      )}
      {visible ? '公开' : '私有'}
    </span>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3,19L21,19L21,21L3,21L3,19ZM13,13.1716L19.0711,7.1005001L20.4853,8.51472L12,17L3.51471996,8.51472L4.9289298,7.1005001L11,13.1716L11,2L13,2L13,13.1716Z" fill="var(--ds-text-secondary)" />
    </svg>
  );
}

function formatDownloads(n: number): string {
  if (n >= 1_000_000) return `${parseFloat((n / 1_000_000).toFixed(1))}M`;
  if (n >= 1_000) return `${parseFloat((n / 1_000).toFixed(1))}K`;
  return String(n);
}

/** 检查市场标签列表是否含有 value 字段，决定渲染模式 */
function hasValueTags(tags: CardProMarketTag[]): boolean {
  return tags.some(t => t.value !== undefined);
}

function DefaultAvatar() {
  return <span className={styles.avatar}>U</span>;
}

type MenuClickHandler = NonNullable<MenuProps['onClick']>;

/** 阻止菜单点击冒泡到 Card onClick */
function stopMenuEventPropagation(handler?: MenuClickHandler): MenuClickHandler | undefined {
  if (!handler) return undefined;
  return (info) => {
    info.domEvent.stopPropagation();
    handler(info);
  };
}

function wrapMenuItemClick(item: ItemType): ItemType {
  if (!item || typeof item !== 'object') return item;
  if ('type' in item && item.type === 'divider') return item;

  const next = { ...item } as Record<string, unknown>;

  if (typeof next.onClick === 'function') {
    next.onClick = stopMenuEventPropagation(next.onClick as MenuClickHandler);
  }

  if (Array.isArray(next.children)) {
    next.children = wrapMenuItems(next.children as MenuProps['items']);
  }

  return next as unknown as ItemType;
}

function wrapMenuItems(items: MenuProps['items']): MenuProps['items'] {
  return items?.map(wrapMenuItemClick);
}

function resolveMenuItems(
  meta: CardProMeta,
  onEdit?: () => void,
  onDelete?: () => void,
): MenuProps['items'] | undefined {
  if (meta.menuItems?.length) return meta.menuItems;

  const items: NonNullable<MenuProps['items']> = [];
  if (onEdit) {
    items.push({
      key: 'edit',
      label: '编辑',
      icon: <EditOutlined />,
      onClick: () => { onEdit(); },
    });
  }
  if (onDelete) {
    items.push({
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => { onDelete(); },
    });
  }
  return items.length > 0 ? items : undefined;
}

export function CardProMetaRow({
  meta,
  onEdit,
  onDelete,
  tight,
  downloads,
}: {
  meta: CardProMeta;
  onEdit?: () => void;
  onDelete?: () => void;
  tight?: boolean;
  /** 已格式化的下载量字符串，如 "12.8K" */
  downloads?: string;
}) {
  const menuItems = wrapMenuItems(resolveMenuItems(meta, onEdit, onDelete));

  const stopCardClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={`${styles.metaRow} ${tight ? styles.metaRowTight : ''}`}>
      <div className={styles.metaLeft}>
        {meta.avatar ?? <DefaultAvatar />}
        <Text className={styles.metaText}>
          {meta.creator} · {meta.time}
        </Text>
        {downloads && (
          <>
            <Text className={styles.metaText}> · </Text>
            <span className={styles.metaDownloads}>
              <DownloadIcon />
              <Text className={styles.metaText}>{downloads}</Text>
            </span>
          </>
        )}
      </div>
      {menuItems && menuItems.length > 0 && (
        <Dropdown
          menu={{
            items: menuItems,
            onClick: stopMenuEventPropagation(meta.onMenuClick),
          }}
          trigger={['click']}
        >
          <span
            className={styles.moreBtn}
            role="button"
            tabIndex={0}
            onClick={stopCardClick}
          >
            <MoreOutlined />
          </span>
        </Dropdown>
      )}
    </div>
  );
}

// dataset helper
function isImageCover(value: string): boolean {
  const v = value.trim();
  if (v.startsWith('url(')) return true;
  if (/^https?:\/\//i.test(v)) return true;
  if (v.startsWith('data:image/')) return true;
  if (/\.(jpg|jpeg|png|gif|webp|avif|svg)(\?.*)?$/i.test(v)) return true;
  if (v.startsWith('/') && !v.startsWith('/linear') && !v.startsWith('/radial')) return true;
  return false;
}

function resolveCoverStyle(value: string): CSSProperties {
  const v = value.trim();
  if (isImageCover(v)) {
    const backgroundImage = v.startsWith('url(') ? v : `url(${v})`;
    return {
      backgroundImage,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  }
  return { background: v };
}

function DatasetCover({ background }: { background: string }) {
  return (
    <div className={styles.cover} style={resolveCoverStyle(background)} />
  );
}

function buildStatusBarCardStyle(
  style: CSSProperties | undefined,
  statusBarTone: string | undefined,
): CSSProperties | undefined {
  if (!statusBarTone) return style;
  return {
    ...style,
    ['--card-status-bar' as string]: statusBarTone,
  };
}

const CardPro: FC<CardProProps> = (props) => {
  const { className, style, hoverable = true, onClick } = props;

  const isFlexVariant = props.variant === 'model' || props.variant === 'market';
  const cardClass = [
    styles.card,
    props.variant === 'dataset' ? styles.cardDataset : '',
    isFlexVariant ? styles.cardFlex : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (props.variant === 'dataset') {
    const cover =
      props.cover ??
      (props.coverGradient ? <DatasetCover background={props.coverGradient} /> : undefined);

    return (
      <Card
        hoverable={hoverable}
        className={cardClass}
        style={style}
        onClick={onClick}
        cover={cover}
        bodyStyle={{ padding: 16 }}
      >
        <Text strong className={styles.title}>
          {props.title}
        </Text>
        <p className={`${styles.description} ${styles.descriptionSpaced}`} title={props.description}>
          {props.description}
        </p>
        <Text className={styles.temporal}>时相：{props.temporal}</Text>
        {props.tags != null && (
          <CardTagList
            tags={props.tags}
            compact
            getKey={(tag) => tag}
            getTagText={(tag) => tag}
            renderTag={(tag) => (
              <Tag className={styles.chipTag}>
                <TagLabel text={tag} />
              </Tag>
            )}
          />
        )}
      </Card>
    );
  }

  const statusBarTone =
    (props.variant === 'model' || props.variant === 'entity') && props.status
      ? resolveToneStyles(props.status.tone).bar
      : undefined;

  const cardClassWithBar = statusBarTone
    ? `${cardClass} ${styles.cardWithStatusBar}`
    : cardClass;

  const cardStyle = buildStatusBarCardStyle(style, statusBarTone);

  if (props.variant === 'model') {
    return (
      <Card
        size="small"
        hoverable={hoverable}
        className={cardClassWithBar}
        style={cardStyle}
        onClick={onClick}
        styles={{ body: { padding: 16 } }}
      >
        <div className={`${styles.header} ${styles.headerMb8}`}>
          <Text
            strong
            className={`${styles.title} ${props.muted ? styles.titleMuted : ''}`}
          >
            {props.title}
          </Text>
          <div className={styles.headerBadges}>
            {props.visibility !== undefined && (
              <VisibilityBadge visible={props.visibility} />
            )}
            {props.status && <StatusBadge status={props.status} />}
          </div>
        </div>
        {props.description?.trim() && (
          <p className={styles.description} title={props.description}>{props.description}</p>
        )}
        {props.tags != null && props.tags.length > 0 && (
          <CardTagList
            tags={props.tags}
            getKey={(tag) => tag.label}
            getTagText={(tag) => tag.label}
            renderTag={(tag) => (
              <Tag className={`${styles.chipTag} ${styles.chipTagWithIcon}`}>
                {tag.icon && <span>{tag.icon}</span>}
                <TagLabel text={tag.label} />
              </Tag>
            )}
          />
        )}
        {props.otherTags != null && props.otherTags.length > 0 && (
          <CardTagList
            tags={props.otherTags}
            className={styles.otherTagList}
            getKey={(tag) => tag.label}
            getTagText={formatOtherTagText}
            renderTag={renderOtherTag}
          />
        )}
        <div className={styles.metaSpacer} />
        <CardProMetaRow meta={props.meta} onEdit={props.onEdit} onDelete={props.onDelete} />
      </Card>
    );
  }

  if (props.variant === 'market') {
    const hasTags = props.tags != null && props.tags.length > 0;
    const useValueMode = hasTags && hasValueTags(props.tags!);
    const downloadsText = props.downloads !== undefined
      ? formatDownloads(props.downloads)
      : undefined;

    return (
      <Card
        size="small"
        hoverable={hoverable}
        className={cardClass}
        style={style}
        onClick={onClick}
        styles={{ body: { padding: 16 } }}
      >
        <div className={`${styles.header} ${styles.headerMb8}`}>
          <Text strong className={styles.title}>
            {props.title}
          </Text>
          <div className={styles.headerBadges}>
            {props.visibility !== undefined && (
              <VisibilityBadge visible={props.visibility} />
            )}
            {props.status && <StatusBadge status={props.status} />}
          </div>
        </div>
        {props.id && (
          <div className={styles.idRow}>
            <Text copyable={{ text: props.id }}>{props.id}</Text>
          </div>
        )}
        {props.description?.trim() && (
          <p className={styles.description} title={props.description}>{props.description}</p>
        )}
        {hasTags && !useValueMode && (
          <CardTagList
            tags={props.tags!}
            getKey={(tag) => tag.label}
            getTagText={(tag) => tag.label}
            renderTag={(tag) => (
              <Tag className={`${styles.chipTag} ${styles.chipTagWithIcon}`}>
                {tag.icon && <span>{tag.icon}</span>}
                <TagLabel text={tag.label} />
              </Tag>
            )}
          />
        )}
        {hasTags && useValueMode && (
          <div className={styles.tagValueList}>
            {props.tags!.map((tag, i) => (
              <span key={tag.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {i > 0 && <span className={styles.tagValueSep}>|</span>}
                <span>{tag.label}: {String(tag.value)}</span>
              </span>
            ))}
          </div>
        )}
        {props.otherTags != null && props.otherTags.length > 0 && (
          <CardTagList
            tags={props.otherTags}
            className={styles.otherTagList}
            getKey={(tag) => tag.label}
            getTagText={formatOtherTagText}
            renderTag={renderOtherTag}
          />
        )}
        <div className={styles.metaSpacer} />
        <CardProMetaRow
          meta={props.meta}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          downloads={downloadsText}
        />
      </Card>
    );
  }

  // entity
  return (
    <Card
      size="small"
      hoverable={hoverable}
      className={cardClassWithBar}
      style={cardStyle}
      onClick={onClick}
      bodyStyle={{ padding: 16 }}
    >
      <div className={`${styles.header} ${styles.headerMb12}`}>
        <div>
          <Text strong className={`${styles.title} ${styles.titleSm}`}>
            {props.title}
          </Text>
          <br />
          <Text className={styles.subtitle}>{props.domain}</Text>
        </div>
        {props.status && <StatusBadge status={props.status} />}
      </div>
      <div className={styles.statsRow}>
        {props.stats.map((item) => (
          <div key={item.label} className={styles.statItem}>
            <div className={styles.statValue}>{item.value}</div>
            <Text className={styles.statLabel}>{item.label}</Text>
          </div>
        ))}
      </div>
      <CardProMetaRow meta={props.meta} onEdit={props.onEdit} onDelete={props.onDelete} tight />
    </Card>
  );
};

export default CardPro;
