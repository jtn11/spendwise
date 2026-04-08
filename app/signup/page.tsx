"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile
      await updateProfile(userCredential.user, { displayName: name });
      // Create user record in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    await signInWithGoogle();
    router.push("/dashboard");
    // We ideally should ensure the user record exists in Firestore upon Google login as well.
    // For now, we redirect.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-4 py-8 relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[var(--primary)]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[var(--secondary)]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 sm:p-10 bg-[var(--surface-container-lowest)]/80 backdrop-blur-2xl border border-[var(--outline-variant)]/30 rounded-3xl shadow-2xl relative z-10 my-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[var(--surface-container)] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[var(--outline-variant)]/20">
            <UserPlus className="w-7 h-7 text-[var(--primary)]" />
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-[var(--on-surface)]">Create Account</h1>
          <p className="text-sm font-medium text-[var(--on-surface-variant)] mt-2">Start managing your digital subscriptions today</p>
        </div>

        <form onSubmit={handleEmailSignup} className="space-y-5">
          {error && <div className="p-3 text-sm font-bold text-[var(--error)] bg-[var(--error-container)] rounded-xl">{error}</div>}
          
          <div>
            <label className="block text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[var(--surface-container-low)] border border-transparent focus:border-[var(--primary)] focus:bg-[var(--surface-container-lowest)] rounded-xl py-3 px-4 text-[var(--on-surface)] text-sm transition-all focus:ring-4 focus:ring-[var(--primary)]/10 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Email address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--surface-container-low)] border border-transparent focus:border-[var(--primary)] focus:bg-[var(--surface-container-lowest)] rounded-xl py-3 px-4 text-[var(--on-surface)] text-sm transition-all focus:ring-4 focus:ring-[var(--primary)]/10 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--surface-container-low)] border border-transparent focus:border-[var(--primary)] focus:bg-[var(--surface-container-lowest)] rounded-xl py-3 px-4 text-[var(--on-surface)] text-sm transition-all focus:ring-4 focus:ring-[var(--primary)]/10 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] py-4 rounded-xl font-bold shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--outline-variant)]/30"></div>
          </div>
          <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
            <span className="px-4 bg-[var(--surface-container-lowest)] text-[var(--on-surface-variant)]">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleSignup}
          type="button"
          className="mt-8 w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-[var(--surface-container-low)] hover:bg-[var(--surface-container)] text-[var(--on-surface)] rounded-xl font-bold transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign up with Google
        </button>

        <p className="mt-8 text-center text-sm font-medium text-[var(--on-surface-variant)]">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--primary)] hover:text-[var(--primary-container)] hover:underline font-bold transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
