export interface IAd {
  companyName: string
  imageUrl: string
  targetUrl: string
  adSection: string
  priorityLevel: string
  startDate: Date
  endDate: Date
  stats: {
    totalImpressions: number
    totalClicks: number
  }
}
