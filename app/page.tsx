'use client'

import { useUser } from "@clerk/clerk-react";
import { redirect } from 'next/navigation'

export default function Home() {
  // Get the current user and check if they're signed in
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  // If we're here, the user is logged in, loaded, and the middleware has determined that the user is onboarded.
  // Since we require birthDate and birthPlace, and a user might have deleted those post-onboarding, let's check them again
  const userMetadata = user.publicMetadata;

  if (userMetadata['birthDate'] && userMetadata['birthPlace']) {
    // All good. Let's get them over to the org workspace
    redirect('/organization-profile');
  }
  else {
    // We're missing one or more required pieces of metadata. Should alert the user, set onboardingComplete = False, and redirect to the /onboarding path
    // For this exercise, let's just tell them something's wrong
    return <div>Oops! We're missing some required account information.</div>;
  }
}
