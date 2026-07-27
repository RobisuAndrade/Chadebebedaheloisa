import React, { useState } from 'react';
import { MapPin, Navigation, Calendar, CheckCircle2, Cloud, Heart, Star, Moon, Users } from 'lucide-react';

// Importando os componentes modais (mantenha os arquivos que criamos antes!)
import AcompanhantesModal from './components/AcompanhantesModal';
import PresentesModal from './components/PresentesModal';
import SucessoModal from './components/SucessoModal';

function App() {
  const [nome, setNome] = useState('');
  const [acompanhantes, setAcompanhantes] = useState('0');
  const [confirmado, setConfirmado] = useState(false);
  
  const [modalPresenteAberto, setModalPresenteAberto] = useState(false);
  const [modalSucessoAberto, setModalSucessoAberto] = useState(false);
  const [modalAcompanhantesAberto, setModalAcompanhantesAberto] = useState(false);

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
    <div className="min-h-screen flex flex-col items-center py-8 font-sans bg-gradient-to-b from-[#f3e8ff] via-[#e0e7ff] to-[#dbeafe] relative overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* NUVENS SÓLIDAS DO FUNDO (MAIS NUVENS ADICIONADAS) */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center overflow-hidden">
        <div className="relative w-full max-w-2xl h-full">
          <Cloud className="absolute top-4 -left-8 text-white w-32 h-32 opacity-70 drop-shadow-md" fill="white" />
          <Cloud className="absolute top-32 -right-12 text-white w-48 h-48 opacity-80 drop-shadow-md" fill="white" />
          <Cloud className="absolute top-1/4 -left-16 text-white w-56 h-56 opacity-60 drop-shadow-md" fill="white" />
          <Cloud className="absolute top-1/2 -right-16 text-white w-44 h-44 opacity-70 drop-shadow-md" fill="white" />
          <Cloud className="absolute bottom-1/3 -left-10 text-white w-40 h-40 opacity-80 drop-shadow-md" fill="white" />
          <Cloud className="absolute bottom-20 -right-8 text-white w-36 h-36 opacity-90 drop-shadow-md" fill="white" />
        </div>
      </div>

      <div className="w-full relative flex flex-col items-center px-5">
        
        {/* ========================================================= */}
        {/* NUVEM BRANCA PRINCIPAL (CONTEÚDO) */}
        {/* ========================================================= */}
        <div className="w-full max-w-md relative z-10 mt-28 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)] mb-12">
          
          {/* ELEMENTOS DECORATIVOS ESPALHADOS EM VOLTA DA NUVEM */}
          <Star className="absolute -top-20 left-0 text-yellow-400 w-8 h-8 animate-pulse z-0 drop-shadow-sm" fill="#facc15" />
          <Star className="absolute top-1/4 -right-6 text-yellow-400 w-6 h-6 animate-pulse z-0 drop-shadow-sm delay-75" fill="#facc15" />
          <Star className="absolute bottom-1/3 -left-6 text-yellow-400 w-5 h-5 animate-pulse z-0 drop-shadow-sm delay-150" fill="#facc15" />
          
          <Moon className="absolute -top-16 -right-2 text-purple-300 w-12 h-12 z-0 drop-shadow-sm transform rotate-12" fill="#d8b4fe" />
          
          <Heart className="absolute top-1/4 -left-5 text-purple-300 w-7 h-7 animate-bounce z-20 drop-shadow-sm" fill="#d8b4fe" />
          <Heart className="absolute top-2/3 -right-4 text-purple-300 w-6 h-6 animate-bounce z-20 drop-shadow-sm delay-150" fill="#d8b4fe" />
          <Heart className="absolute -bottom-10 left-10 text-purple-300 w-8 h-8 animate-bounce z-20 drop-shadow-sm delay-75" fill="#d8b4fe" />

          {/* CÍRCULOS QUE FORMAM A NOVA NUVEM FOFINHA */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-white rounded-full z-10"></div>
          <div className="absolute -top-4 -left-1 w-36 h-36 bg-white rounded-full z-10"></div>
          <div className="absolute -top-6 -right-1 w-40 h-40 bg-white rounded-full z-10"></div>
          
          <div className="absolute top-24 -left-5 w-32 h-32 bg-white rounded-full z-10"></div>
          <div className="absolute top-32 -right-5 w-36 h-36 bg-white rounded-full z-10"></div>
          
          <div className="absolute bottom-32 -left-5 w-36 h-36 bg-white rounded-full z-10"></div>
          <div className="absolute bottom-24 -right-5 w-32 h-32 bg-white rounded-full z-10"></div>

          <div className="absolute -bottom-10 left-4 w-40 h-40 bg-white rounded-full z-10"></div>
          <div className="absolute -bottom-8 right-4 w-36 h-36 bg-white rounded-full z-10"></div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-white rounded-full z-10"></div>

          {/* CONTEÚDO DENTRO DA NUVEM */}
          <div className="bg-white rounded-[3.5rem] p-6 sm:p-8 relative z-20 flex flex-col gap-8 pt-20 pb-12">
            
            {/* TÍTULO E BEBÊ */}
            <section className="relative flex flex-col items-center w-full">
              
              {/* Bebê dormindo posicionado bem no topo da nuvem */}
              <div className="absolute -top-36 left-1/2 transform -translate-x-1/2 z-30">
                <img src="/bebe-dormindo.png" alt="Bebê Dormindo" className="w-32 h-32 drop-shadow-xl" />
              </div>
              
              {/* Fitas decorativas laterais */}
              <div className="absolute top-1/2 -left-3 w-10 h-16 bg-purple-400 skew-y-12 transform -translate-y-1/2 rounded-sm -z-10"></div>
              <div className="absolute top-1/2 -right-3 w-10 h-16 bg-purple-400 -skew-y-12 transform -translate-y-1/2 rounded-sm -z-10"></div>
              
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
                  <h3 className="text-2xl font-extrabold text-center text-purple-800 mb-2 mt-3">Você vai?</h3>
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
                      <div className="flex gap-2 w-full items-end">
                        <div className="flex flex-col gap-1 flex-1">
                          <label htmlFor="nome_convidado" className="text-[10px] font-bold text-purple-600 uppercase ml-2">Nome Completo</label>
                          <input 
                            id="nome_convidado" type="text" placeholder="Seu nome" required
                            className="p-3 border border-purple-100 rounded-2xl focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 bg-purple-50/30 shadow-inner text-gray-700 font-semibold placeholder-gray-400 w-full h-[50px]"
                            value={nome} onChange={(e) => setNome(e.target.value)}
                          />
                        </div>
                        <button
                          type="button" onClick={() => setModalAcompanhantesAberto(true)}
                          className="h-[50px] px-2 border border-purple-100 rounded-2xl focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 bg-purple-50/30 shadow-inner text-purple-700 font-bold flex flex-col items-center justify-center transition-colors hover:bg-purple-100/50 relative w-24 shrink-0"
                        >
                          <Users className="w-5 h-5 mb-0.5" />
                          <span className="text-[9px] uppercase tracking-wider">Acompanhante</span>
                          {acompanhantes !== '0' && (
                            <span className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                              {acompanhantes}
                            </span>
                          )}
                        </button>
                      </div>
                      <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-extrabold py-4 px-4 rounded-2xl transition-colors shadow-md text-lg mt-2">
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
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-blue-200 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-sm"><MapPin className="w-5 h-5" />Maps</a>
                  <a href={wazeUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-cyan-200 text-cyan-700 font-bold py-3 rounded-xl hover:bg-cyan-50 transition-colors shadow-sm"><Navigation className="w-5 h-5" />Waze</a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* RENDERIZANDO OS COMPONENTES MODAIS */}
      <AcompanhantesModal 
        isOpen={modalAcompanhantesAberto} 
        onClose={() => setModalAcompanhantesAberto(false)} 
        initialValue={acompanhantes}
        onConfirm={(qtd) => {
          setAcompanhantes(qtd);
          setModalAcompanhantesAberto(false);
        }} 
      />

      <PresentesModal 
        isOpen={modalPresenteAberto} 
        onClose={() => setModalPresenteAberto(false)} 
      />

      <SucessoModal 
        isOpen={modalSucessoAberto} 
        onClose={() => setModalSucessoAberto(false)} 
        nome={nome} 
        acompanhantes={acompanhantes} 
      />

    </div>
  );
}

export default App;