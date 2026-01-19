import React, { useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      login(data.token, data.user);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border" />
        <input value={password} type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border" />
        <button className="w-full p-2 bg-blue-600 text-white">Login</button>
      </form>
    </div>
  )
}
