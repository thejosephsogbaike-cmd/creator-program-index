export interface SubSection {
  title: string
  description: string
}

/**
 * Map of section slugs to their sub-sections.
 * All sub-sections are in coming-soon holding state.
 */
export const SUBSECTIONS: Record<string, SubSection[]> = {
  // Section 02 — Creator Sourcing
  sourcing: [
    {
      title: 'Creator Onboarding',
      description:
        'The process of getting a creator from signed contract to first published content. The gap between sourcing and briefing that determines whether a great creator on paper becomes a great creator in practice.',
    },
    {
      title: 'Programme at a Glance',
      description:
        'The six data fields that contextualise every creator programme — type, roster size, budget range, ICP job title, primary channel, and outcome metric. Collected from every practitioner conversation that feeds the Index.',
    },
  ],

  // Section 06 — Creator Retention
  'creator-retention': [
    {
      title: 'Day-to-Day Relationship Management',
      description:
        'What happens between the brief and the published content — the active campaign relationship management that determines whether a creator produces their best work or their most compliant work. Check-in cadence, feedback delivery, and reading the signals before the content arrives.',
    },
  ],

  // Section 07 — Content Approval and Governance
  'content-approval': [
    {
      title: 'Crisis and Reputation Management',
      description:
        'What happens when governance fails publicly — a creator posts off-brief, posts early, or generates negative attention. The decision tree and response framework for the highest-stakes scenario in creator program management.',
    },
  ],
}
