# User Registration & Admin Approval Testing Guide

## 🧪 **Step-by-Step Testing Workflow**

### **Phase 1: New User Registration**

1. **Navigate to the application**
   - Open your browser and go to: `http://localhost:3001`
   - You should see the login page with the updated admin credentials displayed

2. **Access the signup page**
   - Click on "Sign up" link at the bottom of the login form
   - You'll be taken to `/signup`

3. **Create a test user account**
   - Fill in the signup form with test data:
     ```
     Email: testuser@example.com
     Phone: +1234567890
     Password: TestUser123
     Confirm Password: TestUser123
     ```
   - Click "Create Account"
   - You should see a success toast: "Account created successfully! Please wait for admin approval."
   - You'll be redirected to `/pending-approval` page

4. **View the pending approval page**
   - You should see a pending approval message
   - The page shows that the account is under review
   - There's a "Back to Login" button

### **Phase 2: Admin User Approval**

5. **Login as Admin**
   - Go back to the login page (`/`)
   - Login with admin credentials:
     ```
     Email: adimn-sanumishra01234@gmail.com
     Password: Mishra@123
     ```
   - You should be redirected to the dashboard (`/dashboard`)

6. **Navigate to User Management**
   - Click on "Users" in the sidebar navigation
   - You should see the Users page with two sections:
     - **Pending Approval**: Shows your test user waiting for approval
     - **Approved Users**: Shows the admin user

7. **Review pending user**
   - In the "Pending Approval" table, you should see:
     - Email: testuser@example.com
     - Phone: +1234567890
     - Status: pending
     - Created date
     - Action buttons: "Approve" and "Deny"

8. **Approve the test user**
   - Click the green "Approve" button for the test user
   - You should see a success toast: "User approved successfully!"
   - The user should move from "Pending Approval" to "Approved Users" section

### **Phase 3: Test Approved User Login**

9. **Logout from admin account**
   - Click on the user profile dropdown in the top-right corner
   - Click "Logout"
   - You'll be taken back to the login page

10. **Login with the newly approved user**
    - Enter the test user credentials:
      ```
      Email: testuser@example.com
      Password: TestUser123
      ```
    - Click "Sign In"
    - You should see a success toast and be redirected to the dashboard
    - The dashboard should show the user is logged in (but without admin privileges)

11. **Verify user access levels**
    - The sidebar should show: Dashboard, Add Item, Settings (no Users section)
    - The user can access all features except user management

### **Phase 4: Test User Denial (Optional)**

12. **Test the denial workflow**
    - Create another test user account with different credentials
    - Login as admin again
    - Go to Users page
    - Click "Deny" instead of "Approve" for the new user
    - The user should be completely removed from the system
    - Attempting to login with denied user credentials should fail

## 🎯 **Expected Results**

✅ **Signup Process**: 
- New users can register but cannot login immediately
- Users are redirected to pending approval page
- Data is saved to localStorage under `inventory-users`

✅ **Admin Approval**: 
- Admin can see all pending users
- Admin can approve users (moves to approved list)
- Admin can deny users (removes from system completely)

✅ **User Access**: 
- Approved users can login successfully  
- Approved users have limited access (no admin features)
- Denied users cannot access the system

## 🔍 **What to Check**

- **Data Persistence**: Refresh the page - data should persist
- **Role-Based Access**: Regular users shouldn't see admin features
- **Toast Notifications**: Success/error messages appear for all actions
- **Navigation**: Proper redirects after login/logout/approval
- **Form Validation**: Required fields are enforced

## 🐛 **Troubleshooting**

If you encounter issues:
- Check browser console for errors
- Verify localStorage data: `inventory-users`, `inventory-current-user`
- Ensure the development server is still running
- Try clearing localStorage to reset data

## 📊 **Test Data Templates**

**Test User 1:**
```
Email: john.doe@example.com
Phone: +1555123456
Password: JohnDoe123
```

**Test User 2:**
```
Email: jane.smith@example.com  
Phone: +1555654321
Password: JaneSmith456
```

Use these for comprehensive testing of the approval workflow!