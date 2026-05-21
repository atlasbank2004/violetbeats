import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { X, Mail, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Very basic email valid check manually before firebase
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro de autenticação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl neon-glow"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-white">
                {isLogin ? 'Bem-vindo de volta' : 'Criar nova conta'}
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                {isLogin
                  ? 'Faça login para acessar o player exclusivo.'
                  : 'Registre-se para escutar as melhores músicas.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors duration-200"
                    placeholder="voce@exemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors duration-200"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition-colors duration-200 hover:bg-violet-500 focus:outline-none disabled:opacity-50"
              >
                {loading ? 'Processando...' : isLogin ? 'Entrar Agora' : 'Criar Conta'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-400">
              {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-violet-400 hover:text-violet-300"
              >
                {isLogin ? 'Registre-se' : 'Faça login'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
