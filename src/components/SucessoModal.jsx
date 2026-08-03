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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#8b739e]/40 backdrop-blur-sm">
      <div className="bg-[#fffbf0] w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200 border-2 border-white">
        
        <div className="bg-gradient-to-r from-[#d8b4fe] to-[#b28fc4] p-8 text-center flex flex-col items-center">
          <PartyPopper className="w-14 h-14 text-white mb-2 animate-bounce drop-shadow-md" />
          <h3 className="text-3xl font-extrabold text-white tracking-widest">Eba!</h3>
        </div>
        
        <div className="p-8 text-center bg-[#fffbf0]">
          <h4 className="text-xl font-bold text-[#8b5cf6] mb-2">Presença Confirmada</h4>
          <p className="text-gray-600 mb-8 leading-relaxed text-sm">
            Muito obrigado, <strong className="text-[#9d7bb0]">{nome || 'convidado'}</strong>! Estamos ansiosos para celebrar esse momento especial com você.
            {acompanhantes !== '0' && (
              <span className="block mt-3 text-xs bg-white border border-[#e3d5e8] p-2 rounded-lg text-[#8b739e] font-bold shadow-sm">
                Anotamos também a presença de mais {acompanhantes} acompanhante(s).
              </span>
            )}
          </p>
          <button 
            onClick={onClose}
            className="w-full bg-[#a385bc] hover:bg-[#8e68ab] text-white font-bold py-3.5 rounded-xl transition-colors shadow-md uppercase tracking-widest text-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}