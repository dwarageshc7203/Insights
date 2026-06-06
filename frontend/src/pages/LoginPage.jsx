// LoginPage.jsx
// The main page component that brings together illustrations and the auth card, and handles post-login session syncing.
import /*React, */{ useEffect } from 'react';
import { supabase } from '../supabaseClient';
import IllustrationSide from '../components/auth/IllustrationSide';
import AuthCard from '../components/auth/AuthCard';
import '../styles/tokens.css';
import './LoginPage.css';

export default function LoginPage() {
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
      {/*<IllustrationSide alt="Left Illustration" />*/}
      
      <div className="login-page-content">
        <h1 className="login-page-title">Hola!</h1>
        <AuthCard />
      </div>

      {/*<IllustrationSide alt="Right Illustration" />*/}
    </div>
  );
}
