// Simple test verification script
// Run this in the browser console to check localStorage data

console.log('=== INVENTORY MANAGEMENT TEST VERIFICATION ===');

// Check if users exist
const users = JSON.parse(localStorage.getItem('inventory-users') || '[]');
console.log('\n📥 Users in system:', users.length);

users.forEach((user, index) => {
  console.log(`${index + 1}. ${user.email} - ${user.status} - ${user.isAdmin ? 'Admin' : 'User'}`);
});

// Check current user
const currentUser = JSON.parse(localStorage.getItem('inventory-current-user') || 'null');
console.log('\n👤 Current logged in user:', currentUser ? currentUser.email : 'None');

// Check inventory items
const items = JSON.parse(localStorage.getItem('inventory-items') || '[]');
console.log('\n📦 Inventory items:', items.length);

// Check store settings
const storeSettings = JSON.parse(localStorage.getItem('inventory-store-settings') || '{}');
console.log('\n🏪 Store name:', storeSettings.storeName || 'Not set');
console.log('📂 Categories:', storeSettings.categories?.length || 0);

console.log('\n=== END VERIFICATION ===');

// Utility functions for testing
window.testUtils = {
  clearAllData: () => {
    localStorage.removeItem('inventory-users');
    localStorage.removeItem('inventory-current-user');
    localStorage.removeItem('inventory-items');
    localStorage.removeItem('inventory-store-settings');
    localStorage.removeItem('inventory-bills');
    console.log('🧹 All data cleared - refresh page to see reset state');
  },
  
  addTestUser: (email = 'test@example.com', status = 'pending') => {
    const users = JSON.parse(localStorage.getItem('inventory-users') || '[]');
    const testUser = {
      id: `test-${Date.now()}`,
      email: email,
      phone: '+1234567890',
      password: 'TestPassword123',
      isAdmin: false,
      status: status,
      createdAt: new Date().toISOString()
    };
    users.push(testUser);
    localStorage.setItem('inventory-users', JSON.stringify(users));
    console.log(`✅ Added test user: ${email} with status: ${status}`);
  },
  
  showAllData: () => {
    console.log('📊 ALL LOCALSTORAGE DATA:');
    for (let key in localStorage) {
      if (key.startsWith('inventory-')) {
        console.log(`${key}:`, JSON.parse(localStorage.getItem(key)));
      }
    }
  }
};

console.log('\n🛠️ Test utilities available as window.testUtils');
console.log('   - testUtils.clearAllData()');
console.log('   - testUtils.addTestUser(email, status)');
console.log('   - testUtils.showAllData()');