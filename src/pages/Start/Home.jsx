import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Home() {

  const { user } = useAuth();

  const StartNowRedirect = () => {
    if (user) {
      window.location.href = "/personal-diary";
    } else {
      window.location.href = "/user/register";
    }
  }

  return (
    <div style={{ backgroundColor: "#F7FBFF" }}>
      
      {/* HOME */}
      <section
        id="home"
        className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6"
        style={{
          backgroundImage: "url('/fondohome.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay cálido */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00000055] to-[#3C79A655]"></div>

        {/* Contenido */}
        <div className="relative backdrop-blur-xl bg-white/10 p-6 md:p-16 rounded-2xl animate-fadeIn shadow-xl max-w-xl md:max-w-2xl">
          <h1
            className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 drop-shadow-lg"
            style={{ color: "#F7FBFF" }}
          >
            Bienvenido a FeelNow
          </h1>

          <p
            className="text-base md:text-lg mb-6 md:mb-8 drop-shadow mx-auto"
            style={{ color: "#8DD3FF" }}
          >
            Tu espacio personal para registrar tus emociones, analizar tu progreso y conectar con tu bienestar.
          </p>

          <a
            onClick={StartNowRedirect}
            className="px-9 md:px-8 py-4 rounded-xl font-semibold shadow-lg transition hover:scale-105 text-xl"
            style={{
              backgroundColor: "#478dbeff",
              color: "#F7FBFF",
            }}
          >
            Empezar ahora
          </a>
        </div>
      </section>

      {/* QUE ES FEELNOW */}
      <section
        id="que-es"
        className="min-h-screen flex items-center justify-center px-6 py-20"
        style={{ backgroundColor: "#497c9cff" }}
      >
        {/* Container principal */}
        <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* ----- IZQUIERDA: TÍTULO + TEXTO ----- */}
          <div className="flex-1 text-center md:text-left">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 md:mb-6"
              style={{ color: "#1D3B29" }}
            >
              ¿Qué es FeelNow?
            </h2>

            <p
              className="text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "#2D5540" }}
            >
              FeelNow es un rincón para que puedas pausar, respirar y poner en palabras lo que llevás dentro.
              Un lugar donde registrás tus emociones, escribís lo que te pasa sin filtros y recibís pequeños
              gestos que te acompañan: una frase que cae justo, una canción que abraza tu ánimo, o una 
              reflexión creada especialmente para vos. Es un espacio simple, íntimo y humano, pensado para 
              que te escuches y te cuides, un día a la vez.
            </p>
          </div>

          {/* ----- DERECHA: ANIMACIÓN (DIARIO + LÁPIZ) ----- */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-56 h-72 md:w-64 md:h-80">

              {/* Página trasera para grosor */}
              <div className="absolute inset-0 bg-[#F0F4F8] border-4 border-[#3C79A6] rounded-xl shadow-md rotate-[-4deg] translate-x-1 translate-y-1"></div>

              {/* Tapa delantera del diario */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] to-[#F5FAFF] border-4 border-[#3C79A6] rounded-xl shadow-xl rotate-[-3deg]"></div>

              {/* Reflejo sutil */}
              <div className="absolute inset-0 rounded-xl rotate-[-3deg] opacity-15 bg-gradient-to-br from-white/40 to-transparent"></div>

              {/* Líneas del diario */}
              <div className="absolute inset-0 p-6 flex flex-col gap-3 text-left rotate-[-3deg]">
                <div className="w-full h-2 bg-[#8DD3FF55] rounded"></div>
                <div className="w-5/6 h-2 bg-[#8DD3FF55] rounded"></div>
                <div className="w-4/6 h-2 bg-[#8DD3FF55] rounded"></div>
                <div className="w-full h-2 bg-[#8DD3FF55] rounded"></div>
                <div className="w-3/6 h-2 bg-[#8DD3FF55] rounded"></div>
              </div>

              {/* Lápiz realista animado */}
              <div className="absolute bottom-65 right-0 rotate-[-12deg] origin-right animate-write flex items-center">
                <div
                  className="w-5 h-5 bg-[#FFEBBB]"
                  style={{
                    clipPath: "polygon(0 50%, 100% 0, 100% 100%)",
                  }}
                ></div>

                <div className="w-23 h-5 bg-[#E4A34A]"></div>

                <div className="w-3 h-5 bg-[#C0C0C0]"></div>

                <div className="w-4 h-5 bg-[#FF8A8A] rounded-r-md"></div>
              </div>

              {/* vibración sutil */}
              <style>{`
                @keyframes write {
                  0% { transform: rotate(-12deg) translateY(0px); }
                  50% { transform: rotate(-20deg) translateY(1px); }
                  100% { transform: rotate(-12deg) translateY(0px); }
                }
                .animate-write {
                  animation: write 1.2s infinite ease-in-out;
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>


      {/* ------------------- QUIÉNES SOMOS --------------- */}
      {/* QUIÉNES SOMOS */}
      <section
        id="quienes-somos"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 md:px-12 py-20"
        style={{ backgroundColor: "#8DD3FF55" }}
      >

        <style>{`
          .fade-slide-hidden {
            opacity: 0;
            transform: translateX(-40px);
            transition: opacity 0.9s ease-out, transform 0.9s ease-out;
          }
          .fade-slide-visible {
            opacity: 1;
            transform: translateX(0);
          }
        `}</style>

        {/* ==== LÓGICA DE ANIMACIÓN REACT ==== */}
        {(() => {
          const imgRef = React.useRef(null);

          React.useEffect(() => {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add("fade-slide-visible");
                  } else {
                    entry.target.classList.remove("fade-slide-visible");
                  }
                });
              },
              { threshold: 0.4 }
            );

            if (imgRef.current) observer.observe(imgRef.current);
            return () => observer.disconnect();
          }, []);

          return (
            <>
              {/* Imagen izquierda animada */}
              <div className="flex-1 flex justify-center">
                <img
                  ref={imgRef}
                  src="https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/pair-programming-t.jpg"
                  alt="Equipo FeelNow"
                  className="fade-slide-hidden w-64 h-64 md:w-140 md:h-140 object-cover rounded-2xl shadow-xl border-4 border-[#3C79A6]"
                />
              </div>

              {/* Texto derecha */}
              <div className="flex-1 text-center md:text-left">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{ color: "#1D3B29" }}
                >
                  ¿Quiénes somos?
                </h2>

                <p
                  className="text-base md:text-lg leading-relaxed max-w-xl"
                  style={{ color: "#2D5540" }}
                >
                  Somos una pareja de desarrolladores apasionados por la tecnología, el diseño y el bienestar emocional. Juntos, buscamos como combinar todo para poder ofrecer una herramienta digital que realmente marque la diferencia en la vida de las personas.
                  <br /><br />
                  Creemos en el poder de la empatía, la escucha activa y el autocuidado como pilares fundamentales
                  para una vida plena. Por eso, hemos creado FeelNow, un espacio seguro y acogedor donde cada usuario
                  puede expresarse libremente, reflexionar sobre sus emociones y encontrar apoyo en su camino hacia el bienestar.
                </p>

                <p className="mt-6 font-semibold" style={{ color: "#1D3B29" }}>
                  <b>Fundadores:</b> Facundo Maldonado & Ariana Salvay
                </p>
              </div>
            </>
          );
        })()}
      </section>

    </div>
  );
}
