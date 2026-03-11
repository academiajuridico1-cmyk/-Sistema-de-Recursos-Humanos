'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserPlus,
  Building,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [view, setView] = useState<'landing' | 'register' | 'login' | 'recovery'>('landing');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStartNow = () => setView('register');
  const handleLoginClick = () => setView('login');
  const handleRecoveryClick = () => setView('recovery');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">Gestão RH</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Funcionalidades</a>
            <button 
              onClick={handleLoginClick}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Entrar
            </button>
          </div>
        </nav>

        {/* Hero */}
        <main className="max-w-7xl mx-auto px-6 pt-20 pb-20 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-8">
              Gestão <span className="text-emerald-600">Inteligente</span> de Pessoas
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Controle funcionários, férias, relatórios e provas de vida em um só sistema.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleStartNow}
                className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center group shadow-xl shadow-emerald-200"
              >
                Começar Agora
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/employee"
                className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                Portal do Funcionário
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-emerald-50 rounded-[4rem] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-slate-100 rounded-full" />
                    <div className="h-3 w-20 bg-slate-50 rounded-full" />
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-full" />
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-full bg-slate-100 rounded-full" />
                        <div className="h-2 w-2/3 bg-slate-50 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Funcionalidades Principais</h2>
            <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Cadastro de Funcionários</h3>
              <p className="text-slate-600 leading-relaxed">
                Gerencie dados pessoais, cargos, departamentos e histórico profissional.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gestão de Férias</h3>
              <p className="text-slate-600 leading-relaxed">
                O funcionário planeja as férias no plano anual e recebe uma notificação automática 1 mês antes da data planejada para realizar o pedido formal de férias pelo sistema.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Building size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Relatórios</h3>
              <p className="text-slate-600 leading-relaxed">
                Análises detalhadas de pessoal, férias e indicadores de RH para apoio à tomada de decisão.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gestão de Usuários</h3>
              <p className="text-slate-600 leading-relaxed">
                Criação de perfis com permissões específicas para administradores, RH e funcionários.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all lg:col-span-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Prova de Vida</h3>
              <p className="text-slate-600 leading-relaxed">
                O funcionário realiza a prova de vida no mês do seu aniversário através do aplicativo BioPv. O sistema envia notificações automáticas de lembrete no mês anterior para o funcionário e para o Gestor de Gestão RH.
              </p>
            </div>
          </div>
        </section>

        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
          © 2026 Gestão RH – Sistema de Gestão de Recursos Humanos
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 p-10 border border-slate-100 relative"
      >
        <button 
          onClick={() => setView('landing')}
          className="absolute top-8 left-8 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all flex items-center text-sm font-bold group"
        >
          <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <div className="text-center mb-10 mt-4">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
            <Users className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
            {view === 'register' ? 'Criar Conta' : view === 'login' ? 'Bem-vindo de volta' : 'Recuperar Conta'}
          </h2>
          <p className="text-slate-500">
            {view === 'register' 
              ? 'Gestão de Recursos Humanos.' 
              : view === 'login' 
                ? 'Insira suas credenciais para aceder ao painel.'
                : 'Insira seu email para receber instruções.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {view === 'register' && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Nome Completo</label>
              <div className="relative">
                <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  required
                  type="text" 
                  placeholder="Seu nome completo"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Corporativo</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                required
                type="email" 
                placeholder="nome@empresa.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none"
              />
            </div>
          </div>

          {view !== 'recovery' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-slate-700">Senha</label>
                {view === 'login' && (
                  <button 
                    type="button"
                    onClick={handleRecoveryClick}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    Esqueceu a senha?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          <button 
            disabled={isLoading}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              view === 'register' ? 'Criar Conta' : view === 'login' ? 'Entrar no Sistema' : 'Enviar Link de Recuperação'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          {view === 'login' ? (
            <p className="text-slate-500">
              Não tem uma conta?{' '}
              <button onClick={() => setView('register')} className="font-bold text-emerald-600 hover:text-emerald-700">Começar agora</button>
            </p>
          ) : (
            <p className="text-slate-500">
              Já tem uma conta?{' '}
              <button onClick={() => setView('login')} className="font-bold text-emerald-600 hover:text-emerald-700">Fazer login</button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
