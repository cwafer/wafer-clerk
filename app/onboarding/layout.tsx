import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // Send them through the onboarding flow, and once onboarding is complete, redirect to the dash
    if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
        redirect('/dashboard')
  }

  return <>{children}</>
}