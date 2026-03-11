'use client';

import { useState } from 'react';
import { 
  Building2, 
  Upload, 
  Save, 
  MapPin, 
  Mail, 
  Phone, 
  Globe,
  Shield,
  Bell,
  Lock,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'institution' | 'security' | 'notifications'>('institution');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-500">Gerencie as informações da instituição e preferências do sistema.</p>
      </div>

      <div className="flex space-x-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'institution', label: 'Instituição', icon: Building2 },
          { id: 'security', label: 'Segurança & 2FA', icon: Shield },
          { id: 'notifications', label: 'Notificações', icon: Bell },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={18} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'institution' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-all cursor-pointer">
                    <Upload size={32} />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-emerald-600 text-white rounded-xl shadow-lg">
                    <Plus size={16} />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Logotipo da Instituição</h3>
                  <p className="text-sm text-slate-500">Recomendado: 512x512px (PNG ou JPG)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome Oficial</label>
                  <input type="text" defaultValue="Ministério da Administração Pública" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Sigla</label>
                  <input type="text" defaultValue="MAP" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Endereço Sede</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type="text" defaultValue="Av. 10 de Novembro, Maputo" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Geral</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type="email" defaultValue="contacto@map.gov.mz" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type="text" defaultValue="+258 21 000 000" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  ) : (
                    <Save size={20} className="mr-2" />
                  )}
                  Salvar Alterações
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8"
            >
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Autenticação Multifactor (2FA)</h4>
                    <p className="text-sm text-slate-500">Aumente a segurança da sua conta.</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-bold text-slate-900 flex items-center">
                  <Lock size={18} className="mr-2 text-slate-400" />
                  Alterar Senha
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <input type="password" placeholder="Senha Actual" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                  <input type="password" placeholder="Nova Senha" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                  <input type="password" placeholder="Confirmar Nova Senha" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                </div>
                <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                  Actualizar Senha
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4">Estado do Sistema</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Versão</span>
                <span className="text-sm font-bold">v2.4.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Último Backup</span>
                <span className="text-sm font-bold">Hoje, 04:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Espaço em Disco</span>
                <span className="text-sm font-bold text-emerald-400">85% Livre</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">Suporte Técnico</h4>
            <p className="text-sm text-slate-500 mb-6">Precisa de ajuda com as configurações?</p>
            <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all border border-slate-200">
              Contactar Suporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  );
}
