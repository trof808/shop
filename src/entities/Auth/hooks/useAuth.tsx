import { AuthContext } from '@/App/providers/AuthProvider';
import { useContext } from 'react';

export const useAuth = () => {
	return { ...useContext(AuthContext) };
};
