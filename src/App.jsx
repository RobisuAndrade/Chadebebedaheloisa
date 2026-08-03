import React, { useState, useEffect } from 'react';
import { MapPin, Users, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Importações do REALTIME DATABASE
import { ref, push, onValue, remove, update } from 'firebase/database';
import { db } from './firebase'; 

// Importando os componentes modais
import AcompanhantesModal from './components/AcompanhantesModal';
import SucessoModal from './components/SucessoModal';
import AdminModal from './components/AdminModal';
import AdminPanel from './components/AdminPanel';
import RotaModal from './components/RotaModal';
import PerguntaAcompanhanteModal from './components/PerguntaAcompanhanteModal';

// =========================================================
// COMPONENTE: BORBOLETA SVG
// =========================================================
const BorboletaSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.96 14.945c-.84-2.12-2.31-4.04-4.22-5.46-1.57-1.17-3.66-1.72-5.6-.82-1.8.84-2.6 2.87-2.02 4.7.75 2.37 3.54 3.73 5.92 3.12 1.48-.38 2.8-1.2 3.96-2.17.65-.55 1.3-1.2 1.96-1.87v2.51c0 .4.33.73.74.73.4 0 .73-.33.73-.73v-2.51c.66.67 1.3 1.32 1.96 1.87 1.16.97 2.48 1.8 3.96 2.17 2.38.61 5.17-.75 5.92-3.12.58-1.83-.22-3.86-2.02-4.7-1.94-.9-4.03-.35-5.6.82-1.91 1.42-3.38 3.34-4.22 5.46z"/>
    <path d="M12 4c-.41 0-.75.34-.75.75v7.5c0 .41.34.75.75.75s.75-.34.75-.75v-7.5C12.75 4.34 12.41 4 12 4z"/>
  </svg>
);

// =========================================================
// COMPONENTE: ENXAME DE ENTRADA
// =========================================================
const enxameInicial = [
  { id: 1, xEnd: -150, yEnd: -400, scale: 0.8, delay: 0, cor: 'text-[#d8b4fe]' },
  { id: 2, xEnd: 200, yEnd: -500, scale: 1.2, delay: 0.2, cor: 'text-[#a385bc]' },
  { id: 3, xEnd: -50, yEnd: -600, scale: 0.6, delay: 0.1, cor: 'text-[#7a8b6c]' },
  { id: 4, xEnd: 120, yEnd: -350, scale: 0.9, delay: 0.4, cor: 'text-[#d8b4fe]' },
  { id: 5, xEnd: -250, yEnd: -450, scale: 1.1, delay: 0.3, cor: 'text-[#a385bc]' },
  { id: 6, xEnd: 80, yEnd: -700, scale: 0.7, delay: 0.5, cor: 'text-[#d8b4fe]' },
  { id: 7, xEnd: -180, yEnd: -250, scale: 1.0, delay: 0.15, cor: 'text-[#7a8b6c]' },
  { id: 8, xEnd: 250, yEnd: -600, scale: 0.85, delay: 0.35, cor: 'text-[#a385bc]' },
  { id: 9, xEnd: -100, yEnd: -800, scale: 1.3, delay: 0.6, cor: 'text-[#d8b4fe]' },
  { id: 10, xEnd: 150, yEnd: -300, scale: 0.75, delay: 0.25, cor: 'text-[#7a8b6c]' },
  { id: 11, xEnd: -200, yEnd: -550, scale: 0.95, delay: 0.45, cor: 'text-[#d8b4fe]' },
  { id: 12, xEnd: 180, yEnd: -750, scale: 1.05, delay: 0.55, cor: 'text-[#a385bc]' },
];

const EnxameDeBorboletas = () => {
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMostrar(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-end justify-center overflow-hidden pb-10">
      {enxameInicial.map((b) => (
        <motion.div
          key={b.id}
          className={`absolute ${b.cor}`}
          initial={{ opacity: 0, x: 0, y: 150, scale: b.scale, rotate: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            x: b.xEnd, 
            y: b.yEnd, 
            rotate: [0, b.xEnd > 0 ? 45 : -45, b.xEnd > 0 ? -15 : 15, b.xEnd > 0 ? 45 : -45]
          }}
          transition={{ duration: 3.5, delay: b.delay, ease: "easeOut" }}
        >
          <BorboletaSVG className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  );
};

// =========================================================
// APLICATIVO PRINCIPAL
// =========================================================
function App() {
  const [nome, setNome] = useState('');
  const [acompanhantes, setAcompanhantes] = useState('0');
  const [confirmado, setConfirmado] = useState(false);
  
  const [listaConvidados, setListaConvidados] = useState([]);
  
  const [modalSucessoAberto, setModalSucessoAberto] = useState(false);
  const [modalAcompanhantesAberto, setModalAcompanhantesAberto] = useState(false);
  const [modalAdminAberto, setModalAdminAberto] = useState(false);
  const [painelAdminAberto, setPainelAdminAberto] = useState(false);
  
  const [modalRotaAberto, setModalRotaAberto] = useState(false);
  const [dadosRota, setDadosRota] = useState({ url: '', nomeApp: '' });

  const [modalPerguntaAberto, setModalPerguntaAberto] = useState(false);
  const [mostrarDataCalendario, setMostrarDataCalendario] = useState(true);
  const [fluxoAutoSubmit, setFluxoAutoSubmit] = useState(false);

  // Controle inteligente do botão "Voltar" do celular/navegador
  useEffect(() => {
    const handlePopState = (event) => {
      if (modalSucessoAberto) { setModalSucessoAberto(false); event.preventDefault(); }
      else if (modalAcompanhantesAberto) { setModalAcompanhantesAberto(false); event.preventDefault(); }
      else if (modalPerguntaAberto) { setModalPerguntaAberto(false); event.preventDefault(); }
      else if (modalRotaAberto) { setModalRotaAberto(false); event.preventDefault(); }
      else if (modalAdminAberto) { setModalAdminAberto(false); event.preventDefault(); }
      else if (painelAdminAberto) { setPainelAdminAberto(false); event.preventDefault(); }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [modalSucessoAberto, modalAcompanhantesAberto, modalPerguntaAberto, modalRotaAberto, modalAdminAberto, painelAdminAberto]);

  const abrirModalComHistorico = (setModal) => {
    window.history.pushState({ modalOpen: true }, '');
    setModal(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMostrarDataCalendario(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const convidadosRef = ref(db, 'convidados');
    const unsubscribe = onValue(convidadosRef, (snapshot) => {
      const data = snapshot.val();
      const convidadosArray = [];
      if (data) {
        for (let id in data) {
          convidadosArray.push({ id, ...data[id] });
        }
      }
      setListaConvidados(convidadosArray);
    });
    return () => unsubscribe();
  }, []);

  const confirmarPresencaFinal = async (qtdAcompanhantes) => {
    try {
      const convidadosRef = ref(db, 'convidados');
      await push(convidadosRef, { nome, acompanhantes: qtdAcompanhantes }); 
      setConfirmado(true);
      setModalPerguntaAberto(false);
      abrirModalComHistorico(setModalSucessoAberto);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao confirmar presença. Tente novamente.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (document.activeElement) document.activeElement.blur(); 
    
    if (!nome.trim()) return;

    if (acompanhantes === '0') {
      abrirModalComHistorico(setModalPerguntaAberto);
    } else {
      confirmarPresencaFinal(acompanhantes);
    }
  };

  const handleDelete = async (id) => {
    const convidadoRef = ref(db, `convidados/${id}`);
    await remove(convidadoRef);
  };

  const handleUpdate = async (id, novoNome, novosAcompanhantes) => {
    const convidadoRef = ref(db, `convidados/${id}`);
    await update(convidadoRef, { nome: novoNome, acompanhantes: novosAcompanhantes });
  };

  const handleAddToCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20260912T150000\nDTEND:20260912T190000\nSUMMARY:Chá de Bebê da Heloísa\nLOCATION:Chácara Juromari\nEND:VEVENT\nEND:VCALENDAR`;
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

  const abrirConfirmacaoRota = (url, nomeApp) => {
    setDadosRota({ url, nomeApp });
    abrirModalComHistorico(setModalRotaAberto);
  };

  return (
    <div className="min-h-screen w-full flex justify-center sm:py-6 overflow-x-hidden font-sans text-gray-800 relative bg-[#fffbf0]">
      
      {/* O ENXAME DE ENTRADA */}
      <EnxameDeBorboletas />

      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-90"
        style={{ 
          backgroundImage: "url('/Rodapeatecabecalho.png')", 
          backgroundSize: "cover", 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "center" 
        }}
      ></div>

      <div className="w-full max-w-[420px] sm:max-w-xl min-h-screen sm:min-h-[850px] relative z-10 flex flex-col pb-24 sm:bg-white/30 sm:backdrop-blur-sm sm:rounded-[2.5rem] sm:shadow-2xl sm:border sm:border-white/60 overflow-hidden">
        
        <div 
          className="absolute top-4 right-4 z-[60] opacity-40 hover:opacity-100 cursor-pointer p-2 transition-opacity bg-white/50 rounded-full backdrop-blur-sm" 
          onClick={() => abrirModalComHistorico(setModalAdminAberto)}
        >
          <Lock className="w-5 h-5 text-[#8b739e]" />
        </div>

        <div 
          className="w-full relative shrink-0 z-15 sm:h-[320px] md:h-[380px]" 
          style={{ 
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)', 
            maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)' 
          }}
        >
          <img 
            src="/Banner.jpeg" 
            alt="Chá de Bebê da Heloísa" 
            className="w-full h-full sm:object-cover sm:object-center object-contain relative z-0"
          />
        </div>

        <div className="w-full px-6 sm:px-12 flex flex-col items-center gap-6 relative z-20 flex-grow -mt-4 sm:-mt-6">
          
          <motion.div 
            className="absolute top-[-20px] right-[5%] z-30 text-[#d8b4fe] pointer-events-none drop-shadow-sm" 
            animate={{ y: [0, -15, 0], x: [0, 10, -5, 0], rotate: [-5, 10, -5] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <BorboletaSVG className="w-8 h-8 opacity-80" />
          </motion.div>

          <motion.div 
            className="absolute top-[30px] left-[2%] z-30 text-[#7a8b6c] pointer-events-none drop-shadow-sm" 
            animate={{ y: [0, 15, 0], x: [0, -12, 5, 0], rotate: [5, -15, 5] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <BorboletaSVG className="w-5 h-5 opacity-70" />
          </motion.div>

          {/* ========================================================= */}
          {/* 1. CALENDÁRIO */}
          {/* ========================================================= */}
          <button 
            onClick={handleAddToCalendar}
            className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md w-full py-3.5 rounded-3xl border border-[#e3d5e8] shadow-sm transition-transform active:scale-95 hover:bg-[#faf6ff]"
          >
            <img src="/calendario.png" alt="Calendário" className="w-5 h-5 object-contain opacity-80" />
            
            <div className="relative h-5 w-[140px] flex items-center justify-center overflow-hidden">
              <motion.span
                initial={false}
                animate={{ y: mostrarDataCalendario ? 0 : -30, opacity: mostrarDataCalendario ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute font-extrabold uppercase tracking-widest text-[13px] text-[#8b739e] whitespace-nowrap"
              >
                12 de Setembro
              </motion.span>
              <motion.span
                initial={false}
                animate={{ y: !mostrarDataCalendario ? 0 : 30, opacity: !mostrarDataCalendario ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute font-extrabold uppercase tracking-widest text-[11px] text-[#a385bc] whitespace-nowrap"
              >
                Clique para Salvar
              </motion.span>
            </div>
          </button>

          {/* ========================================================= */}
          {/* 2. FORMULÁRIO DE PRESENÇA */}
          {/* ========================================================= */}
          <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#8b5cf6]/5 border border-[#e9d5ff] flex flex-col items-center relative mt-2">
            
            <motion.div 
              className="absolute top-[25%] left-[-20px] z-30 text-[#a385bc] pointer-events-none drop-shadow-sm" 
              animate={{ y: [0, 20, 0], x: [0, -10, 5, 0], rotate: [5, -15, 5] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <BorboletaSVG className="w-7 h-7 opacity-70" />
            </motion.div>
            
            <motion.div 
              className="absolute top-[60%] right-[-15px] z-30 text-[#d8b4fe] pointer-events-none drop-shadow-sm" 
              animate={{ y: [0, -25, 0], x: [0, 15, -5, 0], rotate: [-10, 20, -10] }} 
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <BorboletaSVG className="w-4 h-4 opacity-90" />
            </motion.div>

            <div className="absolute -top-3.5 bg-[#b28fc4] text-white text-[10px] font-extrabold uppercase tracking-widest py-1.5 px-6 rounded-full shadow-sm">
              Sua Presença
            </div>

            <p className="text-center text-[10px] sm:text-xs text-[#9d7bb0] font-bold mt-3 mb-6 uppercase tracking-wider">
              Por favor, confirme para organizarmos tudo com carinho 💜
            </p>

            {confirmado ? (
              <div className="bg-[#fdfbf6] border border-[#d8b4fe] text-[#9333ea] p-6 rounded-2xl text-center flex flex-col items-center gap-3 w-full shadow-sm animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#b28fc4]" />
                <span className="font-bold">Presença confirmada!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                
                <div className="flex gap-2 w-full items-end">
                  <div className="flex flex-col gap-1.5 flex-1 text-left">
                    <label htmlFor="nome_convidado" className="text-[10px] font-bold text-[#9d7bb0] uppercase ml-1">
                      Seu Nome Completo
                    </label>
                    <input 
                      id="nome_convidado" 
                      type="text" 
                      placeholder="Digite seu nome aqui" 
                      required
                      enterKeyHint="done"
                      className="p-4 border border-[#e3d5e8] rounded-2xl text-sm focus:outline-none focus:border-[#9d7bb0] focus:ring-2 focus:ring-[#f3e8ff] bg-white/90 text-gray-700 w-full placeholder-gray-400 shadow-sm"
                      value={nome} 
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  
                  <button
                    type="button" 
                    onClick={() => {
                      if (document.activeElement) document.activeElement.blur();
                      setFluxoAutoSubmit(false);
                      abrirModalComHistorico(setModalAcompanhantesAberto);
                    }}
                    className="relative h-[54px] w-[54px] shrink-0 bg-white/90 border border-dashed border-[#d8b4fe] rounded-2xl text-[#9333ea] flex items-center justify-center transition-colors hover:bg-[#faf5ff] shadow-sm"
                  >
                    <Users className="w-6 h-6 opacity-80" />
                    {acompanhantes !== '0' && (
                      <span className="absolute -top-2 -right-2 bg-[#b28fc4] text-white text-[11px] font-extrabold w-6 h-6 flex items-center justify-center rounded-full shadow-md border-2 border-white">
                        +{acompanhantes}
                      </span>
                    )}
                  </button>
                </div>
                
                <button type="submit" className="w-full bg-[#a385bc] hover:bg-[#8e68ab] text-white font-extrabold py-4 rounded-2xl text-sm mt-1 transition-colors shadow-md uppercase tracking-wider">
                  Confirmar Agora
                </button>
              </form>
            )}
          </div>

          {/* ========================================================= */}
          {/* 3. LOCALIZAÇÃO */}
          {/* ========================================================= */}
          <div className="w-full flex flex-col items-center relative">
            
            <motion.div 
              className="absolute top-[20px] left-[5%] z-30 text-[#a385bc] pointer-events-none drop-shadow-sm" 
              animate={{ y: [0, -20, 0], x: [0, -15, 5, 0], rotate: [10, -5, 10] }} 
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <BorboletaSVG className="w-6 h-6 opacity-75" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-[-15px] right-[-10px] z-30 text-[#7a8b6c] pointer-events-none drop-shadow-sm" 
              animate={{ y: [0, -10, 0], x: [0, 15, 0], rotate: [-10, 5, -10] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <BorboletaSVG className="w-5 h-5 opacity-90" />
            </motion.div>
            
            <div className="bg-[#f0f4eb]/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border-2 border-[#c5d6ba]/50 flex flex-col items-center w-full shadow-lg shadow-[#5c6b4d]/10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#e4ebd0]/40 rounded-full blur-xl pointer-events-none"></div>

              <h2 className="text-[#5c6b4d] font-extrabold uppercase tracking-widest text-[16px] mb-1 flex items-center gap-1.5 relative z-10">
                <MapPin className="w-5 h-5" /> Localização
              </h2>
              
              <h3 className="font-semibold text-[#7a8b6c] text-sm sm:text-base mb-5 relative z-10">
                Chácara Juromari
              </h3>
              
              <div className="flex flex-row gap-3 w-full relative z-10 mb-4">
                <button 
                  onClick={() => abrirConfirmacaoRota(googleMapsUrl, 'Google Maps')} 
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#c5d6ba] text-[#5c6b4d] font-bold py-3.5 rounded-2xl hover:bg-[#f8faf5] transition-colors shadow-sm text-sm"
                >
                  <img src="/google-maps.png" alt="Google Maps" className="w-5 h-5" /> Maps
                </button>
                <button 
                  onClick={() => abrirConfirmacaoRota(wazeUrl, 'Waze')} 
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#c5d6ba] text-[#5c6b4d] font-bold py-3.5 rounded-2xl hover:bg-[#f8faf5] transition-colors shadow-sm text-sm"
                >
                  <img src="/waze.png" alt="Waze" className="w-5 h-5" /> Waze
                </button>
              </div>

              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#8b9e7d] text-center font-bold relative z-10">
                Toque nos botões para traçar a rota
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COMPONENTES MODAIS */}
      <PerguntaAcompanhanteModal 
        isOpen={modalPerguntaAberto} 
        onNao={() => confirmarPresencaFinal('0')} 
        onSim={() => { 
          setModalPerguntaAberto(false); 
          setFluxoAutoSubmit(true); 
          abrirModalComHistorico(setModalAcompanhantesAberto); 
        }} 
      />
      
      <AcompanhantesModal 
        isOpen={modalAcompanhantesAberto} 
        onClose={() => {
          setModalAcompanhantesAberto(false);
          setFluxoAutoSubmit(false);
        }} 
        initialValue={acompanhantes} 
        onConfirm={(qtd) => { 
          setAcompanhantes(qtd); 
          setModalAcompanhantesAberto(false);
          if (fluxoAutoSubmit) {
            confirmarPresencaFinal(qtd);
            setFluxoAutoSubmit(false);
          }
        }} 
      />
      
      <SucessoModal isOpen={modalSucessoAberto} onClose={() => setModalSucessoAberto(false)} nome={nome} acompanhantes={acompanhantes} />
      <RotaModal isOpen={modalRotaAberto} onClose={() => setModalRotaAberto(false)} urlDestino={dadosRota.url} nomeApp={dadosRota.nomeApp} />
      
      <AdminModal isOpen={modalAdminAberto} onClose={() => setModalAdminAberto(false)} onLoginSuccess={() => { setModalAdminAberto(false); abrirModalComHistorico(setPainelAdminAberto); }} />
      <AdminPanel isOpen={painelAdminAberto} onClose={() => setPainelAdminAberto(false)} convidados={listaConvidados} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;