import { useState } from 'react';

interface ContentRendererProps {
  content: string;
  contentType: 'text' | 'pdf' | 'link' | 'video';
  onMouseEnterFooter?: () => void;
  onMouseLeaveFooter?: () => void;
}

interface ProjectsProps {
  activeSection: string;
  onMouseEnterFooter: () => void;
  onMouseLeaveFooter: () => void;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, contentType, onMouseEnterFooter, onMouseLeaveFooter }) => {
  switch (contentType) {
    case 'pdf':
      return (
        <div className="pdf-viewer-container">
          <iframe 
            src={content}
            width="100%" 
            height="600px"
            className="border-2 border-border rounded-lg shadow-lg"
            title="PDF Document"
          />
        </div>
      );
    case 'link':
      return (
        <a 
          href={content} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline break-all"
        >
          {content}
        </a>
      );
    case 'video': 
      return (
        <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={content}
            title="Video Player"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    case 'text':
    default:
      return <p className="text-foreground leading-relaxed">{content}</p>;
  }
};

export default function Projects({ activeSection, onMouseEnterFooter, onMouseLeaveFooter }: ProjectsProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  type Project = {
    title: string;
    date: string;
    article: string;
    excerpt: string;
    content?: string;
    contentType?: 'text' | 'pdf' | 'link' | 'video';
    imageSrc?: string; 
    videoSrc?: string;
    link?: string;
  };

  const Projects = [
    {
      title: "Malleable Interfaces",
      date: "Spring 2026",
      article: "HCI Research",
      excerpt: "Malleable interfaces promise increased user agency by allowing individuals to reshape their digital environments. However, transitioning from a passive consumer to an active designer can be a difficult mental adjustment. This study explores if dynamic configuration components can effectively ameliorate this friction. I co-designed and ran a controlled usability study across 3 interface conditions, combining moderated sessions, behavioral telemetry, and post-task surveys to measure usability, agency, and cognitive load. Synthesized findings into design recommendations, showing intuitive state-management controls (saved layouts) eased customization friction and produced the highest task accuracy and perceived agency across conditions."
      // link: "https://cardsbyhand.vercel.app/"
    },
    // {
    //   title: "Cards by Hand",
    //   date: "Spring 2026",
    //   article: "Personal",
    //   excerpt: "Since I was a kid, one of my favourite things to do was to make cards for my loved ones—it has always been a wonderfully tactile, intuitive, and serendipitous experience for me. This website is my attempt at digitizing the handmade. Cobble together random materials, sprinkle some doodles around, and send a mouse-made card to your special someone!",
    //   imageSrc: "/imgs/cardsbyhand.png",
    //   link: "https://cardsbyhand.vercel.app/"
    // },
    {
      title: "Units of Measurement",
      date: "Spring 2025",
      article: "Design + Theory",
      excerpt: "Units of Measurement builds on Crawford's Atlas of AI to reimagine the brand logos of four names in Big Tech. Crawford explored AI development and impact by identifying links across a range of systems, using experiences from daily life as context. In a similar vein, the redesigned logos make use of visual art to express the nuance of supply chains. Beyond this, the series focuses on the urban consumer, exploring the impact of marketing on the conceptualization of use—and prospective uses—of current technologies.",
      content: "/pdfs/UnitsofMeasurement-YukYiWong.pdf",
      contentType: "pdf" as const
    },
    {
      title: "Inside a Commuter's Eye: Daily Health Ads in the Manhattan Subway",
      date: "Spring 2025",
      article: "Data Journalism",
      excerpt: "An interactive feature article that investigates health advertising in the NYC subway, combining journalistic and computational skills.",
      imageSrc: "/imgs/commuters-eye.png",
      link: "https://wwoc-2025.github.io/wwoc-health/"
    },
    {
      title: "La Magia Has No Age",
      date: "Summer 2025",
      article: "Pitch Deck",
      excerpt: "Won 2nd place for Disney Experiences' pitch competition, developing an emotional campaign that spanned digital and experiential executions to strengthen brand affinity for Walt Disney World Resort.",
      content: "/pdfs/DisneyExperiences-AfterTenCreative.pdf",
      contentType: "pdf" as const
    },
    {
      title: "Site 27",
      date: "Spring 2025",
      article: "Video Game",
      excerpt: "A top-down maze horror game about a scientist in a ruined laboratory overrun by its latest experiment. Expand to see a fun trailer I made and a link to play the game.",
      videoSrc: "https://www.youtube.com/embed/4TtxbjLVUpo?si=whP9l0mEImEjxdhD",
      contentType: "video" as const,
      link: "https://hjkimowl.itch.io/site27"
    },
    {
      title: "Examining the impact of haptics on illusions of agency",
      date: "Summer 2024",
      article: "Simulation",
      excerpt: "Much of our digital world today thrives on maximizing engagement through deliberate design. However, consumers are often left unaware of the extent to which this design truly impacts their decisions. We analyzed this phenomenon by looking at how haptic and visual feedback could direct and mislead users' sense of agency. Taking inspiration from ‘game juice’, we bring to light the invisible ties between our choices and our virtual environment.",
      imageSrc: "/imgs/hci-startscene-example.png",
      link: "https://github.com/aryapsinha/mazehouse"
    },
    {
      title: "User Interface Design",
      date: "Spring 2025",
      article: "Websites",
      excerpt: "Websites built include an educational platform to teach people in New York City how to recognize birds in the city by sight and by sound, as well as a tool to find cafes near campus to study at. HTML, CSS, JS, Python.",
      contentType: "text" as const
    },
    {
      title: "Innovation and Design Lab",
      date: "Fall 2024",
      article: "Design Thinking",
      excerpt: "In this class, I learned to envision inventive applications and deliver meaningful experiences to end users. Some activities include brainstorming applications for autonomous agents using bisociation, and designing a wireframe for an app which includes a creative exploration of interactive design components.",
      imageSrc: "/imgs/innovation-design-yukyi.png"
    },
    {
      title: "he's just programming",
      date: "Spring 2025",
      article: "Film",
      excerpt: "A satirical film borne from my imagination about what could happen if we did not care about assigning moral status to AI and other sophisticated machines.",
      imageSrc: "/imgs/justprogramming.png",
      link: "https://youtu.be/AVxZSSJfgoY"
    }
  ];

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-6xl font-medium font-dotemp">Projects</h1>
        </div>

        {/* Projects grid */}
        <div className="space-y-8">
          {Projects.map((project, index) => {
            const isExpanded = expandedItems.has(index);
            
            return (
              <article key={index} className="border-2 border-border p-6 bg-card hover:border-primary/50 transition-all duration-300 group">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-xl font-medium group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                    </div>
                    
                    <div className="flex items-center gap-4 text-muted-foreground font-ibm-mono text-sm">
                      <time>{project.date}</time>
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>{project.article}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {project.excerpt}
                  </p>
                  
                  {isExpanded && (
                    <div className="pt-3 border-t border-border">
                      
                      {project.imageSrc && (
                        <div className="flex flex-col items-center mb-6 space-y-6">
                          <img 
                            src={project.imageSrc} 
                            alt={project.title}
                            className="w-[350px] max-w-full rounded-lg shadow mb-2"
                          />
                        </div>
                      )}

                      {project.imageSrc && (
                        <div className="text-center mt-12 mb-8">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-base font-ibm-mono"
                            >
                              View ↗
                            </a>
                          )}
                        </div>
                      )}

                      {project.videoSrc && (
                      <>
                        <div className="w-full mb-8 rounded-lg overflow-hidden shadow-lg" style={{ height: '400px' }}>
                          <iframe
                            src={project.videoSrc}
                            title={project.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        {project.link && (
                          <div className="text-center mt-12 mb-8">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-base font-ibm-mono"
                            >
                              Play ↗
                            </a>
                          </div>
                        )}
                      </>
                    )}
                      
                      {project.content && project.contentType && (
                        <ContentRenderer 
                          content={project.content} 
                          contentType={project.contentType} 
                          onMouseEnterFooter={onMouseEnterFooter}
                          onMouseLeaveFooter={onMouseLeaveFooter}
                        />
                      )}
                    </div>
                  )}

                  {project.content && (
                    <div className="pt-3">
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="inline-flex items-center gap-2 text-primary font-ibm-mono text-sm hover:gap-3 transition-all"
                      >
                        {isExpanded ? 'Collapse' : 'Expand'}
                        <span className="w-4 h-4 flex items-center justify-center">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                    </div>
                  )}

                  {project.imageSrc && (
                    <div className="pt-3">
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="inline-flex items-center gap-2 text-primary font-ibm-mono text-sm hover:gap-3 transition-all"
                      >
                        {isExpanded ? 'Collapse' : 'Expand'}
                        <span className="w-4 h-4 flex items-center justify-center">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                    </div>
                  )}

                  {project.videoSrc && (
                    <div className="pt-3">
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="inline-flex items-center gap-2 text-primary font-ibm-mono text-sm hover:gap-3 transition-all"
                      >
                        {isExpanded ? 'Collapse' : 'Expand'}
                        <span className="w-4 h-4 flex items-center justify-center">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                    </div>
                  )}

                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
