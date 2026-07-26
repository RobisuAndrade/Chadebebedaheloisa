import React, { useState } from 'react';
import { MapPin, Navigation, Calendar, CheckCircle2, Cloud, Heart, X, Star, Moon, PartyPopper, Camera, Users } from 'lucide-react';

function App() {
  const [nome, setNome] = useState('');
  const [acompanhantes, setAcompanhantes] = useState('0');
  const [confirmado, setConfirmado] = useState(false);
  const [modalPresenteAberto, setModalPresenteAberto] = useState(false);
  const [modalSucessoAberto, setModalSucessoAberto] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmado(true);
    setModalSucessoAberto(true);
  };

  const lat = "-23.801970319614995";
  const lng = "-46.93541569510455";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  return (
    <div className="min-h-screen flex flex-col items-center py-6 font-sans bg-gradient-to-b from-[#f3e8ff] via-[#e0e7ff] to-[#dbeafe] relative overflow-x-hidden">
      
      {/* NUVENS SÓLIDAS DO FUNDO */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
        <div className="relative w-full max-w-lg h-full">
          <Cloud className="absolute top-10 -left-6 text-white w-32 h-32 opacity-80 drop-shadow-md" fill="white" />
          <Cloud className="absolute top-32 -right-12 text-white w-40 h-40 opacity-80 drop-shadow-md" fill="white" />
          <Cloud className="absolute top-1/2 -left-16 text-white w-48 h-48 opacity-80 drop-shadow-md" fill="white" />
          <Cloud className="absolute bottom-40 -right-8 text-white w-36 h-36 opacity-80 drop-shadow-md" fill="white" />
        </div>
      </div>

      <div className="w-full relative flex flex-col items-center px-4">

        {/* ========================================================= */}
        {/* BANNER (TOPO) */}
        {/* ========================================================= */}
        <div className="w-full max-w-xl relative z-0 mt-8 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]">
          
          <div className="absolute -top-8 left-12 w-28 h-28 bg-white rounded-full"></div>
          <div className="absolute -top-12 right-16 w-36 h-36 bg-white rounded-full"></div>
          <div className="absolute top-16 -left-6 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-20 -right-6 w-28 h-28 bg-white rounded-full"></div>

          <div className="bg-white rounded-[3rem] p-3 relative z-10">
            <div className="w-full h-64 sm:h-80 bg-purple-50 border-4 border-dashed border-purple-300 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-purple-200 p-3 rounded-full mb-2 shadow-inner">
                  <Camera className="w-10 h-10 text-purple-500" />
                </div>
                <span className="text-purple-700 font-extrabold tracking-widest text-xl uppercase drop-shadow-sm text-center">Espaço do Banner</span>
                <span className="text-purple-600 text-sm font-bold mt-1 bg-white/60 px-4 py-1 rounded-full text-center">Sua foto retangular aqui</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NUVEM BRANCA (CONTEÚDO PRINCIPAL) */}
        {/* ========================================================= */}
        <div className="w-full max-w-md relative z-10 -mt-16 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)] mb-8">
          
          <div className="absolute -top-6 left-6 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute -top-8 right-10 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute top-1/4 -left-6 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/3 -right-6 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-32 -left-6 w-28 h-28 bg-white rounded-full"></div>
          <div className="absolute bottom-20 -right-6 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute -bottom-8 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute -bottom-10 right-12 w-36 h-36 bg-white rounded-full"></div>

          <div className="bg-white rounded-[3rem] p-6 sm:p-8 relative z-10 flex flex-col gap-8 pt-16">
            
            {/* TÍTULO E DATA */}
            <section className="relative flex flex-col items-center w-full">
              
              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 z-30">
                <img src="/bebe-dormindo.png" alt="Bebê Dormindo" className="w-28 h-28 drop-shadow-lg" />
              </div>
              <Star className="absolute -top-16 left-4 text-yellow-400 w-6 h-6 animate-pulse z-20" fill="#facc15" />
              <Moon className="absolute -top-20 right-4 text-purple-300 w-7 h-7 z-20" fill="#d8b4fe" />
              <span className="absolute -top-6 -left-2 text-2xl z-20 opacity-90 drop-shadow-sm">👼</span>
              <span className="absolute -top-6 -right-2 text-2xl z-20 opacity-90 drop-shadow-sm">👼</span>
              <Heart className="absolute top-6 -left-2 text-purple-300 w-5 h-5 animate-pulse z-20" fill="#d8b4fe" />
              <Heart className="absolute top-6 -right-2 text-purple-300 w-5 h-5 animate-pulse z-20" fill="#d8b4fe" />

              <div className="absolute top-1/2 -left-3 w-10 h-16 bg-purple-400 skew-y-12 transform -translate-y-1/2 rounded-sm"></div>
              <div className="absolute top-1/2 -right-3 w-10 h-16 bg-purple-400 -skew-y-12 transform -translate-y-1/2 rounded-sm"></div>
              
              <div className="relative bg-gradient-to-b from-purple-50 to-fuchsia-50 border-2 border-purple-200 pt-10 pb-6 px-4 rounded-3xl shadow-sm z-10 flex flex-col items-center w-full mt-4">
                <h2 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">
                  Chá de Bebê da
                </h2>
                <h1 className="text-5xl sm:text-6xl font-extrabold text-purple-700 mb-4 text-center" style={{ fontFamily: 'cursive, sans-serif' }}>
                  Heloísa
                </h1>
                
                <div className="flex items-center gap-2 bg-white/90 px-6 py-2 rounded-full border border-purple-200 shadow-sm mt-1">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-purple-700 font-extrabold uppercase tracking-wider text-sm">
                    12 de Setembro
                  </span>
                </div>
              </div>
            </section>

            {/* LISTA DE PRESENTES */}
            <section className="flex justify-center relative z-20 w-full py-1">
              <button 
                onClick={() => setModalPresenteAberto(true)}
                className="flex items-center gap-3 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 py-2 px-6 rounded-xl shadow-sm transition-all transform hover:scale-105 w-auto"
              >
                <img src="/image_838a75.png" alt="Caixa de Presente" className="w-10 h-10 animate-pulse" />
                <div className="text-left">
                  <p className="text-yellow-800 font-bold text-sm leading-tight uppercase tracking-wide">Lista de Presentes</p>
                  <p className="text-yellow-600 text-[9px] font-medium mt-0.5">Toque para ver sugestões</p>
                </div>
              </button>
            </section>

            {/* CONFIRMAÇÃO E MAPAS */}
            <section className="flex flex-col gap-8 w-full relative z-20">
              <div className="bg-purple-200 p-1 rounded-[2rem] shadow-sm">
                <div className="bg-white p-6 rounded-[1.7rem] relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-extrabold uppercase tracking-widest py-1.5 px-6 rounded-full shadow-md border-2 border-white whitespace-nowrap">
                    Sua Presença
                  </div>
                  <h3 className="text-2xl font-extrabold text-center text-purple-800 mb-2 mt-3">
                    Você vai?
                  </h3>
                  <p className="text-center text-sm text-gray-500 mb-6 font-medium">
                    Por favor, confirme para organizarmos tudo com carinho.
                  </p>
                  
                  {confirmado ? (
                    <div className="bg-green-50 border-2 border-green-200 text-green-700 p-5 rounded-2xl text-center font-bold flex flex-col items-center gap-2">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                      Presença confirmada!
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      
                      {/* NOME E ACOMPANHANTES NA MESMA LINHA */}
                      <div className="flex gap-2 w-full">
                        
                        {/* Campo de Nome (Ocupa a maior parte) */}
                        <div className="flex flex-col gap-1 flex-1">
                          <label htmlFor="nome_convidado" className="text-[10px] font-bold text-purple-600 uppercase ml-2">Nome Completo</label>
                          <input 
                            id="nome_convidado"
                            type="text" 
                            placeholder="Seu nome" 
                            className="p-3 border border-purple-100 rounded-2xl focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 bg-purple-50/30 shadow-inner text-gray-700 font-semibold placeholder-gray-400 w-full"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                          />
                        </div>

                        {/* Campo de Acompanhantes (Fica no canto direito) */}
                        <div className="flex flex-col gap-1 w-24">
                          <label htmlFor="acompanhantes" className="text-[10px] font-bold text-purple-600 uppercase flex items-center justify-center gap-1">
                            <Users className="w-3 h-3" /> Extras
                          </label>
                          <select
                            id="acompanhantes"
                            value={acompanhantes}
                            onChange={(e) => setAcompanhantes(e.target.value)}
                            className="p-3 border border-purple-100 rounded-2xl focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 bg-purple-50/30 shadow-inner text-gray-700 font-bold text-center appearance-none cursor-pointer w-full"
                            style={{ textAlignLast: 'center' }}
                          >
                            <option value="0">+0</option>
                            <option value="1">+1</option>
                            <option value="2">+2</option>
                            <option value="3">+3</option>
                            <option value="4">+4</option>
                            <option value="5">+5</option>
                            <option value="6">+6</option>
                            <option value="7">+7</option>
                            <option value="8">+8</option>
                            <option value="9">+9</option>
                            <option value="10">+10</option>
                          </select>
                        </div>

                      </div>

                      <button 
                        type="submit" 
                        className="bg-purple-500 hover:bg-purple-600 text-white font-extrabold py-4 px-4 rounded-2xl transition-colors shadow-md text-lg mt-2"
                      >
                        Confirmar Agora
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <hr className="border-purple-100 border-t-2 border-dashed w-3/4 mx-auto" />

              <div className="bg-blue-50/70 rounded-3xl p-6 border border-blue-100 flex flex-col items-center">
                <MapPin className="w-8 h-8 text-blue-500 mb-2" fill="#bfdbfe" />
                <h3 className="font-bold text-blue-900 text-lg mb-1">Chácara Juromari</h3>
                <p className="text-xs text-blue-600 mb-5 text-center font-medium">Toque para traçar a rota até o local da festa:</p>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-blue-200 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
                    <MapPin className="w-5 h-5" />
                    Maps
                  </a>
                  <a href={wazeUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-cyan-200 text-cyan-700 font-bold py-3 rounded-xl hover:bg-cyan-50 transition-colors shadow-sm">
                    <Navigation className="w-5 h-5" />
                    Waze
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>

      {/* MODAIS (PRESENTES E SUCESSO) */}
      {modalPresenteAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-purple-400 to-fuchsia-400 p-6 text-center relative">
              <button 
                onClick={() => setModalPresenteAberto(false)}
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
                onClick={() => setModalPresenteAberto(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
              >
                Voltar para o convite
              </button>
            </div>
          </div>
        </div>
      )}

      {modalSucessoAberto && (
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
                onClick={() => setModalSucessoAberto(false)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors shadow-md"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;