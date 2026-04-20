import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Soften Borders (Minimalism)
content = content.replace(/border-black\/10/g, 'border-black/5');
content = content.replace(/border-white\/10/g, 'border-white/5');

// 2. Soften Blobs (Minimalism)
content = content.replace(/blur-3xl opacity-20/g, 'blur-[120px] opacity-10');

// 3. Premium Text Gradients for main headings (Creative & Clean)
// Replace text-[#1C1C1E] on headings with a subtle gradient
content = content.replace(/text-\[#1C1C1E\]/g, 'bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]');
// Fix any places where this might break icons or non-text elements
// Actually, it's safer to target specific heading classes
content = content.replace(/text-\[28px\] md:text-\[36px\] leading-\[32px\] md:leading-\[40px\] font-medium tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-\[#1C1C1E\] to-\[#4A4A4C\]/g, 'text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-medium tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-[#1C1C1E] to-[#4A4A4C]');

// 4. Add subtle dot pattern to white backgrounds (Creative)
// We will add a class 'bg-dot-pattern' to the main white/gray sections
content = content.replace(/bg-white/g, 'bg-white bg-dot-pattern');
content = content.replace(/bg-gray-50/g, 'bg-gray-50 bg-dot-pattern');

// 5. Add Magnetic Button Component
const magneticComponent = `
function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block w-full md:w-auto"
    >
      {children}
    </motion.div>
  );
}
`;

// Insert Magnetic component before App
content = content.replace('export default function App() {', magneticComponent + '\nexport default function App() {');

// Wrap primary CTA buttons in <Magnetic>
// Find: <motion.button ... className="... bg-gradient-to-r from-[#FF3B30] to-[#D70015] ..." ...> ... </motion.button>
// We need to be careful with regex here. Let's just wrap the specific "Book Your Free Demo" buttons.
content = content.replace(
  /(<motion\.button[^>]*bg-gradient-to-r from-\[#FF3B30\] to-\[#D70015\][^>]*>[\s\S]*?<\/motion\.button>)/g,
  '<Magnetic>$1</Magnetic>'
);

// 6. Image Parallax / Scale Reveal (Creative)
// Find images and add a subtle scale animation
content = content.replace(
  /<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+className="([^"]+)"\s+referrerPolicy="no-referrer"\s*\/>/g,
  (match, src, alt, className) => {
    // Don't animate logos or small icons
    if (className.includes('h-24') || className.includes('w-full h-full object-cover')) {
      return match;
    }
    return `<motion.img initial={{ scale: 1.05, filter: "blur(4px)" }} whileInView={{ scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }} src="${src}" alt="${alt}" className="${className}" referrerPolicy="no-referrer" />`;
  }
);

fs.writeFileSync('src/App.tsx', content);

// Add dot pattern CSS
let cssContent = fs.readFileSync('src/index.css', 'utf8');
if (!cssContent.includes('.bg-dot-pattern')) {
  cssContent += `
.bg-dot-pattern {
  background-image: radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
}
.dark .bg-dot-pattern {
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}
`;
  fs.writeFileSync('src/index.css', cssContent);
}

console.log("Creative and minimal refinements applied.");
