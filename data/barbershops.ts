
export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  image: string;
  bio: string;
  services: string[]; // service IDs
  availability: string[];
}

export interface Review {
  id: string;
  barberId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const services: Service[] = [
  {
    id: 'haircut',
    name: 'Corte de Cabello',
    price: 150,
    duration: 30,
    description: 'Corte clásico o moderno según tu estilo',
  },
  {
    id: 'beard',
    name: 'Arreglo de Barba',
    price: 100,
    duration: 20,
    description: 'Perfilado y arreglo profesional de barba',
  },
  {
    id: 'combo',
    name: 'Corte + Barba',
    price: 220,
    duration: 45,
    description: 'Servicio completo de corte y barba',
  },
  {
    id: 'shave',
    name: 'Afeitado Clásico',
    price: 120,
    duration: 25,
    description: 'Afeitado tradicional con navaja',
  },
  {
    id: 'kids',
    name: 'Corte Infantil',
    price: 120,
    duration: 25,
    description: 'Corte especial para niños',
  },
  {
    id: 'color',
    name: 'Tinte de Cabello',
    price: 300,
    duration: 60,
    description: 'Coloración profesional',
  },
];

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    specialty: 'Cortes Clásicos',
    rating: 4.9,
    reviewCount: 127,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Con más de 15 años de experiencia, especializado en cortes clásicos y modernos. Apasionado por crear el look perfecto para cada cliente.',
    services: ['haircut', 'beard', 'combo', 'shave'],
    availability: ['Lun-Vie: 9:00-18:00', 'Sáb: 9:00-14:00'],
  },
  {
    id: '2',
    name: 'Miguel Ángel Torres',
    specialty: 'Estilos Modernos',
    rating: 4.8,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'Experto en tendencias actuales y estilos urbanos. Me encanta experimentar con nuevos looks y técnicas.',
    services: ['haircut', 'beard', 'combo', 'color'],
    availability: ['Lun-Vie: 10:00-19:00', 'Sáb: 10:00-15:00'],
  },
  {
    id: '3',
    name: 'Roberto Sánchez',
    specialty: 'Barbería Tradicional',
    rating: 5.0,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    bio: 'Maestro barbero con técnicas tradicionales. Especializado en afeitados clásicos y cuidado de barba.',
    services: ['haircut', 'beard', 'combo', 'shave'],
    availability: ['Lun-Sáb: 8:00-17:00'],
  },
  {
    id: '4',
    name: 'Javier Ramírez',
    specialty: 'Cortes Infantiles',
    rating: 4.7,
    reviewCount: 84,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    bio: 'Especialista en cortes para niños. Paciente y creativo, hago que cada visita sea una experiencia divertida.',
    services: ['haircut', 'kids', 'combo'],
    availability: ['Lun-Vie: 11:00-19:00', 'Sáb-Dom: 9:00-16:00'],
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    barberId: '1',
    userName: 'Juan Pérez',
    rating: 5,
    comment: 'Excelente servicio, Carlos es muy profesional y atento. ¡Recomendado!',
    date: '2024-01-15',
  },
  {
    id: '2',
    barberId: '1',
    userName: 'Luis García',
    rating: 5,
    comment: 'El mejor corte que he tenido. Muy satisfecho con el resultado.',
    date: '2024-01-10',
  },
  {
    id: '3',
    barberId: '2',
    userName: 'Pedro Martínez',
    rating: 5,
    comment: 'Miguel tiene un talento increíble. Siempre sabe exactamente lo que necesito.',
    date: '2024-01-12',
  },
  {
    id: '4',
    barberId: '3',
    userName: 'Antonio López',
    rating: 5,
    comment: 'Roberto es un maestro. El afeitado clásico es una experiencia única.',
    date: '2024-01-08',
  },
  {
    id: '5',
    barberId: '4',
    userName: 'María González',
    rating: 5,
    comment: 'Mi hijo siempre quiere venir con Javier. Es muy paciente y amable.',
    date: '2024-01-14',
  },
];
