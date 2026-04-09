import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Color Palette: Replace Red (#FF3B30 / #D70015) with Grandmaster Theme
// Primary Action background/from/to colors (Red -> Deep Slate/Navy)
content = content.replace(/bg-\[#FF3B30\]/g, 'bg-[#0F172A]');
content = content.replace(/to-\[#D70015\]/g, 'to-[#0F172A]');
content = content.replace(/from-\[#FF3B30\]/g, 'from-[#1E293B]');

// Primary Text Highlights (Red -> Premium Gold)
content = content.replace(/text-\[#FF3B30\]/g, 'text-[#D4AF37]');
content = content.replace(/border-\[#FF3B30\]/g, 'border-[#D4AF37]');
content = content.replace(/hover:border-\[#FF3B30\]/g, 'hover:border-[#D4AF37]');
content = content.replace(/focus:border-\[#FF3B30\]/g, 'focus:border-[#D4AF37]');
content = content.replace(/focus:ring-\[#FF3B30\]/g, 'focus:ring-[#D4AF37]');
content = content.replace(/shadow-\[0_8px_0_#D70015\]/g, 'shadow-[0_8px_0_#020617]');

// Secondary Yellow Accents -> Softer premium bronze/gold
content = content.replace(/#FFCC00/g, '#EAB308');

// 2. Typography: Make headings geometry styled (add font-sans is default, let's inject a custom font class logically, but simpler is tracking-tighter)
content = content.replace(/tracking-tight/g, 'tracking-tighter');

// 3. Glassmorphism: Upgrade white cards
content = content.replace(/bg-white border-2 border-gray-200/g, 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]');
content = content.replace(/bg-white bg-dot-pattern rounded-\[2rem\] p-8/g, 'bg-white/60 backdrop-blur-2xl bg-dot-pattern rounded-[2rem] p-8 border border-white/50 shadow-xl');
content = content.replace(/bg-\[\#FAFAFF\] border-2 border-\[\#F0EDFF\]/g, 'bg-white/60 backdrop-blur-xl border border-white/40');


// 4. Background meshes: Injecting ambient glow into major sections
content = content.replace(
  /<div className="w-full py-20 lg:py-32 bg-white bg-dot-pattern">/g,
  '<div className="w-full py-20 lg:py-32 bg-slate-50 relative overflow-hidden"><div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>'
);

content = content.replace(
  /<section className="py-20 lg:py-32 bg-white bg-dot-pattern font-sans">/g,
  '<section className="py-20 lg:py-32 bg-slate-50 font-sans relative overflow-hidden"><div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0F172A]/5 rounded-full blur-3xl pointer-events-none"></div>'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Enterprise color and glassmorphism applied!");
