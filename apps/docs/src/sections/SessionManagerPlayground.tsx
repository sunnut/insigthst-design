import { useState } from 'react'
import { Button, Space, Typography, Input } from '@insightst-design/ui'
import { session } from '@insightst-design/utils'
import CodeBlock from './CodeBlock'
import { PlaygroundRoot, PlaygroundSection } from './playgroundLayout'

const { Text } = Typography

const installCode = `npm install @insightst-design/utils`

const basicCode = `import { session } from '@insightst-design/utils'

// 写入 sessionStorage（默认）
session.put('userToken', 'abc123')

// 写入 localStorage（第三个参数 isLocal = true）
session.put('theme', 'dark', true)

// 读取 sessionStorage
const token = session.get('userToken')       // 'abc123' | ''

// 读取 localStorage
const theme = session.get('theme', true)     // 'dark' | ''

// 删除单个 key
session.remove('userToken')
session.remove('theme', true)

// 清空整个存储
session.clear()        // 清空 sessionStorage
session.clear(true)    // 清空 localStorage`

const jsonCode = `// put 会自动对非字符串值调用 JSON.stringify
// get 返回字符串，需手动解析
const userInfo = { name: '张三', role: 'admin' }
session.put('userInfo', JSON.stringify(userInfo))

const raw = session.get('userInfo')
const parsed = raw ? JSON.parse(raw) : null
console.log(parsed?.name) // '张三'`

const userHelperCode = `import {
  getUserInfoStorage,
  setUserInfoStorage,
  clearUserSession,
} from '@insightst-design/utils'

// 读取（优先从 localStorage，兼容旧版 sessionStorage 数据）
const userInfo = getUserInfoStorage()
console.log(userInfo?.username, userInfo?.email)

// 写入（存至 localStorage）
setUserInfoStorage({
  username: 'zhangsan',
  nickname: '张三',
  email: 'zhangsan@example.com',
})

// 登出时清理所有会话数据（token、userInfo 等）
clearUserSession()`

interface ApiRow {
  method: string
  signature: string
  desc: string
}

const apiRows: ApiRow[] = [
  { method: 'put', signature: 'put(key, value, isLocal?)', desc: '写入值，isLocal=true 时存入 localStorage' },
  { method: 'get', signature: 'get(key, isLocal?)', desc: '读取值，不存在时返回空字符串' },
  { method: 'remove', signature: 'remove(key, isLocal?)', desc: '删除指定 key' },
  { method: 'clear', signature: 'clear(isLocal?)', desc: '清空 sessionStorage 或 localStorage' },
]

function ApiTable({ rows }: { rows: ApiRow[] }) {
  const tdBase: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid var(--ds-border)',
    fontSize: 13,
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--ds-bg-layout)' }}>
            {['方法', '签名', '说明'].map((h) => (
              <th key={h} style={{ ...tdBase, color: 'var(--ds-text-secondary)', textAlign: 'left', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.method}>
              <td style={{ ...tdBase, color: 'var(--ds-primary)', fontFamily: 'monospace', fontWeight: 500 }}>{row.method}</td>
              <td style={{ ...tdBase, color: 'var(--ds-text-secondary)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{row.signature}</td>
              <td style={{ ...tdBase, color: 'var(--ds-text-primary)' }}>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SessionManagerPlayground() {
  const [key, setKey] = useState('demo_key')
  const [value, setValue] = useState('hello world')
  const [isLocal, setIsLocal] = useState(false)
  const [readKey, setReadKey] = useState('demo_key')
  const [readResult, setReadResult] = useState<string | null>(null)
  const [log, setLog] = useState<string[]>([])

  const addLog = (msg: string) => setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10))

  const handlePut = () => {
    session.put(key, value, isLocal)
    addLog(`put("${key}", "${value}", isLocal=${isLocal}) → 写入 ${isLocal ? 'localStorage' : 'sessionStorage'}`)
  }

  const handleGet = () => {
    const result = session.get(readKey, isLocal)
    setReadResult(result || '（空）')
    addLog(`get("${readKey}", isLocal=${isLocal}) → "${result || ''}"`)
  }

  const handleRemove = () => {
    session.remove(readKey, isLocal)
    addLog(`remove("${readKey}", isLocal=${isLocal}) → 已删除`)
  }

  const handleClear = () => {
    session.clear(isLocal)
    addLog(`clear(isLocal=${isLocal}) → 已清空 ${isLocal ? 'localStorage' : 'sessionStorage'}`)
  }

  return (
    <PlaygroundRoot>
      <div>
        <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 8 }}>
          对 <code>sessionStorage</code> 和 <code>localStorage</code> 的轻量封装，支持 SSR 环境（服务端访问不报错）。
        </Text>
      </div>

      <PlaygroundSection title="交互演示" titleEn="Interactive Demo">
        <div
          className="rounded-lg p-5"
          style={{ border: '1px solid var(--ds-border)', background: 'var(--ds-bg-card)' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 6 }}>Key</Text>
              <Input value={key} onChange={(e) => setKey(e.target.value)} placeholder="存储 key" />
            </div>
            <div>
              <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 6 }}>Value</Text>
              <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="存储值" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>存储位置：</Text>
            <Button
              size="small"
              type={!isLocal ? 'primary' : 'default'}
              onClick={() => setIsLocal(false)}
            >
              sessionStorage
            </Button>
            <Button
              size="small"
              type={isLocal ? 'primary' : 'default'}
              onClick={() => setIsLocal(true)}
            >
              localStorage
            </Button>
          </div>

          <Space>
            <Button type="primary" onClick={handlePut}>put（写入）</Button>
          </Space>

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--ds-border)' }}>
            <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 6 }}>读取 / 删除 Key</Text>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <Input
                value={readKey}
                onChange={(e) => setReadKey(e.target.value)}
                placeholder="要读取或删除的 key"
                style={{ flex: 1 }}
              />
            </div>
            <Space>
              <Button onClick={handleGet}>get（读取）</Button>
              <Button danger onClick={handleRemove}>remove（删除）</Button>
              <Button danger onClick={handleClear}>clear（清空全部）</Button>
            </Space>
            {readResult !== null && (
              <div
                className="rounded mt-3 px-3 py-2"
                style={{ background: 'var(--ds-bg-layout)', border: '1px solid var(--ds-border)' }}
              >
                <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>读取结果：</Text>
                <Text style={{ fontSize: 13, color: 'var(--ds-primary)', fontFamily: 'monospace', marginLeft: 8 }}>{readResult}</Text>
              </div>
            )}
          </div>

          {log.length > 0 && (
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--ds-border)' }}>
              <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 8 }}>操作日志</Text>
              <div
                className="rounded p-3"
                style={{ background: 'var(--ds-bg-layout)', fontFamily: 'monospace', fontSize: 12, maxHeight: 160, overflow: 'auto' }}
              >
                {log.map((line, i) => (
                  <div key={i} style={{ color: i === 0 ? 'var(--ds-primary)' : 'var(--ds-text-tertiary)', marginBottom: 2 }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="安装" titleEn="Install">
        <CodeBlock darkCode={installCode} lightCode={installCode} lang="bash" />
      </PlaygroundSection>

      <PlaygroundSection title="基础用法" titleEn="Basic Usage">
        <CodeBlock darkCode={basicCode} lightCode={basicCode} />
      </PlaygroundSection>

      <PlaygroundSection title="存取 JSON 对象" titleEn="JSON Object">
        <CodeBlock darkCode={jsonCode} lightCode={jsonCode} />
      </PlaygroundSection>

      <PlaygroundSection title="用户信息快捷方法" titleEn="User Info Helpers">
        <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 8 }}>
          utils 包内置了用户信息的存取辅助函数，读取时会自动兼容旧版 sessionStorage 数据。
        </Text>
        <CodeBlock darkCode={userHelperCode} lightCode={userHelperCode} />
      </PlaygroundSection>

      <PlaygroundSection title="实例方法速查" titleEn="API Reference">
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--ds-border)' }}>
          <ApiTable rows={apiRows} />
        </div>
      </PlaygroundSection>
    </PlaygroundRoot>
  )
}
