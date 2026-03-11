'use client';

import { Users, Mail, Phone, Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function EmployeeDepartment() {
  const colleagues = [
    { name: 'Ana Silva', role: 'Gestora de RH', email: 'ana.silva@empresa.gov.mz', phone: '+258 84 000 1111' },
    { name: 'Carlos Santos', role: 'Analista de Folha', email: 'carlos.santos@empresa.gov.mz', phone: '+258 84 000 2222' },
    { name: 'Maria Oliveira', role: 'Técnica de Recrutamento', email: 'maria.oliveira@empresa.gov.mz', phone: '+258 84 000 3333' },
    { name: 'Pedro Costa', role: 'Assistente Administrativo', email: 'pedro.costa@empresa.gov.mz', phone: '+258 84 000 4444' },
    { name: 'Sofia Martins', role: 'Coordenadora de Formação', email: 'sofia.martins@empresa.gov.mz', phone: '+258 84 000 5555' },
    { name: 'Ricardo Pereira', role: 'Técnico de Benefícios', email: 'ricardo.pereira@empresa.gov.mz', phone: '+258 84 000 6666' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">Meu Departamento</h1>
        <p className="text-slate-500">Recursos Humanos • Unidade Orgânica: Direcção Geral</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleagues.map((colleague, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-emerald-200 transition-all group"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-all font-bold text-xl">
                {colleague.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{colleague.name}</h3>
                <p className="text-xs text-slate-500 flex items-center">
                  <Briefcase size={12} className="mr-1" />
                  {colleague.role}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-slate-600">
                <Mail size={16} className="mr-3 text-slate-400" />
                <span className="truncate">{colleague.email}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone size={16} className="mr-3 text-slate-400" />
                {colleague.phone}
              </div>
            </div>

            <button className="w-full py-3 bg-slate-50 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-widest group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center justify-center">
              Ver Perfil Público
              <ChevronRight size={14} className="ml-1" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <Users size={24} />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900">Total do Departamento</h4>
            <p className="text-sm text-emerald-700">7 Funcionários Activos</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all">
          Ver Organograma
        </button>
      </div>
    </div>
  );
}
