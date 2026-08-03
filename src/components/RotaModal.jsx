import React, { useEffect } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export default function RotaModal({ isOpen, onClose, urlDestino, nomeApp }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirmar = () => {
    window.open(urlDestino, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#8b739e]/40 backdrop-blur-sm">
      <div className="bg-[#fffbf0] w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200 border-2 border-white">
        
        <div className="bg-gradient-to-r from-[#d8b4fe] to-[#b28fc4] p-6 text-center flex flex-col items-center">
          <div className="bg-white/30 p-3 rounded-full mb-2">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-wide">Traçar Rota</h3>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-8 font-medium text-sm leading-relaxed">
            Deseja sair do convite e abrir o <strong className="text-[#8b5cf6]">{nomeApp}</strong> para navegar até a Chácara Juromari?
          </p>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 bg-white border border-[#e3d5e8] text-[#9d7bb0] font-bold py-3.5 rounded-xl transition-colors shadow-sm"
            >
              Cancelar
            </button>
            <button 
              onClick={handleConfirmar}
              className="flex-1 bg-[#a385bc] hover:bg-[#8e68ab] text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Abrir <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}