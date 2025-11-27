'use client';

export default function AnimatedBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      {/* Triangles */}
      <div className="floating-shape shape-triangle" style={{ top: '10%', left: '5%' }} />
      <div className="floating-shape shape-triangle" style={{ top: '60%', right: '10%', animationDelay: '-5s' }} />
      <div className="floating-shape shape-triangle" style={{ bottom: '20%', left: '30%', animationDelay: '-10s' }} />
      
      {/* Circles */}
      <div className="floating-shape shape-circle" style={{ top: '20%', right: '15%' }} />
      <div className="floating-shape shape-circle" style={{ bottom: '30%', left: '10%', animationDelay: '-8s' }} />
      <div className="floating-shape shape-circle" style={{ top: '70%', right: '40%', animationDelay: '-12s' }} />
      
      {/* Squares */}
      <div className="floating-shape shape-square" style={{ top: '40%', left: '15%' }} />
      <div className="floating-shape shape-square" style={{ bottom: '10%', right: '20%', animationDelay: '-6s' }} />
      
      {/* Stars */}
      <div className="floating-shape shape-star" style={{ top: '15%', left: '50%' }} />
      <div className="floating-shape shape-star" style={{ bottom: '40%', right: '5%', animationDelay: '-9s' }} />
      <div className="floating-shape shape-star" style={{ top: '80%', left: '60%', animationDelay: '-14s' }} />
      
      {/* Zigzags */}
      <div className="floating-shape shape-zigzag" style={{ top: '30%', right: '25%' }} />
      <div className="floating-shape shape-zigzag" style={{ bottom: '50%', left: '40%', animationDelay: '-4s' }} />
      
      {/* Diamonds */}
      <div className="floating-shape shape-diamond" style={{ top: '50%', left: '70%' }} />
      <div className="floating-shape shape-diamond" style={{ bottom: '60%', left: '5%', animationDelay: '-11s' }} />
      
      {/* Donuts */}
      <div className="floating-shape shape-donut" style={{ top: '5%', right: '35%' }} />
      <div className="floating-shape shape-donut" style={{ bottom: '15%', left: '55%', animationDelay: '-7s' }} />
      
      {/* Graffiti splashes */}
      <div className="floating-shape graffiti-splash" style={{ top: '25%', left: '20%' }} />
      <div className="floating-shape graffiti-splash" style={{ bottom: '25%', right: '15%', animationDelay: '-13s' }} />
    </div>
  );
}
