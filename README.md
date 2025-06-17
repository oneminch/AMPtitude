# AMPtitude

A Customer Service Representative (CSR) portal for AMP Memberships.

## Features

- [x] View a list of users
  - Be able to see a list of all registered users of the mobile app.
- [x] Quickly find and view details for a specific user
  - Be able to access detailed information about a specific user, including their account information, active vehicle subscriptions, and purchase history.
- [x] Edit account information
  - Be able to modify account information for users, such as name, email, phone number, or other important details.
- [x] View/Edit vehicle subscriptions
  - Have the ability to view and edit vehicle subscriptions for users. This includes adding, removing, or transferring subscriptions.

## Project Structure

```bash
src/
├── __tests__
│   └── e2e
│       └── customers.spec.ts                 # E2E Tests
├── app
│   ├── (routes)
│   │   ├── customers
│   │   │   ├── [id]
│   │   │   │   ├── edit
│   │   │   │   │   └── page.tsx              # Edit Customer Page
│   │   │   │   ├── new
│   │   │   │   │   └── page.tsx              # Add New Subscription Page
│   │   │   │   └── page.tsx                  # View Customer Profile Page
│   │   │   └── page.tsx                      # View All Customers Page
│   │   └── subscriptions
│   │       ├── [id]
│   │       │   └── page.tsx                  # View Subscription Page
│   │       └── page.tsx                      # Placeholder Page
│   ├── error.tsx                             # Global Error Page
│   ├── favicon.ico                           # Site favicon
│   ├── globals.css                           # Global Styles
│   ├── icon.png                              # Site icon
│   ├── layout.tsx                            # Root Layout
│   └── not-found.tsx                         # Global 404 Page
├── components
│   ├── forms
│   │   ├── add-subscription-form.tsx         # Form for Adding Subscriptions
│   │   ├── edit-customer-form.tsx            # Form for Editing Customer Info
│   │   └── filter-customers-form.tsx         # Form for Filtering Customers
│   ├── layout
│   │   └── sidebar.tsx                       # Global Sidebar & Navigation
│   ├── modals
│   │   ├── edit-subscription-modal.tsx       # Modal for Editing Subscriptions
│   │   ├── remove-subscription-modal.tsx     # Modal for Removing Subscriptions
│   │   └── transfer-subscription-modal.tsx   # Modal for Transferring Subscriptions
│   ├── shared                                # Shared Reusable Components
│   ├── tables
│   │   ├── customers-table.tsx               # Table for Listing & Filtering Customers
│   │   ├── purcase-history-table.tsx         # Table for Customer Purchase History
│   │   └── subscriptions-table.tsx           # Table for Customer Subscriptions
│   └── ui                                    # shadcn/ui Base Components
├── lib
│   ├── constants.tsx                         # Global Constants for Simplicity
│   ├── db                                    # AI-Generated Database & Backend
│   └── utils.ts                              # Utilities
└── types                                     # Types / Data Schema
```

## Screenshots

| Desktop Screenshots                                                                             | Mobile Screenshot                             |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------- |
| ![Desktop 1](/public/screenshots/desktop-1.png) ![Desktop 2](/public/screenshots/desktop-2.png) | ![Mobile 1](/public/screenshots/mobile-1.png) |
| ![Desktop 3](/public/screenshots/desktop-3.png) ![Desktop 4](/public/screenshots/desktop-4.png) | ![Mobile 1](/public/screenshots/mobile-2.png) |
