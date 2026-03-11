'use client';

import { jsPDF } from 'jspdf';
import Image from 'next/image';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar,
  Download,
  FileText,
  Shield,
  Clock
} from 'lucide-react';
import { calculateAge, calculateTimeDiff, formatTimeDiff } from '@/lib/utils';

const Section = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
    <div className="px-8 py-6 border-b border-slate-50 flex items-center space-x-3 bg-slate-50/50">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
        <Icon size={20} />
      </div>
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
    </div>
    <div className="p-8">
      {children}
    </div>
  </div>
);

const Field = ({ label, value }: { label: string, value: string | number }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-semibold text-slate-700">{value || '---'}</p>
  </div>
);

export default function EmployeeProfile() {
  // Mock data for the employee
  const employee = {
    personal: {
      name: 'João Funcionário',
      photo: 'https://picsum.photos/seed/joao/200',
      gender: 'Masculino',
      birthDate: '1990-05-15',
      naturality: 'Maputo',
      province: 'Maputo Cidade',
      father: 'António Funcionário',
      mother: 'Maria Funcionária',
      idNumber: '123456789012A',
      nuit: '100200300',
    },
    academic: {
      level: 'Licenciatura',
      institution: 'Universidade Eduardo Mondlane',
      course: 'Gestão de Recursos Humanos',
      year: 2015
    },
    professional: {
      code: '001/RH/2020',
      delegation: 'Sede',
      organicUnit: 'Direcção Geral',
      department: 'Recursos Humanos',
      previousDepartment: 'N/A',
      career: 'Técnico Superior',
      category: 'Especialista',
      contractType: 'Efectivo',
      joiningDate: '2020-02-01', // Data de ingresso no Estado
      contractedDate: '2018-01-15', // Data como contratado
      appointmentDate: '2020-02-01', // Data de nomeação
    },
    contacts: {
      phone: '+258 84 123 4567',
      email: 'joao.funcionario@empresa.gov.mz',
      address: 'Av. 24 de Julho, Bairro Central, Maputo'
    },
    documents: [
      { name: 'BI_Identidade.pdf', type: 'Pessoal', date: '10/01/2024' },
      { name: 'Certificado_Licenciatura.pdf', type: 'Académico', date: '12/01/2024' },
      { name: 'NUIT_Documento.pdf', type: 'Pessoal', date: '02/01/2024' },
      { name: 'Contrato_Assinado.pdf', type: 'Profissional', date: '05/01/2024' },
    ],
    evolution: [
      { type: 'Promoção', detail: 'Escalão 3', date: '15/05/2023', status: 'Concluído' },
      { type: 'Progressão', detail: 'Classe B', date: '10/01/2022', status: 'Concluído' },
    ],
    leadership: [
      { role: 'Chefe de Departamento', unit: 'Recursos Humanos', period: '2021 - Presente', status: 'Activo' },
      { role: 'Responsável de Secção', unit: 'Administração', period: '2019 - 2021', status: 'Cessado' },
    ],
    awards: [
      { title: 'Funcionário do Ano', year: '2023', reason: 'Excelência no desempenho' },
    ],
    disciplinary: [
      { type: 'Nenhum', record: 'Limpo', date: 'N/A' }
    ]
  };

  // Calculations
  const age = calculateAge(employee.personal.birthDate);
  const contractedTime = calculateTimeDiff(employee.professional.contractedDate, employee.professional.appointmentDate);
  const serviceTime = calculateTimeDiff(employee.professional.appointmentDate);
  
  // Total time in State (Contracted + Effective)
  const totalServed = calculateTimeDiff(employee.professional.contractedDate);

  // Time to 65 years age
  const birthDate = new Date(employee.personal.birthDate);
  const date65 = new Date(birthDate.getFullYear() + 65, birthDate.getMonth(), birthDate.getDate());
  const timeTo65 = calculateTimeDiff(new Date().toISOString().split('T')[0], date65.toISOString().split('T')[0]);

  // Time to 35 years service (Total including contracted)
  const startDate = new Date(employee.professional.contractedDate);
  const date35Service = new Date(startDate.getFullYear() + 35, startDate.getMonth(), startDate.getDate());
  const timeTo35Service = calculateTimeDiff(new Date().toISOString().split('T')[0], date35Service.toISOString().split('T')[0]);

  // Difference calculation for retirement
  const remainingFor35 = 35 - totalServed.years;

  const handleDownloadProfile = async () => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 0;

    // Modern Header
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 60, 'F');
    
    // Photo Placeholder (Modern Circle)
    doc.setFillColor(30, 41, 59); // slate-800
    doc.setDrawColor(51, 65, 85); // slate-700
    doc.setLineWidth(1);
    doc.circle(40, 30, 15, 'FD');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(employee.personal.name.toUpperCase(), 65, 28);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(`CÓDIGO: ${employee.professional.code}`, 65, 38);
    doc.text(`${employee.professional.career} • ${employee.professional.department}`, 65, 45);

    y = 75;

    const addSectionHeader = (title: string, iconColor: [number, number, number]) => {
      doc.setFillColor(...iconColor);
      doc.rect(margin, y - 5, 4, 8, 'F');
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(title, margin + 8, y + 1);
      y += 12;
    };

    const addField = (label: string, value: string, x: number, currentY: number) => {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(148, 163, 184);
      doc.text(label.toUpperCase(), x, currentY);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(value || '---', x, currentY + 5);
    };

    // Personal Data
    addSectionHeader('DADOS PESSOAIS', [16, 185, 129]); // emerald-500
    addField('Nome Completo', employee.personal.name, margin, y);
    addField('Sexo', employee.personal.gender, margin + 80, y);
    y += 15;
    addField('Data de Nascimento', employee.personal.birthDate, margin, y);
    addField('Idade', `${age} Anos`, margin + 80, y);
    y += 15;
    addField('Naturalidade', employee.personal.naturality, margin, y);
    addField('Província', employee.personal.province, margin + 80, y);
    y += 15;
    addField('BI / Passaporte', employee.personal.idNumber, margin, y);
    addField('NUIT', employee.personal.nuit, margin + 80, y);
    y += 20;

    // Professional Data
    addSectionHeader('DADOS PROFISSIONAIS & REFORMA', [59, 130, 246]); // blue-500
    addField('Departamento', employee.professional.department, margin, y);
    addField('Carreira', employee.professional.career, margin + 80, y);
    y += 15;
    addField('Data Ingresso (Contrato)', employee.professional.contractedDate, margin, y);
    addField('Data Nomeação (Efectivo)', employee.professional.appointmentDate, margin + 80, y);
    y += 15;
    addField('Tempo como Contratado', formatTimeDiff(contractedTime), margin, y);
    addField('Tempo de Serviço Efectivo', formatTimeDiff(serviceTime), margin + 80, y);
    y += 15;
    
    // Retirement Details
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(margin - 5, y - 5, pageWidth - (margin * 2) + 10, 35, 'F');
    
    addField('Falta para Reforma (Idade 65)', formatTimeDiff(timeTo65), margin, y);
    addField('Falta para Reforma (35 Anos Serviço)', formatTimeDiff(timeTo35Service), margin + 80, y);
    y += 15;
    addField('Tempo Total Servido (Estado)', formatTimeDiff(totalServed), margin, y);
    addField('Diferença para 35 Anos', `${remainingFor35} Anos restantes`, margin + 80, y);
    y += 25;

    // Evolution
    addSectionHeader('EVOLUÇÃO PROFISSIONAL', [245, 158, 11]); // amber-500
    employee.evolution.forEach(ev => {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(51, 65, 85);
      doc.text(`${ev.type}: ${ev.detail}`, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text(`Data: ${ev.date} - Status: ${ev.status}`, margin + 100, y);
      y += 8;
    });
    y += 10;

    // Documents
    addSectionHeader('DOCUMENTOS ENVIADOS', [107, 114, 128]); // gray-500
    employee.documents.forEach(d => {
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(`• ${d.name}`, margin, y);
      doc.setTextColor(148, 163, 184);
      doc.text(`${d.type} - ${d.date}`, margin + 100, y);
      y += 7;
    });
    y += 10;

    // Leadership
    if (employee.leadership.length > 0) {
      addSectionHeader('CARGOS DE DIRECÇÃO / CHEFIA', [139, 92, 246]); // violet-500
      employee.leadership.forEach(l => {
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        doc.text(`${l.role} - ${l.unit}`, margin, y);
        doc.setTextColor(148, 163, 184);
        doc.text(`${l.period} (${l.status})`, margin + 120, y);
        y += 7;
      });
      y += 10;
    }

    // Awards
    if (employee.awards.length > 0) {
      addSectionHeader('PREMIAÇÕES', [236, 72, 153]); // pink-500
      employee.awards.forEach(a => {
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        doc.text(`${a.title} (${a.year})`, margin, y);
        doc.setTextColor(148, 163, 184);
        doc.text(a.reason, margin + 80, y);
        y += 7;
      });
      y += 10;
    }

    // Disciplinary
    addSectionHeader('REGISTO DISCIPLINAR', [239, 68, 68]); // red-500
    employee.disciplinary.forEach(d => {
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(`${d.type}: ${d.record}`, margin, y);
      doc.setTextColor(148, 163, 184);
      doc.text(d.date, margin + 120, y);
      y += 7;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Documento oficial gerado pelo Sistema de Gestão de RH em ${new Date().toLocaleString()}`, margin, 285);

    doc.save(`Ficha_Moderna_${employee.personal.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Profile Header */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
          <div className="w-32 h-32 rounded-[2.5rem] bg-slate-800 border-4 border-slate-700 overflow-hidden flex items-center justify-center relative">
            {employee.personal.photo ? (
              <Image 
                src={employee.personal.photo} 
                alt={employee.personal.name} 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <User size={60} className="text-slate-600" />
            )}
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-display font-bold mb-2">{employee.personal.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center text-slate-400 text-sm">
                <Briefcase size={16} className="mr-2 text-emerald-400" />
                {employee.professional.career}
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                <Shield size={16} className="mr-2 text-blue-400" />
                {employee.professional.department}
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                <Clock size={16} className="mr-2 text-amber-400" />
                {employee.professional.code}
              </div>
              <div className="flex items-center px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-tighter animate-pulse">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Sistema Estado: Activo
              </div>
            </div>
          </div>
          <button 
            onClick={handleDownloadProfile}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-900/20 flex items-center"
          >
            <Download size={18} className="mr-2" />
            Baixar Ficha Completa (PDF)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dados Pessoais */}
        <Section title="Dados Pessoais" icon={User}>
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <Field label="Nome Completo" value={employee.personal.name} />
            <Field label="Sexo" value={employee.personal.gender} />
            <Field label="Data de Nascimento" value={employee.personal.birthDate} />
            <Field label="Idade" value={`${age} Anos`} />
            <Field label="Naturalidade" value={employee.personal.naturality} />
            <Field label="Província" value={employee.personal.province} />
            <Field label="Nome do Pai" value={employee.personal.father} />
            <Field label="Nome da Mãe" value={employee.personal.mother} />
            <Field label="BI / Passaporte" value={employee.personal.idNumber} />
            <Field label="NUIT" value={employee.personal.nuit} />
          </div>
        </Section>

        {/* Dados Académicos */}
        <Section title="Nível Académico" icon={GraduationCap}>
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <Field label="Nível" value={employee.academic.level} />
            <Field label="Instituição" value={employee.academic.institution} />
            <Field label="Curso" value={employee.academic.course} />
            <Field label="Ano de Conclusão" value={employee.academic.year} />
          </div>
        </Section>

        {/* Dados Profissionais */}
        <Section title="Dados Profissionais & Reforma" icon={Briefcase}>
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <Field label="Delegação" value={employee.professional.delegation} />
            <Field label="Unidade Orgânica" value={employee.professional.organicUnit} />
            <Field label="Departamento" value={employee.professional.department} />
            <Field label="Regime Contratual" value={employee.professional.contractType} />
            <Field label="Carreira" value={employee.professional.career} />
            <Field label="Categoria" value={employee.professional.category} />
            <Field label="Data de Ingresso" value={employee.professional.joiningDate} />
            <Field label="Tempo de Serviço (Efectivo)" value={formatTimeDiff(serviceTime)} />
            <Field label="Tempo como Contratado" value={formatTimeDiff(contractedTime)} />
            <Field label="Reforma (Idade 65)" value={formatTimeDiff(timeTo65)} />
            <Field label="Reforma (35 Anos Serviço)" value={formatTimeDiff(timeTo35Service)} />
            <Field label="Falta para 35 Anos" value={`${remainingFor35} Anos restantes`} />
          </div>
        </Section>

        {/* Contactos */}
        <Section title="Contactos" icon={Phone}>
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl">
              <Phone className="text-emerald-600 mr-4" size={20} />
              <Field label="Telefone" value={employee.contacts.phone} />
            </div>
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl">
              <Mail className="text-blue-600 mr-4" size={20} />
              <Field label="Email Corporativo" value={employee.contacts.email} />
            </div>
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl">
              <MapPin className="text-amber-600 mr-4" size={20} />
              <Field label="Endereço de Residência" value={employee.contacts.address} />
            </div>
          </div>
        </Section>

        {/* Documentos Enviados */}
        <Section title="Documentos Enviados" icon={FileText}>
          <div className="space-y-4">
            {employee.documents.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-emerald-50 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors shadow-sm">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{doc.name}</p>
                    <p className="text-[10px] text-slate-400">{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* Evolução Profissional */}
        <Section title="Evolução Profissional" icon={Award}>
          <div className="space-y-6">
            {employee.evolution.map((ev, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${ev.type === 'Promoção' ? 'bg-emerald-50 border-emerald-100' : 'bg-blue-50 border-blue-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold ${ev.type === 'Promoção' ? 'text-emerald-900' : 'text-blue-900'}`}>{ev.type}</h4>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${ev.type === 'Promoção' ? 'bg-emerald-200 text-emerald-700' : 'bg-blue-200 text-blue-700'}`}>{ev.status}</span>
                </div>
                <Field label="Detalhe" value={ev.detail} />
                <p className={`text-xs mt-1 ${ev.type === 'Promoção' ? 'text-emerald-600' : 'text-blue-600'}`}>Data: {ev.date}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Cargos de Direcção / Chefia */}
        <Section title="Cargos de Direcção / Chefia" icon={Shield}>
          <div className="space-y-4">
            {employee.leadership.map((lead, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-900">{lead.role}</h4>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${lead.status === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                    {lead.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{lead.unit}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{lead.period}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Premiações e Disciplinar */}
        <Section title="Mérito e Disciplina" icon={Award}>
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Premiações</h4>
              <div className="space-y-3">
                {employee.awards.map((award, i) => (
                  <div key={i} className="p-4 bg-pink-50 border border-pink-100 rounded-2xl">
                    <p className="font-bold text-pink-900">{award.title}</p>
                    <p className="text-xs text-pink-700">{award.reason} ({award.year})</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Registo Disciplinar</h4>
              <div className="space-y-3">
                {employee.disciplinary.map((disc, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${disc.type === 'Nenhum' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                    <div className="flex justify-between items-center">
                      <p className={`font-bold ${disc.type === 'Nenhum' ? 'text-emerald-900' : 'text-red-900'}`}>{disc.type}</p>
                      <span className="text-[10px] text-slate-400">{disc.date}</span>
                    </div>
                    <p className={`text-xs ${disc.type === 'Nenhum' ? 'text-emerald-700' : 'text-red-700'}`}>{disc.record}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
