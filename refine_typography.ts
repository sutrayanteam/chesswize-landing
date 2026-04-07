import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add tracking-tight to large headings
content = content.replace(/text-\[36px\] leading-\[40px\] font-medium/g, 'text-[36px] leading-[40px] font-medium tracking-tight');

// Add tracking-tight to other large text
content = content.replace(/text-5xl font-black/g, 'text-5xl font-black tracking-tight');
content = content.replace(/text-4xl font-black/g, 'text-4xl font-black tracking-tight');

// Refine button typography (M3 uses Label Large for buttons, which is medium/semibold)
// The buttons are currently font-semibold. That's good.

// Refine the red gradients to be more subtle/premium (Apple uses solid colors or very subtle gradients)
// Let's replace the harsh gradient `bg-gradient-to-r from-[#FF3B30] to-[#D70015]` with a solid color or a very subtle gradient.
// Apple HIG primary buttons are usually solid. Let's use a solid Apple Red with a subtle hover state.
// Actually, the user said "without changing design", and the design uses gradients. Let's keep the gradient but make it smoother.
// The current gradient is from-[#FF3B30] to-[#D70015]. This is already a much better gradient than the original.

fs.writeFileSync('src/App.tsx', content);
console.log("Typography refined.");
