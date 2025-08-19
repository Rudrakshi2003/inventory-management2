'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { User } from '@/types';

interface AuthContextType {
  users: User[];
  currentUser: User | null;
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  signup: (email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  approveUser: (userId: string) => void;
  denyUser: (userId: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  getPendingUsers: () => User[];
  getApprovedUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultAdmin: User = {
  id: 'admin-1',
  email: 'adimn-sanumishra01234@gmail.com',
  phone: '+1234567890',
  password: 'Mishra@123',
  isAdmin: true,
  status: 'approved',
  createdAt: new Date().toISOString(),
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [users, setUsers] = useLocalStorage<User[]>('inventory-users', [defaultAdmin]);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('inventory-current-user', null);

  const login = async (emailOrPhone: string, password: string): Promise<boolean> => {
    const user = users.find(
      (u) => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password && u.status === 'approved'
    );

    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signup = async (email: string, phone: string, password: string): Promise<boolean> => {
    const existingUser = users.find((u) => u.email === email || u.phone === phone);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      phone,
      password,
      isAdmin: false,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const approveUser = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: 'approved' as const } : user)));
  };

  const denyUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!currentUser || currentUser.password !== currentPassword) {
      return false;
    }

    const updatedUser = { ...currentUser, password: newPassword };
    setCurrentUser(updatedUser);
    setUsers(users.map((user) => (user.id === currentUser.id ? updatedUser : user)));
    return true;
  };

  const getPendingUsers = () => users.filter((user) => user.status === 'pending');
  const getApprovedUsers = () => users.filter((user) => user.status === 'approved');

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        login,
        signup,
        logout,
        approveUser,
        denyUser,
        changePassword,
        getPendingUsers,
        getApprovedUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}