import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the real Adoptar home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.doesNotMatch(html, />ADOPTA</);
  assert.doesNotMatch(html, /navbar-heart/);
  assert.match(html, /¿Dudas\? Escribinos/);
  assert.match(html, /src="\/logo-adoptar-color\.png"/);
  assert.match(html, /src="\/logo-adoptar\.png"/);
  assert.match(html, /Una oportunidad cambia todo/);
  assert.match(html, /class="home-hero-copy"/);
  assert.doesNotMatch(html, /Tu ayuda suma|Elegí cómo ayudar|Una vez|Mensual|Donar ahora/);
  assert.doesNotMatch(html, /Un apartado simple, inspirado en una tienda pet/);
  assert.doesNotMatch(html, /\$ 250|\$ 500|\$ 2\.000/);
  assert.match(html, /Conectamos mascotas, refugios y personas/);
  assert.match(html, /Historias que esperan familia/);
  assert.match(html, /Refugios acompañados por Tu Ración/);
  assert.match(html, /Programas y servicios/);
  assert.match(html, /Todo el circuito de ayuda en un solo lugar/);
  assert.match(html, /El impacto de tu ayuda/);
  assert.match(html, /¿Dudas sobre adopción\?/);
  assert.match(html, /Ir a preguntas frecuentes/);
  assert.match(html, /Adoptar es un espacio de Tu Ración/);
  assert.doesNotMatch(html, /TR Adopta/);
  assert.match(html, /Cómo ayudar\?/);
  assert.doesNotMatch(html, /Navegación principal/);
  assert.doesNotMatch(html, />Inicio</);
  assert.doesNotMatch(html, /<button[^>]*>Adoptar<\/button>/);
  assert.doesNotMatch(html, />Donar</);
  assert.match(html, /Quiero adoptar/);
  assert.match(html, /Ayuda a un refugio/);
  assert.doesNotMatch(html, /Mascotas en adopción/);
  assert.doesNotMatch(html, /Lola|Nina|Bruno|Milo/);
  assert.doesNotMatch(html, /Me interesa adoptar/);
  assert.doesNotMatch(html, /href="\/adopcion\/lola"/);
  assert.doesNotMatch(html, />Refugios</);
  assert.match(html, /Dog_at_shelter\.jpg/);
  assert.match(html, /Shelter_Kitten_1\.jpg/);
  assert.match(html, /Families_find_new_furry_friends/);
  assert.doesNotMatch(html, /Perritos en adopcion|Mascotas en adopcion|Encontrales una familia|Perrito ilustrado de TR Adopta|Toto|Mora/);
  assert.doesNotMatch(html, /src="\/banner-donaciones-tu-racion\.png"/);
  assert.doesNotMatch(html, /Donapet|dona<\/strong>|pet<\/span>/);
  assert.doesNotMatch(html, /banner-brand-card|banner-message-card|banner-photo-card/);
  assert.doesNotMatch(html, /Desde \$ 390 para ayudar hoy/);
  assert.doesNotMatch(html, /Selecciona un logo de refugio/);
  assert.doesNotMatch(html, /Formulario para interesados|Enviar inter[eé]s|adoption-interest-form/);
  assert.doesNotMatch(html, /Sumar refugio/);
  assert.doesNotMatch(html, /Huellas del Sur|Michi Refugio|Patitas Unidas/);
  assert.doesNotMatch(html, /hero-section|topbar|Carrito|selectedShelter/i);
});

test("keeps the adoption home and refuge help section compact", async () => {
  const [page, data, detailPage, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/adoption-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/adopcion/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /type View = "landing" \| "adoptions" \| "donations"/);
  assert.match(page, /useState<View>\("landing"\)/);
  assert.match(page, /activeView/);
  assert.doesNotMatch(page, /selectedAdoptionPetName|selectedAdoptionPet|openAdoptionForm|scrollIntoView/);
  assert.match(page, /navbar-top-strip/);
  assert.match(page, /site-navbar/);
  assert.match(page, /logo-adoptar-color\.png/);
  assert.match(page, /logo-adoptar\.png/);
  assert.doesNotMatch(page, /<span>ADOPTA<\/span>/);
  assert.doesNotMatch(page, /navbar-heart/);
  assert.match(page, /home-real/);
  assert.match(page, /home-hero/);
  assert.match(page, /home-hero-copy/);
  assert.match(page, /id="home-title"/);
  assert.doesNotMatch(page, /home-donation-card|donationAmounts|home-donation-tabs|home-donation-amounts|home-donation-submit/);
  assert.match(page, /homeFeature|homeCards|serviceCards/);
  assert.match(page, /impactSlides/);
  assert.match(page, /currentImpactIndex/);
  assert.match(page, /showPreviousImpact/);
  assert.match(page, /showNextImpact/);
  assert.match(page, /Una oportunidad cambia todo/);
  assert.match(page, /setActiveView\("adoptions"\)/);
  assert.match(page, /Ayuda a un refugio/);
  assert.match(page, /adoption-home/);
  assert.match(page, /adoption-grid/);
  assert.match(page, /adoptablePets/);
  assert.match(page, /className="pet-card-shelter"/);
  assert.ok(page.indexOf("{pet.status}") < page.indexOf("{pet.shelter}"));
  assert.doesNotMatch(page, /<dt>Especie<\/dt>/);
  assert.doesNotMatch(page, /<dt>Refugio<\/dt>/);
  assert.match(data, /AdoptablePet/);
  assert.match(data, /slug: "lola"/);
  assert.match(data, /slug: "nina"/);
  assert.match(data, /shelter: "APA"/);
  assert.match(data, /shelter: "Catitos"/);
  assert.equal((data.match(/status: "Busca hogar responsable"/g) ?? []).length, 4);
  assert.doesNotMatch(data, /Listo para conocer familia|Busca adopcion con patio|En socializacion|anos/);
  assert.match(data, /shelterLogo: "\/refugio-perros\.png"/);
  assert.match(data, /shelterLogo: "\/refugio-gatos\.png"/);
  assert.match(data, /galleryPhotos/);
  assert.match(detailPage, /generateStaticParams/);
  assert.match(detailPage, /getAdoptablePet/);
  assert.match(detailPage, /Adoptar a/);
  assert.match(detailPage, /Formulario para interesados/);
  assert.match(detailPage, /Enviar interés/);
  assert.match(detailPage, /pet-gallery-section/);
  assert.match(detailPage, /pet-gallery-carousel/);
  assert.doesNotMatch(detailPage, /nav-link-button is-active/);
  assert.match(detailPage, /detail-refuge-logo-pill/);
  assert.doesNotMatch(detailPage, /<span>ADOPTA<\/span>/);
  assert.match(
    detailPage,
    /<span className="detail-refuge-logo-pill">[\s\S]*?<img src=\{pet\.shelterLogo\} alt=\{pet\.shelterLogoAlt\} \/>[\s\S]*?<\/span>/,
  );
  assert.match(detailPage, /adoption-static-value/);
  assert.match(detailPage, /adoption-refuge-inline/);
  assert.doesNotMatch(detailPage, /<input readOnly value=\{pet\.name\}/);
  assert.doesNotMatch(detailPage, /adoption-refuge-logo-field/);
  assert.match(page, /Mascotas en adopción/);
  assert.match(data, /Dog_in_animal_shelter_in_Washington|Dog_at_shelter/);
  assert.match(data, /width=1080/);
  assert.match(data, /width=1920/);
  assert.doesNotMatch(data, /width=900/);
  assert.match(data, /photoCredit/);
  assert.doesNotMatch(page, /pet\.photoCredit/);
  assert.doesNotMatch(detailPage, /pet\.photoCredit/);
  assert.match(page, /pet-interest-button/);
  assert.match(page, /href=\{`\/adopcion\/\$\{pet\.slug\}`\}/);
  assert.doesNotMatch(page, /adoption-interest-form|Inter[eé]s por|Enviar inter[eé]s/);
  assert.match(page, /donations-section/);
  assert.match(page, /donation-banner/);
  assert.match(page, /\/banner-donaciones-tu-racion\.png/);
  assert.doesNotMatch(page, /banner-brand-card|banner-message-card|banner-photo-card|banner-bag-image|banner-bag-slogan/);
  assert.match(page, /\/producto-astro-senior\.png/);
  assert.match(page, /\/producto-progato-super-premium\.png/);
  assert.match(page, /\/mascota-perro\.png/);
  assert.match(page, /\/mascota-gato\.png/);
  assert.match(page, /benefits-section/);
  assert.match(page, /refuge-switch-section/);
  assert.match(page, /\/refugio-gatos\.png/);
  assert.match(page, /\/refugio-bastet\.png/);
  assert.match(page, /\/refugio-pga\.png/);
  assert.match(page, /name: "Bastet"/);
  assert.match(page, /name: "PGA"/);
  assert.match(page, /Logo de Bastet refugio para gatos/);
  assert.match(page, /Logo de PGA Uruguay/);
  assert.match(page, /logoAlt: "Logo de APA"/);
  assert.match(page, /useState/);
  assert.doesNotMatch(page, /shelter-form-section/);
  assert.match(page, /footerTitleId/);
  assert.match(page, /has-refuge-form/);
  assert.match(page, /footer-refuge-form/);
  assert.match(page, /footer-refuge-title/);
  assert.match(page, /Quiero que mi refugio sea parte/);
  assert.ok(page.indexOf("donations-section") < page.indexOf("benefits-section"));
  assert.ok(page.indexOf("benefits-section") < page.indexOf("site-footer"));
  assert.equal((page.match(/className=\{`site-footer/g) ?? []).length, 1);
  assert.doesNotMatch(page, /useMemo|checkout/i);
  assert.match(styles, /site-navbar/);
  assert.match(styles, /site-header/);
  assert.match(styles, /navbar-top-strip/);
  assert.match(styles, /\.navbar-top-strip\s*\{[^}]*background: var\(--teal-dark\)/);
  assert.doesNotMatch(styles, /\.navbar-top-strip\s*\{[^}]*repeating-linear-gradient/);
  assert.match(styles, /brand-lockup/);
  assert.match(styles, /brand-logo/);
  assert.match(styles, /\.brand-lockup\s*\{[^}]*background: transparent/);
  assert.doesNotMatch(styles, /\.brand-lockup\s*\{[^}]*background: var\(--teal-dark\)/);
  assert.match(styles, /navbar-primary/);
  assert.match(styles, /navbar-outline/);
  assert.doesNotMatch(styles, /navbar-heart/);
  assert.doesNotMatch(styles, /brand-mark/);
  assert.match(styles, /home-real/);
  assert.match(styles, /\.page-shell\s*\{[^}]*padding: 0;/);
  assert.match(styles, /home-hero/);
  assert.match(styles, /\.home-hero\s*\{[^}]*min-height: clamp\(310px, 38vw, 470px\)/);
  assert.match(styles, /\.home-hero::after\s*\{[^}]*linear-gradient\(90deg, rgba\(0, 111, 119, 0\.78\), rgba\(0, 111, 119, 0\.32\) 44%, rgba\(0, 111, 119, 0\.02\)\)/);
  assert.match(styles, /home-hero-copy/);
  assert.doesNotMatch(styles, /home-donation-card|home-donation-tabs|home-donation-amounts|home-donation-submit/);
  assert.match(styles, /home-feature-band/);
  assert.match(styles, /\.home-feature-band\s*\{[^}]*grid-template-columns: repeat\(3, minmax\(220px, 310px\)\)/);
  assert.match(styles, /\.home-feature-band::after\s*\{[^}]*border-radius: 50% 50% 0 0/);
  assert.match(styles, /\.home-feature-card\s*\{[^}]*grid-template-rows: 178px 1fr/);
  assert.match(styles, /home-services-grid/);
  assert.match(styles, /home-impact/);
  assert.match(styles, /home-impact-arrow/);
  assert.match(styles, /home-impact-dots/);
  assert.match(styles, /site-footer/);
  assert.match(styles, /site-footer\.has-refuge-form/);
  assert.match(styles, /footer-faq-card/);
  assert.match(styles, /footer-refuge-form/);
  assert.match(styles, /footer-content/);
  assert.match(styles, /footer-column/);
  assert.match(styles, /\.site-footer::before\s*\{[^}]*width: 124vw/);
  assert.doesNotMatch(styles, /shelter-form-section/);
  assert.doesNotMatch(styles, /\.shelter-form\s*\{/);
  assert.match(styles, /overflow-x: hidden/);
  assert.doesNotMatch(styles, /122vw/);
  assert.doesNotMatch(styles, /home-partner-strip/);
  assert.match(styles, /adoption-home/);
  assert.match(styles, /adoption-hero/);
  assert.match(styles, /adoption-hero-photo/);
  assert.match(styles, /\.adoption-home\s*\{[^}]*width: 100%/);
  assert.match(styles, /\.adoption-grid\s*\{[^}]*background: #ffffff/);
  assert.match(styles, /\.adoption-grid::after\s*\{[^}]*content: none/);
  assert.match(styles, /pet-card/);
  assert.match(styles, /\.pet-card\s*\{[^}]*grid-template-rows: 158px 1fr/);
  assert.match(styles, /pet-portrait/);
  assert.match(styles, /pet-card-copy/);
  assert.match(styles, /pet-card-shelter/);
  assert.match(styles, /\.pet-card-copy\s*\{[^}]*padding: 10px 18px 18px/);
  assert.match(styles, /pet-interest-button/);
  assert.match(styles, /\.pet-card-copy\s*\{[^}]*display: flex;[^}]*flex-direction: column/);
  assert.match(styles, /\.pet-interest-button\s*\{[^}]*margin-top: auto/);
  assert.match(styles, /adoption-interest-form/);
  assert.match(styles, /adoption-detail-page/);
  assert.match(styles, /\.detail-back-link\s*\{[^}]*display: inline-flex;[^}]*gap: 8px;[^}]*text-decoration: none/);
  assert.match(styles, /\.detail-back-link:hover,[\s\S]*?transform: scale\(1\.04\)/);
  assert.match(styles, /\.detail-back-chevron::before,[\s\S]*?\.detail-back-chevron::after[\s\S]*?background: currentColor/);
  assert.match(styles, /\.detail-back-chevron::before\s*\{[^}]*transform: rotate\(-42deg\)/);
  assert.match(styles, /\.detail-back-chevron::after\s*\{[^}]*transform: rotate\(42deg\)/);
  assert.match(styles, /adoption-detail-hero/);
  assert.match(styles, /adoption-detail-photo/);
  assert.match(styles, /\.adoption-detail-hero\s*\{[^}]*grid-template-columns: minmax\(260px, 0\.82fr\) minmax\(0, 1fr\)/);
  assert.match(styles, /\.adoption-detail-summary\s*\{[^}]*min-width: 0/);
  assert.match(styles, /@media \(max-width: 1050px\)/);
  assert.match(styles, /detail-refuge-logo-pill/);
  assert.match(styles, /\.detail-pill-row \.detail-refuge-logo-pill\s*\{[^}]*background: transparent;[^}]*box-shadow: none/);
  assert.match(styles, /adoption-static-value/);
  assert.match(styles, /adoption-refuge-inline/);
  assert.doesNotMatch(styles, /adoption-refuge-logo-field/);
  assert.match(styles, /pet-gallery-section/);
  assert.match(styles, /pet-gallery-carousel/);
  assert.match(styles, /scroll-snap-type: x mandatory/);
  assert.match(styles, /\.adoption-hero-photo\s*\{[^}]*aspect-ratio: 16 \/ 9/);
  assert.match(styles, /\.pet-portrait\s*\{[^}]*aspect-ratio: 16 \/ 9/);
  assert.match(styles, /\.adoption-detail-photo\s*\{[^}]*aspect-ratio: 16 \/ 9/);
  assert.match(styles, /\.pet-gallery-slide\s*\{[^}]*aspect-ratio: 9 \/ 16/);
  assert.match(styles, /aspect-ratio: 9 \/ 16/);
  assert.doesNotMatch(styles, /aspect-ratio: 4 \/ 3/);
  assert.doesNotMatch(styles, /grid-template-rows: 230px 1fr/);
  assert.match(styles, /interest-form-heading/);
  assert.doesNotMatch(styles, /input\[readonly\]/);
  assert.match(styles, /object-fit: cover/);
  assert.doesNotMatch(styles, /adoption-hero-dog|dog-card|dog-portrait|dog-card-copy/);
  assert.match(styles, /donation-banner-image/);
  assert.doesNotMatch(styles, /banner-logo|animal-shapes|dog-shape|cat-shape/);
  assert.doesNotMatch(styles, /banner-brand-card|banner-message-card|banner-photo-card|banner-bag-image|banner-bag-slogan/);
  assert.match(styles, /benefits-grid/);
  assert.match(styles, /refuge-switch/);
  assert.match(styles, /\.refuge-switch-section\s*\{[^}]*background: linear-gradient\(90deg, #006f77 0%, #007f86 52%, #006a72 100%\)/);
  assert.match(styles, /\.refuge-switch-section\s*\{[^}]*margin: 0 auto -22px/);
  assert.match(styles, /\.refuge-switch-section::after\s*\{[^}]*border-radius: 50% 50% 0 0/);
  assert.match(styles, /switch-stage/);
  assert.match(styles, /switch-mascot/);
  assert.match(styles, /animation: mascot-rise/);
  assert.match(styles, /@keyframes mascot-rise/);
  assert.doesNotMatch(styles, /switch-mascot::before|switch-mascot::after|switch-mascot\.dogs/);
  assert.match(styles, /refuge-logo/);
  assert.match(styles, /refuge-logo-button:hover/);
  assert.doesNotMatch(styles, /empty-items/);
  assert.match(styles, /donations-section/);
  assert.match(styles, /item-image/);
  assert.match(styles, /overflow-y: auto/);
  assert.match(styles, /max-height: clamp/);
  assert.doesNotMatch(styles, /item-icon/);
  assert.doesNotMatch(styles, /hero-section|shop-section|join-section/);
  assert.match(page, /allRequestedItems/);
  assert.doesNotMatch(page, /Donar a este refugio|Necesita|refuge-card-copy|refuge-logo-wrap|refuge-card|refuge-requested-items/);
  assert.doesNotMatch(page, /Sumar refugio/);
  assert.doesNotMatch(page, /pet-tabs|shelter-strip|Desde \$ 390 para ayudar hoy/);
  assert.doesNotMatch(styles, /pet-tabs|shelter-strip|banner-message-card strong/);
  assert.doesNotMatch(styles, /refuge-logo-wrap|refuge-card|refuge-requested-items|requested-item/);
  assert.match(styles, /#00bac0/);
  assert.match(styles, /#f9be3d/);
  assert.match(styles, /--texture-mint/);
  assert.match(styles, /--texture-paper/);
  assert.match(styles, /--shadow-soft/);
  assert.match(styles, /--shadow-card/);
  assert.match(styles, /repeating-linear-gradient/);
  assert.match(styles, /\.donations-section\s*\{[^}]*background: #ffffff/);
  assert.match(styles, /\.donations-copy\s*\{[^}]*text-align: center/);
  assert.match(styles, /\.donations-panel\s*\{[^}]*border-radius: 24px/);
  assert.doesNotMatch(styles, /\.donations-copy[\s\S]*radial-gradient/);
});

test("renders an adoption form on its own pet page", async () => {
  const response = await render("/adopcion/lola");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Adoptar a Lola/);
  assert.match(html, /Formulario para interesados/);
  assert.match(html, /Más fotos de Lola/);
  assert.match(html, /pet-gallery-carousel/);
  assert.match(html, /Mascota/);
  assert.match(html, />Lola</);
  assert.match(html, /src="\/refugio-perros\.png"/);
  assert.match(html, /alt="Logo de APA"/);
  assert.match(html, />APA</);
  assert.doesNotMatch(html, /value="Lola"|value="APA"/);
  assert.match(html, /Enviar interés/);
  assert.match(html, /<span class="detail-back-chevron" aria-hidden="true"><\/span>/);
  assert.doesNotMatch(html, /←/);
  assert.match(html, /Volver a mascotas/);
  assert.match(html, /src="\/logo-adoptar-color\.png"/);
  assert.doesNotMatch(html, /Todas las solicitudes|Comprar para donar/);
});
