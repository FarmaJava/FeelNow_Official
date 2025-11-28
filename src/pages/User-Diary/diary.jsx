import { useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext.jsx";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import OpenAI from "openai";


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
  const [sleep, setSleep] = useState(8);   // horas dormidas
  const [stress, setStress] = useState(null); // 1-5
  const [aiResponse, setAiResponse] = useState("");

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

const generateAIResponse = async () => {
  if (!text || text.trim().length < 100) 
    return Swal.fire("Escribe más de 100 caracteres");

  Swal.fire({
    title: "Generando...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  })

  try {
        const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
        });


    const data = await res.json();
    if (data.error) throw new Error(data.error);

    setAiResponse(data.output);
    Swal.close();
  } catch (err) {
    console.error("Error generando respuesta:", err);
    Swal.fire("Error", err.message, "error");
  }
};




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
          className={`h-full transition-all duration-500 ease-in-out bg-[#3C4B69aa] flex flex-col p-4 text-white shadow-xl border-r border-white/20 ${
            selectedDay ? "w-[25%]" : "w-[60%]"
          }`}
        >
          <h2 className="text-2xl font-bold text-center">Calendario</h2>

          {/* Controles del mes */}
          <div className="flex justify-between items-center my-4">
            <button onClick={prevMonth} className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition">
              ◀
            </button>
            <p className="font-semibold text-lg">
              {months[new Date().getMonth()]} {new Date().getFullYear()}
            </p>
            <button onClick={nextMonth} className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition">
              ▶
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm opacity-80 mb-2">
            {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Grid del calendario */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {/* Espacios vacíos antes del día 1 */}
            {Array.from({ length: new Date().getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="opacity-0 select-none">
                x
              </div>
            ))}

            {/* Días del mes */}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day;
              const dateKey = `2025-11-${day}`;
              const hasEntry = entries[dateKey] !== undefined;

              return (
                <button
                  key={day}
                  onClick={() => filterdaysfuture(day)}
                  className={`py-2 rounded-lg transition text-sm ${
                    isSelected
                      ? "bg-[#8DD3FF] text-black font-bold"
                      : hasEntry
                      ? "bg-[#8DD3FF55] text-black font-bold border border-[#8DD3FF]"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* COLUMNA DERECHA: DIARIO */}
        <div
          className={`h-full transition-all duration-500 ease-in-out flex flex-col bg-[#2a344fbb] text-white p-4 ${
            selectedDay ? "w-[75%]" : "w-[40%]"
          }`}
        >
          {!selectedDay ? (
            <div className="flex flex-col justify-center items-center h-full opacity-70">
              <div className="text-5xl mb-4">📘</div>
              <p className="text-lg text-center">Selecciona un día para escribir en tu diario</p>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-y-auto pr-2">
              {/* Encabezado diario */}
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => setSelectedDay(null)}
                  className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition"
                >
                  ◀ Volver
                </button>
                <h2 className="text-2xl font-semibold">
                  Diario del {selectedDay} de {months[new Date().getMonth()]} de {new Date().getFullYear()}
                </h2>
              </div>

              {/* Estado de guardado */}
              {loading && <div className="text-white/90 text-sm mb-2">⏳ Guardando en la nube...</div>}

              {/* Entrada de texto */}
              <textarea
                className="w-full p-4 rounded-xl bg-white/20 text-white outline-none backdrop-blur-lg resize-none placeholder-white/50 mt-3 min-h-[230px] resize-y"
                placeholder="Escribe tus pensamientos aquí..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>

              {/* Selectores */}
              <div className="mt-4 space-y-4">
                {/* Energía */}
                <p className="text-white/80 text-sm">Nivel de energía:</p>
                <div className="flex gap-2 mt-2">
                  {[
                    { value: "baja", label: "🔋 Baja", color: "bg-[#4da6ff44]" },
                    { value: "normal", label: "🔋 Normal", color: "bg-[#f5c54244]" },
                    { value: "alta", label: "⚡ Alta", color: "bg-[#ff545444]" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setEnergy(item.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        energy === item.value ? `${item.color} border-white scale-105` : "bg-white/10 border-transparent opacity-70"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Estado de ánimo */}
                <p className="text-white/80 text-sm">Estado de ánimo:</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {[
                    { value: 5, label: "😁 Muy feliz", color: "bg-[#7CFF7C44]" },
                    { value: 4, label: "🙂 Bien", color: "bg-[#C4FF7C44]" },
                    { value: 3, label: "😐 Neutral", color: "bg-[#FFF97C44]" },
                    { value: 2, label: "🙁 Triste", color: "bg-[#FFC67C44]" },
                    { value: 1, label: "😢 Muy mal", color: "bg-[#FF7C7C44]" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setMood(item.value)}
                      className={`px-4 py-2 rounded-full text-sm transition-all border ${
                        mood === item.value ? `${item.color} border-white scale-105` : "bg-white/10 border-transparent opacity-60"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Estrés */}
                <p className="text-white/80 text-sm">Nivel de estrés:</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {[
                    { value: 1, label: "😌 Relajado", color: "bg-[#7CFF7C33]" },
                    { value: 2, label: "🙂 Bajo", color: "bg-[#C4FF7C33]" },
                    { value: 3, label: "😕 Normal", color: "bg-[#FFF97C33]" },
                    { value: 4, label: "😣 Alto", color: "bg-[#FFC67C33]" },
                    { value: 5, label: "😱 Muy alto", color: "bg-[#FF7C7C33]" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setStress(item.value)}
                      className={`px-4 py-2 rounded-full text-sm transition-all border ${
                        stress === item.value ? `${item.color} border-white scale-105` : "bg-white/10 border-transparent opacity-60"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Horas dormidas */}
                <div>
                  <p className="text-white/80 text-sm">Horas dormidas:</p>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={sleep}
                    onChange={(e) => setSleep(e.target.value)}
                    className="bg-white/20 px-3 py-2 rounded-lg mt-1 w-24 outline-none"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="mt-4 flex flex-col gap-2">
                <button
                  disabled={loading}
                  onClick={handleSave}
                  className={`p-3 rounded-xl font-semibold shadow-lg transition w-full ${
                    loading ? "bg-gray-400 text-black opacity-70 cursor-not-allowed" : "bg-[#8DD3FF] hover:scale-105 text-black"
                  }`}
                >
                  {loading ? "Guardando..." : "Guardar"}
                </button>

                <button
                  onClick={generateAIResponse}
                  className="p-3 rounded-xl font-semibold bg-green-400 text-black shadow-lg hover:scale-105 transition"
                >
                  Generar Respuesta con IA
                </button>
              </div>

              {/* Respuesta IA */}
              {aiResponse && (
                <div className="mt-4 p-4 bg-white/20 rounded-xl text-white">
                  <h3 className="font-semibold mb-2">Respuesta de tu amigo IA 💙</h3>
                  <p className="whitespace-pre-line">{aiResponse}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}