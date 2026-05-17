export interface User {
  id: string
  email: string
  first_name: string
  role: string
  company_stage: string
  geography: string
  beehiiv_subscriber_id?: string
  created_at: string
  last_seen_at?: string
}

export interface PractitionerProfile {
  id: string
  user_id: string
  vertical: string
  program_maturity: string
  biggest_challenge: string
  completed_at: string
}

export interface MagicLink {
  id: string
  user_id: string
  token: string
  expires_at: string
  used: boolean
  created_at: string
}

export interface SectionFrontmatter {
  title: string
  slug: string
  section_number?: string
  headline_finding: string
  data_points: number
  last_updated?: string
  status: 'published' | 'draft' | 'coming_soon'
  section_purpose?: string
}

export interface SectionContent {
  frontmatter: SectionFrontmatter
  content: string
}

export interface SessionPayload {
  userId: string
  email: string
}

// Dropdown options
export const ROLES = [
  'In-house CPM',
  'Agency CPM',
  'Fractional CPM',
  'Creator',
  'Brand or Marketing Leader',
  'Investor or Researcher',
  'Other',
]

export const COMPANY_STAGES = [
  'Pre-seed or Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Public Company',
  'Agency',
  'Consultant or Freelancer',
  'Other',
]

export const GEOGRAPHIES = [
  'United Kingdom',
  'United States',
  'Europe',
  'Africa',
  'Asia-Pacific',
  'Other',
]

export const VERTICALS = [
  'B2B SaaS',
  'Fintech or Financial Services',
  'Professional Services',
  'HR Technology',
  'Security',
  'Healthcare Technology',
  'Hardware or Industrial',
  'Agency',
  'Other',
]

export const PROGRAM_MATURITIES = [
  'Planning my first program',
  'Under 6 months',
  '6 to 18 months',
  '18 months or more',
  'Not currently running one',
]
