import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace any leftover Primary Red (#FF3B30) with current Sky Blue (#0EA5E9)
content = content.replace(/#FF3B30/g, '#0EA5E9');

// Replace any leftover Dark Red (#D70015) with Darker Sky Blue (#0284C7)
content = content.replace(/#D70015/g, '#0284C7');

fs.writeFileSync('src/App.tsx', content);
console.log("Stray reds removed and replaced with current blue!");
