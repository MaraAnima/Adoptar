import type { Metadata } from "next";
import Link from "next/link";
import { adoptablePets, getAdoptablePet } from "../../adoption-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return adoptablePets.map((pet) => ({ slug: pet.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pet = getAdoptablePet(slug);

  if (!pet) {
    return {
      title: "Solicitud de adopción | Adoptar",
    };
  }

  return {
    title: `Adoptar a ${pet.name} | Adoptar`,
    description: `Completa el formulario para consultar por la adopción de ${pet.name} en ${pet.shelter}.`,
  };
}

export default async function AdoptionInterestPage({ params }: PageProps) {
  const { slug } = await params;
  const pet = getAdoptablePet(slug);

  if (!pet) {
    return (
      <main className="page-shell">
        <section className="adoption-detail-page">
          <Link className="detail-back-link" href="/">
            <span className="detail-back-chevron" aria-hidden="true" />
            Volver a mascotas
          </Link>
          <div className="adoption-interest-form">
            <div className="interest-form-heading">
              <span>Solicitud de adopción</span>
              <h1>Mascota no encontrada</h1>
              <p>
                La ficha que estás buscando no está disponible por el momento.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="navbar-top-strip">¿Dudas? Escribinos</div>

        <div className="site-navbar">
          <Link className="brand-lockup" href="/" aria-label="Ir al inicio de Adoptar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src="/logo-adoptar-color.png"
              alt="Adoptar"
            />
          </Link>

          <div className="navbar-cta-group">
            <Link className="navbar-outline" href="/">
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <section className="adoption-detail-page" aria-labelledby="adoption-form-title">
        <Link className="detail-back-link" href="/">
          <span className="detail-back-chevron" aria-hidden="true" />
          Volver a mascotas
        </Link>

        <div className="adoption-detail-hero">
          <div className="adoption-detail-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pet.photo} alt={pet.photoAlt} />
          </div>

          <div className="adoption-detail-summary">
            <span className="section-kicker">Solicitud de adopción</span>
            <h1 id="adoption-form-title">Adoptar a {pet.name}</h1>
            <p>{pet.personality}</p>
            <div className="detail-pill-row">
              <span>{pet.kind}</span>
              <span>{pet.age}</span>
              <span>{pet.size}</span>
              <span className="detail-refuge-logo-pill">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pet.shelterLogo} alt={pet.shelterLogoAlt} />
              </span>
            </div>
          </div>
        </div>

        <form className="adoption-interest-form">
          <div className="interest-form-heading">
            <span>Formulario para interesados</span>
            <h2>Dejanos tus datos</h2>
            <p>
              La consulta queda asociada a {pet.name} y al refugio seleccionado.
            </p>
          </div>

          <div className="form-grid">
            <label>
              Mascota
              <span className="adoption-static-value">{pet.name}</span>
            </label>
            <label>
              Refugio
              <span className="adoption-refuge-inline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pet.shelterLogo} alt={pet.shelterLogoAlt} />
                <strong>{pet.shelter}</strong>
              </span>
            </label>
            <label>
              Nombre
              <input placeholder="Tu nombre" />
            </label>
            <label>
              Contacto
              <input placeholder="WhatsApp o email" />
            </label>
          </div>

          <label>
            Contanos sobre el hogar
            <textarea placeholder="Barrio, otros animales, experiencia previa o cualquier dato importante..." />
          </label>

          <button type="button">Enviar interés</button>
        </form>

        <section className="pet-gallery-section" aria-labelledby="pet-gallery-title">
          <div className="interest-form-heading">
            <span>Galería</span>
            <h2 id="pet-gallery-title">Más fotos de {pet.name}</h2>
          </div>

          <div className="pet-gallery-carousel" aria-label={`Más fotos de ${pet.name}`}>
            {pet.galleryPhotos.map((photo) => (
              <figure className="pet-gallery-slide" key={photo.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} />
              </figure>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
