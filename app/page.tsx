"use client";

import { useMemo, useState } from "react";

type Shelter = {
  name: string;
  city: string;
  animals: number;
  urgent: string;
  goal: string;
  progress: number;
};

type Product = {
  name: string;
  category: "Racion" | "Higiene" | "Abrigo" | "Juguetes";
  pet: "Perros" | "Gatos" | "Mixto";
  shelter: string;
  price: number;
  impact: string;
};

const shelters: Shelter[] = [
  {
    name: "Huellas del Sur",
    city: "Montevideo",
    animals: 86,
    urgent: "Racion seca para perros adultos",
    goal: "320 kg este mes",
    progress: 68,
  },
  {
    name: "Michi Refugio",
    city: "Canelones",
    animals: 54,
    urgent: "Alimento humedo y arena sanitaria",
    goal: "180 packs solidarios",
    progress: 44,
  },
  {
    name: "Patitas Unidas",
    city: "Maldonado",
    animals: 39,
    urgent: "Mantas, bowls y juguetes resistentes",
    goal: "95 kits de bienestar",
    progress: 57,
  },
];

const products: Product[] = [
  {
    name: "Bolsa de racion premium 15 kg",
    category: "Racion",
    pet: "Perros",
    shelter: "Huellas del Sur",
    price: 2490,
    impact: "Alimenta a 6 perros durante una semana.",
  },
  {
    name: "Pack alimento humedo x12",
    category: "Racion",
    pet: "Gatos",
    shelter: "Michi Refugio",
    price: 1390,
    impact: "Ayuda a gatos cachorros y seniors.",
  },
  {
    name: "Arena sanitaria 20 L",
    category: "Higiene",
    pet: "Gatos",
    shelter: "Michi Refugio",
    price: 760,
    impact: "Mantiene limpios 8 espacios por semana.",
  },
  {
    name: "Kit abrigo: manta + cama lavable",
    category: "Abrigo",
    pet: "Mixto",
    shelter: "Patitas Unidas",
    price: 1890,
    impact: "Prepara un box para noches frias.",
  },
  {
    name: "Comedero doble acero",
    category: "Higiene",
    pet: "Mixto",
    shelter: "Patitas Unidas",
    price: 690,
    impact: "Reduce recambios y facilita la limpieza.",
  },
  {
    name: "Juguete mordedor resistente",
    category: "Juguetes",
    pet: "Perros",
    shelter: "Huellas del Sur",
    price: 520,
    impact: "Da juego y descarga de energia diaria.",
  },
];

const categories = ["Todos", "Racion", "Higiene", "Abrigo", "Juguetes"] as const;

const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(value);

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("Todos");
  const [selectedShelter, setSelectedShelter] = useState(shelters[0].name);
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "Todos" || product.category === selectedCategory;
      return categoryMatch && product.shelter === selectedShelter;
    });
  }, [selectedCategory, selectedShelter]);

  const totalItems = Object.values(cart).reduce((sum, amount) => sum + amount, 0);
  const totalPrice = products.reduce(
    (sum, product) => sum + (cart[product.name] ?? 0) * product.price,
    0,
  );

  const addToCart = (productName: string) => {
    setCart((current) => ({
      ...current,
      [productName]: (current[productName] ?? 0) + 1,
    }));
  };

  const removeFromCart = (productName: string) => {
    setCart((current) => {
      const nextAmount = (current[productName] ?? 0) - 1;
      const next = { ...current };
      if (nextAmount <= 0) {
        delete next[productName];
      } else {
        next[productName] = nextAmount;
      }
      return next;
    });
  };

  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <header className="topbar" aria-label="Navegacion principal">
          <a className="brand" href="#inicio" aria-label="Donapet inicio">
            <span className="brand-mark">DP</span>
            <span>Donapet</span>
          </a>
          <nav className="nav-links">
            <a href="#refugios">Refugios</a>
            <a href="#donar">Articulos</a>
            <a href="#sumarse">Sumarse</a>
          </nav>
          <a className="topbar-action" href="#checkout">
            Carrito {totalItems > 0 ? totalItems : ""}
          </a>
        </header>

        <div className="hero-content" id="inicio">
          <div className="hero-copy">
            <span className="eyebrow">Donaciones para mascotas</span>
            <h1 id="hero-title">
              Compra alimento y articulos que llegan directo al refugio.
            </h1>
            <p>
              Una tienda solidaria para que refugios publiquen sus necesidades y
              donantes puedan ayudar con productos concretos, trazables y listos
              para entregar.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#donar">
                Donar articulos
              </a>
              <a className="secondary-button" href="#sumarse">
                Inscribir refugio
              </a>
            </div>
          </div>
          <aside className="hero-card" aria-label="Resumen de impacto">
            <span>Impacto activo</span>
            <strong>179 mascotas</strong>
            <p>reciben alimento, abrigo e higiene mediante refugios verificados.</p>
          </aside>
        </div>
      </section>

      <section className="trust-band" aria-label="Ventajas de la plataforma">
        <div>
          <strong>Necesidades verificadas</strong>
          <span>cada refugio publica su lista prioritaria</span>
        </div>
        <div>
          <strong>Compra simple</strong>
          <span>elige productos como en una tienda pet</span>
        </div>
        <div>
          <strong>Entrega coordinada</strong>
          <span>el pedido se prepara para el refugio elegido</span>
        </div>
      </section>

      <section className="section-shell" id="refugios" aria-labelledby="shelters-title">
        <div className="section-heading">
          <span className="eyebrow">Refugios participantes</span>
          <h2 id="shelters-title">Elige a quien quieres ayudar hoy.</h2>
        </div>
        <div className="shelter-grid">
          {shelters.map((shelter) => (
            <button
              className={`shelter-card ${
                selectedShelter === shelter.name ? "is-selected" : ""
              }`}
              key={shelter.name}
              onClick={() => setSelectedShelter(shelter.name)}
              type="button"
            >
              <span className="shelter-location">{shelter.city}</span>
              <h3>{shelter.name}</h3>
              <p>{shelter.animals} animales bajo cuidado.</p>
              <strong>{shelter.urgent}</strong>
              <div className="progress-track" aria-label={`${shelter.progress}% completado`}>
                <span style={{ width: `${shelter.progress}%` }} />
              </div>
              <small>{shelter.goal}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="shop-section" id="donar" aria-labelledby="shop-title">
        <div className="shop-header">
          <div>
            <span className="eyebrow">Tienda solidaria</span>
            <h2 id="shop-title">Articulos solicitados por {selectedShelter}</h2>
          </div>
          <div className="category-pills" aria-label="Filtrar articulos">
            {categories.map((category) => (
              <button
                className={selectedCategory === category ? "active" : ""}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="shop-layout">
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-visual" aria-hidden="true">
                  <span>{product.pet.slice(0, 1)}</span>
                </div>
                <div className="product-body">
                  <span className="product-meta">
                    {product.category} · {product.pet}
                  </span>
                  <h3>{product.name}</h3>
                  <p>{product.impact}</p>
                  <div className="product-footer">
                    <strong>{formatPrice(product.price)}</strong>
                    <button onClick={() => addToCart(product.name)} type="button">
                      Agregar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="checkout-panel" id="checkout" aria-label="Carrito solidario">
            <span className="eyebrow">Tu donacion</span>
            <h3>Resumen</h3>
            {totalItems === 0 ? (
              <p className="empty-cart">
                Agrega articulos para armar una entrega solidaria.
              </p>
            ) : (
              <div className="cart-lines">
                {products
                  .filter((product) => cart[product.name])
                  .map((product) => (
                    <div className="cart-line" key={product.name}>
                      <span>{product.name}</span>
                      <div>
                        <button
                          aria-label={`Quitar ${product.name}`}
                          onClick={() => removeFromCart(product.name)}
                          type="button"
                        >
                          -
                        </button>
                        <strong>{cart[product.name]}</strong>
                        <button
                          aria-label={`Agregar otro ${product.name}`}
                          onClick={() => addToCart(product.name)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <div className="total-row">
              <span>Total estimado</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <button className="checkout-button" type="button">
              Continuar donacion
            </button>
          </aside>
        </div>
      </section>

      <section className="join-section" id="sumarse" aria-labelledby="join-title">
        <div className="join-copy">
          <span className="eyebrow">Para refugios</span>
          <h2 id="join-title">Publica tus necesidades y recibe ayuda organizada.</h2>
          <p>
            El refugio completa sus datos, indica prioridades y carga una lista
            de productos. Luego los donantes compran articulos reales para esa
            necesidad.
          </p>
          <div className="join-steps">
            <span>1. Solicitud</span>
            <span>2. Verificacion</span>
            <span>3. Lista activa</span>
          </div>
        </div>
        <form className="join-form">
          <label>
            Nombre del refugio
            <input name="shelterName" placeholder="Ej. Patitas del Barrio" />
          </label>
          <label>
            Ciudad
            <input name="city" placeholder="Montevideo, Canelones..." />
          </label>
          <label>
            Contacto
            <input name="contact" placeholder="WhatsApp o email" />
          </label>
          <label>
            Necesidad principal
            <textarea
              name="needs"
              placeholder="Cuantos animales cuidan y que articulos necesitan primero"
            />
          </label>
          <button type="button">Enviar solicitud</button>
        </form>
      </section>
    </main>
  );
}
