# Initial take-home exercise for the Clerk TAM role by [Chris Wafer](cwafer@hotmail.com)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to login/sign up.

## Overview
This is a simple application using Clerk and Next.js that implements user onboarding via two auth flows (Google and Email/Password), simple metadata collection, and Organization creation, as described in [this image](img/Clerk_auth.png).

At a high level:
 1. ```app/middleware.ts``` checks if the user is signed in
    1. If not signed in, redirects to sign in. Sign in supports Google or Email (which requires an additional verification step).
    1. If signed in, check if onboarding is complete
       1. If complete, ```app/middleware.ts``` performs additional checks (onboarding might be complete but the user deleted metadata) and then forwards the user to the Org profile page ```app/organization-profile```.
       1. If not complete, redirect to ```app/onboarding``` route
 1. The ```app/onboarding``` route gathers simple metadata from the user prior to allowing them to join an Organization. Required adding a route matcher in ```app/middleware.ts```. Note that one of the requirements in was for a user to be able to join an existing organization or create a new organization here. They currently can only create a new organization...without an invite to an org I wasn't able to find a way to allow joining an existing org. Additional members can be invited to an existing org once the user lands on the ```app/organization-profile``` page using the "Members" link.
 1. ```app/organization-profile``` contains customization of the base Clerk organization profile. In addition to the "General" and "Members" links, links have been added for a simple "Read Me", viewing the "Birth Date/Place Info" metadata that was gathered during onboarding, Switching orgs, and viewing some "Very Important Info".

 Also note that the ```app/.env``` file was also updated to include my Clerk keys and redirects to support the onboarding flow.

## Approach
It's been a while since I worked on an app from scratch (as opposed to troubleshooting/extending) so I took this as a great learning opportunity to get back in the "developer" groove. I started by creating a free Clerk account and playing around in the dashboard, then dove into the Clerk docs. Using the [Getting Started](https://clerk.com/docs/nextjs/getting-started/quickstart) quickstart got me up and running with a simple Next.js app that supported user sign up/sign in, and after that the [Clerk Guides](https://clerk.com/docs/guides/overview) and [UI Reference Docs](https://clerk.com/docs/nextjs/reference/components/overview) got me the rest of the way. 
Particularly useful docs included: 
* [Add custom onboarding to your authentication flow](https://clerk.com/docs/guides/development/add-onboarding-flow)
* [Organizations](https://clerk.com/docs/guides/organizations/overview)
* [Add custom pages and links to the <OrganizationProfile /> component](https://clerk.com/docs/guides/customizing-clerk/adding-items/organization-profile)

## The Stack
I chose Next.js as the stack for this exercise. While I haven't been a "developer" for a good while now, I have and continue to work with a lot of customer code and, during my time at Auth0, Next.js was one of the more popular Stacks. The built-in App Router and middleware support also contributed to making this a simple stack to use for this. Lastly, it helped that the Clerk docs seemed to default to Next.js and provided many useful examples and explanations.

## How Could this be Extended?
There are almost limitless ways to extend this exercise and allow it to support multiple use cases. A few starter ideas:
1. If possible, figure out how to allow a new user to join an existing Org without an invitation as part of the Onboarding flow.
1. Get birth date/place information from Social provider (Google in this exercise) if available.
1. Add age/birth place verification (ingesting data from external source, zip code verification, etc.).
1. Show collected metadata on the ```user-profile```.
1. Restrict org membership based on email domain.
1. Automatically join org based on email domain.
1. RBAC for orgs to restrict creation/deletion.
1. Support additional login methods (Microsoft, LinkedIn, Apple, etc.).
1. Additional metadata checks - right now, if we see Onboarding is complete, we assume we have the required metadata. However, a user could have deleted one or more pieces of the required data and, if so, we should gather that info.
1. Add MFA requirements (SMS/Authenticator app) for users.
1. Add Phone/Passkey options for users to sign up.
1. Restrict signups based on invites, waitlist, or geography (i.e. "Block users from country XX due to regulation YY").

## Before we go...
I really enjoyed this exercise, and was impressed by the Clerk platform. Using the configuration UI along with the quickstarts/docs paved the way for a fun couple of hours learning (and, as always with development, a few instances of "wow why did that happen?"). The speed with which I was able to add basic authentication was really eye-opening, and it definitely feels like you all are building something special.

Thanks for the opportunity!