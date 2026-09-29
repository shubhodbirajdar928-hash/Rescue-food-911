/**
 * DEMO AUTHENTICATION USERS
 * 
 * ⚠️ This is a DEMO-ONLY authentication layer for hackathon purposes.
 * NOT production-grade security. Replace with Firebase/Supabase/JWT backend.
 * 
 * Session is maintained via localStorage key: fr911_auth_session
 */

export const ROLES = {
  FOOD_RESCUER: 'FOOD_RESCUER',
  KITCHEN_DISPATCH: 'KITCHEN_DISPATCH',
};

export const DEMO_USERS = [
  {
    id: 'rescuer-001',
    name: 'Food Rescuer',
    email: 'rescuer@food911.com',
    password: 'rescuer123',
    role: ROLES.FOOD_RESCUER,
    avatar: '🦸',
    points: 0,
  },
  {
    id: 'rescuer-002',
    name: 'Hero Sharma',
    email: 'hero@food911.com',
    password: 'hero123',
    role: ROLES.FOOD_RESCUER,
    avatar: '🦸‍♂️',
    points: 0,
  },
  {
    id: 'kitchen-001',
    name: 'Central Kitchen',
    email: 'kitchen@food911.com',
    password: 'kitchen123',
    role: ROLES.KITCHEN_DISPATCH,
    avatar: '👨‍🍳',
    stationId: 'STATION-04',
  },
  {
    id: 'kitchen-002',
    name: 'Sharma Ji Ka Bakery',
    email: 'sharma@food911.com',
    password: 'sharma123',
    role: ROLES.KITCHEN_DISPATCH,
    avatar: '👨‍🍳',
    stationId: 'STATION-08',
  },
];

export const AUTH_SESSION_KEY = 'fr911_auth_session';

/**
 * Authenticate user against demo database
 * @param {string} email 
 * @param {string} password 
 * @param {string} expectedRole - FOOD_RESCUER or KITCHEN_DISPATCH
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export const authenticateUser = (email, password, expectedRole) => {
  const user = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, error: 'Invalid email or password. Check demo credentials below.' };
  }

  if (user.role !== expectedRole) {
    const roleName = expectedRole === ROLES.FOOD_RESCUER ? 'Food Rescuer' : 'Kitchen Dispatch';
    return { 
      success: false, 
      error: `This account is not a ${roleName} account. Please use the correct login portal.` 
    };
  }

  // Return user without password
  const { password: _, ...safeUser } = user;
  return { success: true, user: safeUser };
};

/**
 * Register a new demo user (stored in memory only for this session)
 */
export const registerDemoUser = (userData) => {
  const exists = DEMO_USERS.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
  if (exists) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser = {
    id: `${userData.role === ROLES.FOOD_RESCUER ? 'rescuer' : 'kitchen'}-${Date.now().toString().slice(-4)}`,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    avatar: userData.role === ROLES.FOOD_RESCUER ? '🦸' : '👨‍🍳',
    ...(userData.role === ROLES.KITCHEN_DISPATCH ? { stationId: `STATION-${Math.floor(Math.random() * 99).toString().padStart(2, '0')}` } : { points: 0 }),
  };

  DEMO_USERS.push(newUser);
  const { password: _, ...safeUser } = newUser;
  return { success: true, user: safeUser };
};
