import React, { useState, useRef, useEffect } from 'react';
import { X, Users } from 'lucide-react';

export default function AcompanhantesModal({ isOpen, onClose, onConfirm, initialValue }) {
  const [tempAcompanhantes, setTempAcompanhantes] = useState(initialValue);
  const scrollRef = useRef(null);

  // Bloqueia a rolagem do fundo e ajusta o scroll inicial
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Bloqueia o scroll da página de fundo
      setTempAcompanhantes(initialValue);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = parseInt(initialValue) * 64;
        }
      }, 10);
    } else {
      document.body.style.overflow = 'unset'; // Libera o scroll
    }

    // Limpeza caso o componente seja desmontado
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialValue]);

  const handleScrollPicker = (e) => {
    const index = Math.round(e.target.scrollTop / 64);
    if (index >= 0 && index <= 10) {
      setTempAcompanhantes(index.toString());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-purple-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom-10 sm:zoom-in duration-200">
        
        <div className="bg-gradient-to-r from-purple-400 to-fuchsia-400 p-5 text-center relative shadow-md z-10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-1 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
            <Users className="w-6 h-6" />
            Acompanhantes
          </h3>
        </div>
        
        <div className="p-6 pt-5 bg-white">
          <p className="text-gray-500 text-center text-sm font-medium mb-4">
            Deslize para selecionar a quantidade
          </p>
          
          <div className="relative h-48 w-full overflow-hidden flex justify-center bg-purple-50/50 rounded-2xl border border-purple-100 mb-6">
            
            {/* Marcador Central */}
            <div className="absolute top-1/2 left-0 w-full h-[64px] -translate-y-1/2 bg-purple-200/40 border-y border-purple-300 pointer-events-none z-10 rounded-lg"></div>
            
            {/* 
              overscroll-contain e touch-action: pan-y ajudam o celular a 
              não passar o scroll para a página de trás 
            */}
            <div 
              ref={scrollRef}
              onScroll={handleScrollPicker}
              className="w-full h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide z-20 relative overscroll-contain"
              style={{ paddingTop: '64px', paddingBottom: '64px', touchAction: 'pan-y' }}
            >
              {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((num, i) => {
                const isSelected = tempAcompanhantes === num;
                const diff = Math.abs(parseInt(tempAcompanhantes) - i);
                
                let textClass = 'text-purple-300 opacity-40 scale-90';
                if (isSelected) {
                  textClass = 'text-purple-800 font-extrabold text-[22px] scale-110 drop-shadow-sm';
                } else if (diff === 1) {
                  textClass = 'text-purple-500 opacity-80 font-bold text-lg';
                }

                return (
                  <div
                    key={num}
                    className={`flex items-center justify-center snap-center cursor-pointer transition-all duration-200 ease-out select-none ${textClass}`}
                    style={{ height: '64px' }}
                    onClick={() => {
                      if (scrollRef.current) {
                        scrollRef.current.scrollTo({ top: i * 64, behavior: 'smooth' });
                      }
                      setTempAcompanhantes(num);
                    }}
                  >
                    {num} {num === '1' ? 'acompanhante' : 'acompanhantes'}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors shadow-sm"
            >
              Cancelar
            </button>
            <button 
              onClick={() => onConfirm(tempAcompanhantes)}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-colors shadow-sm"
            >
              Confirmar
            </button>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}