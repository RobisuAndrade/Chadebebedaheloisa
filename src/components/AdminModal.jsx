import React from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, convidados }) {
  if (!isOpen) return null;

  // Calcula o total de pessoas (convidados + acompanhantes)
  const totalPessoas = convidados.reduce((acc, convidado) => {
    return acc + 1 + parseInt(convidado.acompanhantes);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-1 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" />
            Área dos Pais
          </h3>
        </div>
        
        <div className="p-6 bg-gray-50 max-h-[60vh] overflow-y-auto">
          <div className="bg-green-100 text-green-800 p-3 rounded-xl mb-4 text-center font-bold flex items-center justify-center gap-2 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
            Total Confirmado: {totalPessoas}
          </div>

          {convidados.length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-4">Ninguém confirmou presença ainda.</p>
          ) : (
            <ul className="space-y-3">
              {convidados.map((c, index) => (
                <li key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="font-bold text-gray-800">{c.nome}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    + {c.acompanhantes} acompanhante(s)
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-4 bg-white border-t border-gray-100">
          <button 
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}