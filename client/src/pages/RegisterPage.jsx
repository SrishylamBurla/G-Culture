import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await API.post('/auth/register', { name, email, password });

    dispatch(loginUser({ email, password }));

    navigate('/');
  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} className="border p-2 w-full mb-3 rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 w-full mb-3 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border p-2 w-full mb-3 rounded" required />
        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">Register</button>
        <p className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
}
