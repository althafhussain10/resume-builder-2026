import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

// Template 1: Classic
export const ClassicTemplate = ({ data }: Props) => (
  <div className="p-8 font-serif text-[11px] leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
    <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
      <h1 className="text-2xl font-bold text-gray-900">{data.personalInfo.fullName}</h1>
      <p className="text-sm text-gray-600 mt-1">{data.personalInfo.title}</p>
      <p className="text-[10px] text-gray-500 mt-1">{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}</p>
    </div>
    {data.personalInfo.summary && <div className="mb-4"><h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Summary</h2><p>{data.personalInfo.summary}</p></div>}
    <div className="mb-4"><h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Experience</h2>{data.experience.map(e => (<div key={e.id} className="mb-3"><div className="flex justify-between"><span className="font-bold">{e.position}</span><span className="text-gray-500">{e.startDate} - {e.endDate}</span></div><p className="italic text-gray-600">{e.company}</p><p className="mt-1">{e.description}</p></div>))}</div>
    <div className="mb-4"><h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Education</h2>{data.education.map(e => (<div key={e.id} className="mb-2"><div className="flex justify-between"><span className="font-bold">{e.institution}</span><span className="text-gray-500">{e.startDate} - {e.endDate}</span></div><p>{e.degree} in {e.field}</p></div>))}</div>
    <div><h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Skills</h2><p>{data.skills.join(" • ")}</p></div>
    {data.languages?.length ? <div className="mt-3"><h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Languages</h2><p>{data.languages.join(" • ")}</p></div> : null}
    {data.certifications?.length ? <div className="mt-3"><h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Certifications</h2>{data.certifications.map(c => <p key={c.id}><span className="font-bold">{c.name}</span> — {c.issuer} ({c.date})</p>)}</div> : null}
  </div>
);

// Template 2: Modern
export const ModernTemplate = ({ data }: Props) => (
  <div className="flex text-[11px]" style={{ fontFamily: "Calibri, sans-serif" }}>
    <div className="w-1/3 bg-blue-600 text-white p-6 min-h-full">
      <h1 className="text-xl font-bold mb-1">{data.personalInfo.fullName}</h1>
      <p className="text-blue-100 text-xs mb-4">{data.personalInfo.title}</p>
      <div className="space-y-1 text-[10px] mb-6">
        <p>📧 {data.personalInfo.email}</p>
        <p>📱 {data.personalInfo.phone}</p>
        <p>📍 {data.personalInfo.location}</p>
        {data.personalInfo.linkedin && <p>🔗 {data.personalInfo.linkedin}</p>}
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-blue-400 pb-1">Skills</h3>
      <div className="flex flex-wrap gap-1 mb-4">{data.skills.map(s => <span key={s} className="bg-blue-500 px-2 py-0.5 rounded text-[9px]">{s}</span>)}</div>
      {data.languages?.length ? <><h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-blue-400 pb-1">Languages</h3><p className="text-[10px]">{data.languages.join(", ")}</p></> : null}
    </div>
    <div className="w-2/3 p-6">
      {data.personalInfo.summary && <div className="mb-4"><h2 className="text-xs font-bold uppercase text-blue-600 mb-2">Profile</h2><p className="text-gray-600">{data.personalInfo.summary}</p></div>}
      <div className="mb-4"><h2 className="text-xs font-bold uppercase text-blue-600 mb-2">Experience</h2>{data.experience.map(e => (<div key={e.id} className="mb-3 pl-3 border-l-2 border-blue-200"><p className="font-bold">{e.position}</p><p className="text-blue-600 text-[10px]">{e.company} | {e.startDate} - {e.endDate}</p><p className="mt-1 text-gray-600">{e.description}</p></div>))}</div>
      <div className="mb-4"><h2 className="text-xs font-bold uppercase text-blue-600 mb-2">Education</h2>{data.education.map(e => (<div key={e.id} className="mb-2"><p className="font-bold">{e.institution}</p><p className="text-gray-600">{e.degree} in {e.field} | {e.startDate} - {e.endDate}</p></div>))}</div>
      {data.certifications?.length ? <div><h2 className="text-xs font-bold uppercase text-blue-600 mb-2">Certifications</h2>{data.certifications.map(c => (<div key={c.id} className="mb-1"><p className="font-bold">{c.name}</p><p className="text-gray-600 text-[10px]">{c.issuer} • {c.date}</p></div>))}</div> : null}
    </div>
  </div>
);

// Template 3: Minimal
export const MinimalTemplate = ({ data }: Props) => (
  <div className="p-10 text-[11px]" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
    <h1 className="text-3xl font-light text-gray-800 mb-1">{data.personalInfo.fullName}</h1>
    <p className="text-sm text-gray-400 mb-4">{data.personalInfo.title}</p>
    <div className="flex gap-4 text-[10px] text-gray-400 mb-6">
      <span>{data.personalInfo.email}</span><span>{data.personalInfo.phone}</span><span>{data.personalInfo.location}</span>
    </div>
    {data.personalInfo.summary && <p className="text-gray-600 mb-6 leading-relaxed">{data.personalInfo.summary}</p>}
    <div className="mb-6">{data.experience.map(e => (<div key={e.id} className="mb-4 grid grid-cols-[120px_1fr] gap-4"><div className="text-[10px] text-gray-400">{e.startDate} —<br/>{e.endDate}</div><div><p className="font-medium">{e.position}</p><p className="text-gray-400 text-[10px]">{e.company}</p><p className="mt-1 text-gray-600">{e.description}</p></div></div>))}</div>
    <div className="mb-6">{data.education.map(e => (<div key={e.id} className="grid grid-cols-[120px_1fr] gap-4 mb-2"><div className="text-[10px] text-gray-400">{e.startDate} — {e.endDate}</div><div><p className="font-medium">{e.institution}</p><p className="text-gray-500">{e.degree}, {e.field}</p></div></div>))}</div>
    <div className="flex flex-wrap gap-2">{data.skills.map(s => <span key={s} className="text-[10px] text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">{s}</span>)}</div>
    {data.certifications?.length ? <div className="mt-6"><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Certifications</p>{data.certifications.map(c => <p key={c.id} className="text-gray-600">{c.name} — <span className="text-gray-400">{c.issuer}, {c.date}</span></p>)}</div> : null}
  </div>
);

// Template 4: Creative
export const CreativeTemplate = ({ data }: Props) => (
  <div className="text-[11px]" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8">
      <h1 className="text-3xl font-bold">{data.personalInfo.fullName}</h1>
      <p className="text-orange-100 text-lg mt-1">{data.personalInfo.title}</p>
      <div className="flex gap-4 mt-3 text-[10px] text-orange-100">
        <span>{data.personalInfo.email}</span><span>{data.personalInfo.phone}</span><span>{data.personalInfo.location}</span>
      </div>
    </div>
    <div className="p-8">
      {data.personalInfo.summary && <div className="bg-orange-50 p-4 rounded-lg mb-6 border-l-4 border-orange-500"><p className="text-gray-700">{data.personalInfo.summary}</p></div>}
      <div className="grid grid-cols-[1fr_200px] gap-8">
        <div>
          <h2 className="text-sm font-bold text-orange-600 mb-3">💼 Experience</h2>
          {data.experience.map(e => (<div key={e.id} className="mb-4 relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-orange-200"><p className="font-bold">{e.position}</p><p className="text-orange-500 text-[10px]">{e.company} • {e.startDate} - {e.endDate}</p><p className="mt-1 text-gray-600">{e.description}</p></div>))}
          <h2 className="text-sm font-bold text-orange-600 mb-3 mt-6">🎓 Education</h2>
          {data.education.map(e => (<div key={e.id} className="mb-2"><p className="font-bold">{e.institution}</p><p className="text-gray-500">{e.degree} in {e.field} ({e.startDate}-{e.endDate})</p></div>))}
        </div>
        <div>
          <h2 className="text-sm font-bold text-orange-600 mb-3">🛠 Skills</h2>
          <div className="space-y-1">{data.skills.map(s => <div key={s} className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-[10px]">{s}</div>)}</div>
          {data.languages?.length ? <><h2 className="text-sm font-bold text-orange-600 mb-2 mt-4">🌍 Languages</h2>{data.languages.map(l => <p key={l} className="text-[10px]">{l}</p>)}</> : null}
          {data.certifications?.length ? <><h2 className="text-sm font-bold text-orange-600 mb-2 mt-4">📜 Certifications</h2>{data.certifications.map(c => <div key={c.id} className="mb-1"><p className="font-bold text-[10px]">{c.name}</p><p className="text-[9px] text-gray-500">{c.issuer} • {c.date}</p></div>)}</> : null}
        </div>
      </div>
    </div>
  </div>
);

// Template 5: Professional
export const ProfessionalTemplate = ({ data }: Props) => (
  <div className="p-8 text-[11px]" style={{ fontFamily: "Cambria, serif" }}>
    <div className="border-b-4 border-blue-900 pb-4 mb-6">
      <h1 className="text-2xl font-bold text-blue-900">{data.personalInfo.fullName}</h1>
      <p className="text-blue-700 mt-1">{data.personalInfo.title}</p>
      <div className="flex gap-6 mt-2 text-[10px] text-gray-500">
        <span>{data.personalInfo.email}</span><span>{data.personalInfo.phone}</span><span>{data.personalInfo.location}</span>
        {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
      </div>
    </div>
    {data.personalInfo.summary && <div className="mb-6 bg-blue-50 p-4 rounded"><p>{data.personalInfo.summary}</p></div>}
    <div className="mb-6"><h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3 flex items-center gap-2"><span className="w-6 h-0.5 bg-blue-900"></span>Professional Experience</h2>{data.experience.map(e => (<div key={e.id} className="mb-4"><div className="flex justify-between items-baseline"><span className="font-bold text-blue-900">{e.position}</span><span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{e.startDate} - {e.endDate}</span></div><p className="text-blue-600 text-[10px]">{e.company}</p><p className="mt-1 text-gray-600">{e.description}</p></div>))}</div>
    <div className="grid grid-cols-2 gap-8">
      <div><h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3 flex items-center gap-2"><span className="w-6 h-0.5 bg-blue-900"></span>Education</h2>{data.education.map(e => (<div key={e.id} className="mb-2"><p className="font-bold">{e.institution}</p><p className="text-gray-500">{e.degree} in {e.field}</p><p className="text-[10px] text-gray-400">{e.startDate} - {e.endDate}</p></div>))}</div>
      <div><h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3 flex items-center gap-2"><span className="w-6 h-0.5 bg-blue-900"></span>Skills</h2><div className="flex flex-wrap gap-1">{data.skills.map(s => <span key={s} className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-[10px] border border-blue-200">{s}</span>)}</div></div>
    </div>
    {data.certifications?.length ? <div className="mt-6"><h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3 flex items-center gap-2"><span className="w-6 h-0.5 bg-blue-900"></span>Certifications</h2>{data.certifications.map(c => <div key={c.id} className="mb-2"><div className="flex justify-between"><span className="font-bold text-blue-900">{c.name}</span><span className="text-[10px] text-blue-600">{c.date}</span></div><p className="text-blue-600 text-[10px]">{c.issuer}</p></div>)}</div> : null}
  </div>
);

// Template 6: Elegant
export const ElegantTemplate = ({ data }: Props) => (
  <div className="p-10 text-[11px]" style={{ fontFamily: "Garamond, serif" }}>
    <div className="text-center mb-8">
      <h1 className="text-3xl tracking-widest uppercase text-gray-800 font-light">{data.personalInfo.fullName}</h1>
      <div className="w-16 h-px bg-rose-400 mx-auto my-3"></div>
      <p className="text-rose-600 tracking-wider uppercase text-xs">{data.personalInfo.title}</p>
      <p className="text-[10px] text-gray-400 mt-2">{data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}</p>
    </div>
    {data.personalInfo.summary && <p className="text-center text-gray-500 italic mb-8 max-w-md mx-auto">{data.personalInfo.summary}</p>}
    <div className="mb-6"><h2 className="text-center text-xs uppercase tracking-[0.3em] text-rose-600 mb-4">Experience</h2>{data.experience.map(e => (<div key={e.id} className="mb-4 text-center"><p className="font-semibold text-gray-800">{e.position}</p><p className="text-rose-500 text-[10px]">{e.company}</p><p className="text-[10px] text-gray-400">{e.startDate} — {e.endDate}</p><p className="mt-1 text-gray-600 max-w-md mx-auto">{e.description}</p></div>))}</div>
    <div className="mb-6"><h2 className="text-center text-xs uppercase tracking-[0.3em] text-rose-600 mb-4">Education</h2>{data.education.map(e => (<div key={e.id} className="text-center mb-2"><p className="font-semibold">{e.institution}</p><p className="text-gray-500">{e.degree} in {e.field} ({e.startDate}–{e.endDate})</p></div>))}</div>
    <div className="text-center"><h2 className="text-xs uppercase tracking-[0.3em] text-rose-600 mb-3">Skills</h2><p className="text-gray-600">{data.skills.join(" · ")}</p></div>
    {data.certifications?.length ? <div className="text-center mt-6"><h2 className="text-xs uppercase tracking-[0.3em] text-rose-600 mb-3">Certifications</h2>{data.certifications.map(c => <p key={c.id} className="text-gray-600">{c.name} — <span className="text-rose-500">{c.issuer}</span> ({c.date})</p>)}</div> : null}
  </div>
);

// Template 7: Bold
export const BoldTemplate = ({ data }: Props) => (
  <div className="text-[11px]" style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>
    <div className="bg-black text-white p-8">
      <h1 className="text-4xl font-black uppercase">{data.personalInfo.fullName}</h1>
      <p className="text-yellow-400 text-lg uppercase mt-1 font-bold">{data.personalInfo.title}</p>
      <div className="flex gap-4 mt-3 text-[10px] text-gray-300">
        <span>{data.personalInfo.email}</span><span>{data.personalInfo.phone}</span><span>{data.personalInfo.location}</span>
      </div>
    </div>
    <div className="p-8">
      {data.personalInfo.summary && <p className="text-gray-600 mb-6 border-l-4 border-yellow-400 pl-4" style={{ fontFamily: "Arial, sans-serif" }}>{data.personalInfo.summary}</p>}
      <div className="mb-6"><h2 className="text-lg font-black uppercase mb-3">Experience</h2>{data.experience.map(e => (<div key={e.id} className="mb-4"><div className="bg-gray-100 p-3 rounded"><p className="font-black uppercase">{e.position}</p><p className="text-yellow-600 text-[10px] font-bold">{e.company} | {e.startDate} - {e.endDate}</p></div><p className="mt-2 text-gray-600 pl-3" style={{ fontFamily: "Arial, sans-serif" }}>{e.description}</p></div>))}</div>
      <div className="grid grid-cols-2 gap-6">
        <div><h2 className="text-lg font-black uppercase mb-3">Education</h2>{data.education.map(e => (<div key={e.id} className="mb-2"><p className="font-bold">{e.institution}</p><p className="text-gray-500 text-[10px]" style={{ fontFamily: "Arial, sans-serif" }}>{e.degree} in {e.field}</p></div>))}</div>
        <div><h2 className="text-lg font-black uppercase mb-3">Skills</h2><div className="flex flex-wrap gap-1">{data.skills.map(s => <span key={s} className="bg-black text-white px-2 py-1 rounded text-[9px] font-bold uppercase">{s}</span>)}</div></div>
      </div>
      {data.certifications?.length ? <div className="mt-6"><h2 className="text-lg font-black uppercase mb-3">Certifications</h2>{data.certifications.map(c => <div key={c.id} className="mb-2 bg-yellow-50 border-l-4 border-yellow-400 p-2"><p className="font-black uppercase text-[10px]">{c.name}</p><p className="text-gray-600 text-[10px]" style={{ fontFamily: "Arial, sans-serif" }}>{c.issuer} | {c.date}</p></div>)}</div> : null}
    </div>
  </div>
);

// Template 8: Tech
export const TechTemplate = ({ data }: Props) => (
  <div className="text-[11px] bg-slate-900 text-slate-200 min-h-full" style={{ fontFamily: "Consolas, monospace" }}>
    <div className="p-8">
      <div className="mb-6">
        <p className="text-indigo-400 text-[10px]">{"// "}{data.personalInfo.title}</p>
        <h1 className="text-2xl font-bold text-white">{"<"}{data.personalInfo.fullName}{" />"}</h1>
        <div className="flex gap-3 mt-2 text-[10px] text-slate-400">
          <span className="text-green-400">{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>
      {data.personalInfo.summary && <div className="mb-6 bg-slate-800 p-4 rounded-lg border border-slate-700"><p className="text-slate-300">{data.personalInfo.summary}</p></div>}
      <div className="mb-6"><h2 className="text-indigo-400 font-bold mb-3">{"## "}Experience</h2>{data.experience.map(e => (<div key={e.id} className="mb-4 pl-4 border-l border-indigo-500/30"><p className="text-white font-bold">{e.position}</p><p className="text-green-400 text-[10px]">{e.company} <span className="text-slate-500">({e.startDate} - {e.endDate})</span></p><p className="mt-1 text-slate-400">{e.description}</p></div>))}</div>
      <div className="grid grid-cols-2 gap-6">
        <div><h2 className="text-indigo-400 font-bold mb-3">{"## "}Education</h2>{data.education.map(e => (<div key={e.id} className="mb-2"><p className="text-white">{e.institution}</p><p className="text-slate-400 text-[10px]">{e.degree} in {e.field}</p></div>))}</div>
        <div><h2 className="text-indigo-400 font-bold mb-3">{"## "}Tech Stack</h2><div className="flex flex-wrap gap-1">{data.skills.map(s => <span key={s} className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[10px] border border-indigo-500/30">{s}</span>)}</div></div>
      </div>
      {data.certifications?.length ? <div className="mt-6"><h2 className="text-indigo-400 font-bold mb-3">{"## "}Certifications</h2>{data.certifications.map(c => <div key={c.id} className="mb-2 pl-4 border-l border-green-500/30"><p className="text-white text-[10px]">{c.name}</p><p className="text-green-400 text-[10px]">{c.issuer} <span className="text-slate-500">({c.date})</span></p></div>)}</div> : null}
    </div>
  </div>
);

// Template 9: Executive
export const ExecutiveTemplate = ({ data }: Props) => (
  <div className="p-8 text-[11px]" style={{ fontFamily: "Palatino, serif" }}>
    <div className="flex items-end justify-between border-b-2 border-emerald-800 pb-4 mb-6">
      <div><h1 className="text-2xl font-bold text-emerald-900">{data.personalInfo.fullName}</h1><p className="text-emerald-700 mt-1">{data.personalInfo.title}</p></div>
      <div className="text-right text-[10px] text-gray-500"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p></div>
    </div>
    {data.personalInfo.summary && <div className="mb-6 italic text-gray-600 border-l-4 border-emerald-200 pl-4">{data.personalInfo.summary}</div>}
    <div className="mb-6"><h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded mb-3">Career History</h2>{data.experience.map(e => (<div key={e.id} className="mb-4"><div className="flex justify-between"><span className="font-bold text-emerald-900">{e.position} — {e.company}</span><span className="text-[10px] text-emerald-600">{e.startDate} – {e.endDate}</span></div><p className="mt-1 text-gray-600">{e.description}</p></div>))}</div>
    <div className="grid grid-cols-2 gap-8">
      <div><h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded mb-3">Education</h2>{data.education.map(e => (<div key={e.id} className="mb-2"><p className="font-bold">{e.institution}</p><p className="text-gray-500">{e.degree}, {e.field} ({e.startDate}–{e.endDate})</p></div>))}</div>
      <div><h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded mb-3">Core Competencies</h2><div className="grid grid-cols-2 gap-1">{data.skills.map(s => <span key={s} className="text-[10px] text-emerald-700">✦ {s}</span>)}</div></div>
    </div>
    {data.certifications?.length ? <div className="mt-6"><h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded mb-3">Certifications</h2>{data.certifications.map(c => <div key={c.id} className="mb-2"><div className="flex justify-between"><span className="font-bold text-emerald-900">{c.name} — {c.issuer}</span><span className="text-[10px] text-emerald-600">{c.date}</span></div></div>)}</div> : null}
  </div>
);

// Template 10: Compact
export const CompactTemplate = ({ data }: Props) => (
  <div className="p-6 text-[10px]" style={{ fontFamily: "Verdana, sans-serif" }}>
    <div className="bg-red-900 text-white p-4 rounded-lg mb-4 flex justify-between items-center">
      <div><h1 className="text-lg font-bold">{data.personalInfo.fullName}</h1><p className="text-red-200 text-[10px]">{data.personalInfo.title}</p></div>
      <div className="text-right text-[9px] text-red-200"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p><p>{data.personalInfo.location}</p></div>
    </div>
    {data.personalInfo.summary && <p className="text-gray-600 mb-3 text-[10px]">{data.personalInfo.summary}</p>}
    <div className="grid grid-cols-[1fr_180px] gap-4">
      <div>
        <h2 className="text-[10px] font-bold uppercase text-red-800 mb-2 border-b border-red-200 pb-1">Experience</h2>
        {data.experience.map(e => (<div key={e.id} className="mb-3"><p className="font-bold text-[10px]">{e.position} <span className="font-normal text-gray-400">@ {e.company}</span></p><p className="text-[9px] text-red-600">{e.startDate} - {e.endDate}</p><p className="text-gray-600 mt-0.5">{e.description}</p></div>))}
        <h2 className="text-[10px] font-bold uppercase text-red-800 mb-2 border-b border-red-200 pb-1 mt-3">Education</h2>
        {data.education.map(e => (<div key={e.id} className="mb-1"><p className="font-bold">{e.institution}</p><p className="text-gray-500">{e.degree} in {e.field} ({e.startDate}-{e.endDate})</p></div>))}
      </div>
      <div>
        <h2 className="text-[10px] font-bold uppercase text-red-800 mb-2 border-b border-red-200 pb-1">Skills</h2>
        <div className="space-y-0.5">{data.skills.map(s => <p key={s} className="text-[9px]">▸ {s}</p>)}</div>
        {data.languages?.length ? <><h2 className="text-[10px] font-bold uppercase text-red-800 mb-2 border-b border-red-200 pb-1 mt-3">Languages</h2>{data.languages.map(l => <p key={l} className="text-[9px]">▸ {l}</p>)}</> : null}
        {data.certifications?.length ? <><h2 className="text-[10px] font-bold uppercase text-red-800 mb-2 border-b border-red-200 pb-1 mt-3">Certifications</h2>{data.certifications.map(c => <div key={c.id} className="mb-1"><p className="text-[9px] font-bold">{c.name}</p><p className="text-[9px] text-gray-500">{c.issuer} • {c.date}</p></div>)}</> : null}
      </div>
    </div>
  </div>
);