import { useContext } from 'react';
import { NBAContext } from '../context/NBAContext';

export const useNBA = () => {
  const context = useContext(NBAContext);
  if (!context) {
    throw new Error('useNBA must be used within NBAProvider');
  }
  return context;
};
