import { useState } from 'react'
import {
  Input,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Slider,
  Checkbox,
  Radio,
  Space,
  Typography,
  Button,
  TimePicker,
  AutoComplete,
  Cascader,
} from '@insightst-design/ui'
import { SearchOutlined, UserOutlined, MailOutlined } from '@insightst-design/icons'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundDisabledSwitch,
  PlaygroundSizeControl,
  PlaygroundSection,
  FieldLabel,
  buildThemeCode,
} from './playgroundLayout'

const { Text } = Typography
const { RangePicker } = DatePicker

const selectOptions = [
  { value: '全部领域', label: '全部领域 (All)' },
  { value: '计算机科学', label: '计算机科学 (12篇)' },
  { value: '工程技术', label: '工程技术 (8篇)' },
  { value: '医学', label: '医学 (5篇)' },
  { value: '人文社科', label: '人文社科 (3篇)' },
]

const checkOptions = [
  { label: '计算机科学 (12篇)', value: '计算机科学' },
  { label: '工程技术 (8篇)', value: '工程技术' },
  { label: '医学 (5篇)', value: '医学' },
  { label: '人文社科 (3篇)', value: '人文社科' },
  { label: '全部 (6篇)', value: '全部' },
]

const defaultChecks = ['计算机科学', '医学']

const radioOptions = ['精确匹配', '模糊匹配', '语义匹配', '全文检索']

const cascaderOptions = [
  {
    value: '华东',
    label: '华东',
    children: [
      { value: '上海', label: '上海' },
      { value: '杭州', label: '杭州' },
    ],
  },
  {
    value: '华北',
    label: '华北',
    children: [
      { value: '北京', label: '北京' },
      { value: '天津', label: '天津' },
    ],
  },
]

const autoCompleteOptions = [
  { value: '数据集成任务' },
  { value: '数据治理规则' },
  { value: '数据资产目录' },
  { value: '数据服务 API' },
]

function buildFormCode() {
  const fieldOptionsCode = JSON.stringify(checkOptions, null, 2)

  return `import {
  Input, Select, DatePicker, InputNumber,
  Switch, Slider, Checkbox, Radio, TimePicker,
  AutoComplete, Cascader,
} from '@insightst-design/ui'
import { SearchOutlined, UserOutlined } from '@insightst-design/icons'

const { RangePicker } = DatePicker

{/* ── Input ── */}
<Input placeholder="请输入任务名称" size="middle" />
<Input status="error" placeholder="请输入" />
<Input
  prefix={<SearchOutlined />}
  placeholder="搜索任务..."
  allowClear
/>
<Input addonBefore="https://" addonAfter=".com" defaultValue="example" />
<Input suffix={<UserOutlined />} placeholder="用户名" />
<Input.Password placeholder="请输入密码" />
<Input.TextArea rows={4} placeholder="请输入描述" showCount maxLength={200} />
<Input placeholder="禁用状态" disabled />

{/* ── Select / 级联 / 自动完成 ── */}
<Select
  placeholder="选择领域"
  options={[
    { value: '全部领域', label: '全部领域' },
    { value: '计算机科学', label: '计算机科学' },
  ]}
/>
<Select mode="multiple" placeholder="多选标签" options={tagOptions} />
<Select showSearch placeholder="可搜索" options={tagOptions} />
<Cascader options={regionOptions} placeholder="选择地区" />
<AutoComplete options={taskOptions} placeholder="输入任务名" />

{/* ── 日期 / 时间 / 数字 ── */}
<DatePicker placeholder="选择日期" style={{ width: '100%' }} />
<RangePicker placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} />
<TimePicker placeholder="选择时间" style={{ width: '100%' }} />
<InputNumber min={1} max={100} defaultValue={24} style={{ width: '100%' }} />

{/* ── Switch / Slider ── */}
<Switch defaultChecked /> 启用自动保存
<Slider defaultValue={65} />

{/* ── Checkbox / Radio ── */}
const fieldOptions = ${fieldOptionsCode}

<Checkbox.Group options={fieldOptions} defaultValue={${JSON.stringify(defaultChecks)}} />
<Radio.Group defaultValue="精确匹配">
  <Radio value="精确匹配">精确匹配</Radio>
  <Radio value="模糊匹配">模糊匹配</Radio>
  <Radio value="语义匹配">语义匹配</Radio>
  <Radio value="全文检索">全文检索</Radio>
</Radio.Group>`
}

export default function FormPlayground() {
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle')
  const [disabled, setDisabled] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [selectVal, setSelectVal] = useState('全部领域')
  const [selectMulti, setSelectMulti] = useState<string[]>(['计算机科学'])
  const [searchVal, setSearchVal] = useState('')
  const [autoVal, setAutoVal] = useState('')
  const [cascaderVal, setCascaderVal] = useState<string[]>([])
  const [numVal, setNumVal] = useState<number | null>(24)
  const [switchA, setSwitchA] = useState(true)
  const [switchB, setSwitchB] = useState(false)
  const [sliderVal, setSliderVal] = useState(65)
  const [checks, setChecks] = useState<string[]>(defaultChecks)
  const [radioVal, setRadioVal] = useState('精确匹配')

  const { darkCode, lightCode } = buildThemeCode('输入控件 (Form Controls)', buildFormCode())
  const fieldProps = { size, disabled }

  return (
    <PlaygroundRoot>
      <PlaygroundHeader trailing={<PlaygroundDisabledSwitch disabled={disabled} onChange={setDisabled} />} />
      <PlaygroundSizeControl size={size} onChange={setSize} />

      <PlaygroundSection title="Input 输入框" titleEn="Text Fields">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <FieldLabel>基础 Basic</FieldLabel>
            <Input placeholder="请输入任务名称" {...fieldProps} style={{ width: '100%' }} />
          </div>
          <div>
            <FieldLabel>
              错误 Error <span style={{ color: 'var(--ds-danger)' }}>*</span>
            </FieldLabel>
            <Input
              placeholder={hasError ? '' : '请输入'}
              status={hasError ? 'error' : undefined}
              {...fieldProps}
              style={{ width: '100%' }}
            />
            {hasError && (
              <Text type="danger" style={{ fontSize: 12, display: 'block', marginTop: 6 }}>
                此项为必填字段
              </Text>
            )}
            <Button
              type="link"
              size="small"
              onClick={() => setHasError(!hasError)}
              disabled={disabled}
              style={{ padding: 0, marginTop: 4, fontSize: 12 }}
            >
              切换错误 Toggle Error
            </Button>
          </div>
          <div>
            <FieldLabel>搜索 prefix + allowClear</FieldLabel>
            <Input
              prefix={<SearchOutlined />}
              placeholder="搜索任务..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              allowClear
              {...fieldProps}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <FieldLabel>后缀 suffix</FieldLabel>
            <Input
              prefix={<UserOutlined />}
              suffix={<MailOutlined />}
              placeholder="联系人邮箱"
              {...fieldProps}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <FieldLabel>前后缀 addonBefore / addonAfter</FieldLabel>
            <Input
              addonBefore="https://"
              addonAfter=".com"
              defaultValue="example"
              {...fieldProps}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <FieldLabel>密码 Input.Password</FieldLabel>
            <Input.Password placeholder="请输入密码" {...fieldProps} style={{ width: '100%' }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <FieldLabel>文本域 TextArea · showCount</FieldLabel>
            <Input.TextArea
              rows={4}
              placeholder="请输入描述"
              showCount
              maxLength={200}
              disabled={disabled}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="选择类 Select" titleEn="Pickers">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          <div>
            <FieldLabel>单选 Select</FieldLabel>
            <Select
              value={selectVal}
              onChange={setSelectVal}
              options={selectOptions}
              disabled={disabled}
              size={size}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <FieldLabel>多选 mode="multiple"</FieldLabel>
            <Select
              mode="multiple"
              value={selectMulti}
              onChange={setSelectMulti}
              options={selectOptions}
              placeholder="选择多个领域"
              disabled={disabled}
              size={size}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <FieldLabel>可搜索 showSearch</FieldLabel>
            <Select
              showSearch
              value={selectVal}
              onChange={setSelectVal}
              options={selectOptions}
              placeholder="搜索并选择"
              disabled={disabled}
              size={size}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <FieldLabel>级联 Cascader</FieldLabel>
            <Cascader
              options={cascaderOptions}
              value={cascaderVal}
              onChange={(val) => setCascaderVal(val as string[])}
              placeholder="选择地区"
              disabled={disabled}
              size={size}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ gridColumn: '1 / span 2' }}>
            <FieldLabel>自动完成 AutoComplete</FieldLabel>
            <AutoComplete
              options={autoCompleteOptions}
              value={autoVal}
              onChange={setAutoVal}
              placeholder="输入任务名称"
              disabled={disabled}
              size={size}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="日期 / 时间 / 数字" titleEn="Date & Number">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          <div>
            <FieldLabel>日期 DatePicker</FieldLabel>
            <DatePicker
              placeholder="选择日期"
              disabled={disabled}
              size={size}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <FieldLabel>范围 RangePicker</FieldLabel>
            <RangePicker
              placeholder={['开始日期', '结束日期']}
              disabled={disabled}
              size={size}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <FieldLabel>时间 TimePicker</FieldLabel>
            <TimePicker
              placeholder="选择时间"
              disabled={disabled}
              size={size}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <FieldLabel>数字 InputNumber</FieldLabel>
            <InputNumber
              min={1}
              max={100}
              value={numVal}
              onChange={setNumVal}
              disabled={disabled}
              size={size}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="开关 / 滑块 / 选项" titleEn="Toggles">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <FieldLabel>开关 Switch</FieldLabel>
            <Space direction="vertical" size="middle">
              <Space>
                <Switch checked={switchA} onChange={setSwitchA} disabled={disabled} size={size === 'large' ? 'default' : 'small'} />
                <Text type={disabled ? 'secondary' : undefined}>
                  启用自动保存 {switchA ? '(开)' : '(关)'}
                </Text>
              </Space>
              <Space>
                <Switch checked={switchB} onChange={setSwitchB} disabled={disabled} size={size === 'large' ? 'default' : 'small'} />
                <Text type={disabled ? 'secondary' : undefined}>
                  启用通知 {switchB ? '(开)' : '(关)'}
                </Text>
              </Space>
            </Space>

            <div style={{ marginTop: 24 }}>
              <FieldLabel>滑块 Slider · {sliderVal}%</FieldLabel>
              <Slider
                value={sliderVal}
                onChange={setSliderVal}
                disabled={disabled}
                style={{ maxWidth: 320 }}
              />
            </div>
          </div>

          <div>
            <FieldLabel>复选框 Checkbox.Group</FieldLabel>
            <Checkbox.Group
              options={checkOptions}
              value={checks}
              onChange={(vals) => setChecks(vals as string[])}
              disabled={disabled}
            />

            <div style={{ marginTop: 24 }}>
              <FieldLabel>单选框 Radio.Group</FieldLabel>
              <Radio.Group
                value={radioVal}
                onChange={(e) => setRadioVal(e.target.value)}
                disabled={disabled}
              >
                <Space direction="vertical">
                  {radioOptions.map((opt) => (
                    <Radio key={opt} value={opt}>{opt}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </div>
        </div>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
