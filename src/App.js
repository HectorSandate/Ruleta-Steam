import React, { useState } from 'react';
import { Gamepad2, RefreshCw, Upload, HelpCircle } from 'lucide-react';

const SteamGameRoulette = () => {
  const [games, setGames] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [error, setError] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json.response && json.response.games) {
          setGames(json.response.games);
          setError(null);
          setShowInstructions(false);
        } else if (Array.isArray(json)) {
          const formattedGames = json.map(game => ({
            appid: game.appid || Math.random(),
            name: game.name || game.title || 'Juego sin nombre'
          }));
          setGames(formattedGames);
          setError(null);
          setShowInstructions(false);
        } else {
          setError('Formato JSON incorrecto. Asegúrate de usar el JSON de Steam.');
        }
      } catch (err) {
        setError('Error al leer el archivo. Verifica que sea un JSON válido.');
      }
    };
    reader.readAsText(file);
  };

  const handlePasteJSON = (e) => {
    const jsonText = e.target.value;
    if (jsonText.length < 50) return;

    try {
      const json = JSON.parse(jsonText);
      if (json.response && json.response.games) {
        setGames(json.response.games);
        setError(null);
        setShowInstructions(false);
      } else if (Array.isArray(json)) {
        const formattedGames = json.map(game => ({
          appid: game.appid || Math.random(),
          name: game.name || game.title || 'Juego sin nombre'
        }));
        setGames(formattedGames);
        setError(null);
        setShowInstructions(false);
      } else {
        setError('Formato JSON incorrecto');
      }
    } catch (err) {
      // Ignorar errores mientras se está escribiendo
    }
  };

  const spinRoulette = () => {
    if (games.length === 0 || spinning) return;

    setSpinning(true);
    setSelectedGame(null);

    const randomIndex = Math.floor(Math.random() * games.length);
    const spins = 5;
    const extraRotation = (randomIndex / games.length) * 360;
    const totalRotation = rotation + (spins * 360) + extraRotation;

    setRotation(totalRotation);

    setTimeout(() => {
      setSelectedGame(games[randomIndex]);
      setSpinning(false);
    }, 4000);
  };

  const resetApp = () => {
    setGames([]);
    setSelectedGame(null);
    setError(null);
    setShowInstructions(true);
    setRotation(0);
  };

  if (showInstructions || games.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <Gamepad2 className="w-10 h-10 md:w-12 md:h-12" />
              Ruleta de Juegos de Steam
            </h1>
            <p className="text-blue-300">¿No sabes qué jugar? ¡Deja que la ruleta decida!</p>
          </div>

          <div className="bg-slate-800 border-2 border-blue-500 rounded-xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-start gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Cómo obtener tus juegos de Steam:</h2>
                <ol className="text-blue-200 space-y-3 list-decimal list-inside">
                  <li>Ve a <a href="https://steamcommunity.com/dev/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-semibold">steamcommunity.com/dev/apikey</a> y genera tu API Key (pon "localhost" como dominio)</li>
                  <li>Consigue tu Steam ID64:
                    <ul className="ml-6 mt-2 space-y-1 text-sm">
                      <li>• Ve a tu perfil de Steam en el navegador</li>
                      <li>• Si la URL es <code className="bg-slate-900 px-2 py-1 rounded">steamcommunity.com/profiles/NÚMEROS</code>, esos números son tu Steam ID64</li>
                      <li>• Si es <code className="bg-slate-900 px-2 py-1 rounded">steamcommunity.com/id/nombre</code>, usa <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">steamid.io</a> para convertirlo</li>
                    </ul>
                  </li>
                  <li>Abre esta URL en tu navegador (reemplaza los valores):
                    <div className="bg-slate-900 p-3 rounded mt-2 text-xs md:text-sm break-all text-blue-300">
                      https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=<span className="text-yellow-400">TU_API_KEY</span>&steamid=<span className="text-yellow-400">TU_STEAM_ID</span>&format=json&include_appinfo=1
                    </div>
                  </li>
                  <li>Copia TODO el texto JSON que aparece</li>
                  <li>Pégalo abajo o guárdalo como archivo .json y súbelo</li>
                </ol>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-6 text-red-200">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-blue-300 font-semibold mb-2">
                  Opción 1: Pega tu JSON aquí
                </label>
                <textarea
                  className="w-full h-40 bg-slate-900 text-white p-4 rounded-lg border-2 border-blue-500 focus:border-blue-400 focus:outline-none font-mono text-sm"
                  placeholder='Pega aquí el JSON completo de Steam (debe empezar con {"response":...)'
                  onChange={handlePasteJSON}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-slate-600"></div>
                <span className="text-slate-400 font-semibold">O</span>
                <div className="flex-1 border-t border-slate-600"></div>
              </div>

              <div>
                <label className="block text-blue-300 font-semibold mb-2">
                  Opción 2: Sube tu archivo JSON
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="block w-full text-white file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer file:font-semibold cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Gamepad2 className="w-10 h-10 md:w-12 md:h-12" />
            Ruleta de Juegos
          </h1>
          <p className="text-blue-300 text-lg mb-4">
            {games.length} juegos cargados
          </p>
          <button
            onClick={resetApp}
            className="text-blue-400 hover:text-blue-300 underline text-sm"
          >
            Cargar otros juegos
          </button>
        </div>

        <div className="relative mb-12">
          <div className="w-80 h-80 md:w-96 md:h-96 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            
            <div 
              className="relative w-full h-full rounded-full border-8 border-blue-500 shadow-2xl overflow-hidden"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                background: (() => {
                  const displayedGames = games.slice(0, 20);
                  const segmentAngle = 360 / displayedGames.length;
                  const colors = ['#1e293b', '#334155', '#0f172a', '#475569'];
                  return `conic-gradient(from 0deg, ${displayedGames.map((_, i) => {
                    return `${colors[i % colors.length]} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`;
                  }).join(', ')})`;
                })()
              }}
            >
              {games.slice(0, 20).map((game, index) => {
                const totalSlices = Math.min(games.length, 20);
                const segmentAngle = 360 / totalSlices;
                const rotationAngle = (index * segmentAngle) + (segmentAngle / 2);

                return (
                  <div
                    key={game.appid}
                    className="absolute top-0 left-1/2 w-1 h-1/2 origin-bottom flex justify-center"
                    style={{
                      transform: `translate(-50%, 0) rotate(${rotationAngle}deg)`,
                    }}
                  >
                    <div className="mt-4 md:mt-6">
                      <p 
                        className="text-white text-[10px] md:text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis w-32 md:w-40 text-center"
                        style={{
                          transform: 'rotate(-90deg)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                        }}
                      >
                        {game.name}
                      </p>
                    </div>
                  </div>
                );
              })}
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full border-4 border-yellow-600 shadow-lg flex items-center justify-center z-20">
                  <Gamepad2 className="w-6 h-6 md:w-8 md:h-8 text-slate-900" />
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[15px] md:border-l-[20px] border-r-[15px] md:border-r-[20px] border-t-[25px] md:border-t-[30px] border-l-transparent border-r-transparent border-t-red-500 z-30 drop-shadow-lg"></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={spinRoulette}
            disabled={spinning || games.length === 0}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white text-lg md:text-xl font-bold px-8 md:px-12 py-3 md:py-4 rounded-full shadow-2xl transform transition-all hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
          >
            <RefreshCw className={`w-5 h-5 md:w-6 md:h-6 ${spinning ? 'animate-spin' : ''}`} />
            {spinning ? '¡Girando!' : '¡GIRAR LA RULETA!'}
          </button>
        </div>

        {selectedGame && (
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-2 border-blue-400 rounded-xl p-6 md:p-8 text-center backdrop-blur-sm animate-pulse mb-8">
            <p className="text-blue-300 text-lg mb-2">🎮 ¡Juega a:</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedGame.name}</h2>
            {selectedGame.playtime_forever > 0 && (
              <p className="text-blue-200 mb-4">
                Tiempo jugado: {Math.round(selectedGame.playtime_forever / 60)} horas
              </p>
            )}
            <a
              href={`steam://run/${selectedGame.appid}`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-colors"
            >
              Abrir en Steam
            </a>
          </div>
        )}

        <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 max-h-80 overflow-y-auto backdrop-blur-sm">
          <h3 className="text-white font-bold text-lg mb-4 text-center">
            Biblioteca ({games.length} juegos)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {games.map(game => (
              <div key={game.appid} className="text-blue-200 text-sm truncate hover:text-white transition-colors bg-slate-900/50 rounded px-3 py-2">
                🎮 {game.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteamGameRoulette;