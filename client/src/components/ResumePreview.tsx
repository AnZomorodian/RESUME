import React, { forwardRef } from "react";
import { CreateResumeRequest } from "@shared/schema";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface ResumePreviewProps {
  data: CreateResumeRequest;
}

// Map of the 10 styles and their distinct Tailwind classes
const STYLE_MAP: Record<string, {
  wrapper: string;
  header: string;
  name: string;
  contact: string;
  section: string;
  sectionTitle: string;
  itemTitle: string;
  itemSubtitle: string;
  itemDate: string;
  bodyText: string;
  skillPill: string;
}> = {
  minimal: {
    wrapper: "font-['Inter'] text-neutral-800 bg-white leading-relaxed",
    header: "mb-8",
    name: "text-4xl font-light tracking-tight mb-2 text-neutral-900",
    contact: "flex flex-wrap gap-4 text-sm text-neutral-500",
    section: "mb-6",
    sectionTitle: "text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4 pb-2 border-b border-neutral-100",
    itemTitle: "font-medium text-neutral-900",
    itemSubtitle: "text-sm text-neutral-600",
    itemDate: "text-xs text-neutral-400",
    bodyText: "text-sm text-neutral-600 mt-2",
    skillPill: "text-sm text-neutral-600 border border-neutral-200 px-3 py-1 rounded-full",
  },
  modern: {
    wrapper: "font-['DM_Sans'] text-slate-800 bg-white",
    header: "mb-8 flex flex-col items-center text-center",
    name: "text-5xl font-bold tracking-tighter text-indigo-600 mb-3",
    contact: "flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500",
    section: "mb-8",
    sectionTitle: "text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2 after:content-[''] after:h-px after:flex-1 after:bg-indigo-100",
    itemTitle: "font-bold text-slate-900 text-lg",
    itemSubtitle: "text-base text-indigo-500 font-medium",
    itemDate: "text-sm font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded",
    bodyText: "text-sm text-slate-600 mt-2",
    skillPill: "text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg",
  },
  classic: {
    wrapper: "font-['Merriweather'] text-gray-900 bg-white",
    header: "mb-8 text-center border-b-2 border-gray-900 pb-6",
    name: "text-4xl font-bold mb-3",
    contact: "flex flex-wrap justify-center gap-3 text-sm text-gray-600",
    section: "mb-6",
    sectionTitle: "text-lg font-bold uppercase text-center mb-4 tracking-wider",
    itemTitle: "font-bold text-gray-900",
    itemSubtitle: "text-sm font-style: italic text-gray-700",
    itemDate: "text-sm text-gray-600",
    bodyText: "text-sm leading-relaxed text-gray-800 mt-2",
    skillPill: "text-sm text-gray-800 border-b border-gray-300 px-1",
  },
  creative: {
    wrapper: "font-['Space_Grotesk'] text-zinc-800 bg-[#fafafa]",
    header: "mb-10 bg-zinc-900 text-white p-8 -mx-8 -mt-8 rounded-b-[2rem]",
    name: "text-5xl font-black mb-4 text-emerald-400",
    contact: "flex flex-wrap gap-5 text-sm text-zinc-300 font-medium",
    section: "mb-8",
    sectionTitle: "text-2xl font-bold text-zinc-900 mb-6 flex items-end gap-2",
    itemTitle: "text-xl font-bold text-zinc-900",
    itemSubtitle: "text-base font-semibold text-emerald-600",
    itemDate: "text-sm font-medium text-zinc-400",
    bodyText: "text-sm text-zinc-600 mt-3 leading-relaxed",
    skillPill: "text-sm font-bold text-zinc-800 bg-emerald-100 px-4 py-1.5 rounded-xl shadow-sm",
  },
  professional: {
    wrapper: "font-['Roboto'] text-gray-800 bg-white",
    header: "mb-6 border-b-4 border-blue-800 pb-4",
    name: "text-4xl font-black text-blue-900 mb-2 uppercase tracking-wide",
    contact: "flex flex-wrap gap-4 text-sm font-medium text-gray-600",
    section: "mb-6",
    sectionTitle: "text-lg font-bold text-blue-800 uppercase border-b border-gray-300 pb-1 mb-4",
    itemTitle: "font-bold text-gray-900",
    itemSubtitle: "text-sm font-bold text-gray-700",
    itemDate: "text-sm font-medium text-blue-800",
    bodyText: "text-sm text-gray-700 mt-1",
    skillPill: "text-sm font-medium text-white bg-blue-800 px-2 py-1 rounded-sm",
  },
  elegant: {
    wrapper: "font-['Playfair_Display'] text-stone-800 bg-[#fdfbf7]",
    header: "mb-10 text-center",
    name: "text-5xl font-normal mb-4 text-stone-900 tracking-wide",
    contact: "flex flex-wrap justify-center gap-6 text-sm text-stone-500 font-['Inter'] font-light uppercase tracking-widest",
    section: "mb-8",
    sectionTitle: "text-xl font-normal text-stone-900 mb-6 text-center italic before:content-['~'] after:content-['~'] before:mr-4 after:ml-4 before:text-stone-300 after:text-stone-300",
    itemTitle: "text-lg font-semibold text-stone-900",
    itemSubtitle: "text-sm text-stone-600 font-['Inter']",
    itemDate: "text-xs text-stone-400 font-['Inter'] tracking-widest uppercase",
    bodyText: "text-sm text-stone-600 mt-3 font-['Inter'] font-light leading-relaxed",
    skillPill: "text-xs font-['Inter'] tracking-widest uppercase text-stone-500 border border-stone-200 px-3 py-1",
  },
  bold: {
    wrapper: "font-['Outfit'] text-black bg-white",
    header: "mb-8 border-l-8 border-red-500 pl-6",
    name: "text-6xl font-black uppercase tracking-tighter leading-none mb-4",
    contact: "flex flex-wrap gap-4 text-sm font-semibold text-gray-500 uppercase",
    section: "mb-8",
    sectionTitle: "text-2xl font-black uppercase tracking-tighter mb-4 bg-black text-white inline-block px-3 py-1",
    itemTitle: "text-xl font-bold uppercase",
    itemSubtitle: "text-base font-bold text-red-500",
    itemDate: "text-sm font-bold text-gray-400",
    bodyText: "text-base font-medium text-gray-700 mt-2",
    skillPill: "text-sm font-bold uppercase border-2 border-black px-2 py-0.5",
  },
  clean: {
    wrapper: "font-['Inter'] text-gray-800 bg-white",
    header: "mb-10 flex justify-between items-end",
    name: "text-4xl font-semibold text-gray-900 tracking-tight",
    contact: "flex flex-col items-end gap-1 text-sm text-gray-500",
    section: "mb-8 flex gap-8",
    sectionTitle: "text-sm font-semibold uppercase tracking-widest text-gray-400 w-32 shrink-0 pt-1",
    itemTitle: "font-semibold text-gray-900",
    itemSubtitle: "text-sm text-gray-600",
    itemDate: "text-sm text-gray-400 font-medium whitespace-nowrap",
    bodyText: "text-sm text-gray-600 mt-2",
    skillPill: "text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-md",
  },
  tech: {
    wrapper: "font-['Inter'] text-slate-300 bg-[#0f172a]",
    header: "mb-8 border-b border-slate-700 pb-6",
    name: "font-['Fira_Code'] text-4xl font-bold text-cyan-400 mb-3 before:content-['>_'] before:mr-2",
    contact: "font-['Fira_Code'] flex flex-wrap gap-6 text-xs text-slate-400",
    section: "mb-8",
    sectionTitle: "font-['Fira_Code'] text-lg font-semibold text-purple-400 mb-4 before:content-['const_'] after:content-['_:']",
    itemTitle: "text-lg font-bold text-slate-100",
    itemSubtitle: "text-sm text-cyan-400",
    itemDate: "font-['Fira_Code'] text-xs text-slate-500",
    bodyText: "text-sm text-slate-400 mt-2",
    skillPill: "font-['Fira_Code'] text-xs text-cyan-300 border border-cyan-800 bg-cyan-950/30 px-2 py-1 rounded",
  },
  executive: {
    wrapper: "font-['Lora'] text-slate-900 bg-white",
    header: "mb-8 flex flex-col items-center",
    name: "text-4xl font-semibold text-slate-900 mb-2 uppercase tracking-widest",
    contact: "flex flex-wrap justify-center gap-4 text-sm text-slate-600",
    section: "mb-6",
    sectionTitle: "text-base font-semibold text-slate-900 uppercase tracking-widest text-center border-y border-slate-300 py-2 mb-6",
    itemTitle: "text-lg font-bold text-slate-900",
    itemSubtitle: "text-base italic text-slate-700",
    itemDate: "text-sm font-medium text-slate-500 uppercase",
    bodyText: "text-sm text-slate-700 mt-2 leading-relaxed",
    skillPill: "text-sm text-slate-700 px-2 border-r border-slate-300 last:border-0",
  },
  vintage: {
    wrapper: "font-['Libre_Baskerville'] text-[#4a3b32] bg-[#f4ebd0]",
    header: "mb-8 border-b border-[#8b7355] pb-6",
    name: "text-4xl font-bold mb-3 text-[#2d241e]",
    contact: "flex flex-wrap gap-4 text-sm text-[#5c4a3d]",
    section: "mb-8",
    sectionTitle: "text-lg font-bold text-[#8b7355] mb-4 uppercase tracking-widest",
    itemTitle: "font-bold text-[#2d241e] text-lg",
    itemSubtitle: "text-base italic text-[#5c4a3d]",
    itemDate: "text-sm text-[#8b7355]",
    bodyText: "text-sm text-[#4a3b32] mt-2",
    skillPill: "text-sm text-[#2d241e] border border-[#8b7355] px-3 py-1 rounded-sm",
  },
  playful: {
    wrapper: "font-['Nunito'] text-gray-800 bg-[#fff5f5]",
    header: "mb-8 bg-yellow-300 p-6 rounded-3xl transform -rotate-1",
    name: "text-5xl font-black text-purple-600 mb-2",
    contact: "flex flex-wrap gap-4 text-sm font-bold text-pink-600",
    section: "mb-8 bg-white p-6 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black",
    sectionTitle: "text-xl font-black text-blue-500 mb-4 uppercase tracking-wider",
    itemTitle: "font-black text-gray-900 text-lg",
    itemSubtitle: "text-base font-bold text-pink-500",
    itemDate: "text-sm font-bold bg-green-200 px-2 py-1 rounded-md",
    bodyText: "text-sm text-gray-700 mt-2 font-medium",
    skillPill: "text-sm font-bold text-white bg-purple-500 px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
  },
  corporate: {
    wrapper: "font-['Open_Sans'] text-gray-800 bg-white",
    header: "mb-8 flex justify-between items-center border-b-2 border-slate-800 pb-6",
    name: "text-4xl font-bold text-slate-900",
    contact: "flex flex-col gap-1 text-sm text-slate-600 text-right",
    section: "mb-6",
    sectionTitle: "text-lg font-bold text-slate-800 uppercase bg-slate-100 px-3 py-1 mb-4",
    itemTitle: "font-bold text-slate-900",
    itemSubtitle: "text-sm font-semibold text-slate-700",
    itemDate: "text-sm text-slate-500 font-medium",
    bodyText: "text-sm text-gray-700 mt-2",
    skillPill: "text-sm text-slate-700 border-l-2 border-slate-400 pl-2 mr-4",
  },
  startup: {
    wrapper: "font-['Plus_Jakarta_Sans'] text-slate-800 bg-white",
    header: "mb-8 flex flex-col gap-2",
    name: "text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 mb-2",
    contact: "flex flex-wrap gap-4 text-sm font-medium text-slate-500",
    section: "mb-8 relative pl-6 border-l-2 border-rose-100",
    sectionTitle: "text-xl font-bold text-slate-900 mb-6 relative before:absolute before:-left-[1.65rem] before:top-1.5 before:w-3 before:h-3 before:bg-rose-500 before:rounded-full",
    itemTitle: "font-bold text-slate-900 text-lg",
    itemSubtitle: "text-base font-semibold text-orange-500",
    itemDate: "text-sm font-medium text-slate-400",
    bodyText: "text-sm text-slate-600 mt-2 leading-relaxed",
    skillPill: "text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl",
  },
  academic: {
    wrapper: "font-['Source_Serif_4'] text-gray-900 bg-white leading-loose",
    header: "mb-10 text-center",
    name: "text-3xl font-bold mb-4",
    contact: "flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm",
    section: "mb-8",
    sectionTitle: "text-lg font-bold uppercase tracking-widest text-center border-b border-gray-400 mb-4 pb-2 mx-12",
    itemTitle: "font-bold text-gray-900",
    itemSubtitle: "italic text-gray-800",
    itemDate: "text-sm text-gray-700 float-right",
    bodyText: "text-sm text-gray-800 mt-1",
    skillPill: "text-sm text-gray-800 px-2",
  }
};

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data }, ref) => {
    const style = STYLE_MAP[data.style || "minimal"];
    const isClean = data.style === "clean";
    const language = data.language || "English";

    return (
      <div 
        ref={ref} 
        className={`print-exact w-[210mm] min-h-[297mm] p-[15mm] mx-auto shadow-2xl ring-1 ring-black/5 flex flex-col ${style.wrapper}`}
        style={{ height: '297mm', overflow: 'hidden' }}
      >
        <header className={style.header}>
          <div className={isClean ? "" : "w-full"}>
            <h1 className={style.name}>{data.personalInfo.fullName || "Your Name"}</h1>
            <div className="flex items-center gap-2">
              {language && <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{language}</div>}
            </div>
            {!isClean && data.personalInfo.fullName && <div className="h-2"></div>}
          </div>
          
          <div className={style.contact}>
            {data.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> {data.personalInfo.website}
              </div>
            )}
          </div>
        </header>

        {data.summary && (
          <section className={style.section}>
            {isClean ? (
              <>
                <h2 className={style.sectionTitle}>Summary</h2>
                <div className="flex-1">
                  <p className={style.bodyText}>{data.summary}</p>
                </div>
              </>
            ) : (
              <>
                <h2 className={style.sectionTitle}>Professional Summary</h2>
                <p className={style.bodyText}>{data.summary}</p>
              </>
            )}
          </section>
        )}

        {data.experience.length > 0 && (
          <section className={style.section}>
            {isClean ? <h2 className={style.sectionTitle}>Experience</h2> : <h2 className={style.sectionTitle}>Experience</h2>}
            <div className={isClean ? "flex-1 flex flex-col gap-6" : "flex flex-col gap-5 w-full"}>
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h3 className={style.itemTitle}>{exp.position}</h3>
                      <div className={style.itemSubtitle}>{exp.company}</div>
                    </div>
                    <div className={style.itemDate}>
                      {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ""}
                    </div>
                  </div>
                  <p className={`${style.bodyText} whitespace-pre-line`}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className={style.section}>
            {isClean ? <h2 className={style.sectionTitle}>Education</h2> : <h2 className={style.sectionTitle}>Education</h2>}
            <div className={isClean ? "flex-1 flex flex-col gap-5" : "flex flex-col gap-4 w-full"}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h3 className={style.itemTitle}>{edu.degree}</h3>
                      <div className={style.itemSubtitle}>{edu.institution}</div>
                    </div>
                    <div className={style.itemDate}>
                      {edu.startDate} {edu.endDate ? `— ${edu.endDate}` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className={style.section}>
            {isClean ? <h2 className={style.sectionTitle}>Projects</h2> : <h2 className={style.sectionTitle}>Projects</h2>}
            <div className={isClean ? "flex-1 flex flex-col gap-5" : "flex flex-col gap-4 w-full"}>
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={style.itemTitle}>{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} className="text-xs text-blue-500 hover:underline">Link ↗</a>
                    )}
                  </div>
                  <p className={style.bodyText}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className={style.section}>
            {isClean ? <h2 className={style.sectionTitle}>Skills</h2> : <h2 className={style.sectionTitle}>Skills</h2>}
            <div className={isClean ? "flex-1" : "w-full"}>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className={style.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {(data.hobbies && data.hobbies.length > 0) && (
          <section className={style.section}>
            {isClean ? <h2 className={style.sectionTitle}>Hobbies</h2> : <h2 className={style.sectionTitle}>Hobbies</h2>}
            <div className={isClean ? "flex-1" : "w-full"}>
              <div className="flex flex-wrap gap-2">
                {data.hobbies.map((hobby, index) => (
                  <span key={index} className={style.skillPill}>
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";
