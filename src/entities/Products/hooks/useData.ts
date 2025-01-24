import { DataContext } from '@/App/providers/DataProvider';
import { useContext } from 'react';

export const useData = () => {
  return { ...useContext(DataContext) };
};
