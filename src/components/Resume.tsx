import { useState, useEffect, useRef } from 'react';

export function Resume() {
  const [activeTab, setActiveTab] = useState('Experience');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0, opacity: 0 });

  const tabs = ['Experience', 'Education'];

  const experiences = [
    {
      title: "UXR Research Assistant",
      company: "Computer-Enabled Abilities Laboratory (CEAL), Columbia University",
      period: "Oct. 2025 - Present",
      description: "Designing methods for evaluation and development of educational games involving usability studies, interviews and iterative prototype testing.",
      technologies: ["Jira"]
    },
    {
      title: "Brand Strategy Intern",
      company: "Design Bridge and Partners (WPP)",
      period: "Jun. 2025 - Aug. 2025",
      description: "Informed brand positioning to drive consumer acquisition for CPG brands (e.g. Kenvue’s Johnson’s Baby, Heineken, Don Julio, Tyson) through market research across 90 brands. Delivered product differentiation strategies by writing creative briefs informed by semiotics, packaging design and cultural trends.",
      technologies: ["Placeholder"]
    },
    {
      title: "Vice-President",
      company: "Columbia University Gaming Group",
      period: "Sep. 2024 - Present",
      description: "Delivered industry mentorship for 70+ aspiring game developers by engaging Xbox professionals as judges for 17 competing teams. Achieved 100% year-over-year funding growth for 150+ member organization by negotiating strategic partnerships. Pioneered Women in Gaming industry panel involving PlayStation and Activision Blizzard leaders, attracting 40+ participants.",
      technologies: ["Placeholder"]
    },
    {
      title: "President",
      company: "Columbia University Singapore Students' Association",
      period: "May 2023 - Present",
      description: "Accomplished organizational transformation by scaling event capacity from 40 to 90 attendees (10+ events annually) and saw 150% social media growth. Scaled organizational reach by 300%, expanding from 1 to 5+ corporate collaborations.",
      technologies: ["Placeholder"]
    },
    {
      title: "Multicultural Advertising Intern Program Fellow",
      company: "4A's Foundation",
      period: "Jun. 2025 - Aug. 2025",
      description: "Selected for a 22-week hybrid fellowship that develops talents in the marketing and advertising industry. Won 2nd place for Disney Experiences' campaign pitch as part of team After Ten Creative.",
      technologies: ["Placeholder"]
    },
    {
      title: "HCI Researcher",
      company: "Barnard College",
      period: "May 2024 - Dec. 2024",
      description: "Designed and presented simulations built on Godot Engine 4.3 to explore haptic feedback impact on user agency.",
      technologies: ["Placeholder"]
    },
    {
      title: "Special Projects Intern",
      company: "Skillseed",
      period: "Jun. 2023 - Aug. 2023",
      description: "Identified key barriers to social mobility through interviews, surveys and nonprofit research to inform client workshops. Informed 2024 organizational strategy through analysis of 3 years of operational data.",
      technologies: ["Placeholder"]
    },
    {
      title: "Research and Consulting Intern",
      company: "Action for Change in Southeast Asia (ActSEA)",
      period: "Mar. 2022 - Aug. 2022",
      description: "Executed quantitative impact assessments across 3 countries (Afghanistan, Myanmar, Philippines), analyzing beneficiary datasets of 5,000+ individuals using Excel to evaluate humanitarian program effectiveness for Save the Children and People In Need.",
      technologies: ["Placeholder"]
    }
  ];

  const education = [
    {
      degree: "Cognitive Science and Sociology",
      school: "Barnard College, Columbia University",
      period: "Expected May 2026",
      details: "Relevant coursework: User Interface Design, Digital Inequalities, Methods for Social Research, Artificial Intelligence (Fall 2025)"
    }
  ];

  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`) as HTMLButtonElement;
      if (activeButton) {
        const containerRect = tabsRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        setUnderlineStyle({
          width: buttonRect.width,
          left: buttonRect.left - containerRect.left,
          opacity: 1
        });
      }
    }
  }, [activeTab]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === 'Experience') {
      return (
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="border-2 border-border p-6 bg-card">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-medium">{exp.title}</h3>
                    <span className="text-muted-foreground font-medium font-ibm-mono">{exp.period}</span>
                  </div>
                  
                  <h4 className="text-lg text-primary font-ibm-mono">{exp.company}</h4>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                
                {/* <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-secondary text-secondary-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div> */}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="border-2 border-border p-6 bg-card">
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-medium">{edu.degree}</h3>
                    <span className="text-muted-foreground font-medium font-ibm-mono">{edu.period}</span>
                  </div>
                  
                  <h4 className="text-lg text-primary font-ibm-mono">{edu.school}</h4>
                </div>
                
                <p className="text-muted-foreground">{edu.details}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-6xl font-medium font-dotemp">Resume</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-start">
          <div ref={tabsRef} className="relative flex space-x-8 border-b-2 border-border">
            {tabs.map((tab) => (
              <button
                key={tab}
                data-tab={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative px-4 py-3 transition-colors font-ibm-mono ${
                  activeTab === tab 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
            
            {/* Animated underline */}
            <div 
              className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
              style={{
                width: `${underlineStyle.width}px`,
                left: `${underlineStyle.left}px`,
                opacity: underlineStyle.opacity,
                transform: 'translateY(2px)'
              }}
            />
          </div>
        </div>

        {/* Content */}
        <section className="space-y-8 pb-12">
          {renderContent()}
        </section>
      </div>
    </div>
  );
}