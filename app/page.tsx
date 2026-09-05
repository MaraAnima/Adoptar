"use client";

import Link from "next/link";
import { useState } from "react";
import { adoptablePets } from "./adoption-data";

type DonationItem = {
  name: string;
  tag: string;
  price: string;
  detail: string;
  image: string;
  imageAlt: string;
};

type View = "landing" | "adoptions" | "donations";

const donationBenefits = [
  {
    title: "Donaciones desde montos chicos",
    text: "Aportes simples para cubrir necesidades reales de cada refugio.",
    image: "/producto-astro-senior.png",
    imageAlt: "Bolsa de alimento para donar",
  },
  {
    title: "Refugios verificados",
    text: "Solicitudes asociadas a organizaciones identificadas por Tu Ración.",
    image: "/refugio-perros.png",
    imageAlt: "Logo de refugio de perros",
  },
  {
    title: "Prioridad por alimento",
    text: "La rutina diaria empieza por raciones, bolsas y nutrición constante.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_at_shelter.jpg?width=360",
    imageAlt: "Perro real en refugio",
  },
  {
    title: "También higiene y abrigo",
    text: "Arena, camas, mantas y limpieza para mejorar los espacios comunes.",
    image: "/producto-cama-tr251.png",
    imageAlt: "Cama para mascotas solicitada por refugios",
  },
  {
    title: "Ayuda para perros y gatos",
    text: "El selector muestra refugios y artículos según la especie que elijas.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shelter_Kitten_1.jpg?width=360",
    imageAlt: "Gatito real esperando adopción",
  },
  {
    title: "Solicitud simple para sumarse",
    text: "Los refugios pueden dejar sus datos y contar qué necesitan recibir.",
    image: "/refugio-gatos.png",
    imageAlt: "Logo de refugio de gatos",
  },
];

const refugeOptions = {
  dogs: [
    {
      name: "APA",
      logo: "/refugio-perros.png",
      logoAlt: "Logo de APA",
    },
    {
      name: "PGA",
      logo: "/refugio-pga.png",
      logoAlt: "Logo de PGA Uruguay",
    },
  ],
  cats: [
    {
      name: "Catitos",
      logo: "/refugio-gatos.png",
      logoAlt: "Logo de Catitos",
    },
    {
      name: "Bastet",
      logo: "/refugio-bastet.png",
      logoAlt: "Logo de Bastet refugio para gatos",
    },
    {
      name: "PGA",
      logo: "/refugio-pga.png",
      logoAlt: "Logo de PGA Uruguay",
    },
  ],
};

type RefugeKind = keyof typeof refugeOptions;

const switchMascots: Record<RefugeKind, { src: string; alt: string }> = {
  dogs: {
    src: "/mascota-perro.png",
    alt: "Perrito ilustrado saludando",
  },
  cats: {
    src: "/mascota-gato.png",
    alt: "Gatito ilustrado sentado",
  },
};

const requestedItemsByRefuge: Record<string, DonationItem[]> = {
  APA: [
    {
      name: "ASTRO Perro senior 7kg",
      tag: "Urgente",
      price: "$ 1.690",
      detail: "Alimento senior para perros adultos mayores del refugio.",
      image: "/producto-astro-senior.png",
      imageAlt: "Bolsa de alimento ASTRO Perro senior 7kg",
    },
    {
      name: "CAMA PARA MASCOTAS 100X75X16 - TR251",
      tag: "Abrigo",
      price: "$ 2.390",
      detail: "Cama grande para descanso y recuperación.",
      image: "/producto-cama-tr251.png",
      imageAlt: "Cama para mascotas rectangular azul",
    },
    {
      name: "Apetipet jarabe - Suplemento vitamínico 100ml",
      tag: "Salud",
      price: "$ 540",
      detail: "Suplemento para perros con bajo apetito o en recuperación.",
      image: "/producto-apetipet-jarabe.png",
      imageAlt: "Caja de Apetipet jarabe suplemento vitamínico 100ml",
    },
  ],
  Catitos: [
    {
      name: "PROGATO sanitario granulado SUPER PREMIUM 4KG",
      tag: "Higiene",
      price: "$ 420",
      detail: "Sanitario granulado para mantener limpios los espacios comunes.",
      image: "/producto-progato-super-premium.png",
      imageAlt: "Bolsa de sanitario granulado PROGATO Super Premium 4kg",
    },
    {
      name: "CAMA PARA MASCOTAS 100X75X16 - TR251",
      tag: "Descanso",
      price: "$ 2.390",
      detail: "Cama amplia para gatos rescatados en adaptacion.",
      image: "/producto-cama-tr251.png",
      imageAlt: "Cama para mascotas rectangular azul",
    },
  ],
  Bastet: [
    {
      name: "PROGATO sanitario granulado SUPER PREMIUM 4KG",
      tag: "Arena",
      price: "$ 420",
      detail: "Sanitario granulado para gatos rescatados y hogares de tránsito.",
      image: "/producto-progato-super-premium.png",
      imageAlt: "Bolsa de sanitario granulado PROGATO Super Premium 4kg",
    },
    {
      name: "CAMA PARA MASCOTAS 100X75X16 - TR251",
      tag: "Descanso",
      price: "$ 2.390",
      detail: "Camas para gatitos en recuperación y grupos de convivencia.",
      image: "/producto-cama-tr251.png",
      imageAlt: "Cama para mascotas rectangular azul",
    },
  ],
  PGA: [
    {
      name: "ASTRO Perro senior 7kg",
      tag: "Perros",
      price: "$ 1.690",
      detail: "Alimento para perros adultos y senior cuidados por PGA.",
      image: "/producto-astro-senior.png",
      imageAlt: "Bolsa de alimento ASTRO Perro senior 7kg",
    },
    {
      name: "PROGATO sanitario granulado SUPER PREMIUM 4KG",
      tag: "Gatos",
      price: "$ 420",
      detail: "Sanitario para gatos rescatados por PGA.",
      image: "/producto-progato-super-premium.png",
      imageAlt: "Bolsa de sanitario granulado PROGATO Super Premium 4kg",
    },
    {
      name: "Apetipet jarabe - Suplemento vitamínico 100ml",
      tag: "Salud",
      price: "$ 540",
      detail: "Suplemento para animales con bajo apetito o recuperación.",
      image: "/producto-apetipet-jarabe.png",
      imageAlt: "Caja de Apetipet jarabe suplemento vitamínico 100ml",
    },
  ],
};

const allRequestedItems = Object.values(requestedItemsByRefuge).flat();

const homeCards = [
  {
    title: "Historias que esperan familia",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shelter_Kitten_1.jpg?width=900",
    imageAlt: "Gatito real esperando adopción",
  },
  {
    title: "Refugios acompañados por Tu Ración",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_at_shelter.jpg?width=900",
    imageAlt: "Perro real en refugio",
  },
  {
    title: "Ayuda concreta para el día a día",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_in_animal_shelter_in_Washington,_Iowa.jpg?width=900",
    imageAlt: "Perro esperando adopción en refugio",
  },
];

const serviceCards = [
  {
    title: "Adopciones",
    text: "Mascotas vinculadas a refugios para encontrar hogares responsables.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shelter_Kitten_1.jpg?width=360",
    imageAlt: "Gatito real esperando adopción",
  },
  {
    title: "Donaciones",
    text: "Listas de artículos reales para cubrir alimento, higiene y abrigo.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Families_find_new_furry_friends_at_adoption_event_140726-M-DN141-001.jpg?width=360",
    imageAlt: "Mascota y familia durante una jornada de adopción",
  },
  {
    title: "Refugios aliados",
    text: "Espacios verificados que pueden sumar solicitudes y recibir apoyo.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_at_shelter.jpg?width=360",
    imageAlt: "Perro real en refugio",
  },
  {
    title: "Alimento",
    text: "Prioridad para bolsas, raciones y productos de nutrición diaria.",
    image: "/producto-astro-senior.png",
    imageAlt: "Bolsa de alimento para perro senior",
  },
  {
    title: "Salud y cuidado",
    text: "Apoyo con suplementos, camas, limpieza y necesidades especiales.",
    image: "/producto-apetipet-jarabe.png",
    imageAlt: "Suplemento vitamínico para mascotas",
  },
  {
    title: "Seguimiento",
    text: "Consultas organizadas para que cada interesado llegue al refugio correcto.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_in_animal_shelter_in_Washington,_Iowa.jpg?width=360",
    imageAlt: "Perro esperando adopción en refugio",
  },
];

const impactSlides = [
  {
    kicker: "Con una donación",
    value: "$ 1.000",
    text: "Ayudás a cubrir alimento, higiene o abrigo para refugios aliados.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Families_find_new_furry_friends_at_adoption_event_140726-M-DN141-001.jpg?width=1200",
    imageAlt: "Mascota y familia durante una jornada de adopción",
  },
  {
    kicker: "Con alimento",
    value: "$ 1.690",
    text: "Una bolsa puede sostener varios días de rutina para perros rescatados.",
    image: "/producto-astro-senior.png",
    imageAlt: "Bolsa de alimento ASTRO para donar a refugios",
  },
  {
    kicker: "Con abrigo",
    value: "$ 2.390",
    text: "Una cama mejora el descanso de mascotas en recuperación o adaptación.",
    image: "/producto-cama-tr251.png",
    imageAlt: "Cama para mascotas solicitada por refugios",
  },
];

export default function Home() {
  const [activeView, setActiveView] = useState<View>("landing");
  const [currentImpactIndex, setCurrentImpactIndex] = useState(0);
  const [selectedRefugeKind, setSelectedRefugeKind] =
    useState<RefugeKind>("dogs");
  const [selectedRefugeName, setSelectedRefugeName] =
    useState<string | null>(null);
  const selectedRefuges = refugeOptions[selectedRefugeKind];
  const selectedMascot = switchMascots[selectedRefugeKind];
  const requestedItems = selectedRefugeName
    ? requestedItemsByRefuge[selectedRefugeName]
    : allRequestedItems;
  const currentImpactSlide = impactSlides[currentImpactIndex];
  const footerTitleId =
    activeView === "donations" ? "footer-refuge-title" : "footer-faq-title";

  const selectRefugeKind = (kind: RefugeKind) => {
    setSelectedRefugeKind(kind);
    setSelectedRefugeName(null);
  };

  const showPreviousImpact = () => {
    setCurrentImpactIndex((index) =>
      index === 0 ? impactSlides.length - 1 : index - 1,
    );
  };

  const showNextImpact = () => {
    setCurrentImpactIndex((index) =>
      index === impactSlides.length - 1 ? 0 : index + 1,
    );
  };

  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="navbar-top-strip">¿Dudas? Escribinos</div>

        <div className="site-navbar">
          <button
            className="brand-lockup"
            type="button"
            onClick={() => setActiveView("landing")}
            aria-label="Ir al inicio de Adoptar"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src="/logo-adoptar-color.png"
              alt="Adoptar"
            />
          </button>

          <div className="navbar-cta-group">
            <button
              className="navbar-primary"
              type="button"
              onClick={() => setActiveView("adoptions")}
            >
              Quiero adoptar
            </button>
            <button
              className="navbar-outline"
              type="button"
              onClick={() => setActiveView("donations")}
            >
              Ayuda a un refugio
            </button>
          </div>
        </div>
      </header>

      {activeView === "landing" ? (
        <section className="home-real" aria-labelledby="home-title">
          <div className="home-hero">
            <div className="home-hero-copy">
              <span className="section-kicker">Adoptar</span>
              <h1 id="home-title">Una oportunidad cambia todo</h1>
              <p>
                Conectamos mascotas, refugios y personas que quieren ayudar con
                adopciones responsables y donaciones concretas.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="home-hero-image"
              src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_in_animal_shelter_in_Washington,_Iowa.jpg?width=1920"
              alt="Mascota real esperando una familia"
            />
          </div>

          <div className="home-feature-band">
            {homeCards.map((card) => (
              <article className="home-feature-card" key={card.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt={card.imageAlt} />
                <h2>{card.title}</h2>
              </article>
            ))}
          </div>

          <section className="home-services" aria-labelledby="home-services-title">
            <span className="section-kicker">Programas y servicios</span>
            <h2 id="home-services-title">Todo el circuito de ayuda en un solo lugar</h2>
            <p>
              Adoptar organiza adopciones, donaciones y necesidades de refugios
              para que cada acción tenga un destino claro.
            </p>
            <div className="home-services-grid">
              {serviceCards.map((card) => (
                <article className="home-service-card" key={card.title}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt={card.imageAlt} />
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="home-impact" aria-labelledby="home-impact-title">
            <h2 id="home-impact-title">El impacto de tu ayuda</h2>
            <div className="home-impact-row">
              <button
                className="home-impact-arrow"
                type="button"
                onClick={showPreviousImpact}
                aria-label="Impacto anterior"
              >
                <span className="detail-back-chevron" aria-hidden="true" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={currentImpactSlide.image}
                src={currentImpactSlide.image}
                alt={currentImpactSlide.imageAlt}
              />
              <article aria-live="polite">
                <span>{currentImpactSlide.kicker}</span>
                <strong>{currentImpactSlide.value}</strong>
                <p>{currentImpactSlide.text}</p>
                <button type="button" onClick={() => setActiveView("donations")}>
                  Hacer una donación
                </button>
              </article>
              <button
                className="home-impact-arrow is-next"
                type="button"
                onClick={showNextImpact}
                aria-label="Impacto siguiente"
              >
                <span className="detail-back-chevron" aria-hidden="true" />
              </button>
            </div>
            <div className="home-impact-dots" aria-label="Seleccionar impacto">
              {impactSlides.map((slide, index) => (
                <button
                  className={currentImpactIndex === index ? "is-active" : ""}
                  type="button"
                  onClick={() => setCurrentImpactIndex(index)}
                  aria-label={`Ver impacto: ${slide.kicker}`}
                  aria-pressed={currentImpactIndex === index}
                  key={slide.kicker}
                />
              ))}
            </div>
          </section>

        </section>
      ) : activeView === "adoptions" ? (
        <section className="adoption-home" aria-labelledby="adoption-title">
          <div className="adoption-hero">
            <div className="adoption-copy">
              <span className="section-kicker">Adopciones</span>
              <h1 id="adoption-title">Mascotas en adopción</h1>
              <p>
                Perros y gatos que esperan una oportunidad, con refugios acompañados
                por Tu Ración para que el camino hasta casa sea más simple.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="adoption-hero-photo"
              src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_in_animal_shelter_in_Washington,_Iowa.jpg?width=1920"
              alt="Perro real en un refugio esperando adopción"
            />
          </div>

          <div className="adoption-grid">
            {adoptablePets.map((pet) => (
              <article className="pet-card" key={pet.name}>
                <div className="pet-portrait">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pet.photo} alt={pet.photoAlt} />
                </div>
                <div className="pet-card-copy">
                  <span>{pet.status}</span>
                  <strong className="pet-card-shelter">{pet.shelter}</strong>
                  <h2>{pet.name}</h2>
                  <dl>
                    <div>
                      <dt>Edad</dt>
                      <dd>{pet.age}</dd>
                    </div>
                    <div>
                      <dt>Tamaño</dt>
                      <dd>{pet.size}</dd>
                    </div>
                  </dl>
                  <p>{pet.personality}</p>
                  <Link
                    className="pet-interest-button"
                    href={`/adopcion/${pet.slug}`}
                  >
                    Me interesa adoptar
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="donation-banner" aria-label="Banner de donaciones">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="donation-banner-image"
              src="/banner-donaciones-tu-racion.png"
              alt="Bolsas que ayudan. Sin vueltas. Sin espera. Sin abandono."
            />
          </section>

          <section className="refuge-switch-section" aria-labelledby="refuge-switch-title">
            <div className="refuge-switch-heading">
              <h2 id="refuge-switch-title">¿A qué refugio quieres donar?</h2>
              <p>Cambia entre refugios de perros y de gatos para ver sus prioridades.</p>
            </div>

            <div className="switch-stage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="switch-mascot"
                src={selectedMascot.src}
                alt={selectedMascot.alt}
                key={selectedRefugeKind}
              />

              <div className="refuge-switch" role="group" aria-label="Tipo de refugio">
                <button
                  className={selectedRefugeKind === "dogs" ? "is-active" : ""}
                  onClick={() => selectRefugeKind("dogs")}
                  type="button"
                  aria-pressed={selectedRefugeKind === "dogs"}
                >
                  Perros
                </button>
                <button
                  className={selectedRefugeKind === "cats" ? "is-active" : ""}
                  onClick={() => selectRefugeKind("cats")}
                  type="button"
                  aria-pressed={selectedRefugeKind === "cats"}
                >
                  Gatos
                </button>
              </div>
            </div>

            <div className="refuge-result" aria-live="polite">
              <div className="refuge-logos">
                {selectedRefuges.map((refuge) => (
                  <button
                    className={`refuge-logo-button ${
                      selectedRefugeName === refuge.name ? "is-selected" : ""
                    }`}
                    type="button"
                    onClick={() => setSelectedRefugeName(refuge.name)}
                    aria-label={`Ver artículos solicitados por ${refuge.name}`}
                    key={refuge.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="refuge-logo"
                      src={refuge.logo}
                      alt={refuge.logoAlt}
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="donations-section" aria-labelledby="donations-title">
            <div className="donations-copy">
              <span className="section-kicker">Donaciones</span>
              <h1 id="donations-title">Ayuda con comida y artículos para mascotas</h1>
            </div>

            <div className="donations-panel">
              <div className="panel-heading">
                <div>
                  <span>Comprar para donar</span>
                  <h2>Artículos solicitados</h2>
                  <p>{selectedRefugeName ? `Por ${selectedRefugeName}` : "Todas las solicitudes"}</p>
                </div>
              </div>

              <div className="item-list">
                {requestedItems.map((item, index) => (
                  <article className="donation-item" key={`${item.name}-${item.tag}-${index}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="item-image"
                      src={item.image}
                      alt={item.imageAlt}
                    />
                    <div>
                      <span>{item.tag}</span>
                      <h3>{item.name}</h3>
                      <p>{item.detail}</p>
                    </div>
                    <strong>{item.price}</strong>
                    <button type="button">Donar</button>
                  </article>
                ))}
              </div>

            </div>
          </section>

          <section className="benefits-section" aria-labelledby="benefits-title">
            <div className="benefits-heading">
              <h2 id="benefits-title">Ayuda pensada para la rutina del refugio</h2>
              <p>
                Donaciones concretas que acompañan el día a día: alimento,
                higiene, abrigo y artículos esenciales.
              </p>
            </div>

            <div className="benefits-grid">
              {donationBenefits.map((benefit) => (
                <article className="benefit-card" key={benefit.title}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={benefit.image} alt={benefit.imageAlt} />
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </>
      )}

      <footer
        className={`site-footer ${activeView === "donations" ? "has-refuge-form" : ""}`}
        aria-labelledby={footerTitleId}
      >
        {activeView === "donations" ? (
          <form className="footer-faq-card footer-refuge-form" id="sumar-refugio">
            <h2 id="footer-refuge-title">Quiero que mi refugio sea parte</h2>
            <div className="form-grid">
              <label>
                Refugio
                <input placeholder="Nombre del refugio" />
              </label>
              <label>
                Contacto
                <input placeholder="WhatsApp o email" />
              </label>
            </div>
            <textarea placeholder="Contanos qué necesitan: alimento, arena, mantas, medicamentos..." />
            <button type="button">Enviar solicitud</button>
          </form>
        ) : (
          <div className="footer-faq-card">
            <h2 id="footer-faq-title">¿Dudas sobre adopción?</h2>
            <p>
              En preguntas frecuentes encontrás respuestas sobre adopción,
              donaciones y refugios. Si no encontrás lo que buscás, escribinos
              y te ayudamos.
            </p>
            <button type="button">Ir a preguntas frecuentes</button>
          </div>
        )}

        <div className="footer-content">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="footer-logo" src="/logo-adoptar.png" alt="Adoptar" />
            <p>
              Adoptar es un espacio de Tu Ración para unir mascotas,
              refugios y personas que quieren ayudar con alimento, cuidado y
              hogares responsables.
            </p>
          </div>

          <nav className="footer-column" aria-label="Institucional">
            <h3>Institucional</h3>
            <button type="button">Sobre Tu Ración</button>
            <button type="button">Transparencia</button>
            <button type="button">Historias de impacto</button>
            <button type="button">Locales</button>
            <button type="button">FAQ</button>
          </nav>

          <nav className="footer-column" aria-label="Cómo ayudar">
            <h3>Cómo ayudar?</h3>
            <button type="button" onClick={() => setActiveView("adoptions")}>
              Quiero adoptar
            </button>
            <button type="button" onClick={() => setActiveView("donations")}>
              Quiero donar
            </button>
            <button type="button" onClick={() => setActiveView("donations")}>
              Ayuda a un refugio
            </button>
          </nav>
        </div>
      </footer>
    </main>
  );
}
