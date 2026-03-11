'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText,
  User,
  ChevronRight,
  Filter,
  Search,
  Download,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function VacationsPage() {
  const [activeTab, setActiveTab] = useState<'plan' | 'requests' | 'others'>('plan');
  const [showModal, setShowModal] = useState(false);

  const [requests, setRequests] = useState([
    { id: '1', employee: 'Ana Silva', type: 'Férias', period: '15 Jul - 15 Ago', status: 'Pendente', date: '2024-03-10', dept: 'Recursos Humanos' },
    { id: '2', employee: 'Bernardo Matusse', type: 'Dispensa', period: '22 Mar - 24 Mar', status: 'Parecer Unidade', date: '2024-03-08', dept: 'Finanças' },
    { id: '3', employee: 'Carla Jonas', type: 'Paternidade', period: '01 Abr - 15 Abr', status: 'Parecer RH', date: '2024-03-05', dept: 'Administração' },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Aprovado' } : r));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Rejeitado' } : r));
  };

  const openApproval = (req: any) => {
    setSelectedRequest(req);
    setShowApprovalModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Férias e Solicitações</h1>
          <p className="text-slate-500">Gestão de planos de férias, dispensas e outros pedidos.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
        >
          <Plus size={20} className="mr-2" />
          Novo Pedido
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'plan', label: 'Plano de Férias', icon: Calendar },
          { id: 'requests', label: 'Pedidos de Férias', icon: FileText },
          { id: 'others', label: 'Outras Solicitações', icon: AlertCircle },
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

      {activeTab === 'plan' ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Calendário de Férias 2024</h3>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight className="rotate-180" /></button>
              <span className="font-bold px-4 py-2 bg-slate-50 rounded-lg">2024</span>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((month, i) => (
              <div key={i} className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
                <p className="font-bold text-slate-900 mb-4">{month}</p>
                <div className="space-y-2">
                  {[1, 2].map(j => (
                    <div key={j} className="flex items-center p-2 bg-white rounded-xl border border-slate-100 text-xs font-medium text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                      Funcionário {j}
                    </div>
                  ))}
                  <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 hover:border-emerald-300 hover:text-emerald-500 transition-all uppercase tracking-wider">
                    Escolher Mês
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Pesquisar pedidos..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <button className="p-2 text-slate-500 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                <Filter size={18} />
              </button>
            </div>
            <button className="text-sm font-bold text-emerald-600 hover:underline">Ver Histórico Completo</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Funcionário</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Tipo</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Período</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-xs">
                          {req.employee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-bold text-slate-900">{req.employee}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-slate-600">{req.type}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center text-sm text-slate-500">
                        <Clock size={14} className="mr-2" />
                        {req.period}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        req.status === 'Aprovado' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        req.status === 'Pendente' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => openApproval(req)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                          title="Analisar Pedido"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleReject(req.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                          title="Rejeitar Directamente"
                        >
                          <XCircle size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      <AnimatePresence>
        {showApprovalModal && selectedRequest && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowApprovalModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-slate-900">Análise de Pedido</h2>
                    <p className="text-sm text-slate-500">{selectedRequest.employee} • {selectedRequest.dept}</p>
                  </div>
                </div>
                <button onClick={() => setShowApprovalModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <XCircle size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tipo de Pedido</p>
                    <p className="font-bold text-slate-900">{selectedRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Período</p>
                    <p className="font-bold text-slate-900">{selectedRequest.period}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status Actual</p>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">{selectedRequest.status}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Parecer do Gestor da Unidade</label>
                    <textarea 
                      rows={2} 
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none resize-none text-sm"
                      placeholder="Introduza o parecer técnico da unidade..."
                    ></textarea>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Parecer dos Recursos Humanos</label>
                    <textarea 
                      rows={2} 
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none resize-none text-sm"
                      placeholder="Introduza a validação do RH..."
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Despacho da Reitoria</label>
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => { handleApprove(selectedRequest.id); setShowApprovalModal(false); }}
                        className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                      >
                        Aprovar Pedido
                      </button>
                      <button 
                        onClick={() => { handleReject(selectedRequest.id); setShowApprovalModal(false); }}
                        className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                      >
                        Rejeitar Pedido
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Request Modal */}
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
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-10"
            >
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Novo Pedido</h2>
              <p className="text-slate-500 mb-8">Solicite férias, dispensa ou outras justificações.</p>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tipo de Pedido</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none">
                      <option>Férias</option>
                      <option>Dispensa</option>
                      <option>Justificação de Falta</option>
                      <option>Paternidade/Maternidade</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Mês Pretendido</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none">
                      <option>Janeiro</option>
                      <option>Fevereiro</option>
                      {/* ... */}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data Início</label>
                    <input type="date" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data Fim</label>
                    <input type="date" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Motivo / Justificação</label>
                  <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl transition-all outline-none resize-none" placeholder="Descreva o motivo do seu pedido..."></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Anexar Documento (Opcional)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-emerald-500 transition-all cursor-pointer group">
                    <Plus className="mx-auto text-slate-400 group-hover:text-emerald-500 mb-2" />
                    <p className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 uppercase tracking-widest">Clique para enviar arquivo</p>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-4 text-slate-600 font-bold hover:bg-slate-100 rounded-2xl transition-all"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                    Enviar Pedido
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
