import { useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../../src/firebase/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect } from "react";


export default function Diary() {
  //Manejo del calendario
  const [selectedDay, setSelectedDay] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth()); //Guardo el mes actual
  const [year, setYear] = useState(new Date().getFullYear()); //Guardo el año actual

  const months = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  //Manejo de la entrada del diario y emociones
  const [text, setText] = useState("");
  const [mood, setMood] = useState(null); // 1–5
  const [tags, setTags] = useState([]);
  const [energy, setEnergy] = useState("normal");
  const [inputTag, setInputTag] = useState("");
  const [sleep, setSleep] = useState(8);   // horas dormidas
  const [stress, setStress] = useState(null); // 1-5

  // Contexto de autenticación
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => { // Guarda la entrada en Firestore
    if (!user) return alert("No hay usuario logueado");

    setLoading(true);

    try {
      const dateKey = `${year}-${month + 1}-${selectedDay}`;

      await setDoc(
        doc(db, "diarios", user.uid, "entradas", dateKey),
        {
          text: text || "",
          energy: energy || "normal",
          mood: mood || 3,
          stress: stress || 3,
          sleep: sleep || 0,
          tags: tags || [],
          timestamp: new Date(),
        },
        { merge: true }
      );

      setSelectedDay(null);
      setText("");
      setMood(null);
      setTags([]);
      setEnergy("normal");
      setSleep(8);
      setStress(null);
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Tu entrada ha sido guardada exitosamente.",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#4f46e5",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar tu entrada. Intenta nuevamente.",
        background: "#3C4B69",
        color: "#fff",
      });
    }
    setLoading(false);
  };

  //Cargar entradas guardadas
  const [entries, setEntries] = useState({});




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

  const filterdaysfuture = (day) => {
    const today = new Date();
    const selectedDate = new Date(year, month, day);
    if (selectedDate > today) {
      Swal.fire({
        icon: "warning",
        title: "Día no válido",
        text: "No puedes seleccionar un día en el futuro.",
        background: "#3C4B69",
        color: "#fff",
      });
    } else {
      setSelectedDay(day);
      const dateKey = `${year}-${month + 1}-${day}`;
      if (entries[dateKey]) {
        setText(entries[dateKey].text || "");
        setMood(entries[dateKey].mood || 3);
        setEnergy(entries[dateKey].energy || "normal");
        setStress(entries[dateKey].stress || 3);
        setSleep(entries[dateKey].sleep || 0);
        setTags(entries[dateKey].tags || []);
      } else {
        setText("");
        setMood(null);
        setEnergy("normal");
        setStress(null);
        setSleep(8);
        setTags([]);
      }
    }
  }

  useEffect(() => {
  if (!user) return;

  const loadEntries = async () => {
    const ref = collection(db, "diarios", user.uid, "entradas");
    const q = query(ref);
    const snap = await getDocs(q);

    let data = {};

    snap.forEach(doc => {
      data[doc.id] = doc.data();
    });

    setEntries(data);
  };

  loadEntries();
}, [user, month, year]);


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
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day;

              const dateKey = `${year}-${month + 1}-${day}`;
              const hasEntry = entries[dateKey] !== undefined;

              return (
                <button
                  key={day}
                  onClick={() => filterdaysfuture(day)}
                  className={`
                    py-2 rounded-lg transition text-sm
                    ${isSelected ? "bg-[#8DD3FF] text-black font-bold"
                    : hasEntry ? "bg-[#8DD3FF55] text-black font-bold border border-[#8DD3FF]"
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

        {!selectedDay ? ( null ) : (  
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSelectedDay(null)}
              className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition"
            >
              ◀ Volver
            </button>

            <h2 className="text-2xl font-semibold">
              Diario del {selectedDay} de {months[month]} de {year}
            </h2>
          </div>
        )}


          {loading && (
            <div className="text-white/90 text-sm mb-2">
              ⏳ Guardando en la nube...
            </div>
          )}

          {/* Sin día seleccionado */}
          {!selectedDay ? (
            <div className="flex flex-col justify-center items-center h-full opacity-70">
              <div className="text-5xl mb-4">📘</div>
              <p className="text-lg text-center">
                Selecciona un día para escribir en tu diario
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-y-auto pr-2">
              <h2 className="text-2xl font-semibold mb-2">
                Diario del {selectedDay} de {months[month]} de {year}
              </h2>

              {/* ENTRADA DE TEXTO */}
              <textarea
                className="
                    w-full p-4 rounded-xl bg-white/20 text-white outline-none
                    backdrop-blur-lg resize-none placeholder-white/50 mt-3
                    min-h-[230px] resize-y
                  "
                placeholder="Escribe tus pensamientos aquí..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>

              

              {/* SELECTOR DE ENERGÍA */}
              <p className="mt-2 text-white/80 text-sm">Nivel de energía:</p>
              <select
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                className="bg-white/20 px-3 py-2 rounded-lg mt-1"
              >
                <option value="baja">Baja</option>
                <option value="normal">Normal</option>
                <option value="alta">Alta</option>
              </select>

              {/* SELECTOR DE EMOCIÓN */}
              <p className="mt-2 text-white/80 text-sm">Estado de ánimo:</p>
              <div className="flex gap-4 mt-2 text-3xl">
                {[1,2,3,4,5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setMood(value)}
                    className={`transition ${
                      mood === value ? "scale-125" : "opacity-70"
                    }`}
                  >
                    {value === 5 && "😁"}
                    {value === 4 && "🙂"}
                    {value === 3 && "😐"}
                    {value === 2 && "🙁"}
                    {value === 1 && "😢"}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-white/80 text-sm">Nivel de estrés:</p>
              <div className="flex gap-4 mt-2 text-3xl">
                {[1,2,3,4,5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setStress(value)}
                    className={`transition ${
                      stress === value ? "scale-125" : "opacity-60"
                    }`}
                  >
                    {value === 5 && "😱"}  {/* Máximo estrés */}
                    {value === 4 && "😣"}
                    {value === 3 && "😕"}
                    {value === 2 && "🙂"}
                    {value === 1 && "😌"}  {/* Casi sin estrés */}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-white/80 text-sm">Horas dormidas:</p>
              <input
                type="number"
                min="0"
                max="24"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                className="bg-white/20 px-3 py-2 rounded-lg mt-1 w-24 outline-none"
              />

              {/* TAGS */}
              <p className="mt-4 text-white/80 text-sm">Etiquetas:</p>
              <div className="flex gap-2 flex-wrap">
                {tags.map((t, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 rounded-xl text-sm flex items-center gap-2"
                  >
                    {t}
                    <button onClick={() => setTags(tags.filter((_, i) => i !== index))}>
                      ❌
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={inputTag}
                  onChange={(e) => setInputTag(e.target.value)}
                  className="bg-white/20 px-3 py-2 rounded-lg flex-grow outline-none"
                  placeholder="Agregar etiqueta..."
                />
                <button
                  className="px-3 py-2 bg-[#8DD3FF] text-black rounded-lg"
                  onClick={() => {
                    if (inputTag.trim() !== "") {
                      setTags([...tags, inputTag.trim()]);
                      setInputTag("");
                    }
                  }}
                >
                  +
                </button>
              </div>

              {/* BOTÓN GUARDAR */}
              <button
                disabled={loading}
                onClick={handleSave}
                className={`
                  mt-4 p-3 rounded-xl font-semibold  
                  shadow-lg transition w-full
                  ${loading 
                    ? "bg-gray-400 text-black opacity-70 cursor-not-allowed" 
                    : "bg-[#8DD3FF] hover:scale-105 text-black"
                  }
                `}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}