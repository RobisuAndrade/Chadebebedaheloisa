import React from 'react';
import { X, Lock } from 'lucide-react';

export default function AdminModal({ isOpen, onClose }) {
  if (!isOpen) return null;

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
        
        <div className="p-8 bg-gray-50 flex flex-col items-center gap-4">
          <p className="text-gray-600 text-sm text-center font-medium">
            Por favor, insira a senha para acessar a lista de confirmados.
          </p>
          
          <div className="w-full flex flex-col gap-2">
            <input 
              type="password" 
              placeholder="Digite a senha" 
              className="p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100 bg-white shadow-inner text-gray-800 font-bold placeholder-gray-400 w-full text-center text-lg transition-colors"
            />
            <button 
              type="button"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-extrabold py-3.5 px-4 rounded-xl transition-colors shadow-md mt-2"
            >
              Acessar
            </button>
          </div>
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