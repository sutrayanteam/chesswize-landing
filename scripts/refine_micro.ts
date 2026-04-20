import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add amount: 0.2 to viewport to make animations trigger when slightly more visible
content = content.replace(/viewport=\{\{ once: true \}\}/g, 'viewport={{ once: true, amount: 0.2 }}');

// Add focus rings to inputs
content = content.replace(/focus:outline-none/g, 'focus:outline-none focus:ring-4 focus:ring-[#FF3B30]/20');

// Add group-hover:scale-110 to icons inside groups for micro-interactions
content = content.replace(/group-hover:text-white transition-colors/g, 'group-hover:text-white group-hover:scale-110 transition-all duration-300');
content = content.replace(/group-hover:text-\[#FF3B30\] transition-colors/g, 'group-hover:text-[#FF3B30] group-hover:scale-110 transition-all duration-300');

// Add subtle scale down to buttons on tap
// The buttons already have whileTap={{ scale: 0.95 }} or 0.98. Let's make sure they all have it.

fs.writeFileSync('src/App.tsx', content);
console.log("Micro refinements applied.");
