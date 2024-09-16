import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { UserContext } from "../context/userContext";
import { login } from "../api/auth.api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const handleForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setError("Both email and password are required.");
      setLoading(false);
      return;
    }
    setLoading(false);
    const { data, error } = await login(email, password);
    if (data) {
      setUser(data.user);
      navigate("/", { replace: true });
    } else {
      setError(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        {error && <div className='mb-4 text-red-500 text-center'>{error}</div>}
        <form>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor='email'>
              Email
            </label>
            <input
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700' htmlFor='password'>
              Password
            </label>
            <input
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />
          </div>
          <Button
            isLoading={loading}
            onClick={handleForm}
            loadingText='Signing In'
            type='submit'>
            Sign In
          </Button>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-gray-700'>Don't have an account?</p>
          <Link to='/SignUp' className='text-blue-500 hover:underline'>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
