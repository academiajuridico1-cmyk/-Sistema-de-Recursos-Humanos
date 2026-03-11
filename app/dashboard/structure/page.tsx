'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  MapPin, 
  Hash, 
  ChevronRight, 
  MoreVertical,
  Edit2,
  Trash2,
  Building,
  LayoutGrid,
  Network,
  GitBranch,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function StructurePage() {
  const [activeTab, setActiveTab] = useState<'delegations' | 'units' | 'departments' | 'sections'>('delegations');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const tabs = [
    { id: 'delegations', label: 'Delegações', icon: Building2 },
    { id: 'units', label: 'Unidades Orgânicas', icon: LayoutGrid },
    { id: 'departments', label: 'Departamentos', icon: Network },
    { id: 'sections', label: 'Repartições', icon: GitBranch },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Estrutura Orgânica</h1>
          <p className="text-slate-500">Gerencie a hierarquia e organização da instituição.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
        >
          <Plus size={20} className="mr-2" />
          Adicionar {tabs.find(t => t.id === activeTab)?.label.slice(0, -1)}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {tabs.map((tab) => (
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

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {activeTab === 'delegations' ? <Building2 size={24} /> : 
                 activeTab === 'units' ? <LayoutGrid size={24} /> :
                 activeTab === 'departments' ? <Network size={24} /> : <GitBranch size={24} />}
              </div>
              <div className="flex space-x-1">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {activeTab === 'delegations' ? `Delegação ${i}` : 
               activeTab === 'units' ? `Unidade Orgânica ${i}` :
               activeTab === 'departments' ? `Departamento ${i}` : `Repartição ${i}`}
            </h3>
            
            <div className="space-y-3 mt-6">
              <div className="flex items-center text-sm text-slate-500">
                <MapPin size={16} className="mr-2 text-slate-400" />
                Av. Eduardo Mondlane, Maputo
              </div>
              <div className="flex items-center text-sm text-slate-500">
                <Users size={16} className="mr-2 text-slate-400" />
                {10 + i * 5} Funcionários
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gestor Responsável</span>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                  JD
                </div>
                <span className="ml-2 text-xs font-bold text-slate-700">João Domingos</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10"
            >
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">
                Nova {tabs.find(t => t.id === activeTab)?.label.slice(0, -1)}
              </h2>
              <p className="text-slate-500 mb-8">Preencha os dados para criar uma nova entidade na estrutura.</p>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome da Entidade</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ex: Delegação de Maputo"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Endereço / Localização</label>
                  <input 
                    type="text" 
                    placeholder="Rua, Cidade, Província"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none"
                  />
                </div>

                {activeTab !== 'delegations' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Vincular a Delegação</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none">
                      <option>Sede Central</option>
                      <option>Delegação Norte</option>
                    </select>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-4 text-slate-600 font-bold hover:bg-slate-100 rounded-2xl transition-all"
                  >
                    Cancelar (Esc)
                  </button>
                  <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                    Confirmar (Enter)
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
