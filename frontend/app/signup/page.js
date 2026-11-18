'use client';

import { useState } from 'react';
import Link from 'next/link';
import './signup.css';

function SignupNature() {
  return (
    <svg
      className='signup-nature'
      viewBox='0 0 1200 760'
      preserveAspectRatio='xMidYMid slice'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient
          id='signupHill'
          x1='0'
          y1='0'
          x2='1'
          y2='1'
        >
          <stop
            offset='0%'
            stopColor='#b9d28a'
          />
          <stop
            offset='100%'
            stopColor='#456d58'
          />
        </linearGradient>
      </defs>

      <rect
        width='1200'
        height='760'
        fill='#dff2d2'
      />
      <circle
        cx='1040'
        cy='100'
        r='210'
        fill='#c7dfa0'
        opacity='.8'
      />

      <path
        d='M480 500 L700 270 L820 390 L970 190 L1200 470 L1200 760 L480 760Z'
        fill='url(#signupHill)'
      />
      <path
        d='M690 500 L890 310 L1000 430 L1120 280 L1200 390 L1200 760 L650 760Z'
        fill='#789c70'
      />
      <path
        d='M0 570 Q200 430 380 540 Q600 390 790 560 Q1000 410 1200 540 L1200 760 L0 760Z'
        fill='#315c49'
      />
      <path
        d='M0 650 Q250 560 450 650 Q720 560 900 660 Q1060 590 1200 650 L1200 760 L0 760Z'
        fill='#234b40'
      />

      <g fill='#7eaa78'>
        <path d='M80 760 Q-10 510 55 280 Q145 500 80 760Z' />
        <path d='M80 650 Q-40 520 5 410 Q100 500 80 650Z' />
        <path d='M100 580 Q170 390 260 380 Q220 520 100 580Z' />
        <path d='M30 530 Q-20 380 10 300 Q85 410 30 530Z' />
        <path d='M1060 760 Q970 530 1060 300 Q1130 470 1060 760Z' />
        <path d='M1090 620 Q1040 440 1160 330 Q1160 510 1090 620Z' />
        <path d='M1010 590 Q900 430 940 270 Q1030 400 1010 590Z' />
      </g>

      <g
        stroke='#c5dda0'
        strokeWidth='3'
        fill='none'
        opacity='.8'
      >
        <path d='M80 760 Q50 500 55 280' />
        <path d='M80 650 L15 520 M80 590 L160 450' />
        <path d='M1060 760 Q1050 500 1060 300' />
        <path d='M1060 600 L950 440 M1060 520 L1150 390' />
      </g>

      <g fill='#e7c86e'>
        <circle
          cx='790'
          cy='610'
          r='6'
        />
        <circle
          cx='815'
          cy='580'
          r='5'
        />
        <circle
          cx='840'
          cy='620'
          r='6'
        />
        <circle
          cx='765'
          cy='640'
          r='5'
        />
      </g>
    </svg>
  );
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [message, setMessage] = useState('');

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  function handleSignup(e) {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setMessage('Password must contain at least 8 characters.');
      return;
    }

    if (!formData.terms) {
      setMessage('Please accept the terms and conditions.');
      return;
    }

    // Demo only. Account creation will be connected to Express later.
    setMessage(
      'Your registration form is ready. Backend account creation is not connected yet.',
    );
  }

  return (
    <main className='signup-page'>
      <SignupNature />

      <div className='signup-overlay'>
        {/* Header */}
        <header className='signup-header'>
          <Link
            href='/login'
            className='signup-brand'
          >
            <span className='signup-brand-icon'>🌿</span>
            <span>EcoTrack</span>
          </Link>

          <nav className='signup-top-links'>
            <Link href='/login'>Sign In</Link>
            <span>|</span>
            <span className='signup-active-link'>Sign Up</span>
          </nav>
        </header>

        {/* Signup Form */}
        <section className='signup-content'>
          <div className='signup-form-container'>
            <h1>
              Create Your <span>Account</span>
            </h1>

            <p className='signup-description'>
              Be a part of smarter environmental monitoring.
            </p>

            <form onSubmit={handleSignup}>
              {/* Full Name */}
              <div className='signup-form-group'>
                <label htmlFor='name'>FULL NAME</label>

                <input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Enter your full name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className='signup-form-group'>
                <label htmlFor='email'>EMAIL ADDRESS</label>

                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter your email address'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className='signup-form-group'>
                <label htmlFor='password'>PASSWORD</label>

                <div className='signup-password-input'>
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Create a password'
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />

                  <button
                    type='button'
                    className='signup-eye-button'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className='signup-form-group'>
                <label htmlFor='confirmPassword'>CONFIRM PASSWORD</label>

                <div className='signup-password-input'>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Re-enter your password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type='button'
                    className='signup-eye-button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className='signup-terms'>
                <input
                  type='checkbox'
                  id='terms'
                  name='terms'
                  checked={formData.terms}
                  onChange={handleChange}
                />

                <label htmlFor='terms'>
                  I agree to the Terms and Conditions.
                </label>
              </div>

              {/* Account Information */}
              <div className='signup-notice'>
                <span>ⓘ</span>
                Accounts are subject to administrator approval. Your system role
                will be assigned by an administrator.
              </div>

              {/* Submit */}
              <button
                type='submit'
                className='signup-button'
              >
                CREATE ACCOUNT
              </button>

              {message && (
                <p
                  className='signup-message'
                  role='status'
                >
                  {message}
                </p>
              )}
            </form>

            <div className='signup-login-link'>
              Already have an account?
              <Link href='/login'> Sign In</Link>
            </div>

            <div className='signup-footer'>
              <p>SECURE ACCESS FOR AUTHORIZED USERS</p>
              <span>Protecting nature through technology.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
