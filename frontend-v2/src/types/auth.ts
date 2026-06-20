export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

export interface AuthSession {
  access_token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
}
