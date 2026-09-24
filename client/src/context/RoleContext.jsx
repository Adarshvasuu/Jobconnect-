import React, { createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import { USER_ROLES } from '../utils/constants';

export const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const { role, user } = useAuthContext();

  const isSeeker = role === USER_ROLES.SEEKER;
  const isRecruiter = role === USER_ROLES.RECRUITER;
  const isAdmin = role === USER_ROLES.ADMIN;

  const hasRole = (requiredRole) => {
    if (!requiredRole) return true;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role);
    }
    return role === requiredRole;
  };

  const value = {
    role,
    user,
    isSeeker,
    isRecruiter,
    isAdmin,
    hasRole,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export default RoleContext;
