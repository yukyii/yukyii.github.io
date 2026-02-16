import { useState, useEffect, useRef } from 'react';

interface TrailPixel {
  id: number;
  x: number;
  y: number;
  opacity: number;
  color: string;
}

interface HomePageProps {
  activeSection: string;
}

export function HomePage({ activeSection }: HomePageProps) {
  const [trailPixels, setTrailPixels] = useState<TrailPixel[]>([]);
  const lastPixelPos = useRef({ x: 0, y: 0 });
  const homeRef = useRef<HTMLDivElement>(null);

  Function to generate random RGB color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 100) + 150; // 150-249
    const g = Math.floor(Math.random() * 100) + 150;
    const b = Math.floor(Math.random() * 100) + 150;
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeSection !== 'Home') {
        return;
      }

      const NAVBAR_HEIGHT_BUFFER = 85;
      if (e.clientY < NAVBAR_HEIGHT_BUFFER) return;

      // Check if mouse is within the home section bounds
      if (homeRef.current) {
        const rect = homeRef.current.getBoundingClientRect();
        const isWithinHome = (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
        
        if (!isWithinHome) {
          return;
        }
      }

      const currentX = e.clientX;
      const currentY = e.clientY;
      
      // Calculate distance from last pixel position
      const distance = Math.sqrt(
        Math.pow(currentX - lastPixelPos.current.x, 2) + 
        Math.pow(currentY - lastPixelPos.current.y, 2)
      );
      
      // Add new pixel if mouse has moved at least 8 pixels from last pixel
      if (distance > 8) {
        const newPixel: TrailPixel = {
          id: Date.now() + Math.random(),
          x: currentX,
          y: currentY,
          opacity: 1,
          color: getRandomColor()
        };
        
        setTrailPixels(prev => [...prev.slice(-30), newPixel]); // Keep last 30 pixels
        lastPixelPos.current = { x: currentX, y: currentY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeSection]);

  useEffect(() => {
    // Clear trail pixels when leaving homepage
    if (activeSection !== 'Home') {
      setTrailPixels([]);
      return;
    }

    // Fade out trail pixels
    const interval = setInterval(() => {
      setTrailPixels(prev => 
        prev.map(pixel => ({ ...pixel, opacity: Math.max(0.1, pixel.opacity * 0.96) }))
          .filter(pixel => pixel.opacity > 0.1)
      );
    }, 80);

    return () => clearInterval(interval);
  }, [activeSection]);

  return (
    <div ref={homeRef} className="min-h-screen pt-20 px-6 overflow-hidden relative">
      {/* Trail pixels */}
      {trailPixels.map((pixel) => (
        <div
          key={pixel.id}
          className="trail"
          style={{
            position: 'fixed',
            left: pixel.x - 25, // Center the 50px pixel
            top: pixel.y - 25,
            opacity: pixel.opacity,
            width: '50px',
            height: '50px',
            backgroundColor: pixel.color, // Use random color
            zIndex: 50,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Introduction */}
          <div className="space-y-8 relative z-20">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight font-dotemp">
                Hello, I'm
                <br />
                <span className="text-primary">Yuk Yi!</span>
              </h1>
            </div>
            
            <div className="space-y-6">
              <p className="text-base text-muted-foreground max-w-lg">
                I'm a senior at Barnard College, Columbia University studying Cognitive Science and Sociology.
                My experiences span brand strategy, social work, HCI research and product design. 
                With a multidisciplinary background, finding connections between social science 
                and emerging technologies is what excites me most.
              </p>
            </div>
          </div>

          {/* Right side - Visual element
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 border-4 border-primary/20 transform rotate-12"></div>
              <div className="absolute inset-4 border-2 border-primary/40 transform -rotate-6"></div>
              <div className="absolute inset-8 bg-gradient-to-br from-primary/10 to-primary/30"></div>
              
              <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-primary transform rotate-45"></div>
              <div className="absolute bottom-1/4 left-1/4 w-12 h-12 border-4 border-primary"></div>
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-primary/60 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
