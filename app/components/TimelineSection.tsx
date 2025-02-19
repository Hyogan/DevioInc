'use client'
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import {ParallaxWrapper} from './shared/ParallaxWrapper';
import { ParallaxBackground, ParallaxGradientText } from './shared/ParallaxBackground';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  gradient: string;
  details: string[];
  icon: string;
}

const TimelineEvent = ({ item, index }: { item: TimelineItem; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -50 : 50,
      y: 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative mb-12 last:mb-0"
    >
      <div className="flex items-center gap-8">
        <div className="hidden md:block w-1/4 text-right">
          <span className="text-lg font-bold gradient-text">
            {item.date}
          </span>
        </div>
        
        <div className="relative flex-shrink-0">
          <motion.div 
            className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center text-2xl`}
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {item.icon}
          </motion.div>
          {/* Animated connection line */}
          <motion.div 
            className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-[var(--accent)] to-transparent"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        <div className="flex-1">
          <div className="glass-card p-6">
            <div className="md:hidden mb-2 text-sm font-bold gradient-text">
              {item.date}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-[var(--text-secondary)] mb-4">{item.description}</p>
            
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={inView ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <ul className="space-y-2">
                {item.details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                    className="flex items-center gap-2 text-[var(--text-secondary)]"
                  >
                    <svg
                      className="w-4 h-4 text-[var(--accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                item.status === 'completed' ? 'bg-[#00ff94]/10 text-[#00ff94]' :
                item.status === 'in-progress' ? 'bg-[#FF3366]/10 text-[#FF3366]' :
                'bg-white/10 text-white/60'
              }`}>
                {item.status === 'completed' ? '✓ Completed' :
                 item.status === 'in-progress' ? '⟳ In Progress' :
                 '◦ Upcoming'}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ["start end", "end start"]
  // });

  const timeline: TimelineItem[] = [
    {
      date: 'Q1 2024',
      title: 'Launch & Core Features',
      description: 'Initial release with basic screen time tracking and analytics.',
      status: 'completed',
      gradient: 'from-[#00ff94] to-[#00b8ff]',
      icon: '🚀',
      details: [
        'Cross-platform app release',
        'Basic screen time tracking',
        'Usage analytics dashboard',
        'App categorization'
      ]
    },
    {
      date: 'Q2 2024',
      title: 'Advanced Analytics',
      description: 'AI-powered insights and personalized recommendations.',
      status: 'in-progress',
      gradient: 'from-[#FF3366] to-[#FF33FF]',
      icon: '📊',
      details: [
        'Machine learning integration',
        'Personalized insights',
        'Behavioral pattern recognition',
        'Custom recommendations'
      ]
    },
    {
      date: 'Q3 2024',
      title: 'Family Features',
      description: 'Family sharing, parental controls, and multi-device sync.',
      status: 'upcoming',
      gradient: 'from-[#FFB800] to-[#FF3366]',
      icon: '👨‍👩‍👧‍👦',
      details: [
        'Family accounts',
        'Parental controls',
        'Screen time limits',
        'Activity reports'
      ]
    },
    {
      date: 'Q4 2024',
      title: 'Enterprise Solutions',
      description: 'Team management and workplace integration features.',
      status: 'upcoming',
      gradient: 'from-[#00b8ff] to-[#00ff94]',
      icon: '🏢',
      details: [
        'Team dashboards',
        'Productivity analytics',
        'Integration APIs',
        'Custom reporting'
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-[var(--primary)]"
      id="timeline"
    >
      <ParallaxBackground speed={0.3} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our
            <ParallaxGradientText speed={1.2}> Roadmap</ParallaxGradientText>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Follow our journey as we build the future of digital wellness
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {timeline.map((item, index) => (
            <TimelineEvent key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection; 