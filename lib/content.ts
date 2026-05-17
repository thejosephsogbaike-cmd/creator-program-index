import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { SectionContent, SectionFrontmatter } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), 'content/sections')

// Canonical order for all 22 sections (00–21)
const SECTION_ORDER = [
  'foundation',               // 00
  'attribution',              // 01
  'sourcing',                 // 02
  'brief-writing',            // 03
  'business-case',            // 04
  'scaling',                  // 05
  'creator-retention',        // 06
  'content-approval',         // 07
  'event-activations',        // 08
  'cross-functional',         // 09
  'the-profession',           // 10
  'creator-payment-operations', // 11
  'budgeting',                // 12
  'working-with-agencies',    // 13
  'early-stage-programs',     // 14
  'creator-contracts',        // 15
  'creator-types',            // 16
  'internal-creator-programs', // 17
  'international-programs',   // 18
  'technology-stack',         // 19
  'industry-playbooks',       // 20
  'programme-design',         // 21
]

export function getAllSections(): SectionFrontmatter[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
      const { data } = matter(raw)
      return data as SectionFrontmatter
    })
    .sort((a, b) => {
      const ai = SECTION_ORDER.indexOf(a.slug)
      const bi = SECTION_ORDER.indexOf(b.slug)
      // Unknown slugs sort to the end
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    })
}

export function getSectionBySlug(slug: string): SectionContent | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    frontmatter: data as SectionFrontmatter,
    content,
  }
}

export function getAllSectionSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
}

// Extracts the first N paragraphs from the "What Practitioners Actually Do" section
export function getOpenLayerContent(content: string, paragraphCount = 2): string {
  const section = content.split('## What Practitioners Actually Do')[1]
  if (!section) return ''

  const nextSection = section.split(/^## /m)[0]
  const paragraphs = nextSection
    .trim()
    .split(/\n\n+/)
    .filter(p => p.trim())
    .slice(0, paragraphCount)

  return paragraphs.join('\n\n')
}
