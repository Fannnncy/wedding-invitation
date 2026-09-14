import { cp, mkdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const source = resolve(projectRoot, 'assets')
const target = resolve(projectRoot, 'public', 'assets')

// 页面以 /assets/... 直接引用的素材在 Vite 构建时不会自动打包；每次构建前同步一份。
await rm(target, { recursive: true, force: true })
await mkdir(resolve(projectRoot, 'public'), { recursive: true })
await cp(source, target, { recursive: true })
