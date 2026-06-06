// SignUpPage.jsx
// The sign up page component, reusing auth components with specific props for the sign up flow.
import React, { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import IllustrationSide from '../components/auth/IllustrationSide';
import AuthCard from '../components/auth/AuthCard';
import '../styles/tokens.css';
import './LoginPage.css'; // Reusing the identical layout styles from the login page

export default function SignUpPage() {
  useEffect(() => {
    // Check session on mount to sync with backend after OAuth redirect
    const checkSessionAndSync = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          return;
        }

        if (session?.user) {
          await fetch('http://localhost:8080/auth/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: session.user.id,
              userName: session.user.user_metadata?.full_name || '',
              email: session.user.email
            })
          });
        }
      } catch (err) {
        console.error("Failed to sync user session:", err);
      }
    };

    checkSessionAndSync();
  }, []);

  return (
    <div className="login-page-wrapper">
      <IllustrationSide alt="Left Suit Figure Illustration" />
      
      <div className="login-page-content">
        <h1 className="login-page-title">Heya!</h1>
        <AuthCard 
          title="Sign up here!"
          promptText="We met before? Try "
          linkText="Login!"
          linkTo="/login"
          noteText="Hey! Hi and greetings to you! Your presence here is extremely valued! Thanks for using my project and I hope it makes your work easier!"
        />
      </div>

      <IllustrationSide alt="Right Suit Figure Illustration" />
    </div>
  );
}
