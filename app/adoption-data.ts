export type AdoptablePet = {
  name: string;
  slug: string;
  kind: string;
  shelter: string;
  shelterLogo: string;
  shelterLogoAlt: string;
  age: string;
  size: string;
  personality: string;
  status: string;
  photo: string;
  photoAlt: string;
  photoCredit: string;
  galleryPhotos: {
    src: string;
    alt: string;
  }[];
};

export const adoptablePets: AdoptablePet[] = [
  {
    name: "Lola",
    slug: "lola",
    kind: "Perra",
    shelter: "APA",
    shelterLogo: "/refugio-perros.png",
    shelterLogoAlt: "Logo de APA",
    age: "2 años",
    size: "Mediano",
    personality: "Cariñosa, atenta y con mucha energía para paseos tranquilos.",
    status: "Busca hogar responsable",
    photo:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_at_shelter.jpg?width=1920",
    photoAlt: "Perra real en un refugio mirando a cámara",
    photoCredit: "Foto: Erick Pleitez / Wikimedia Commons",
    galleryPhotos: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_at_shelter.jpg?width=1080",
        alt: "Lola mirando a cámara en el refugio",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_in_animal_shelter_in_Washington,_Iowa.jpg?width=1080",
        alt: "Foto adicional de perro en refugio",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Families_find_new_furry_friends_at_adoption_event_140726-M-DN141-001.jpg?width=1080",
        alt: "Foto adicional en contexto de adopción",
      },
    ],
  },
  {
    name: "Nina",
    slug: "nina",
    kind: "Gata",
    shelter: "Catitos",
    shelterLogo: "/refugio-gatos.png",
    shelterLogoAlt: "Logo de Catitos",
    age: "4 años",
    size: "Chica",
    personality: "Curiosa, tranquila y perfecta para un hogar paciente.",
    status: "Busca hogar responsable",
    photo:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Longhaired_Cat_at_Hearts_Alive_Village.jpg?width=1920",
    photoAlt: "Gata real fotografiada en un refugio",
    photoCredit: "Foto: Noah Wulf / Wikimedia Commons",
    galleryPhotos: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Longhaired_Cat_at_Hearts_Alive_Village.jpg?width=1080",
        alt: "Nina fotografiada en el refugio",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shelter_Kitten_1.jpg?width=1080",
        alt: "Foto adicional de gato en refugio",
      },
    ],
  },
  {
    name: "Bruno",
    slug: "bruno",
    kind: "Perro",
    shelter: "APA",
    shelterLogo: "/refugio-perros.png",
    shelterLogoAlt: "Logo de APA",
    age: "8 meses",
    size: "Grande",
    personality: "Curioso, activo y con muchas ganas de aprender.",
    status: "Busca hogar responsable",
    photo:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Families_find_new_furry_friends_at_adoption_event_140726-M-DN141-001.jpg?width=1920",
    photoAlt: "Perro real durante un evento de adopción",
    photoCredit: "Foto: U.S. Marines / Wikimedia Commons",
    galleryPhotos: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Families_find_new_furry_friends_at_adoption_event_140726-M-DN141-001.jpg?width=1080",
        alt: "Bruno durante un evento de adopción",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_at_shelter.jpg?width=1080",
        alt: "Foto adicional de perro en refugio",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_in_animal_shelter_in_Washington,_Iowa.jpg?width=1080",
        alt: "Foto adicional de perro esperando adopción",
      },
    ],
  },
  {
    name: "Milo",
    slug: "milo",
    kind: "Gato",
    shelter: "Catitos",
    shelterLogo: "/refugio-gatos.png",
    shelterLogoAlt: "Logo de Catitos",
    age: "5 meses",
    size: "Chico",
    personality: "Mimoso, explorador y listo para crecer en familia.",
    status: "Busca hogar responsable",
    photo:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shelter_Kitten_1.jpg?width=1920",
    photoAlt: "Gatito real de refugio entre plantas",
    photoCredit: "Foto: Lisafern / Wikimedia Commons",
    galleryPhotos: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shelter_Kitten_1.jpg?width=1080",
        alt: "Milo entre plantas",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Longhaired_Cat_at_Hearts_Alive_Village.jpg?width=1080",
        alt: "Foto adicional de gato en refugio",
      },
    ],
  },
];

export function getAdoptablePet(slug: string) {
  return adoptablePets.find((pet) => pet.slug === slug);
}
