
export const mockCourseData = [
  {
    id: "curso-1",
    title: "Desenvolvimento Web Completo",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    description: "Aprenda a criar sites e aplicativos web modernos com HTML, CSS e JavaScript.",
    duration: "32 horas",
    lessons: [
      {
        id: "aula-1-1",
        title: "Introdução ao Desenvolvimento Web",
        description: "Conheça os fundamentos e ferramentas do desenvolvimento web moderno.",
        duration: "45 minutos",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        completed: true,
        liked: true,
        materials: [
          { id: "mat-1", title: "Slides da Aula", type: "pdf", url: "#" },
          { id: "mat-2", title: "Código de Exemplo", type: "zip", url: "#" }
        ],
        comments: [
          {
            id: "comment-1",
            userName: "João Silva",
            userAvatar: "https://i.pravatar.cc/150?img=1",
            content: "Excelente introdução! Consegui entender os conceitos fundamentais.",
            date: "2025-04-10T14:48:00",
            likes: 5
          },
          {
            id: "comment-2",
            userName: "Maria Oliveira",
            userAvatar: "https://i.pravatar.cc/150?img=5",
            content: "Professor, poderia explicar mais sobre os ambientes de desenvolvimento?",
            date: "2025-04-11T09:30:00",
            likes: 2
          }
        ]
      },
      {
        id: "aula-1-2",
        title: "HTML Avançado e Semântico",
        description: "Aprenda a estruturar seu documento HTML de forma semântica e acessível.",
        duration: "50 minutos",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        completed: true,
        liked: false,
        materials: [
          { id: "mat-3", title: "Guia de Tags Semânticas", type: "pdf", url: "#" },
          { id: "mat-4", title: "Checklist de Acessibilidade", type: "pdf", url: "#" }
        ],
        comments: []
      },
      {
        id: "aula-1-3",
        title: "CSS Moderno e Responsivo",
        description: "Técnicas de CSS para criar layouts modernos e responsivos.",
        duration: "65 minutos",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        completed: false,
        liked: false,
        materials: [
          { id: "mat-5", title: "Guia de Flexbox e Grid", type: "pdf", url: "#" }
        ],
        comments: []
      },
      {
        id: "aula-1-4",
        title: "JavaScript Básico",
        description: "Fundamentos da linguagem JavaScript.",
        duration: "70 minutos",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        completed: false,
        liked: false,
        materials: [],
        comments: []
      },
      {
        id: "aula-1-5",
        title: "Manipulação do DOM",
        description: "Como interagir com elementos HTML usando JavaScript.",
        duration: "60 minutos",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        completed: false,
        liked: false,
        materials: [],
        comments: []
      }
    ]
  },
  {
    id: "curso-2",
    title: "Marketing Digital Estratégico",
    coverImage: "https://images.unsplash.com/photo-1494599948593-3dafe8338d71?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    description: "Estratégias e táticas para alavancar seu negócio no ambiente digital.",
    duration: "24 horas",
    lessons: [
      {
        id: "aula-2-1",
        title: "Fundamentos de Marketing Digital",
        description: "Introdução ao universo do marketing nas plataformas digitais.",
        duration: "55 minutos",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        completed: true,
        liked: true,
        materials: [
          { id: "mat-6", title: "Ebook: Introdução ao Marketing Digital", type: "pdf", url: "#" }
        ],
        comments: []
      },
      {
        id: "aula-2-2",
        title: "SEO e Visibilidade Online",
        description: "Como otimizar seu conteúdo para os mecanismos de busca.",
        duration: "65 minutos",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        completed: false,
        liked: false,
        materials: [],
        comments: []
      }
    ]
  },
  {
    id: "curso-3",
    title: "Inteligência Artificial na Prática",
    coverImage: "https://images.unsplash.com/photo-1677442135446-3760d486c04c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    description: "Aplicações práticas de IA no mundo corporativo e pessoal.",
    duration: "18 horas",
    lessons: [
      {
        id: "aula-3-1",
        title: "O que é IA e Machine Learning",
        description: "Conceitos fundamentais da inteligência artificial moderna.",
        duration: "50 minutos",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        completed: false,
        liked: false,
        materials: [],
        comments: []
      },
      {
        id: "aula-3-2",
        title: "IA Generativa: DALL-E e GPT",
        description: "Como utilizar modelos generativos para criar conteúdo.",
        duration: "60 minutos",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        completed: false,
        liked: false,
        materials: [],
        comments: []
      }
    ]
  }
];
