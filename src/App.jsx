import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Calendar, CheckCircle2, Cloud, Heart, Star, Moon, Users, Lock } from 'lucide-react';

// Importações do REALTIME DATABASE
import { ref, push, onValue, remove, update } from 'firebase/database';
import { db } from './firebase'; 

// Importando os componentes modais
import AcompanhantesModal from './components/AcompanhantesModal';
import PresentesModal from './components/PresentesModal';
import SucessoModal from './components/SucessoModal';
import AdminModal from './components/AdminModal';
import AdminPanel from './components/AdminPanel';

function App() {
  const [nome, setNome] = useState('');
  const [acompanhantes, setAcompanhantes] = useState('0');
  const [confirmado, setConfirmado] = useState(false);
  
  const [listaConvidados, setListaConvidados] = useState([]);
  
  const [modalPresenteAberto, setModalPresenteAberto] = useState(false);
  const [modalSucessoAberto, setModalSucessoAberto] = useState(false);
  const [modalAcompanhantesAberto, setModalAcompanhantesAberto] = useState(false);
  const [modalAdminAberto, setModalAdminAberto] = useState(false);
  const [painelAdminAberto, setPainelAdminAberto] = useState(false);

  // Carrega os dados do Realtime Database
  useEffect(() => {
    const convidadosRef = ref(db, 'convidados');
    
    const unsubscribe = onValue(convidadosRef, (snapshot) => {
      const data = snapshot.val();
      const convidadosArray = [];
      
      if (data) {
        // Transforma o objeto do banco de dados em um Array que o React entende
        for (let id in data) {
          convidadosArray.push({ id, ...data[id] });
        }
      }
      setListaConvidados(convidadosArray);
    });

    return () => unsubscribe();
  }, []);

  // Salva no Realtime Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (document.activeElement) {
      document.activeElement.blur(); // Esconde o teclado
    }

    try {
      const convidadosRef = ref(db, 'convidados');
      await push(convidadosRef, { nome, acompanhantes }); // 'push' cria um ID único no Realtime DB
      setConfirmado(true);
      setModalSucessoAberto(true);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao confirmar presença. Tente novamente.");
    }
  };

  // Exclui do Realtime Database
const handleDelete = async (id) => {
    const convidadoRef = ref(db, `convidados/${id}`);
    await remove(convidadoRef);
  };

  // Atualiza no Realtime Database
  const handleUpdate = async (id, novoNome, novosAcompanhantes) => {
    const convidadoRef = ref(db, `convidados/${id}`);
    await update(convidadoRef, {
      nome: novoNome,
      acompanhantes: novosAcompanhantes
    });
  };

  // Função para adicionar o evento ao calendário do celular
  const handleAddToCalendar = () => {
    // Configuração do evento (Formato Data: YYYYMMDDTHHMMSSZ)
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20260912T150000
DTEND:20260912T190000
SUMMARY:Chá de Bebê da Heloísa
LOCATION:Chácara Juromari
DESCRIPTION:Venha celebrar o Chá de Bebê da nossa querida Heloísa!
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Cha_de_Bebe_Heloisa.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lat = "-23.801970319614995";
  const lng = "-46.93541569510455";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  return (
    <div className="min-h-screen flex flex-col items-center py-8 font-sans bg-gradient-to-b from-[#f3e8ff] via-[#e0e7ff] to-[#dbeafe] relative overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* CADEADO ESCONDIDO PARA OS PAIS (AGORA ABSOLUTO NO TOPO) */}
      {/* ========================================================= */}
      <div 
        className="absolute top-4 left-4 z-[60] opacity-30 hover:opacity-100 cursor-pointer p-2 transition-opacity"
        onClick={() => setModalAdminAberto(true)}
      >
        <Lock className="w-6 h-6 text-purple-900 drop-shadow-sm" />
      </div>

      {/* ========================================================= */}
      {/* CSS PERSONALIZADO E FIX SAMSUNG APENAS PARA DIVS */}
      {/* ========================================================= */}
      <style dangerouslySetInnerHTML={{__html: `
        :root { color-scheme: light only !important; }
        
        /* FIX PARA O NAVEGADOR SAMSUNG INTERNET (APLICAR APENAS EM DIVS PARA NÃO QUADRADAR SVGS) */
        .force-white {
          background-color: #ffffff !important;
          background-image: linear-gradient(to bottom, #ffffff, #ffffff) !important;
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.04) translateY(-3px); }
        }
        .animate-breathe { animation: breathe 3.5s ease-in-out infinite; }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-gentle-bounce { animation: gentle-bounce 2s infinite ease-in-out; }
      `}} />

      {/* ========================================================= */}
      {/* NUVENS SÓLIDAS DO FUNDO (SEM O FIX DA SAMSUNG) */}
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
          
          {/* DECORAÇÕES (ESTRELAS, CORAÇÕES, LUA) */}
          <Star className="absolute -top-20 left-0 text-yellow-400 w-8 h-8 animate-pulse z-0 drop-shadow-sm" fill="#facc15" />
          <Star className="absolute top-1/4 -right-6 text-yellow-400 w-6 h-6 animate-pulse z-0 drop-shadow-sm delay-75" fill="#facc15" />
          <Star className="absolute bottom-1/3 -left-6 text-yellow-400 w-5 h-5 animate-pulse z-0 drop-shadow-sm delay-150" fill="#facc15" />
          <Star className="absolute top-10 -left-12 text-yellow-300 w-4 h-4 animate-pulse z-0 opacity-70 delay-300" fill="#fde047" />
          <Star className="absolute top-2/3 -right-10 text-yellow-300 w-5 h-5 animate-pulse z-0 opacity-60 delay-500" fill="#fde047" />
          <Star className="absolute -bottom-6 right-16 text-yellow-300 w-3 h-3 animate-pulse z-0 opacity-80 delay-700" fill="#fde047" />
          <Star className="absolute top-1/2 left-2 text-yellow-200 w-3 h-3 animate-pulse z-20 opacity-80" fill="#fef08a" />
          <Moon className="absolute -top-16 -right-2 text-purple-300 w-12 h-12 z-0 drop-shadow-sm transform rotate-12" fill="#d8b4fe" />
          <Heart className="absolute top-1/4 -left-5 text-purple-300 w-7 h-7 animate-bounce z-20 drop-shadow-sm" fill="#d8b4fe" />
          <Heart className="absolute top-2/3 -right-4 text-purple-300 w-6 h-6 animate-bounce z-20 drop-shadow-sm delay-150" fill="#d8b4fe" />
          <Heart className="absolute -bottom-10 left-10 text-purple-300 w-8 h-8 animate-bounce z-20 drop-shadow-sm delay-75" fill="#d8b4fe" />
          <Heart className="absolute top-0 -right-8 text-pink-300 w-4 h-4 animate-bounce z-20 opacity-70 delay-300" fill="#f9a8d4" />
          <Heart className="absolute bottom-1/4 -left-10 text-fuchsia-300 w-5 h-5 animate-bounce z-20 opacity-60 delay-500" fill="#f0abfc" />
          <Heart className="absolute -top-6 left-1/4 text-purple-200 w-3 h-3 animate-bounce z-20 opacity-80 delay-1000" fill="#e9d5ff" />
          <Star className="absolute top-[40%] -right-14 text-yellow-300 w-6 h-6 animate-pulse z-0 opacity-80 delay-200" fill="#fde047" />
          <Star className="absolute top-[60%] -right-8 text-yellow-400 w-4 h-4 animate-pulse z-0 opacity-90 delay-500" fill="#facc15" />
          <Moon className="absolute top-[45%] -right-10 text-purple-200 w-8 h-8 z-0 drop-shadow-sm transform -rotate-12 opacity-70" fill="#e9d5ff" />
          <Heart className="absolute top-[35%] -right-10 text-pink-300 w-5 h-5 animate-bounce z-20 opacity-80 delay-700" fill="#f9a8d4" />
          <Heart className="absolute bottom-[20%] -right-12 text-purple-300 w-6 h-6 animate-bounce z-20 drop-shadow-sm delay-300" fill="#d8b4fe" />

          {/* CÍRCULOS DA NUVEM (COM A CLASSE force-white) */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full z-10 force-white"></div>
          <div className="absolute -top-4 -left-1 w-36 h-36 rounded-full z-10 force-white"></div>
          <div className="absolute -top-6 -right-1 w-40 h-40 rounded-full z-10 force-white"></div>
          <div className="absolute top-24 -left-5 w-32 h-32 rounded-full z-10 force-white"></div>
          <div className="absolute top-32 -right-5 w-36 h-36 rounded-full z-10 force-white"></div>
          <div className="absolute bottom-32 -left-5 w-36 h-36 rounded-full z-10 force-white"></div>
          <div className="absolute bottom-24 -right-5 w-32 h-32 rounded-full z-10 force-white"></div>
          <div className="absolute -bottom-10 left-4 w-40 h-40 rounded-full z-10 force-white"></div>
          <div className="absolute -bottom-8 right-4 w-36 h-36 rounded-full z-10 force-white"></div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full z-10 force-white"></div>

          {/* CONTEÚDO */}
          <div className="rounded-[3.5rem] p-6 sm:p-8 relative z-20 flex flex-col gap-7 pt-20 pb-12 force-white text-gray-800">
            
            <section className="relative flex flex-col items-center w-full">
              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 z-30">
                <img src="/bebe-dormindo.png" alt="Bebê Dormindo" className="w-32 h-32 drop-shadow-xl animate-breathe" />
              </div>
              
              <div className="absolute top-1/2 -left-3 w-10 h-16 bg-purple-400 skew-y-12 transform -translate-y-1/2 rounded-sm -z-10"></div>
              <div className="absolute top-1/2 -right-3 w-10 h-16 bg-purple-400 -skew-y-12 transform -translate-y-1/2 rounded-sm -z-10"></div>
              
              <div className="relative bg-gradient-to-b from-purple-50 to-fuchsia-50 border-2 border-purple-200 pt-6 pb-6 px-4 rounded-3xl shadow-sm z-10 flex flex-col items-center w-full">
                <h2 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">
                  Chá de Bebê da
                </h2>
                <h1 className="text-5xl sm:text-6xl font-extrabold text-purple-700 mb-4 text-center" style={{ fontFamily: 'cursive, sans-serif' }}>
                  Heloísa
                </h1>
                
                {/* BOTÃO ADICIONAR AO CALENDÁRIO */}
                <button 
                  onClick={handleAddToCalendar}
                  className="flex items-center gap-2 bg-white/90 hover:bg-purple-100 px-6 py-2 rounded-full border border-purple-200 shadow-sm mt-1 transition-colors active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-purple-700 font-extrabold uppercase tracking-wider text-sm">
                    12 de Setembro
                  </span>
                </button>
              </div>
            </section>

            <section className="text-center px-2 relative z-20 w-full mt-1">
              <p className="text-gray-600 font-medium text-[15px] leading-relaxed">
Estamos preparando o chá de bebê com muito carinho e adoraríamos celebrar com vocês! 💜              </p>
            </section>

            <section className="flex flex-col gap-8 w-full relative z-20">
              
              <div className="bg-purple-200 p-1 rounded-[2rem] shadow-sm">
                <div className="p-6 rounded-[1.7rem] relative force-white">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-extrabold uppercase tracking-widest py-1.5 px-6 rounded-full shadow-md border-2 border-white whitespace-nowrap">
                    Sua Presença
                  </div>
                  
                  <h3 className="text-2xl font-extrabold text-center text-purple-800 mb-1 mt-4">Você vai?</h3>
                  
                  <p className="text-center text-[11px] text-gray-500 font-medium mb-5 mt-1">
                    Por favor, confirme para organizarmos tudo com carinho 💜
                  </p>
                  
                  {confirmado ? (
                    <div className="bg-green-50 border-2 border-green-200 text-green-700 p-5 rounded-2xl text-center font-bold flex flex-col items-center gap-2">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                      Presença confirmada!
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-1.5 w-full">
                          <label htmlFor="nome_convidado" className="text-[11px] font-extrabold text-purple-700 uppercase ml-2 tracking-wide">
                            Seu Nome Completo
                          </label>
                          <input 
                            id="nome_convidado" type="text" placeholder="Digite seu nome aqui" required
                            className="p-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 bg-purple-50/20 shadow-inner text-gray-800 font-bold placeholder-gray-400 w-full text-base transition-colors"
                            value={nome} onChange={(e) => setNome(e.target.value)}
                          />
                        </div>
                        
                        <button
                          type="button" onClick={() => setModalAcompanhantesAberto(true)}
                          className="w-full py-3.5 bg-purple-50/40 border-2 border-dashed border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 shadow-sm text-purple-700 font-bold flex items-center justify-center transition-colors hover:bg-purple-100/50"
                        >
                          <Users className="w-5 h-5 mr-2" />
                          <span className="text-[11px] uppercase tracking-wider">
                            {acompanhantes === '0' ? 'Adicionar Acompanhante' : `${acompanhantes} Acompanhante(s) Adicionado(s)`}
                          </span>
                        </button>
                      </div>
                      
                      <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-extrabold py-4 px-4 rounded-2xl transition-colors shadow-md text-lg mt-1">
                        Confirmar Agora
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="flex justify-center w-full">
                <div className="animate-gentle-bounce">
                  <button 
                    onClick={() => setModalPresenteAberto(true)}
                    className="flex items-center gap-3 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 py-2 px-6 rounded-xl shadow-sm transition-transform hover:scale-105 w-auto"
                  >
                    <img src="/image_838a75.png" alt="Caixa de Presente" className="w-10 h-10 animate-pulse" />
                    <div className="text-left">
                      <p className="text-yellow-800 font-bold text-sm leading-tight uppercase tracking-wide">Lista de Presentes</p>
                      <p className="text-yellow-600 text-[9px] font-medium mt-0.5">Toque para ver sugestões</p>
                    </div>
                  </button>
                </div>
              </div>

              <hr className="border-purple-100 border-t-2 border-dashed w-3/4 mx-auto" />

              <div className="flex flex-col items-center">
                <h2 className="text-purple-800 font-extrabold uppercase tracking-widest text-xl mb-3 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-purple-600" />
                  Endereço
                </h2>
                
                <div className="bg-blue-50/70 rounded-3xl p-6 border border-blue-100 flex flex-col items-center w-full">
                  <h3 className="font-bold text-blue-900 text-lg mb-1">Chácara Juromari</h3>
                  <p className="text-xs text-blue-600 mb-5 text-center font-medium">Toque para traçar a rota até o local da festa:</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-blue-200 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
                      <img src="/google-maps.png" alt="Google Maps" className="w-5 h-5" />
                      Maps
                    </a>
                    <a href={wazeUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-cyan-200 text-cyan-700 font-bold py-3 rounded-xl hover:bg-cyan-50 transition-colors shadow-sm">
                      <img src="/waze.png" alt="Waze" className="w-5 h-5" />
                      Waze
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

{/* RENDERIZANDO OS COMPONENTES MODAIS (Final do App.js) */}
      <AcompanhantesModal isOpen={modalAcompanhantesAberto} onClose={() => setModalAcompanhantesAberto(false)} initialValue={acompanhantes} onConfirm={(qtd) => { setAcompanhantes(qtd); setModalAcompanhantesAberto(false); }} />
      <PresentesModal isOpen={modalPresenteAberto} onClose={() => setModalPresenteAberto(false)} />
      <SucessoModal isOpen={modalSucessoAberto} onClose={() => setModalSucessoAberto(false)} nome={nome} acompanhantes={acompanhantes} />
      
      {/* Modal de Login */}
      <AdminModal 
        isOpen={modalAdminAberto}
        onClose={() => setModalAdminAberto(false)}
        onLoginSuccess={() => {
          setModalAdminAberto(false);
          setPainelAdminAberto(true);
        }}
      />

      {/* Novo Painel Dashboard */}
      <AdminPanel 
        isOpen={painelAdminAberto}
        onClose={() => setPainelAdminAberto(false)}
        convidados={listaConvidados}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;