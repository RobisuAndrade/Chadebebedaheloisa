import React, { useState } from 'react';
import { X, Users, CheckCircle2, Pencil, Trash2, Save, Cloud, Heart, Star, Moon, AlertCircle } from 'lucide-react';

export default function AdminPanel({ isOpen, onClose, convidados, onDelete, onUpdate }) {
  const [abaAtiva, setAbaAtiva] = useState('resumo');
  const [editandoId, setEditandoId] = useState(null);
  const [nomeEdit, setNomeEdit] = useState('');
  const [acompanhantesEdit, setAcompanhantesEdit] = useState('0');

  // ESTADO PARA O NOSSO MODAL DE CONFIRMAÇÃO PERSONALIZADO
  const [modalConfirmacao, setModalConfirmacao] = useState({
    aberto: false,
    mensagem: '',
    acao: null,
    tipo: '' // 'salvar' ou 'deletar' para mudar a cor do botão confirmar
  });

  if (!isOpen) return null;

  // Cálculos dos Widgets
  const totalTitulares = convidados.length;
  const totalPessoas = convidados.reduce((acc, c) => acc + 1 + parseInt(c.acompanhantes || 0), 0);

  const iniciarEdicao = (convidado) => {
    setEditandoId(convidado.id);
    setNomeEdit(convidado.nome);
    setAcompanhantesEdit(convidado.acompanhantes);
  };

  // ABRE O MODAL PARA SALVAR
  const tentarSalvar = (id) => {
    setModalConfirmacao({
      aberto: true,
      mensagem: 'Salvar alterações deste convidado?',
      tipo: 'salvar',
      acao: () => {
        onUpdate(id, nomeEdit, acompanhantesEdit || '0');
        setEditandoId(null);
      }
    });
  };

  // ABRE O MODAL PARA DELETAR
  const tentarDeletar = (id) => {
    setModalConfirmacao({
      aberto: true,
      mensagem: 'Apagar este convidado da lista?',
      tipo: 'deletar',
      acao: () => onDelete(id)
    });
  };

  // FECHA O MODAL E EXECUTA A AÇÃO
  const executarAcao = () => {
    if (modalConfirmacao.acao) modalConfirmacao.acao();
    fecharModalConfirmacao();
  };

  const fecharModalConfirmacao = () => {
    setModalConfirmacao({ aberto: false, mensagem: '', acao: null, tipo: '' });
  };

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-gradient-to-b from-[#f3e8ff] via-[#e0e7ff] to-[#dbeafe] overflow-y-auto font-sans">
      
      {/* Decorações de Fundo */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Cloud className="absolute top-10 -left-8 text-white w-32 h-32 opacity-70 drop-shadow-md" fill="white" />
        <Cloud className="absolute top-40 -right-12 text-white w-48 h-48 opacity-80 drop-shadow-md" fill="white" />
        <Cloud className="absolute bottom-1/4 -left-10 text-white w-40 h-40 opacity-70 drop-shadow-md" fill="white" />
        <Star className="absolute top-20 left-10 text-yellow-400 w-8 h-8 animate-pulse opacity-80 drop-shadow-sm" fill="#facc15" />
        <Star className="absolute bottom-20 right-10 text-yellow-300 w-5 h-5 animate-pulse opacity-80" fill="#fde047" />
        <Moon className="absolute top-32 right-10 text-purple-300 w-12 h-12 transform rotate-12 opacity-80 drop-shadow-sm" fill="#d8b4fe" />
        <Heart className="absolute top-1/2 left-4 text-pink-300 w-6 h-6 animate-bounce opacity-70 drop-shadow-sm" fill="#f9a8d4" />
      </div>

      {/* Cabeçalho Neutro */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-5 flex justify-between items-center text-white sticky top-0 shadow-md z-30">
        <h2 className="text-xl font-bold flex items-center gap-2"><Users className="w-6 h-6" /> Painel da Heloísa</h2>
        <button onClick={onClose} className="p-2 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors"><X className="w-6 h-6" /></button>
      </div>

      <div className="relative z-20 w-full max-w-3xl mx-auto px-4 flex flex-col pt-8 pb-20">
        
        {/* Botões de Navegação */}
        <div className="flex justify-center gap-3 sm:gap-6 mb-10 w-full">
          <button 
            onClick={() => setAbaAtiva('resumo')} 
            className={`flex-1 sm:flex-none px-4 sm:px-8 py-3.5 rounded-3xl font-extrabold text-sm sm:text-base shadow-md transition-all duration-300 border-2 ${abaAtiva === 'resumo' ? 'bg-gray-800 text-white border-gray-700 scale-105' : 'bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200 hover:bg-gray-100'}`}
          >
            Visão Resumida
          </button>
          <button 
            onClick={() => setAbaAtiva('detalhada')} 
            className={`flex-1 sm:flex-none px-4 sm:px-8 py-3.5 rounded-3xl font-extrabold text-sm sm:text-base shadow-md transition-all duration-300 border-2 ${abaAtiva === 'detalhada' ? 'bg-gray-800 text-white border-gray-700 scale-105' : 'bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200 hover:bg-gray-100'}`}
          >
            Visão Detalhada
          </button>
        </div>

        {abaAtiva === 'resumo' ? (
          /* VISÃO RESUMIDA LADO A LADO */
          <div className="flex flex-row justify-center gap-3 sm:gap-6 w-full max-w-xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-[2rem] shadow-lg border-2 border-gray-100 flex flex-col items-center flex-1 text-center relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-50 rounded-full opacity-80 blur-xl"></div>
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mb-2 relative z-10" />
              <p className="text-gray-500 font-extrabold uppercase text-[10px] sm:text-xs leading-tight mb-3 relative z-10 tracking-wider">Total<br/>Nomes Confirmado</p>
              <h3 className="text-5xl sm:text-6xl font-extrabold text-gray-800 relative z-10">{totalTitulares}</h3>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-[2rem] shadow-lg border-2 border-gray-100 flex flex-col items-center flex-1 text-center relative overflow-hidden">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gray-100 rounded-full opacity-80 blur-xl"></div>
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700 mb-2 relative z-10" />
              <p className="text-gray-500 font-extrabold uppercase text-[10px] sm:text-xs leading-tight mb-3 relative z-10 tracking-wider">Total<br/>Geral</p>
              <h3 className="text-5xl sm:text-6xl font-extrabold text-gray-800 relative z-10">{totalPessoas}</h3>
            </div>
          </div>
        ) : (
          /* VISÃO DETALHADA COM LISTA */
          <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
            {convidados.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2rem] text-center shadow-sm border-2 border-gray-200 mt-4">
                <p className="text-gray-600 font-extrabold text-lg">Ninguém confirmou ainda 🤍</p>
              </div>
            ) : (
              convidados.map((c) => (
                <div key={c.id} className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all hover:shadow-md">
                  
                  {editandoId === c.id ? (
                    <div className="flex-1 flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text" value={nomeEdit} onChange={(e) => setNomeEdit(e.target.value)} 
                        className="p-3 border-2 border-gray-300 rounded-xl w-full font-bold focus:outline-none focus:border-gray-500 bg-gray-50" 
                        placeholder="Nome do Convidado"
                      />
                      <div className="flex items-center gap-2">
                         <span className="text-xs font-bold text-gray-500 uppercase whitespace-nowrap">Acompanhantes:</span>
                         <input 
                          type="text" 
                          inputMode="numeric" 
                          pattern="[0-9]*"
                          value={acompanhantesEdit} 
                          onChange={(e) => setAcompanhantesEdit(e.target.value.replace(/\D/g, ''))}
                          className="p-3 border-2 border-gray-300 rounded-xl w-20 text-center font-bold bg-gray-50 focus:outline-none focus:border-gray-500" 
                          placeholder="0"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <p className="font-extrabold text-gray-800 text-lg">{c.nome}</p>
                      <p className="text-sm text-gray-500 font-bold mt-0.5 uppercase tracking-wide">
                        + {c.acompanhantes} acompanhante(s)
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 justify-end self-end sm:self-auto">
                    {editandoId === c.id ? (
                      <button onClick={() => tentarSalvar(c.id)} className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-sm transition-colors flex items-center gap-2 font-bold">
                        <Save className="w-5 h-5" />
                        <span className="sm:hidden">Salvar</span>
                      </button>
                    ) : (
                      <>
                        <button onClick={() => iniciarEdicao(c)} className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors">
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button onClick={() => tentarDeletar(c.id)} className="p-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* NOSSO MODAL DE CONFIRMAÇÃO PERSONALIZADO */}
      {/* ========================================================= */}
      {modalConfirmacao.aberto && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-5 text-center flex justify-center items-center gap-2">
              <AlertCircle className="w-6 h-6 text-white" />
              <h3 className="text-lg font-extrabold text-white uppercase tracking-wider">Atenção</h3>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-gray-700 font-bold text-lg mb-8 leading-relaxed">
                {modalConfirmacao.mensagem}
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={fecharModalConfirmacao} 
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3.5 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={executarAcao} 
                  className={`flex-1 font-bold py-3.5 rounded-xl transition-colors text-white shadow-sm ${
                    modalConfirmacao.tipo === 'deletar' 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}