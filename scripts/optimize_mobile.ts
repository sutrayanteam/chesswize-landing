import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace py-24 with py-16 md:py-24 for better mobile spacing
content = content.replace(/py-24/g, 'py-16 md:py-24');

// Also check for text-[36px] leading-[40px] and make it responsive: text-[28px] md:text-[36px] leading-[32px] md:leading-[40px]
content = content.replace(/text-\[36px\] leading-\[40px\]/g, 'text-[28px] md:text-[36px] leading-[32px] md:leading-[40px]');

// Check for text-5xl and make it text-4xl md:text-5xl
content = content.replace(/text-5xl/g, 'text-4xl md:text-5xl');

// Check for p-10 md:p-20 and make it p-6 md:p-12 lg:p-20
content = content.replace(/p-10 md:p-20/g, 'p-6 md:p-12 lg:p-20');

// Check for px-10 py-5 and make it px-6 md:px-10 py-4 md:py-5
content = content.replace(/px-10 py-5/g, 'px-6 md:px-10 py-4 md:py-5');

// For the hero section text: text-[40px] md:text-[60px] leading-[48px] md:leading-[64px]
// Let's see if there are any specific large texts in the hero
content = content.replace(/text-\[40px\] md:text-\[60px\] leading-\[48px\] md:leading-\[64px\]/g, 'text-[36px] sm:text-[48px] md:text-[60px] leading-[44px] sm:leading-[56px] md:leading-[64px]');

fs.writeFileSync('src/App.tsx', content);
console.log("Mobile responsiveness optimized.");
