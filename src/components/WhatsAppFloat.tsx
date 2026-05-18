const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.001 3.2C8.93 3.2 3.2 8.93 3.2 16c0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.55-1.71a12.78 12.78 0 0 0 6.25 1.6h.01c7.07 0 12.8-5.73 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.72 12.72 0 0 0 16 3.2zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.89 1.02 1.04-3.79-.25-.4A10.59 10.59 0 0 1 5.39 16c0-5.85 4.76-10.6 10.61-10.6 2.83 0 5.5 1.1 7.5 3.1a10.55 10.55 0 0 1 3.1 7.5c0 5.85-4.76 10.6-10.6 10.6zm5.82-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.81 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.5.14-.66.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.53-.71-.54l-.61-.01c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.76.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z"/>
  </svg>
);

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5581986953506";
    const message = "Olá! Gostaria de saber mais sobre o MuseTera.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      aria-label="Fale conosco no WhatsApp"
      title="Fale conosco no WhatsApp"
      className="group fixed bottom-24 right-4 sm:right-6 z-[60] h-14 w-14 rounded-full flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 transition-transform duration-300 hover:scale-110"
    >
      {/* Pulsing halo */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 blur-md" />

      {/* Main gradient circle */}
      <span
        className="relative h-full w-full rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] ring-1 ring-white/20"
        style={{
          background:
            'radial-gradient(circle at 30% 25%, #5ef08a 0%, #25D366 45%, #128C7E 100%)',
        }}
      >
        <WhatsAppIcon className="h-8 w-8 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]" />
      </span>

      {/* Notification badge */}
      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background bg-destructive flex items-center justify-center">
        <span className="text-[9px] font-bold text-destructive-foreground leading-none">1</span>
      </span>

      {/* Tooltip */}
      <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border bg-popover/95 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-popover-foreground opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
        Fale no WhatsApp
      </span>
    </button>
  );
};

export default WhatsAppFloat;
