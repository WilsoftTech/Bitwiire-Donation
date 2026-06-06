import React from "react";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-forest">
      {/* Radial Gradients */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 60% 70% at 70% 50%, rgba(201, 161, 74, 0.06) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 20% 80%, rgba(31, 85, 56, 0.4) 0%, transparent 60%)
          `
        }}
      />
      
      {/* Hero Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a14a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
