'use client';

import { 
  PieChart as PieIcon, 
  BarChart as BarIcon, 
  TrendingUp, 
  Download, 
  Filter, 
  Calendar,
  Users,
  Briefcase,
  FileText,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const ageData = [
  { range: '18-25', count: 12 },
  { range: '26-35', count: 45 },
  { range: '36-45', count: 58 },
  { range: '46-55', count: 32 },
  { range: '56-65', count: 14 },
];

const performanceData = [
  { month: 'Jan', score: 85 },
  { month: 'Fev', score: 88 },
  { month: 'Mar', score: 92 },
  { month: 'Abr', score: 90 },
  { month: 'Mai', score: 95 },
  { month: 'Jun', score: 94 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Relatórios e Estatísticas</h1>
          <p className="text-slate-500">Análise detalhada da força de trabalho e desempenho.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center">
            <Filter size={18} className="mr-2" />
            Filtrar Dados
          </button>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center">
            <Download size={18} className="mr-2" />
            Gerar PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Age Distribution */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Distribuição Etária</h3>
              <p className="text-sm text-slate-500">Número de funcionários por faixa de idade</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Users size={24} />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Média de Desempenho</h3>
              <p className="text-sm text-slate-500">Evolução da avaliação institucional</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Reports List */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Relatórios Gerados Recentemente</h3>
            <button className="text-sm font-bold text-emerald-600 hover:underline">Ver Todos</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { name: 'Relatório Trimestral de Férias', date: '10 Mar 2024', size: '2.4 MB', type: 'PDF' },
              { name: 'Lista de Aposentação 2024-2025', date: '05 Mar 2024', size: '1.1 MB', type: 'XLSX' },
              { name: 'Avaliação de Desempenho Anual', date: '28 Fev 2024', size: '5.8 MB', type: 'PDF' },
            ].map((report, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{report.name}</p>
                    <p className="text-xs text-slate-500">{report.date} • {report.size}</p>
                  </div>
                </div>
                <button className="p-3 bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white rounded-xl transition-all">
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
