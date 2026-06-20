import { supabase } from '../api/supabaseClient';
import { apiClient } from '../api/client';
import { User, AuthSession } from '../types/auth';

export const authService = {
  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/workspace`,
      },
    });
    if (error) throw error;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  syncUserWithBackend: async (session: any) => {
    if (!session || !session.user) return;
    const userData = {
      userId: session.user.id,
      email: session.user.email,
      userName: session.user.user_metadata?.full_name || session.user.email,
    };
    return apiClient.post('/auth/sync', userData);
  },
};
