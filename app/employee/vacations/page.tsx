'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Plane, 
  Clock, 
  FileText, 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Upload,
  Download,
  History,
  Info,
  UserCheck,
  ShieldCheck,
  Building
} from 'lucide-react';

type RequestStatus = 'Pendente' | 'Parecer Unidade' | 'Parecer RH' | 'Aprovado' | 'Rejeitado';

interface VacationRequest {
  id: string;
  type: 'Férias' | 'Despensa' | 'Outros';
  subType?: string;
  startDate: string;
  endDate: string;
  reason?: string;
  status: RequestStatus;
  dateRequested: string;
  managerOpinion?: string;
  hrOpinion?: string;
  finalDispatch?: string;
}

export default function EmployeeVacations() {
  const [activeTab, setActiveTab] = useState<'plans' | 'requests' | 'history'>('plans');
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestType, setRequestType] = useState<'vacation' | 'leave' | 'other'>('vacation');
  const [vacationType, setVacationType] = useState<'Normal' | 'Antecipação' | 'Adiamento'>('Normal');

  const [requests, setRequests] = useState<VacationRequest[]>([
    {
      id: '1',
      type: 'Férias',
      startDate: '2026-08-01',
      endDate: '2026-08-30',
      status: 'Aprovado',
      dateRequested: '2026-01-15',
      finalDispatch: 'Aprovado por despacho da Reitoria.'
    },
    {
      id: '2',
      type: 'Despensa',
      subType: 'Paternidade',
      startDate: '2026-03-20',
      endDate: '2026-03-25',
      reason: 'Nascimento de filho',
      status: 'Parecer RH',
      dateRequested: '2026-03-01',
      managerOpinion: 'Favorável.'
    }
  ]);

  const [vacationPlans, setVacationPlans] = useState([
    { year: 2024, month: 'Agosto', status: 'Gozado' },
    { year: 2025, month: 'Dezembro', status: 'Planeado' },
    { year: 2026, month: 'Agosto', status: 'Pendente Pedido' },
  ]);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const years = Array.from({ length: 35 }, (_, i) => 2026 + i);

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'Aprovado': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejeitado': return 'bg-red-100 text-red-700 border-red-200';
      case 'Pendente': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Férias e Solicitações</h1>
          <p className="text-slate-500">Gerencie seus planos de férias, pedidos de dispensa e outras solicitações.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => { setRequestType('vacation'); setShowRequestForm(true); }}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center"
          >
            <Plane size={18} className="mr-2" />
            Pedir Férias
          </button>
          <button 
            onClick={() => { setRequestType('leave'); setShowRequestForm(true); }}
            className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center"
          >
            <Clock size={18} className="mr-2" />
            Pedir Dispensa
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1.5 rounded-2xl w-fit">
        {[
          { id: 'plans', label: 'Plano de Férias', icon: Calendar },
          { id: 'requests', label: 'Pedidos Activos', icon: Clock },
          { id: 'history', label: 'Histórico', icon: History },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
            }`}
          >
            <tab.icon size={16} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'plans' && (
            <motion.div
              key="plans"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vacationPlans.map((plan, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                      <Calendar className="text-slate-100 group-hover:text-emerald-50 transition-colors" size={48} />
                    </div>
                    <div className="relative">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{plan.year}</p>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{plan.month}</h3>
                      <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        plan.status === 'Gozado' ? 'bg-slate-100 text-slate-500' : 
                        plan.status === 'Planeado' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {plan.status}
                      </div>
                      {plan.status === 'Pendente Pedido' && (
                        <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-2">
                          <AlertCircle size={14} className="text-amber-600 mt-0.5" />
                          <p className="text-[10px] text-amber-700 font-medium">
                            Lembrete: Deve efectuar o pedido formal até 30 dias antes do mês planeado.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowPlanForm(true)}
                  className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Plus size={24} />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-widest">Adicionar Plano</span>
                </button>
              </div>

              <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-start space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <Info size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">Regra de Planeamento</h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Funcionários do mesmo departamento não podem escolher o mesmo mês para gozo de férias. 
                    O seu gestor validará o plano anual para garantir a continuidade dos serviços.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'requests' && (
            <motion.div
              key="requests"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {requests.filter(r => r.status !== 'Aprovado' && r.status !== 'Rejeitado').length === 0 ? (
                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <Clock size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Nenhum pedido pendente</h3>
                  <p className="text-slate-500 max-w-xs mx-auto text-sm">Você não possui solicitações em fase de aprovação no momento.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.filter(r => r.status !== 'Aprovado' && r.status !== 'Rejeitado').map((req) => (
                    <div key={req.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                            req.type === 'Férias' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {req.type === 'Férias' ? <Plane size={24} /> : <Clock size={24} />}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-bold text-slate-900">{req.type} {req.subType && `(${req.subType})`}</h3>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(req.status)}`}>
                                {req.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500">Período: <span className="font-bold text-slate-700">{req.startDate}</span> até <span className="font-bold text-slate-700">{req.endDate}</span></p>
                            <p className="text-xs text-slate-400 mt-1">Solicitado em: {req.dateRequested}</p>
                          </div>
                        </div>

                        {/* Workflow Visualizer */}
                        <div className="flex-1 max-w-md">
                          <div className="flex items-center justify-between relative">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2" />
                            {[
                              { label: 'Unidade', icon: Building, active: req.status !== 'Pendente' },
                              { label: 'RH', icon: ShieldCheck, active: req.status === 'Parecer RH' || req.status === 'Aprovado' },
                              { label: 'Reitoria', icon: UserCheck, active: req.status === 'Aprovado' }
                            ].map((step, i) => (
                              <div key={i} className="relative flex flex-col items-center space-y-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 transition-all ${
                                  step.active ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-300'
                                }`}>
                                  <step.icon size={14} />
                                </div>
                                <span className={`text-[10px] font-bold uppercase ${step.active ? 'text-emerald-600' : 'text-slate-400'}`}>{step.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                            <XCircle size={20} />
                          </button>
                        </div>
                      </div>
                      
                      {req.managerOpinion && (
                        <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Parecer do Gestor:</p>
                          <p className="text-sm text-slate-700 italic">&quot;{req.managerOpinion}&quot;</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {requests.filter(r => r.status === 'Aprovado' || r.status === 'Rejeitado').map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      req.status === 'Aprovado' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {req.status === 'Aprovado' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{req.type} {req.subType && `(${req.subType})`}</h4>
                      <p className="text-xs text-slate-500">{req.startDate} • {req.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right hidden sm:block">
                      <p className={`text-xs font-bold uppercase tracking-widest ${
                        req.status === 'Aprovado' ? 'text-emerald-600' : 'text-red-600'
                      }`}>{req.status}</p>
                      <p className="text-[10px] text-slate-400">Finalizado em: {req.dateRequested}</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Plan Form Modal */}
      <AnimatePresence>
        {showPlanForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPlanForm(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-slate-900">Plano de Férias</h2>
                    <p className="text-sm text-slate-500">Planeamento anual até 2060</p>
                  </div>
                </div>
                <button onClick={() => setShowPlanForm(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <XCircle size={24} className="text-slate-400" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Ano</label>
                    <input 
                      type="number" 
                      defaultValue={2026}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all"
                      placeholder="Ex: 2026"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Mês Desejado</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all">
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-3">
                  <Info size={16} className="text-blue-600 mt-0.5" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    O sistema verificará se outros colegas do departamento já escolheram este mês. Caso positivo, você será notificado para ajustar.
                  </p>
                </div>

                <button 
                  type="button"
                  onClick={() => setShowPlanForm(false)}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                >
                  Confirmar Planeamento
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Request Form Modal */}
      <AnimatePresence>
        {showRequestForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRequestForm(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    requestType === 'vacation' ? 'bg-emerald-100 text-emerald-600' : 
                    requestType === 'leave' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {requestType === 'vacation' ? <Plane size={24} /> : <Clock size={24} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-slate-900">
                      {requestType === 'vacation' ? 'Pedido de Férias' : 
                       requestType === 'leave' ? 'Pedido de Dispensa' : 'Outra Solicitação'}
                    </h2>
                    <p className="text-sm text-slate-500">Preencha os detalhes para submissão</p>
                  </div>
                </div>
                <button onClick={() => setShowRequestForm(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <XCircle size={24} className="text-slate-400" />
                </button>
              </div>

              <form className="space-y-6">
                {requestType === 'vacation' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tipo de Gozo</label>
                    <select 
                      value={vacationType}
                      onChange={(e) => setVacationType(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all"
                    >
                      <option value="Normal">Normal (Conforme Plano)</option>
                      <option value="Antecipação">Antecipação</option>
                      <option value="Adiamento">Adiamento</option>
                    </select>
                  </div>
                )}

                {requestType === 'leave' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tipo de Dispensa</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all">
                      <option>Paternidade</option>
                      <option>Maternidade</option>
                      <option>Luto</option>
                      <option>Casamento</option>
                      <option>Doença</option>
                      <option>Outros Motivos</option>
                    </select>
                  </div>
                )}

                {requestType === 'other' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Assunto</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all">
                      <option>Justificação de Falta</option>
                      <option>Pedido de Transferência</option>
                      <option>Pedido de Mobilidade</option>
                      <option>Outros</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data de Início</label>
                    <input type="date" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data de Fim</label>
                    <input type="date" className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" />
                  </div>
                </div>

                {(requestType !== 'vacation' || (requestType === 'vacation' && (vacationType === 'Antecipação' || vacationType === 'Adiamento'))) && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Motivo / Justificação</label>
                    <textarea 
                      rows={4}
                      placeholder="Descreva detalhadamente o motivo do seu pedido..."
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all resize-none"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Anexar Documento (Opcional)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-pointer group">
                    <Upload size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-bold uppercase tracking-widest">Clique para carregar</p>
                    <p className="text-[10px] mt-1">PDF, JPG ou PNG (Máx. 5MB)</p>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                  >
                    Submeter Pedido
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
