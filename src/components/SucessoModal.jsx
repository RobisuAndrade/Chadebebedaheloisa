import React, { useEffect } from 'react';
import { PartyPopper } from 'lucide-react';

export default function SucessoModal({ isOpen, onClose, nome, acompanhantes }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <div className="bg-green-400 p-8 text-center flex flex-col items-center">
          <PartyPopper className="w-16 h-16 text-white mb-2 animate-bounce" />
          <h3 className="text-3xl font-extrabold text-white">Eba!</h3>
        </div>
        <div className="p-8 text-center">
          <h4 className="text-xl font-bold text-gray-800 mb-2">Presença Confirmada</h4>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Muito obrigado, <strong>{nome || 'convidado'}</strong>! Estamos ansiosos para celebrar esse momento especial com você.
            {acompanhantes !== '0' && (
              <span className="block mt-2 text-sm text-green-700 font-bold">
                Anotamos também a presença de mais {acompanhantes} acompanhante(s).
              </span>
            )}
          </p>
          <button 
            onClick={onClose}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors shadow-md"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}