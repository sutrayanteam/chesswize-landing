import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the icon gradients which break SVG rendering
content = content.replace(/<Phone className="w-6 h-6 bg-clip-text text-transparent bg-gradient-to-b from-\[#1C1C1E\] to-\[#4A4A4C\]" \/>/g, '<Phone className="w-6 h-6 text-[#1C1C1E]" />');
content = content.replace(/<Mail className="w-6 h-6 bg-clip-text text-transparent bg-gradient-to-b from-\[#1C1C1E\] to-\[#4A4A4C\]" \/>/g, '<Mail className="w-6 h-6 text-[#1C1C1E]" />');
content = content.replace(/<MapPin className="w-6 h-6 bg-clip-text text-transparent bg-gradient-to-b from-\[#1C1C1E\] to-\[#4A4A4C\]" \/>/g, '<MapPin className="w-6 h-6 text-[#1C1C1E]" />');

// Fix the ChevronDown gradient
content = content.replace(/<ChevronDown className=\{`w-6 h-6 shrink-0 \$\{openIndex === index \? "text-\[#FF3B30\]" : "bg-clip-text text-transparent bg-gradient-to-b from-\[#1C1C1E\] to-\[#4A4A4C\]"\}\}` \/>/g, '<ChevronDown className={`w-6 h-6 shrink-0 ${openIndex === index ? "text-[#FF3B30]" : "text-[#1C1C1E]"}`} />');

// Fix the "Most Popular" badge which has both bg-[#FFCC00] and bg-clip-text
content = content.replace(/bg-\[#FFCC00\] bg-clip-text text-transparent bg-gradient-to-b from-\[#1C1C1E\] to-\[#4A4A4C\]/g, 'bg-[#FFCC00] text-[#1C1C1E]');

// Fix the "Beginner" badge which has both bg-[#FFCC00] and bg-clip-text
content = content.replace(/className="bg-clip-text text-transparent bg-gradient-to-b from-\[#1C1C1E\] to-\[#4A4A4C\] font-bold text-xs md:text-sm rounded-full py-2 px-4 bg-\[#FFCC00\] inline-block shadow-sm border border-black\/5 dark:border-white\/5"/g, 'className="text-[#1C1C1E] font-bold text-xs md:text-sm rounded-full py-2 px-4 bg-[#FFCC00] inline-block shadow-sm border border-black/5 dark:border-white/5"');

// Fix the FAQ question text which has group-hover and bg-clip-text issues
content = content.replace(/className=\{`text-lg md:text-xl font-bold pr-4 transition-colors \$\{openIndex === index \? "text-\[#FF3B30\]" : "bg-clip-text text-transparent bg-gradient-to-b from-\[#1C1C1E\] to-\[#4A4A4C\]"\}\}`/g, 'className={`text-lg md:text-xl font-bold pr-4 transition-colors ${openIndex === index ? "text-[#FF3B30]" : "text-[#1C1C1E]"}`}');

// Fix the group-hover:text-[#FF3B30] with bg-clip-text (it won't work because text is transparent)
content = content.replace(/bg-clip-text text-transparent bg-gradient-to-b from-\[#1C1C1E\] to-\[#4A4A4C\] group-hover:text-\[#FF3B30\]/g, 'text-[#1C1C1E] group-hover:text-[#FF3B30]');

fs.writeFileSync('src/App.tsx', content);
console.log("Fixed text gradients on icons and badges.");
