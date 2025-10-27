'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'

export default function OnboardingComponent() {
  const [error, setError] = React.useState('')
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData)
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload()
      router.push('/')
    }
    if (res?.error) {
      setError(res?.error)
    }
  }
  return (
    <div className="items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50" style={{padding: '5px'}}>Welcome, {user?.firstName} {user?.lastName}!</h1>
      <br></br><p style={{padding: '5px'}}>We need to gather a few pieces of information, then you'll be on your way!</p><br></br><br></br>
      <form action={handleSubmit}>
        <div>
          <label style={{padding: '5px'}}>Birth date</label>
          <p style={{padding: '5px'}}>Please enter your birth date</p>
          &nbsp;&nbsp;&nbsp;<input type="date" style={{backgroundColor: 'white', color: 'black', padding: '5px'}} name="birthDate" required />
        </div>
        <br></br>
        <div>
          <label style={{padding: '5px'}}>Birth City, State</label>
          <p style={{padding: '5px'}}>Please enter the City and State you were born in (ex. Houston, Texas)</p>
          &nbsp;&nbsp;&nbsp;<input type="text" style={{backgroundColor: 'white', color: 'black', padding: '5px'}} name="birthPlace" required />
        </div>
        {error && <p className="text-red-600">Error: {error}</p>}
        <br></br>
        &nbsp;&nbsp;&nbsp;<button type="submit" style={{backgroundColor: 'red', color: 'black', padding: '5px'}}>Submit</button>
      </form>
    </div>
  )
}