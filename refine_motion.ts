import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace fadeInUp
content = content.replace(
  /const fadeInUp = \{[\s\S]*?\};/,
  `const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
  },
};`
);

// Replace staggerContainer
content = content.replace(
  /const staggerContainer = \{[\s\S]*?\};/,
  `const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};`
);

fs.writeFileSync('src/App.tsx', content);
console.log("Motion variants refined.");
