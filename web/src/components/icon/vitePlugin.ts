import { readdirSync } from 'fs'
import { camelCase, upperFirst } from 'lodash-es'
import { join } from 'path'
import type { Plugin } from 'vite'

/**
 * Lucide icon 模块拆分加载插件
 * Lucide 模块总大小约 615kb，gzip 压缩后 128kb
 * 插件实现了生产环境下 Lucide 模块的拆分加载，将 Lucide 图标按首字母范围拆分为 5 个虚拟模块
 * 每个虚拟模块被 import 时产生一个独立 chunk
 */
export function lucideIconSplitPlugin(): Plugin {
    const VIRTUAL_PREFIX = 'virtual:lucide-icons/'
    const RESOLVED_PREFIX = '\0' + VIRTUAL_PREFIX

    const BATCHES: Record<string, RegExp> = {
        'a-c': /^[a-c]/,
        'd-l': /^[d-l]/,
        'm-p': /^[m-p]/,
        'q-s': /^[q-s]/,
        't-z': /^[t-z0-9]/,
    }

    let iconFiles: string[]

    return {
        name: 'lucide-icon-batches',
        enforce: 'pre',

        configResolved() {
            const dir = join(process.cwd(), 'node_modules/@lucide/vue/dist/esm/icons')
            try {
                iconFiles = readdirSync(dir).filter((f) => f.endsWith('.mjs') && f !== 'index.mjs')
            } catch {
                iconFiles = []
            }
        },

        resolveId(id) {
            if (id.startsWith(VIRTUAL_PREFIX)) {
                return RESOLVED_PREFIX + id.slice(VIRTUAL_PREFIX.length)
            }
        },

        load(id) {
            if (!id.startsWith(RESOLVED_PREFIX)) return

            const batchName = id.slice(RESOLVED_PREFIX.length)
            const pattern = BATCHES[batchName]
            if (!pattern || !iconFiles) return 'export {}'

            const matched = iconFiles.filter((f) => pattern.test(f.replace('.mjs', '')))

            // 使用显式 import + 具名 export 而非 re-export，
            // 确保 Rolldown 将所有图标模块内联到同一个 chunk 中
            const imports: string[] = []
            const exports: string[] = []
            matched.forEach((f, i) => {
                const pascalName = upperFirst(camelCase(f.replace('.mjs', '')))
                const varName = `_${i}`
                imports.push(`import ${varName} from '@lucide/vue/dist/esm/icons/${f}'`)
                exports.push(`export const ${pascalName} = ${varName}`)
            })

            return imports.join('\n') + '\n' + exports.join('\n')
        },
    }
}
