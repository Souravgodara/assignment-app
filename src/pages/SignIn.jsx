import React, { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();
    console.log("handleForm");
  };
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
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
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            disabled={loading}
            onClick={() => handleSubmit()}
            className={`w-full transform rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
