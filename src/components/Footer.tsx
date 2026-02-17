import { useState, useEffect, useRef } from 'react';
import { Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  activeSection: string;
  onMouseEnterFooter: () => void;
  onMouseLeaveFooter: () => void;
}

export default function Footer({ activeSection, onMouseEnterFooter, onMouseLeaveFooter }: FooterProps) {
  const icons = ['⊹', '₊', '⟡', '⋆', '.˚'];
  const [trail, setTrail] = useState<
    { x: number; y: number; key: number; icon: string }[]
  >([]);
  const iconSeq = useRef(0); // Sequence tracker
  const footerRef = useRef<HTMLElement>(null); // Add ref for footer section
  const maxTrailLength = 10;
  const trailInterval = 12;

  useEffect(() => {
    if (activeSection !== 'Footer') return;
    let lastX = 0, lastY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const isWithinFooter = (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
        
        // if (!isWithinFooter) {
        //   return; 
        // }
      }

      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < trailInterval) return;
      lastX = e.clientX;
      lastY = e.clientY;

      setTrail((prev) => [
        ...prev.slice(-maxTrailLength + 1),
        {
          x: e.clientX,
          y: e.clientY,
          key: Date.now() + Math.random(),
          icon: icons[iconSeq.current % icons.length],
        },
      ]);
      iconSeq.current++;
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [activeSection, icons]);

  useEffect(() => {
    if (activeSection !== 'Footer') {
      setTrail([]);
    }

  }, [activeSection]);

  // Fade oldest trail icon out
  useEffect(() => {
    const fade = setInterval(() => {
      setTrail((prev) => prev.length > 0 ? prev.slice(1) : []);
    }, 55);
    return () => clearInterval(fade);
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-card" 
      onMouseEnter={onMouseEnterFooter} 
      onMouseLeave={onMouseLeaveFooter}
    >
      {activeSection === 'Footer' && (
        <div className="fixed left-0 top-0 w-full h-full pointer-events-none z-50">
          {trail.map((item, idx) => (
            <span
              key={item.key}
              style={{
                position: 'absolute',
                left: item.x,
                top: item.y,
                transform: 'translate(-50%, -50%)',
                fontSize: '22px',
                color: 'black',
                opacity: 1 - idx * 0.09,
                transition: 'opacity 0.35s, transform 0.12s',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              <span className="text-2xl text-primary/70 select-none">
                {item.icon}
              </span>
            </span>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="py-22">
            <h3 className="text-2xl font-dotemp">Thanks for visiting!</h3>
            <span className="text-muted-foreground font-medium font-ibm-mono py-22">Wave a biiig goodbye with your mouse</span>
          </div>
          
          <div className="flex items-center justify-center gap-8 py-20">
            <a
              href="mailto:yukyiwng@gmail.com"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
            >
              <Mail className="w-5 h-5" />
              <span className="font-ibm-mono">yukyiwng@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/yukyi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-ibm-mono">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
