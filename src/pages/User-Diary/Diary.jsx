import { useState } from "react";

export default function Diary() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth()); //Guardo el mes actual
  const [year, setYear] = useState(new Date().getFullYear()); //Guardo el año actual

  const months = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  // Primer día del mes (0 = domingo)
  const firstDay = new Date(year, month, 1).getDay(); // Saco el primer día del mes
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Saco la cantidad de días del mes

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative p-4"
      style={{
        backgroundImage: "url('/fondologin.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Filtro azulado */}
      <div className="absolute inset-0 bg-[#5ea7c855] backdrop-blur-sm"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-6xl flex h-[80vh] overflow-hidden rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl bg-white/10">

        {/* COLUMNA IZQUIERDA: CALENDARIO */}
        <div
          className={`
            h-full transition-all duration-500 ease-in-out bg-[#3C4B69aa]
            flex flex-col p-4 text-white shadow-xl border-r border-white/20
            ${selectedDay ? "w-[25%]" : "w-[60%]"} 
          `}
        >
          <h2 className="text-2xl font-bold text-center">Calendario</h2>

          {/* Controles del mes */}
          <div className="flex justify-between items-center my-4">
            <button
              onClick={prevMonth}
              className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition"
            >
              ◀
            </button>

            <p className="font-semibold text-lg">
              {months[month]} {year}
            </p>

            <button
              onClick={nextMonth}
              className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition"
            >
              ▶
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm opacity-80 mb-2">
            <div>Do</div><div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sa</div>
          </div>

          {/* Grid del calendario */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm">

            {/* Espacios vacíos antes del día 1 */}
            {Array.from({ length: firstDay }).map((_, i) => ( //Crea un array con celdas vacías hasta el primer día del mes
              <div key={`e-${i}`} className="opacity-0 select-none">x</div>
            ))}

            {/* Días reales del mes */}
            {Array.from({ length: daysInMonth }).map((_, i) => { //Crea un array con los días del mes y renderiza
              const day = i;
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    py-2 rounded-lg transition text-sm
                    ${isSelected
                      ? "bg-[#8DD3FF] text-black font-bold"
                      : "bg-white/20 hover:bg-white/30"}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* COLUMNA DERECHA: DIARIO */}
        <div
          className={`
            h-full transition-all duration-500 ease-in-out flex flex-col
            bg-[#2a344fbb] text-white p-4
            ${selectedDay ? "w-[75%]" : "w-[40%]"}
          `}
        >
          {/* Sin día seleccionado */}
          {!selectedDay ? (
            <div className="flex flex-col justify-center items-center h-full opacity-70">
              <div className="text-5xl mb-4">📘</div>
              <p className="text-lg text-center">
                Selecciona un día para escribir en tu diario
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <h2 className="text-2xl font-semibold mb-2">
                Diario del {selectedDay} de {months[month]} de {year}
              </h2>

              <textarea
                className="
                  flex-1 w-full p-4 rounded-xl bg-white/20 text-white outline-none
                  backdrop-blur-lg resize-none placeholder-white/50
                "
                placeholder="Escribe tus pensamientos aquí..."
              ></textarea>

              <button className="
                mt-4 p-3 rounded-xl font-semibold bg-[#8DD3FF] 
                text-black shadow-lg hover:scale-105 transition
              ">
                Guardar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
