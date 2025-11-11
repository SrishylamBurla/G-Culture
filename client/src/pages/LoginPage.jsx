import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Dispatch thunk, let it handle API call
    await dispatch(loginUser({ email, password })).unwrap();
    navigate('/');
  } catch (err) {
    setError(err || 'Login failed');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 w-full mb-3 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border p-2 w-full mb-3 rounded" required />
        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">Login</button>
        <p className="mt-4 text-center text-sm">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </form>
    </div>
  );
}
