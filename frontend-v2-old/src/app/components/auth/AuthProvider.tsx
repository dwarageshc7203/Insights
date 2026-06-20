import React, { createContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabaseClient';
import { fetchApi } from '../../../lib/api';
export interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (error) console.error('Error getting session', error);
      
      if (session?.user) {
        try {
          await fetchApi('/auth/sync', {
            method: 'POST',
            body: JSON.stringify({
              userId: session.user.id,
              userName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email
            })
          });
        } catch (e) {
          console.error('Error syncing user', e);
        }
      }

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user && _event === 'SIGNED_IN') {
        try {
          await fetchApi('/auth/sync', {
            method: 'POST',
            body: JSON.stringify({
              userId: session.user.id,
              userName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email
            })
          });
        } catch (e) {
          console.error('Error syncing user', e);
        }
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/workspace'
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
