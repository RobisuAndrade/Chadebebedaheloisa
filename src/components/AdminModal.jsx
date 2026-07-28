import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, onLoginSuccess }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  if (!isOpen) return null;

const handleLogin = (e) => {
    e.preventDefault();
    
    // Essa linha tira o foco de qualquer campo que esteja ativo, forçando o teclado do celular a baixar!
    if (document.activeElement) {
      document.activeElement.blur();
    }

    if (login === 'Xablau' && senha === 'Ventilador') {
      setErro('');
      setLogin('');
      setSenha('');
      onLoginSuccess();
    } else {
      setErro('Login ou senha incorretos!');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:bg-white/20 p-1 rounded-full">
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" /> Área dos Pais
          </h3>
        </div>
        
        <div className="p-8 bg-gray-50 flex flex-col items-center gap-4">
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
            <input 
              type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}
              className="p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 w-full text-center text-lg"
            />
            <input 
              type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}
              className="p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 w-full text-center text-lg"
            />
            {erro && <p className="text-red-500 font-bold text-center text-sm">{erro}</p>}
            <button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white font-extrabold py-3.5 rounded-xl mt-2">
              Acessar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}