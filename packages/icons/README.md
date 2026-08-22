# @insightst-design/icons

基于 iconfont 的公司自定义图标库，同时透传 [Ant Design Icons](https://ant.design/components/icon-cn) 的全量图标，统一通过一个包引入使用。

## 安装

```bash
npm i @insightst-design/icons
```

## 使用

### 自定义图标

使用 `Icon` 组件渲染公司 iconfont 图标，通过 `name` 属性指定图标名称。

```tsx
import { Icon } from '@insightst-design/icons';

// 线条风格图标
<Icon name="instance-line1" />

// 实心风格图标
<Icon name="apps-fill" />

// 支持自定义样式
<Icon name="instance-line1" style={{ fontSize: 24, color: '#1677ff' }} />
<Icon name="instance-line1" className="my-icon" />
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 图标名称，对应 iconfont class 后缀 |
| `style` | `React.CSSProperties` | 自定义内联样式 |
| `className` | `string` | 自定义 class |

### Ant Design 图标

本包透传了 `@ant-design/icons` 的全量导出，可直接从本包引入，无需单独安装 `@ant-design/icons`。

```tsx
import { DownOutlined, SearchOutlined, UserOutlined } from '@insightst-design/icons';

<DownOutlined />
<SearchOutlined style={{ fontSize: 16, color: '#999' }} />
<UserOutlined />
```

Ant Design 图标的完整列表及用法，请参考 [Ant Design Icons 文档](https://ant.design/components/icon-cn)。
