import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Optimize subtitle sizes
content = content.replace(/text-\[20px\] leading-\[28px\]/g, 'text-[16px] md:text-[20px] leading-[24px] md:leading-[28px]');

// Optimize the large numbers in ImpactNumbers
content = content.replace(/text-4xl md:text-5xl font-black tracking-tight text-\[#1C1C1E\]/g, 'text-4xl md:text-5xl font-black tracking-tight text-[#1C1C1E]');

// Optimize the pricing section numbers
content = content.replace(/text-4xl md:text-5xl font-black tracking-tight text-\[#FF3B30\]/g, 'text-4xl md:text-5xl font-black tracking-tight text-[#FF3B30]');

fs.writeFileSync('src/App.tsx', content);
console.log("Subtitle and text sizes optimized.");
