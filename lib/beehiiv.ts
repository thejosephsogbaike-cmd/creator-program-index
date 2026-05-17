interface BeehiivSubscriberPayload {
  email: string
  firstName: string
  role: string
  companyStage: string
  geography: string
}

interface BeehiivResponse {
  data?: {
    id: string
  }
}

export async function createBeehiivSubscriber(payload: BeehiivSubscriberPayload): Promise<string | null> {
  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !publicationId) {
    console.warn('beehiiv credentials not configured — skipping subscriber creation')
    return null
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: payload.email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'creator-program-index',
          utm_medium: 'organic',
          utm_campaign: 'index-registration',
          custom_fields: [
            { name: 'first_name', value: payload.firstName },
            { name: 'role', value: payload.role },
            { name: 'company_stage', value: payload.companyStage },
            { name: 'geography', value: payload.geography },
          ],
        }),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error('beehiiv API error:', res.status, text)
      return null
    }

    const data: BeehiivResponse = await res.json()
    return data.data?.id ?? null
  } catch (err) {
    console.error('beehiiv request failed:', err)
    return null
  }
}
