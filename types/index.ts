export type UserRole = 'owner' | 'admin'
export type Plan = 'starter' | 'pro' | 'unlimited'
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete'
export type RequestChannel = 'sms' | 'email' | 'both'
export type RequestStatus = 'queued' | 'sent' | 'opened' | 'rated' | 'completed'

export interface Business {
  id: string
  name: string
  google_review_url: string
  logo_url: string | null
  brand_color: string
  sms_enabled: boolean
  email_enabled: boolean
  plan: Plan
  monthly_request_limit: number
  requests_used_this_period: number
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: SubscriptionStatus | null
  trial_ends_at: string | null
  sms_template: string | null
  email_template_subject: string | null
  email_template_body: string | null
  created_at: string
}

export interface Profile {
  id: string
  business_id: string
  role: UserRole
  full_name: string
  created_at: string
  businesses?: Business
}

export interface Customer {
  id: string
  business_id: string
  name: string
  phone: string | null
  email: string | null
  consent: boolean
  created_at: string
}

export interface ReviewRequest {
  id: string
  business_id: string
  customer_id: string
  channel: RequestChannel
  token: string
  status: RequestStatus
  rating: number | null
  sent_at: string | null
  responded_at: string | null
  customers?: Customer
}

export interface Feedback {
  id: string
  business_id: string
  request_id: string
  rating: number
  comment: string
  resolved: boolean
  created_at: string
  review_requests?: ReviewRequest & { customers?: Customer }
}

export interface OptOut {
  id: string
  business_id: string
  phone: string
  created_at: string
}
