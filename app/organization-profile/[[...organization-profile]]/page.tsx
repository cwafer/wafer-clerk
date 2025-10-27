'use client'

import { OrganizationProfile , OrganizationSwitcher } from '@clerk/nextjs'
import { useUser } from "@clerk/clerk-react";

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
}

const AccountSettings = () => {
  // Get the current user and check if they're signed in
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  // If we're here, the user is logged in, loaded, and the middleware has determined that the user is onboarded.
  // We've also checked for consistency of the required metadata
  const userMetadata = user.publicMetadata;
  
  return (
    <div>
      <h1 style={{padding: '5px'}}>Welcome, {user?.firstName} {user?.lastName}!</h1>
      <br></br><p style={{padding: '5px'}}>Here's the info we have about your birth:</p><br></br>
      <div>
        <label style={{padding: '5px'}}>Birth date: {userMetadata['birthDate']}</label>
      </div>
      <br></br>
      <div>
        <label style={{padding: '5px'}}>Birth place: {userMetadata['birthPlace']}</label>
      </div>
    </div>
  )
}

const OrganizationProfilePage = () => (
  <OrganizationProfile path="/organization-profile" routing="path">
    {/* Customizations */}
    {/* Read Me */}
    <OrganizationProfile.Page label="Read Me" labelIcon={<DotIcon />} url="readme">
      <div>
        <h1>Basic info:</h1>
        <li>Click on 'Birth Date/Place Info' to view the information we have about your birth.</li>
        <li>Click on 'Switch Orgs' to switch to another org of which you are a member.</li>
        <li>Click on 'Very Important Info' to read some very important info.</li>
      </div>
    </OrganizationProfile.Page>

    {/* Birth info */}
    <OrganizationProfile.Page label="Birth Date/Place Info" labelIcon={<DotIcon />} url="account-settings">
      <AccountSettings />
    </OrganizationProfile.Page>

    {/* Org switcher */}
    <OrganizationProfile.Page label="Switch Orgs" labelIcon={<DotIcon />} url="/organization-selection">
      <OrganizationSwitcher />
    </OrganizationProfile.Page>

    {/* T&C */}
    <OrganizationProfile.Page label="Very Important Info" labelIcon={<DotIcon />} url="terms">
      <div>
        <h1>Terms and Conditions</h1>
        <p>Long list of very important and legally binding items that no one, including the people who wrote it, understands.</p>
      </div>
    </OrganizationProfile.Page>
  </OrganizationProfile>
)

export default OrganizationProfilePage

