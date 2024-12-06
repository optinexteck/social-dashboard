'use client';

import axios from 'axios';



import type { User } from '@/types/user';





function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);

  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

// const user = {
//   id: 'USR-000',
//   avatar: '/assets/avatar.png',
//   firstName: 'Sofia',
//   lastName: 'Rivers',
//   email: 'sofia@devias.io',
// } satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', params);

      if (response.data) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log(JSON.parse(localStorage.getItem('user')));
        return {};
      }

      return { error: 'Invalid login response' }; // Error case
    } catch (error) {
      return { error: 'Error while logging in' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      return { data: null };
    }

    const parsedUser = JSON.parse(user);

    console.log({
      data: {
        id: parsedUser.id,
        avatar: '/assets/avatar.png',
        firstName: parsedUser.name,
        email: parsedUser.email,
      },
    });
    return {
      data: {
        id: parsedUser.id,
        avatar: '/assets/avatar.png',
        firstName: parsedUser.firstName,
        email: parsedUser.email,
      },
    };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return {};
  }
}

export const authClient = new AuthClient();
export const Details = authClient.getUser
