'use client';

import { motion } from 'motion/react';
import { 
  User, 
  Calendar, 
  Users, 
  TrendingUp, 
  Award, 
  Clock,
  ChevronRight,
  FileText,
  Download,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const evolutionData = [
  { year: '2020', level: 1, salary: 15000, label: 'Ingresso' },
  { year: '2021', level: 1, salary: 15000, label: 'Efectivo' },
  { year: '2022', level: 2, salary: 18000, label: 'Progressão' },
  { year: '2023', level: 2, salary: 18000, label: 'Manutenção' },
  { year: '2024', level: 3, salary: 22000, label: 'Promoção' },
  { year: '2025', level: 4, salary: 28000, label: 'Chefia' },
];

export default function EmployeeDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Olá, João Funcionário</h1>
          <p className="text-slate-500">Bem-vindo ao seu portal de gestão de carreira.</p>
        </div>
        <div className="flex space-x-3">
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-100">
            Status: Activo
          </div>
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold border border-blue-100">
            Departamento: Recursos Humanos
          </div>
        </div>
      </div>

      {/* Prova de Vida Notification */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-amber-50 border border-amber-200 p-6 rounded-[2rem] flex items-center justify-between shadow-sm"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-amber-900">Lembrete: Prova de Vida</h3>
            <p className="text-sm text-amber-700">O seu aniversário é em Maio. Deve efectuar a sua prova de vida até ao final do mês de Maio.</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-amber-600 text-white rounded-xl text-sm font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-200">
          Saber Mais
        </button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Anos de Serviço', value: '5 Anos', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Próximas Férias', value: 'Agosto 2026', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Nível Académico', value: 'Licenciatura', icon: Award, color: 'text-amber-600', bg: 'bg-amber-100' },
          { label: 'Colegas Dept.', value: '12', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Evolution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Evolução de Carreira</h2>
              <p className="text-sm text-slate-500">Histórico de progressão e remuneração</p>
            </div>
            <TrendingUp className="text-emerald-500" size={24} />
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolutionData}>
                <defs>
                  <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="salary" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSalary)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Documentos Recentes</h2>
          <div className="space-y-4">
            {[
              { name: 'Certificado de Licenciatura.pdf', date: '12 Jan 2024', size: '2.4 MB' },
              { name: 'BI_Frente_Verso.pdf', date: '10 Jan 2024', size: '1.1 MB' },
              { name: 'Contrato_Trabalho.pdf', date: '05 Jan 2024', size: '3.8 MB' },
              { name: 'NUIT_Documento.pdf', date: '02 Jan 2024', size: '0.5 MB' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-emerald-50 transition-all cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors shadow-sm">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 truncate w-32">{doc.name}</p>
                    <p className="text-[10px] text-slate-400">{doc.date} • {doc.size}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
            Ver Todos Documentos
          </button>
        </div>
      </div>

      {/* Career Timeline */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-8">Linha do Tempo Profissional</h2>
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {[...evolutionData].reverse().map((item, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-emerald-600 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all">
                <TrendingUp size={16} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-50 border border-slate-100 group-hover:border-emerald-200 transition-all">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-slate-900">{item.label}</div>
                  <time className="font-mono text-xs font-bold text-emerald-600">{item.year}</time>
                </div>
                <div className="text-slate-500 text-sm">Nível de Carreira: {item.level} • Salário Base: {item.salary.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
