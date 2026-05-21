export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string; // audio source or preview url
}

export const bestSongs: Song[] = [
  {
    id: "s1",
    title: "Midnight City",
    artist: "M83",
    cover: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=400&q=80",
    url: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg" // placeholder audio
  },
  {
    id: "s2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
    url: "https://actions.google.com/sounds/v1/science_fiction/sparkle.ogg"
  },
  {
    id: "s3",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f401?auto=format&fit=crop&w=400&q=80",
    url: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
  },
  {
    id: "s4",
    title: "Instant Crush",
    artist: "Daft Punk",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
    url: "https://actions.google.com/sounds/v1/science_fiction/sparkle.ogg"
  },
  {
    id: "s5",
    title: "Resonance",
    artist: "HOME",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    url: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
  }
];

export const faqs = [
  {
    id: "f1",
    question: "O que é o Violet Beats e por que ele está no ar?",
    answer: "O Violet Beats nasceu da paixão pela música eletrônica e pop moderna. Nosso objetivo é criar uma plataforma premium (atualmente no ar para beta testing) focada em curadoria das melhores faixas do momento, oferecendo uma experiência imersiva e de alta performance."
  },
  {
    id: "f2",
    question: "Qual o nosso objetivo no mercado?",
    answer: "Queremos simplificar a forma como as pessoas descobrem hits marcantes, conectando ouvintes a um ecossistema musical vibrante e com qualidade de áudio excepcional, livre de ruídos de comunicação e distrações."
  },
  {
    id: "f3",
    question: "Preciso pagar para escutar?",
    answer: "Nesta fase de acesso antecipado, toda a nossa curadoria está disponível gratuitamente para usuários registrados. Você só precisa criar sua conta para ter acesso ao nosso player exclusivo."
  },
  {
    id: "f4",
    question: "Como funciona o armazenamento de favoritos?",
    answer: "Você pode adicionar músicas aos seus favoritos e elas ficarão salvas com segurança usando a robusta infraestrutura do Firebase em tempo real."
  }
];
