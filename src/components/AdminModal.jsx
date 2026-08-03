import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, onLoginSuccess }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#8b739e]/40 backdrop-blur-sm">
      <div className="bg-[#fffbf0] w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative border-2 border-white">
        <div className="bg-gradient-to-r from-[#d8b4fe] to-[#b28fc4] p-6 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:bg-white/20 p-1 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" /> Área dos Pais
          </h3>
        </div>
        
        <div className="p-8 bg-[#fffbf0] flex flex-col items-center gap-4">
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
            <input 
              type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}
              className="p-4 border border-[#e3d5e8] rounded-2xl focus:outline-none focus:border-[#9d7bb0] focus:ring-2 focus:ring-[#f3e8ff] w-full text-center text-sm bg-white/90 text-gray-700"
            />
            <input 
              type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}
              className="p-4 border border-[#e3d5e8] rounded-2xl focus:outline-none focus:border-[#9d7bb0] focus:ring-2 focus:ring-[#f3e8ff] w-full text-center text-sm bg-white/90 text-gray-700"
            />
            {erro && <p className="text-rose-500 font-bold text-center text-sm">{erro}</p>}
            <button type="submit" className="w-full bg-[#a385bc] hover:bg-[#8e68ab] text-white font-bold py-4 rounded-2xl mt-2 transition-colors shadow-md uppercase tracking-wider text-sm">
              Acessar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}