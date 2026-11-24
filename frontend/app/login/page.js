'use client';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Link from 'next/link';
import './login.css';

function NatureIllustration() {
  return (
    <svg
      className='nature-art'
      viewBox='0 0 1200 760'
      preserveAspectRatio='xMidYMid slice'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient
          id='hill'
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
        <linearGradient
          id='darkHill'
          x1='0'
          y1='0'
          x2='1'
          y2='1'
        >
          <stop
            offset='0%'
            stopColor='#416b57'
          />
          <stop
            offset='100%'
            stopColor='#173f39'
          />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect
        width='1200'
        height='760'
        fill='#dff2d2'
      />

      {/* Sun glow */}
      <circle
        cx='1040'
        cy='100'
        r='210'
        fill='#c7dfa0'
        opacity='.8'
      />

      {/* Mountains */}
      <path
        d='M480 500 L700 270 L820 390 L970 190 L1200 470 L1200 760 L480 760Z'
        fill='url(#hill)'
      />
      <path
        d='M690 500 L890 310 L1000 430 L1120 280 L1200 390 L1200 760 L650 760Z'
        fill='#789c70'
      />
      <path
        d='M0 570 Q200 430 380 540 Q600 390 790 560 Q1000 410 1200 540 L1200 760 L0 760Z'
        fill='url(#darkHill)'
      />

      {/* Foreground */}
      <path
        d='M0 650 Q250 560 450 650 Q720 560 900 660 Q1060 590 1200 650 L1200 760 L0 760Z'
        fill='#234b40'
      />

      {/* Large decorative leaves on right */}
      <g fill='#789a65'>
        <path d='M1060 760 Q970 530 1060 300 Q1130 470 1060 760Z' />
        <path d='M1090 620 Q1040 440 1160 330 Q1160 510 1090 620Z' />
        <path d='M1010 590 Q900 430 940 270 Q1030 400 1010 590Z' />
        <path d='M1130 760 Q1080 570 1180 460 Q1180 630 1130 760Z' />
      </g>

      {/* Left-side plants */}
      <g fill='#7eaa78'>
        <path d='M80 760 Q-10 510 55 280 Q145 500 80 760Z' />
        <path d='M80 650 Q-40 520 5 410 Q100 500 80 650Z' />
        <path d='M100 580 Q170 390 260 380 Q220 520 100 580Z' />
        <path d='M30 530 Q-20 380 10 300 Q85 410 30 530Z' />
        <path d='M130 760 Q80 590 180 490 Q195 640 130 760Z' />
      </g>

      {/* Leaf details */}
      <g
        stroke='#c5dda0'
        strokeWidth='3'
        fill='none'
        opacity='.8'
      >
        <path d='M80 760 Q50 500 55 280' />
        <path d='M80 650 L15 520 M80 590 L160 450 M55 510 L15 400' />
        <path d='M1060 760 Q1050 500 1060 300' />
        <path d='M1060 600 L950 440 M1060 520 L1150 390 M1060 440 L1010 330' />
      </g>

      {/* Small flowers */}
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
        <circle
          cx='880'
          cy='680'
          r='5'
        />
      </g>

      <g
        stroke='#d4c47a'
        strokeWidth='3'
        fill='none'
      >
        <path d='M790 760 Q790 670 790 610' />
        <path d='M815 760 Q815 650 815 580' />
        <path d='M840 760 Q840 680 840 620' />
        <path d='M765 760 Q765 690 765 640' />
      </g>

      {/* Floating grass */}
      <g
        stroke='#a9c77f'
        strokeWidth='4'
        fill='none'
      >
        <path d='M400 760 Q380 680 340 650 M400 760 Q410 680 445 650' />
        <path d='M950 760 Q920 690 900 650 M950 760 Q970 680 1000 650' />
        <path d='M220 760 Q200 690 170 670' />
      </g>
    </svg>
  );
}

export default function LoginPage() {

  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setMessage("Please enter email and password.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      setMessage(result.message || "Login failed.");
      return;
    }

    // Store authentication details
    localStorage.setItem("ecotrack_token", result.token);
    localStorage.setItem(
      "ecotrack_user",
      JSON.stringify(result.data)
    );

    setMessage("Login successful!");

    // Redirect according to user role
    if (result.data.role === "ADMIN") {
      router.push("/dashboard");
    } else if (result.data.role === "DISTRICT_OFFICER") {
      router.push("/incidents");
    } else {
      setMessage("Invalid user role.");
    }
  } catch (error) {
    console.error("Login error:", error);
    setMessage("Unable to connect to the backend.");
  }
};

  return (
    <main className='login-page'>
      <NatureIllustration />

      <div className='login-overlay'>
        <header className='login-header'>
          <Link
            href='/login'
            className='brand'
          >
            <span className='brand-icon'>🌿</span>
            <span>EcoTrack</span>
          </Link>

          <nav className='top-links'>
            <span className='active-link'>Sign In</span>
            <span className='link-divider'>|</span>
            <Link href='/signup'>Sign Up</Link>
          </nav>
        </header>

        <section className='login-content'>
          <div className='login-form-container'>
            <p className='welcome-small'>Hello there,</p>
            <h1>
              Welcome to <span>EcoTrack</span>
            </h1>

            <p className='login-description'>
              Monitor. Investigate. Protect our environment.
            </p>

            <form onSubmit={handleLogin}>
              <div className='form-group'>
                <label htmlFor='email'>EMAIL</label>
                <input
                  id='email'
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className='form-group password-group'>
                <label htmlFor='password'>PASSWORD</label>

                <div className='password-input'>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type='button'
                    className='eye-button'
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className='forgot-row'>
                  <Link href='/forgot-password'>Forgot password?</Link>
                </div>
              </div>

              <button
                type='submit'
                className='login-button'
              >
                LOGIN
              </button>

              {message && (
                <p
                  className='login-message'
                  role='status'
                >
                  {message}
                </p>
              )}
            </form>

            <div className='login-footer'>
              <p>SECURE ACCESS FOR AUTHORIZED USERS</p>
              <span>Protecting nature through technology.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
