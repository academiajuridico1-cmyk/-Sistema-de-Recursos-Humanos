'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  AlertCircle, 
  FileText, 
  Upload, 
  Plus, 
  Trash2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  X,
  Camera,
  Phone,
  MapPin,
  Home,
  Users as UsersIcon,
  ShieldAlert,
  Star,
  History,
  Mail as MailIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateAge, calculateTimeDiff, formatTimeDiff } from '@/lib/utils';

interface EmployeeFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const steps = [
  { id: 'personal', label: 'Dados Pessoais', icon: User },
  { id: 'academic', label: 'Nível Académico', icon: GraduationCap },
  { id: 'professional', label: 'Dados Profissionais', icon: Briefcase },
  { id: 'evolution', label: 'Evolução Profissional', icon: Award },
  { id: 'contacts', label: 'Contactos', icon: Phone },
  { id: 'documents', label: 'Documentos', icon: FileText },
];

export default function EmployeeForm({ onClose, onSave }: EmployeeFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    photo: '',
    firstName: '',
    lastName: '',
    gender: 'M',
    birthDate: '',
    naturality: '',
    province: '',
    fatherName: '',
    motherName: '',
    idType: 'BI',
    idNumber: '',
    nuit: '',
    academicLevel: 'Licenciatura',
    institution: '',
    delegation: '',
    organicUnit: '',
    department: '',
    previousDepartment: '',
    joiningDate: '', // Data de ingresso no Estado
    contractedDate: '', // Data como contratado
    appointmentDate: '', // Data de nomeação provisória/definitiva
    employeeCode: '',
    contractType: 'Efectivo',
    provenance: '',
    career: '',
    category: '',
    // Evolução
    careerChanges: [],
    promotions: [],
    progressions: [],
    isLeadership: false,
    leadershipRole: '',
    leadershipStart: '',
    leadershipEnd: '',
    hasAward: false,
    awardType: '',
    awardDate: '',
    hasDisciplinary: false,
    disciplinarySanction: '',
    disciplinaryDate: '',
    // Contactos
    phone: '',
    email: '',
    address: '',
    documents: []
  });

  const age = formData.birthDate ? calculateAge(formData.birthDate) : 0;
  const totalStateTime = formData.joiningDate ? calculateTimeDiff(formData.joiningDate) : { years: 0, months: 0, days: 0 };
  const contractedTime = formData.contractedDate ? calculateTimeDiff(formData.contractedDate, formData.appointmentDate || undefined) : { years: 0, months: 0, days: 0 };
  const serviceTime = formData.appointmentDate ? calculateTimeDiff(formData.appointmentDate) : { years: 0, months: 0, days: 0 };
  
  // Cálculo de aposentação
  const yearsToRetireByService = 35 - serviceTime.years;
  const yearsToRetireByAge = 60 - age;
  const yearsToRetire = Math.min(yearsToRetireByService, yearsToRetireByAge);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const getAlphabeticalNumber = (name: string) => {
    if (!name) return '001';
    const firstLetter = name.charAt(0).toUpperCase();
    const code = firstLetter.charCodeAt(0) - 64; // A = 1, B = 2...
    if (code < 1 || code > 26) return '001';
    return code.toString().padStart(3, '0');
  };

  const updateEmployeeCode = (name: string, dept: string, date: string) => {
    const year = date ? new Date(date).getFullYear() : '';
    const deptCode = dept ? dept.substring(0, 3).toUpperCase() : '';
    const num = getAlphabeticalNumber(name);
    if (deptCode && year) {
      setFormData((prev: any) => ({ ...prev, employeeCode: `${num}/${deptCode}/${year}` }));
    }
  };

  const handleFinalSave = useCallback(() => {
    const codeRegex = /^\d+\/[A-Z0-9]+\/\d{4}$/;
    if (!codeRegex.test(formData.employeeCode)) {
      alert('O código do funcionário deve seguir o padrão: Número/DEPT/Ano (Ex: 001/RH/2024)');
      return;
    }
    
    // Simular envio de email e senha temporária
    const tempPassword = Math.random().toString(36).slice(-8);
    console.log(`Enviando email para ${formData.email} com senha temporária: ${tempPassword} e link de acesso.`);
    alert(`Cadastro finalizado! Credenciais enviadas para ${formData.email}. Senha temporária: ${tempPassword}`);
    
    onSave({ ...formData, tempPassword });
  }, [onSave, formData]);
  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && !e.shiftKey) {
        if (currentStep === steps.length - 1) handleFinalSave();
        else handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, onClose, handleNext, handleFinalSave]);

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'personal':
        return (
          <div className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                  {formData.photo ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={formData.photo} 
                        alt="Foto" 
                        fill 
                        className="object-cover"
                        unoptimized // Since it's base64/data URL
                      />
                    </div>
                  ) : (
                    <Camera size={40} className="text-slate-300" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-emerald-700 transition-all">
                  <Upload size={16} />
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fotografia do Funcionário</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Primeiro Nome</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.firstName}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({...formData, firstName: val});
                    updateEmployeeCode(val, formData.department, formData.joiningDate);
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Apelido</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Sexo</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Data de Nascimento</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                />
                <p className="text-[10px] text-amber-600 font-medium">Notificação de Prova de Vida será enviada 1 mês antes do aniversário.</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Idade (Calculada)</label>
                <input 
                  type="text" 
                  readOnly 
                  className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-slate-500" 
                  value={age + ' anos'}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Naturalidade</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.naturality}
                  onChange={(e) => setFormData({...formData, naturality: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Província</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.province}
                  onChange={(e) => setFormData({...formData, province: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Filiação (Pai)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.fatherName}
                  onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Filiação (Mãe)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.motherName}
                  onChange={(e) => setFormData({...formData, motherName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">BI / Passaporte</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.idNumber}
                  onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">NUIT</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.nuit}
                  onChange={(e) => setFormData({...formData, nuit: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      case 'academic':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Nível Académico</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all"
                value={formData.academicLevel}
                onChange={(e) => setFormData({...formData, academicLevel: e.target.value})}
              >
                <option value="Elementar">Elementar</option>
                <option value="Básico">Básico</option>
                <option value="Médio">Médio</option>
                <option value="Licenciatura">Licenciatura</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutoramento">Doutoramento</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Instituição de Ensino</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                value={formData.institution || ''}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
              />
            </div>
          </div>
        );
      case 'professional':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Delegação</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                value={formData.delegation}
                onChange={(e) => setFormData({...formData, delegation: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Unidade Orgânica</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                value={formData.organicUnit}
                onChange={(e) => setFormData({...formData, organicUnit: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Departamento Actual</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all"
                value={formData.department}
                onChange={(e) => {
                  const dept = e.target.value;
                  setFormData({...formData, department: dept});
                  updateEmployeeCode(formData.firstName, dept, formData.joiningDate);
                }}
              >
                <option value="">Seleccione...</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
                <option value="Finanças">Finanças</option>
                <option value="Administração">Administração</option>
                <option value="Tecnologias de Informação">Tecnologias de Informação</option>
                <option value="Logística">Logística</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Departamento Anterior</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                value={formData.previousDepartment}
                onChange={(e) => setFormData({...formData, previousDepartment: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Regime Contratual</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all"
                value={formData.contractType}
                onChange={(e) => setFormData({...formData, contractType: e.target.value})}
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Transferência">Transferência</option>
                <option value="Mobilidade">Mobilidade</option>
                <option value="Destacado">Destacado</option>
              </select>
            </div>
            {(formData.contractType !== 'Efectivo') && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Proveniência</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.provenance}
                  onChange={(e) => setFormData({...formData, provenance: e.target.value})}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Data de Ingresso no Estado</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                value={formData.joiningDate}
                onChange={(e) => {
                  const date = e.target.value;
                  setFormData({...formData, joiningDate: date});
                  updateEmployeeCode(formData.firstName, formData.department, date);
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Carreira / Categoria</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                value={formData.career}
                onChange={(e) => setFormData({...formData, career: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Data de Ingresso no Estado (Contratado)</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                value={formData.contractedDate}
                onChange={(e) => setFormData({...formData, contractedDate: e.target.value})}
              />
              <p className="text-[10px] text-slate-500">Tempo como contratado: {formatTimeDiff(contractedTime)}</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Data de Nomeação (Provisória/Definitiva)</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                value={formData.appointmentDate}
                onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
              />
              <p className="text-[10px] text-slate-500">Tempo de serviço: {formatTimeDiff(serviceTime)}</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Tempo para Aposentação</label>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-sm font-medium">
                Faltam aproximadamente {yearsToRetire} anos para a aposentação (limite 35 anos serviço ou 60 anos idade).
              </div>
            </div>
            <div className="space-y-4 md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                  <History size={14} className="mr-2 text-emerald-600" />
                  Detalhamento de Tempo de Serviço
                </label>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">Cálculo Automático</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tempo em Regime de Contrato</p>
                  <p className="text-sm font-bold text-slate-700">{formatTimeDiff(contractedTime)}</p>
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    {formData.contractedDate && formData.appointmentDate 
                      ? `De ${formData.contractedDate} até ${formData.appointmentDate}`
                      : formData.contractedDate ? `Desde ${formData.contractedDate}` : '---'}
                  </p>
                </div>
                
                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tempo de Nomeação (Efectivo)</p>
                  <p className="text-sm font-bold text-emerald-600">{formatTimeDiff(serviceTime)}</p>
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    {formData.appointmentDate ? `Desde ${formData.appointmentDate}` : '---'}
                  </p>
                </div>
              </div>

              <div className="mt-2 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={16} className="text-emerald-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-emerald-900">Tempo Total no Estado</p>
                    <p className="text-lg font-display font-bold text-emerald-600">{formatTimeDiff(totalStateTime)}</p>
                    <p className="text-[10px] text-emerald-700 leading-relaxed">
                      O tempo de serviço efectivo é calculado subtraindo o período de contrato ({formatTimeDiff(contractedTime)}) do tempo total decorrido desde o ingresso no Estado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Código do Funcionário (Nº/DEPT/ANO)</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="001/RH/2024"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all font-mono" 
                  value={formData.employeeCode}
                  onChange={(e) => setFormData({...formData, employeeCode: e.target.value})}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <AlertCircle size={16} className="text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'evolution':
        return (
          <div className="space-y-8">
            {/* Mudança de Carreira */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                <History size={18} className="mr-2 text-emerald-600" />
                Mudança de Carreira
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Nova Carreira" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                  <input type="date" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                </div>
                <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all uppercase tracking-widest">
                  Registar Mudança
                </button>
              </div>
            </div>

            {/* Promoções */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                <Star size={18} className="mr-2 text-amber-500" />
                Promoções (Escalão)
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm">
                    <option>Escalão 1</option>
                    <option>Escalão 2</option>
                    <option>Escalão 3</option>
                  </select>
                  <input type="date" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm col-span-2" />
                </div>
                <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all uppercase tracking-widest">
                  Registar Promoção
                </button>
              </div>
            </div>

            {/* Progressões */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                <Award size={18} className="mr-2 text-blue-500" />
                Progressões (Classe)
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm">
                    <option>Classe E</option>
                    <option>Classe D</option>
                    <option>Classe C</option>
                    <option>Classe B</option>
                    <option>Classe A</option>
                  </select>
                  <input type="date" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm col-span-2" />
                </div>
                <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all uppercase tracking-widest">
                  Registar Progressão
                </button>
              </div>
            </div>

            {/* Direção e Chefia */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-900 flex items-center">
                  <ShieldAlert size={18} className="mr-2 text-purple-600" />
                  Cargo de Direção / Chefia
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-500">Sim</span>
                  <button 
                    onClick={() => setFormData({...formData, isLeadership: !formData.isLeadership})}
                    className={`w-10 h-5 rounded-full transition-all relative ${formData.isLeadership ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.isLeadership ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>
              {formData.isLeadership && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <input 
                    type="text" 
                    placeholder="Nome do Cargo / Função" 
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm"
                    value={formData.leadershipRole}
                    onChange={(e) => setFormData({...formData, leadershipRole: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Data de Início</label>
                      <input type="date" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Data de Cessação</label>
                      <input type="date" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                    </div>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Nome da Função ao Cessar" 
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm"
                  />
                </div>
              )}
            </div>

            {/* Premiação */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-900 flex items-center">
                  <Star size={18} className="mr-2 text-amber-400" />
                  Premiação / Distinção
                </h4>
                <button 
                  onClick={() => setFormData({...formData, hasAward: !formData.hasAward})}
                  className={`w-10 h-5 rounded-full transition-all relative ${formData.hasAward ? 'bg-emerald-500' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.hasAward ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              {formData.hasAward && (
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Tipo de Prémio" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                  <input type="date" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                </div>
              )}
            </div>

            {/* Processo Disciplinar */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-900 flex items-center text-red-600">
                  <ShieldAlert size={18} className="mr-2" />
                  Processo Disciplinar
                </h4>
                <button 
                  onClick={() => setFormData({...formData, hasDisciplinary: !formData.hasDisciplinary})}
                  className={`w-10 h-5 rounded-full transition-all relative ${formData.hasDisciplinary ? 'bg-red-500' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.hasDisciplinary ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              {formData.hasDisciplinary && (
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Sanção Aplicada" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                  <input type="date" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                </div>
              )}
            </div>
          </div>
        );
      case 'contacts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="tel" 
                  placeholder="+258"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Email Corporativo</label>
              <div className="relative">
                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="nome@instituicao.gov.mz"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Endereço de Residência</label>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Rua, Bairro, Casa nº"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-8">
            {/* Documentos Pessoais */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Documentos Pessoais</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['BI / Passaporte', 'NUIT', 'Comprovativo de Residência', 'Curriculum Vitae'].map((doc) => (
                  <div key={doc} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-emerald-500 transition-all">
                    <span className="text-sm font-bold text-slate-700">{doc}</span>
                    <button className="p-2 bg-white text-slate-400 hover:text-emerald-600 rounded-lg shadow-sm border border-slate-100 transition-all">
                      <Upload size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentos Académicos */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Documentos Académicos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Elementar', 'Básico', 'Médio', 'Licenciatura', 'Doutoramento'].map((doc) => (
                  <div key={doc} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-emerald-500 transition-all">
                    <span className="text-sm font-bold text-slate-700">{doc}</span>
                    <button className="p-2 bg-white text-slate-400 hover:text-emerald-600 rounded-lg shadow-sm border border-slate-100 transition-all">
                      <Upload size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentos Profissionais */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Documentos Profissionais</h4>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <input type="text" placeholder="Dia" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                  <input type="text" placeholder="Mês" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                  <input type="text" placeholder="Ano" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">Título de Provimento / Despacho</span>
                  <button className="p-2 bg-white text-slate-400 hover:text-emerald-600 rounded-lg shadow-sm border border-slate-100 transition-all">
                    <Upload size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Avaliação de Desempenho */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Avaliação de Desempenho</h4>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <input type="text" placeholder="Ano da Avaliação" className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                <button className="p-2 bg-white text-slate-400 hover:text-emerald-600 rounded-lg shadow-sm border border-slate-100 transition-all">
                  <Upload size={16} />
                </button>
              </div>
            </div>

            {/* Outros Documentos */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Outros Documentos</h4>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <input type="text" placeholder="Assunto do Documento" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all uppercase tracking-widest flex items-center justify-center">
                  <Upload size={16} className="mr-2" />
                  Anexar Arquivo
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button 
                onClick={() => alert('Ficha de Cadastro gerada com sucesso! O download do PDF iniciará em instantes.')}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center hover:bg-slate-800 transition-all shadow-xl"
              >
                <FileText size={20} className="mr-2" />
                Gerar Ficha de Cadastro (PDF)
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-4 italic">
                A ficha conterá todo o histórico: Dados Pessoais (BI/NUIT/Residência), Académicos (Certificados), Profissionais (Títulos/Despachos) e Avaliações.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Stepper */}
      <div className="flex items-center justify-between px-8 py-6 bg-slate-50/50 border-b border-slate-100">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex flex-col items-center space-y-2 ${i <= currentStep ? 'text-emerald-600' : 'text-slate-300'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                i < currentStep ? 'bg-emerald-600 border-emerald-600 text-white' : 
                i === currentStep ? 'border-emerald-600 bg-white' : 'border-slate-200 bg-white'
              }`}>
                {i < currentStep ? <CheckCircle2 size={20} /> : <step.icon size={18} />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 md:w-24 h-0.5 mx-2 transition-all ${i < currentStep ? 'bg-emerald-600' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
        <button 
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all disabled:opacity-30"
        >
          <ChevronLeft size={20} className="mr-2" />
          Anterior
        </button>
        
        <div className="flex space-x-4">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-slate-400 font-bold hover:text-slate-600 transition-all"
          >
            Cancelar
          </button>
          {currentStep === steps.length - 1 ? (
            <button 
              onClick={handleFinalSave}
              className="px-10 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
            >
              Finalizar Cadastro
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex items-center px-10 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              Próximo
              <ChevronRight size={20} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
