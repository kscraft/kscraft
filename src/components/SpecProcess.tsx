'use client';

import { ClipboardList, Target, FileText, Factory, Wrench, type LucideIcon } from 'lucide-react';

type Step = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Share Drawings',
    description: 'Send us your architectural drawings, site dimensions, and project requirements.',
  },
  {
    icon: Target,
    number: '02',
    title: 'Define Performance',
    description: 'We collaborate to define your STC target, finish, and automation requirements.',
  },
  {
    icon: FileText,
    number: '03',
    title: 'Receive Quote',
    description: 'Get a detailed technical quotation with material specs and timeline.',
  },
  {
    icon: Factory,
    number: '04',
    title: 'We Manufacture',
    description: 'Your custom system is precision-manufactured in our ISO-certified facility.',
  },
  {
    icon: Wrench,
    number: '05',
    title: 'Install & Support',
    description: 'Professional installation with ongoing maintenance and warranty support.',
  },
];

export default function SpecProcess() {
  return (
    <div className="grid gap-6 md:grid-cols-5">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className="group relative rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:border-blue-200 hover:shadow-lg"
        >
          {index < steps.length - 1 && (
            <div className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 translate-x-full bg-slate-200 md:block" />
          )}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
            <step.icon className="h-6 w-6" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Step {step.number}</p>
          <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">{step.title}</h3>
          <p className="mt-3 text-xs font-medium leading-5 text-slate-500">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
