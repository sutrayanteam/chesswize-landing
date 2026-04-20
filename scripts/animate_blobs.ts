import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /<div className="absolute top-20 left-10 w-64 h-64 bg-\[#FFCC00\] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"><\/div>/g,
  `<motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 w-64 h-64 bg-[#FFCC00] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></motion.div>`
);

content = content.replace(
  /<div className="absolute top-40 right-10 w-64 h-64 bg-\[#FF3B30\] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"><\/div>/g,
  `<motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-40 right-10 w-64 h-64 bg-[#FF3B30] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></motion.div>`
);

fs.writeFileSync('src/App.tsx', content);
console.log("Blobs animated.");
