import React from 'react';
import { isFillIcon } from './iconNames';
import './fill.css';
import './line.css';

export interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ name, className, style }) => {
  const baseClass = isFillIcon(name) ? 'icon-fill' : 'icon-line';
  return <i className={`${baseClass} icon-${name}${className ? ` ${className}` : ''}`} style={style} />;
};

export default Icon;
