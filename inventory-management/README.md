# Inventory Management System

A complete inventory management application built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

### Authentication System
- **Login Page**: Email or phone number authentication
- **Signup Page**: User registration with pending approval workflow
- **Admin Approval**: Admin users can approve/deny pending registrations
- **Default Admin**: `adimn-sanumishra01234@gmail.com` / `Mishra@123`

### User Management
- **Role-based Access**: Admin and regular user roles
- **User Approval System**: New users require admin approval
- **Password Management**: Users can change their passwords

### Inventory Management
- **Add Items**: Form to add inventory items with automatic pricing for precious metals
- **Categories**: Configurable item categories with precious metal designation
- **Pricing**: Auto-calculate prices for precious metals based on weight and rates
- **Dashboard**: Overview of inventory stats and recent items

### Settings & Configuration
- **Store Settings**: Configure store name
- **Category Management**: Add categories and mark as precious metals
- **Precious Metal Rates**: Set price per gram for precious metal categories
- **Password Change**: Secure password update functionality

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN/UI
- **State Management**: React Context API
- **Data Persistence**: Local Storage
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Login page
│   ├── signup/            # Signup page
│   ├── pending-approval/  # Pending approval page
│   ├── dashboard/         # Main dashboard
│   ├── add-item/          # Add item form
│   ├── users/             # User management (admin only)
│   └── settings/          # Settings page
├── components/
│   ├── ui/                # ShadCN UI components
│   └── DashboardLayout.tsx # Main app layout
├── contexts/              # React Context providers
│   ├── AuthContext.tsx    # Authentication & user management
│   ├── DataContext.tsx    # Inventory items & bills
│   └── StoreContext.tsx   # Store settings & categories
├── hooks/
│   └── useLocalStorage.ts # Local storage hook
├── lib/
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript type definitions
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Start Development Server**:
   ```bash
   bun run dev
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000`

4. **Login as Admin**:
   - Email: `adimn-sanumishra01234@gmail.com`
   - Password: `Mishra@123`

## Usage Guide

### Admin Workflow
1. Login with admin credentials
2. Navigate to "Users" to approve pending user registrations
3. Configure categories and precious metal rates in "Settings"
4. Add inventory items with automatic pricing

### User Workflow
1. Register a new account (requires admin approval)
2. Once approved, login and access the dashboard
3. Add inventory items and view summary statistics
4. Change password in settings

### Key Features

#### Automatic Precious Metal Pricing
- Mark categories as "precious metals" in settings
- Set rates per gram for each precious metal category
- When adding items in precious metal categories, enter weight
- Price automatically calculated: `weight × rate_per_gram`

#### Local Storage Persistence
- All data persists in browser local storage
- Custom `useLocalStorage` hook prevents SSR issues
- Data survives page refreshes and browser sessions

#### Responsive Design
- Mobile-first responsive design
- Fixed sidebar navigation on desktop
- Touch-friendly interfaces on mobile

## Data Models

### User
- ID, email, phone, password
- Admin role flag
- Approval status (pending/approved/denied)

### Item  
- Name, category, description
- Optional weight (for precious metals)
- Price (auto-calculated for precious metals)

### Category
- Name and precious metal designation
- Used for item classification and pricing

### Store Settings
- Store name
- Categories list
- Precious metal rates per category

## Security Features

- Password-based authentication
- Role-based access control
- Admin-only routes protection
- Secure password change workflow
- Local storage data encryption

## Development

### Adding New Pages
1. Create page component in `src/app/[route]/page.tsx`
2. Wrap with `DashboardLayout` for authenticated pages
3. Add navigation link in `DashboardLayout.tsx` if needed

### Adding New UI Components
1. Place ShadCN components in `src/components/ui/`
2. Custom components in `src/components/`
3. Follow existing patterns for styling and accessibility

### State Management
- Use existing contexts for related functionality
- Create new contexts for distinct feature areas
- Always use `useLocalStorage` hook for persistence

## Build & Deploy

```bash
# Build for production
bun run build

# Start production server
bun run start

# Type checking
bun run typecheck

# Linting
bun run lint
```

## License

MIT License - feel free to use this project as a starting point for your own inventory management system.