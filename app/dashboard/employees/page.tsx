'use client';

import Image from 'next/image';
import { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  AlertCircle,
  Clock,
  ChevronRight,
  FileText,
  Trash2,
  Edit2,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock data
const mockEmployees = [
  {
    id: '1',
    code: '001/RH/2024',
    firstName: 'Ana',
    lastName: 'Silva',
    email: 'ana.silva@instituicao.gov.mz',
    phone: '+258 84 123 4567',
    department: 'Recursos Humanos',
    position: 'Técnico Superior',
    status: 'Efectivo',
    photo: 'https://picsum.photos/seed/ana/200',
    birthDate: '1990-05-15',
    joiningDate: '2024-01-10',
  },
  {
    id: '2',
    code: '002/FIN/2023',
    firstName: 'Bernardo',
    lastName: 'Matusse',
    email: 'bernardo.m@instituicao.gov.mz',
    phone: '+258 82 987 6543',
    department: 'Finanças',
    position: 'Contabilista',
    status: 'Efectivo',
    photo: 'https://picsum.photos/seed/bernardo/200',
    birthDate: '1985-08-22',
    joiningDate: '2023-03-15',
  },
];

import EmployeeForm from '@/components/employee-form';

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const handleSaveEmployee = (data: any) => {
    console.log('Saving employee:', data);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Funcionários</h1>
          <p className="text-slate-500">Gerencie todos os colaboradores da instituição.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
        >
          <UserPlus size={20} className="mr-2" />
          Adicionar Funcionário
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Funcionários', value: '156', icon: Users, color: 'bg-blue-500' },
          { label: 'Efectivos', value: '142', icon: Briefcase, color: 'bg-emerald-500' },
          { label: 'Em Férias', value: '8', icon: Calendar, color: 'bg-amber-500' },
          { label: 'Aposentação (Este Ano)', value: '3', icon: Clock, color: 'bg-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-2 rounded-lg text-white`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Geral</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome, código ou departamento..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 rounded-xl transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all font-medium">
            <Filter size={18} className="mr-2" />
            Filtros
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all font-medium">
            <Download size={18} className="mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Funcionário</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Código / Dept</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ingresso</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image 
                          src={emp.photo} 
                          alt={emp.firstName} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{emp.firstName} {emp.lastName}</p>
                        <p className="text-xs text-slate-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-700">{emp.code}</p>
                    <p className="text-xs text-slate-500">{emp.department}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-full border border-emerald-100">
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{format(new Date(emp.joiningDate), 'dd MMM yyyy', { locale: ptBR })}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal (Simplified for now) */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[85vh]"
            >
              <EmployeeForm 
                onClose={() => setShowAddModal(false)} 
                onSave={handleSaveEmployee} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
