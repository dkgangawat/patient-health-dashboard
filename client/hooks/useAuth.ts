'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axiosClient from '@/lib/axiosClient';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token'); 
    const user = Cookies.get('user')
    if (!token && !user) {
      Cookies.remove('token');
      Cookies.remove('user');
      setLoading(false);
    }else{
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosClient.post('/api/auth/login', { email, password });
      const { token, ...userData } = response.data;
      Cookies.set('token', token);
      setUser(userData);
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      const response = await axiosClient.post('/api/auth/register', { name, email, password, role });
      const { token, ...userData } = response.data;
      Cookies.set('token', token);
      Cookies.set('user', userData);
      setUser(userData);
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  return { user, loading, login, register, logout, token };
};

export default useAuth;
