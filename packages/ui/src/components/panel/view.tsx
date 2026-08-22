import { type FC, type PropsWithChildren, type ReactNode, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@insightst-design/icons';
import styles from './view.module.css';

export interface PanelProps {
  title?: ReactNode;
  extra?: ReactNode;
  fullscreen?: boolean;
  hideHeader?: boolean;
  onToggleFull?: (isFullScreen: boolean) => void;
}

const Panel: FC<PropsWithChildren<PanelProps>> = ({
  title,
  extra,
  fullscreen = false,
  hideHeader = false,
  onToggleFull,
  children,
}) => {
  const [isFull, setIsFull] = useState(false);

  const toggleFull = () => {
    const next = !isFull;
    setIsFull(next);
    onToggleFull?.(next);
  };

  const renderExtra = () => {
    if (!fullscreen) return extra;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {extra}
        <Tooltip title={isFull ? '退出全屏' : '全屏'}>
          <Button
            type="text"
            icon={isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={toggleFull}
          />
        </Tooltip>
      </div>
    );
  };

  return (
    <div className={`${styles.wrapper} ${isFull ? styles.fullscreen : ''}`}>
      {!hideHeader && (
        <div className={styles.header}>
          <span className={styles.headerTitle}>{title}</span>
          <div className={styles.headerExtra}>{renderExtra()}</div>
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Panel;
