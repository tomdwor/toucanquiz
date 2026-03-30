import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import type { Components } from 'react-markdown'
import type { ExtraProps } from 'react-markdown'
import type { Element } from 'hast'
import { MermaidChart } from './MermaidChart'

interface RichContentProps {
  content: string
  className?: string
}

type CodeProps = React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  ExtraProps

function CodeBlock({ node, className, children, ...props }: CodeProps) {
  const lang = className?.match(/language-(\w+)/)?.[1] ?? ''
  const source = String(children).replace(/\n$/, '')

  if (lang === 'mermaid') {
    return <MermaidChart source={source} />
  }

  const isBlock = (node as Element | undefined)?.position?.start.line !==
    (node as Element | undefined)?.position?.end.line ||
    source.includes('\n')

  if (isBlock) {
    return (
      <pre className="my-3 overflow-x-auto rounded-lg bg-gray-100 px-2 py-1 text-sm">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    )
  }

  return (
    <code
      className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-800"
      {...props}
    >
      {children}
    </code>
  )
}

const components: Components = {
  code: CodeBlock as Components['code'],
}

export function RichContent({ content, className = '' }: RichContentProps) {
  return (
    <div className={`rich-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, [rehypeHighlight, { plainText: ['mermaid'] }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
