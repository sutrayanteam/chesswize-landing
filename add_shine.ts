import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add a shine effect to primary buttons
const shineEffect = `relative overflow-hidden group`;
const shineSpan = `<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></span>`;

// Let's just add the shine animation to tailwind config via index.css
let cssContent = fs.readFileSync('src/index.css', 'utf8');
if (!cssContent.includes('keyframes shine')) {
  cssContent += `
@theme {
  --animate-shine: shine 1.5s ease-in-out infinite;
  @keyframes shine {
    100% { transform: translateX(100%); }
  }
}
`;
  fs.writeFileSync('src/index.css', cssContent);
}

// Now let's inject the shine span into the primary CTA buttons.
// We'll look for buttons with bg-gradient-to-r from-[#FF3B30]
content = content.replace(/(<motion\.button[^>]*bg-gradient-to-r from-\[#FF3B30\][^>]*>)/g, '$1\n              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></span>');

// Make sure those buttons have 'relative overflow-hidden'
content = content.replace(/(className="[^"]*bg-gradient-to-r from-\[#FF3B30\][^"]*")/g, (match) => {
  if (!match.includes('relative')) {
    return match.replace('className="', 'className="relative overflow-hidden ');
  }
  return match;
});

fs.writeFileSync('src/App.tsx', content);
console.log("Shine effect added.");
