import React from 'react';

const WHATSAPP_NUMBER = '918940613027'; // Harthika Travels WhatsApp number
const DEFAULT_MESSAGE = "Hi Harthika Travels! I'd like to know more about your Tamil Nadu tour packages.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform focus-ring"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.738-.868-2.878-1.549-4.024-3.512-.305-.526.305-.489.875-1.629.097-.198.05-.371-.05-.52-.099-.149-.668-1.611-.916-2.207-.247-.595-.5-.515-.69-.524-.197-.01-.42-.012-.644-.012-.224 0-.587.085-.81.41-.223.327-.85 1.131-.85 2.624 0 1.493 1.075 2.933 1.222 3.133.148.198 2.024 3.272 5.123 4.453 3.099 1.182 3.099.788 3.652.738.554-.05 1.798-.736 2.05-1.448.252-.713.252-1.323.176-1.448-.075-.124-.297-.198-.594-.347z"/>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.886.524 3.652 1.434 5.166L2 22l5.073-1.527a9.85 9.85 0 0 0 4.967 1.336c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.058a8.13 8.13 0 0 1-4.146-1.137l-.297-.176-3.04.916.927-2.96-.198-.31a8.106 8.106 0 0 1-1.245-4.347c0-4.484 3.65-8.135 8.134-8.135 4.484 0 8.135 3.65 8.135 8.135 0 4.483-3.65 8.134-8.135 8.134-.045 0-.09 0-.135-.001v-.119z"/>
      </svg>
    </a>
  );
}
