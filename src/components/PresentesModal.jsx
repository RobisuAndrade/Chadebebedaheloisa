import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function PresentesModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <div className="bg-gradient-to-r from-purple-400 to-fuchsia-400 p-6 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-1 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-2xl font-extrabold text-white">Lista de Presentes</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-center text-sm font-medium mb-6">
            Ficaremos muito felizes com a sua presença! Se desejar nos presentear, aqui estão algumas sugestões:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-purple-800 font-bold flex items-center gap-3 shadow-sm">
              <span className="text-2xl">🧸</span> Fralda Tamanho M
            </li>
            <li className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-purple-800 font-bold flex items-center gap-3 shadow-sm">
              <span className="text-2xl">🧴</span> Pomada para assadura
            </li>
            <li className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-purple-800 font-bold flex items-center gap-3 shadow-sm">
              <span className="text-2xl">🧻</span> Lenço umedecido
            </li>
          </ul>
          <button 
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
          >
            Voltar para o convite
          </button>
        </div>
      </div>
    </div>
  );
}