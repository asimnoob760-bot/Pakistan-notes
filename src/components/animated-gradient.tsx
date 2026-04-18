"use client";

export function AnimatedGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated mesh gradient - clearly visible */}
      <div 
        className="absolute inset-0 animate-gradient-mesh"
        style={{
          background: `
            radial-gradient(at 40% 20%, rgba(139,154,107,0.5) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(184,165,160,0.6) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(156,175,136,0.5) 0px, transparent 50%),
            radial-gradient(at 80% 50%, rgba(200,185,175,0.4) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(139,154,107,0.4) 0px, transparent 50%),
            #FAF7F2
          `,
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Moving accent orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8B9A6B]/40 blur-[80px] animate-float-1" 
          style={{ top: '10%', left: '5%' }} />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#B8A5A0]/50 blur-[60px] animate-float-2" 
          style={{ top: '40%', right: '5%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#9CAF88]/35 blur-[70px] animate-float-3" 
          style={{ bottom: '15%', left: '20%' }} />
      </div>
    </div>
  );
}
