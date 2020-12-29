import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFetch } from '../hooks';

import { Product } from '../types/Product';
import { Recommendation } from '../types/Recommendation';
import { Withdraw } from '../types/Withdraw';

import AuthContext from './auth';

interface DataContextProps {
  products: Array<Product>,
  setProducts: (a: Array<Product>) => void,
  recommendations: Array<Recommendation>,
  setRecommendations: (a: Array<Recommendation>) => void,
  withdraws: Array<Withdraw>,
  setWithdraws: (a: Array<Withdraw>) => void
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataContextProvider: React.FC = ({ children }) => {
  const { current } = useContext(AuthContext);

  const [products, setProducts] = useState<Array<Product>>([]);
  const [recommendations, setRecommendations] = useState<Array<Recommendation>>([]);
  const [withdraws, setWithdraws] = useState<Array<Withdraw>>([]);

  useEffect(() => {
    if (current) {
      useFetch.get('/m/p', (response) => setProducts(response));
      useFetch.get(`/u/r/${current.token}`, (response) => setRecommendations(response));
      useFetch.get(`/u/w/${current.token}`, (response) => setWithdraws(response));
    }
  }, [current]);

  return (
    <DataContext.Provider value={{ products, setProducts, recommendations, setRecommendations, withdraws, setWithdraws }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
