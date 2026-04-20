import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Convert Dark Navy/Slate backgrounds to vibrant Sky Blue (#0EA5E9)
content = content.replace(/bg-\[#0F172A\]/g, 'bg-[#0EA5E9]');
content = content.replace(/bg-\[#1E293B\]/g, 'bg-[#0284C7]'); // Slightly darker sky blue for depth

// 2. Convert Gradients
content = content.replace(/from-\[#1E293B\]/g, 'from-[#0EA5E9]');
content = content.replace(/to-\[#0F172A\]/g, 'to-[#0284C7]');
content = content.replace(/hover:from-\[#0F172A\]/g, 'hover:from-[#0284C7]');
content = content.replace(/hover:to-\[#020617\]/g, 'hover:to-[#0369A1]'); // Even darker for hover state

// 3. Convert Gold/Bronze text/accents to Amber (#FBBF24)
content = content.replace(/text-\[#D4AF37\]/g, 'text-[#FBBF24]');
content = content.replace(/border-\[#D4AF37\]/g, 'border-[#FBBF24]');
content = content.replace(/hover:border-\[#D4AF37\]/g, 'hover:border-[#FBBF24]');
content = content.replace(/focus:border-\[#D4AF37\]/g, 'focus:border-[#FBBF24]');
content = content.replace(/focus:ring-\[#D4AF37\]/g, 'focus:ring-[#FBBF24]');
content = content.replace(/bg-\[#D4AF37\]\/10/g, 'bg-[#0EA5E9]/10'); // For ambient glowing orbs

// Convert the slightly different yellow left over to Amber to unify
content = content.replace(/#EAB308/g, '#FBBF24');

// 4. Button Shadows - replace dark black shadows with blue shadows for buttons
content = content.replace(/shadow-\[0_8px_0_#020617\]/g, 'shadow-[0_8px_0_#0369A1]');
content = content.replace(/shadow-\[0_8px_24px_rgba\(0,0,0,0\.06\)\]/g, 'shadow-[0_8px_24px_rgba(14,165,233,0.3)]'); // glowing blue shadow instead of flat shadow

// 5. Ambient glowing orbs background color shift in specific layout spots
content = content.replace(/bg-\[#0EA5E9\]\/5/g, 'bg-[#FBBF24]/10');

fs.writeFileSync('src/App.tsx', content);
console.log("Kid-friendly Sky Blue & Amber applied globally!");
