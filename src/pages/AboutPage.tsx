import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeInUp, ScrollReveal } from '../components/animations';
import visualClarityImg from '../assets/visual-clarity.png';



const audiences = [
  {
    title: 'Beginners',
    description: 'Start from zero with logic.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    )
  },
  {
    title: 'Students',
    description: 'Ace your academic concepts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    )
  },
  {
    title: 'Job Seekers',
    description: 'Build interview-ready foundations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    title: 'Lifelong Learners',
    description: 'Learn for the joy of understanding.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
];



// Main About Page Component
export const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section - Split Layout */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <FadeInUp>
                <span className="hero-badge">Our Mission</span>
                <h1>Building the logic <br />behind the code.</h1>
                <p className="hero-lead">
                  We believe that great software isn't just written—it's thought through.
                  We're on a mission to teach the <em>art of thinking</em> before the syntax of typing.
                </p>
              </FadeInUp>
            </div>
            <div className="hero-image-wrapper">
              <FadeInUp delay={0.2}>
                <div className="hero-image-card">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80"
                    alt="Students collaborating"
                    className="hero-img"
                  />
                  <div className="hero-stats-float">
                    <div className="stat-item">
                      <span className="stat-num">10k+</span>
                      <span className="stat-label">Learners</span>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Narrative Text */}
      <section className="story-section section-divider">
        <div className="container">
          <ScrollReveal>
            <div className="story-container">
              <span className="section-label-center">The Challenge</span>
              <h2>The Problem with <br />Traditional Learning</h2>
              <div className="story-text">
                <p>
                  Most coding platforms focus heavily on <strong>syntax</strong>. They ask you to memorize commands,
                  fill in the blanks, and copy-paste solutions. But what happens when you're faced with a blank engineering problem?
                </p>
                <p>
                  <span className="highlight-text">You hit a wall.</span>
                </p>
                <p>
                  The fundamental skill of programming isn't typing—it's <strong>logical thinking</strong>.
                  That's why we flipped the script. We teach you how to deconstruct problems, visualize data flow, and
                  architect solutions <em>before</em> you write a single line of code.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section - Pastel Bento Grid */}
      <section className="values-section section-divider">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide our teaching methodology</p>
          </div>

          <div className="bento-grid">
            {/* Card 1: Logic First - Indigo */}
            <ScrollReveal delay={0.1}>
              <div className="bento-card pastel-indigo">
                <div className="bento-content">
                  <h3>Logic First</h3>
                  <p>We prioritize understanding the 'why' and 'how' over just the syntax. Logic is the language that transcends specific frameworks.</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Planning on Whiteboard"
                  className="bento-img"
                />
              </div>
            </ScrollReveal>

            {/* Card 2: Visual Learning - Emerald */}
            <ScrollReveal delay={0.2}>
              <div className="bento-card pastel-emerald">
                <div className="bento-content">
                  <h3>Visual Clarity</h3>
                  <p>Complex concepts become simple when visualized. We use animations and diagrams to break down abstract ideas.</p>
                </div>
                <img
                  src={visualClarityImg}
                  alt="Visual Clarity Diagram"
                  className="bento-img"
                />
              </div>
            </ScrollReveal>

            {/* Card 3: Deep Mastery - Amber */}
            <ScrollReveal delay={0.3}>
              <div className="bento-card pastel-amber">
                <div className="bento-content">
                  <h3>True Mastery</h3>
                  <p>No shortcuts. We build foundations that last a career, not just a semester. We value depth over breadth.</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Coding Mastery"
                  className="bento-img"
                />
              </div>
            </ScrollReveal>

            {/* Card 4: Community - Rose */}
            <ScrollReveal delay={0.4}>
              <div className="bento-card pastel-rose">
                <div className="bento-content">
                  <h3>Community</h3>
                  <p>Learning is social. We foster a community where peer learning is always celebrated.</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team Collaboration"
                  className="bento-img"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="audience-section section-divider">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Who This Platform Is For</h2>
              <p>Designed for learners who value understanding</p>
            </div>
          </ScrollReveal>

          <div className="audience-grid">
            {audiences.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="audience-card">
                  <div className="audience-icon-wrapper">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section - Split with Image */}
      <section className="vision-section section-divider">
        <div className="container">
          <div className="vision-grid">
            <ScrollReveal>
              <div className="vision-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                  alt="Future Vision"
                  className="vision-img"
                />
                <div className="vision-overlay-card">
                  <span className="vision-stat">100%</span>
                  <span className="vision-label">Commitment to Clarity</span>
                </div>
              </div>
            </ScrollReveal>
            <div className="vision-content-split">
              <ScrollReveal delay={0.2}>
                <span className="hero-badge">Our Vision</span>
                <h2>Building Confident <br />Problem Solvers</h2>
                <p>
                  We measure success not by lines of code, but by the clarity of thought.
                  Our goal is to create engineers who can tackle any problem—not just the ones they've memorized.
                </p>
                <ul className="vision-list">
                  <li>
                    <span className="check-icon">✓</span>
                    <span>Systematic thinking over syntax</span>
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    <span>Long-term mastery over quick fixes</span>
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    <span>Genuine understanding over copying</span>
                  </li>
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Vibrant Banner */}
      <section className="cta-section-wrapper">
        <div className="container">
          <ScrollReveal>
            <div className="cta-banner">
              <div className="cta-content-centered">
                <h2>Ready to think like an engineer?</h2>
                <p>Join thousands of learners building their logic foundation today.</p>
                <div className="cta-buttons-row">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/courses" className="btn btn-white-primary">
                      Start Learning Now
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '0.5rem' }}>
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </div>
              <div className="cta-bg-pattern"></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .about-page {
          min-height: 100vh;
        }

        /* Hero Section - Split Layout */
        .about-hero {
          padding: 8rem 0 5rem;
          background: #f9fafb;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-content {
           max-width: 600px;
        }

        .hero-badge {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .about-hero h1 {
          font-size: 3.5rem;
          line-height: 1.1;
          color: #111827;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }

        .hero-lead {
          font-size: 1.25rem;
          color: #4b5563;
          line-height: 1.6;
        }

        .hero-lead em {
          color: #111827;
          font-style: normal;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: rgba(99, 102, 241, 0.3);
          text-decoration-thickness: 4px;
        }

        .hero-image-card {
           position: relative;
           border-radius: 32px;
           overflow: hidden;
           box-shadow: 0 30px 60px -10px rgba(0,0,0,0.12);
           aspect-ratio: 4/3;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-stats-float {
           position: absolute;
           bottom: 24px;
           right: 24px;
           background: rgba(255, 255, 255, 0.9);
           backdrop-filter: blur(8px);
           padding: 1rem 1.5rem;
           border-radius: 20px;
           box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-num {
          font-size: 1.5rem;
          font-weight: 800;
          color: #111827;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
        }

        /* Story Section */
        .story-section {
          padding: 8rem 0;
          background: #ffffff;
        }

        .story-container {
           max-width: 800px;
           margin: 0 auto;
           text-align: center;
        }
        
        .section-label-center {
           display: inline-block;
           padding: 0.5rem 1rem;
           background: #e0e7ff;
           color: #4338ca;
           border-radius: 50px;
           font-size: 0.75rem;
           font-weight: 700;
           text-transform: uppercase;
           letter-spacing: 0.05em;
           margin-bottom: 2rem;
        }

        .story-container h2 {
          font-size: 3rem;
          line-height: 1.2;
          margin-bottom: 2.5rem;
          letter-spacing: -0.02em;
        }

        .story-text p {
           font-size: 1.25rem;
           line-height: 1.8;
           color: #4b5563;
           margin-bottom: 2rem;
        }

        .highlight-text {
           font-size: 1.8rem;
           font-weight: 800;
           color: #111827;
           display: block;
           margin: 1.5rem 0;
        }

        /* Pastel Bento Grid */
        .values-section {
           padding: 8rem 0;
           background: #f9fafb;
        }

        .section-header {
           text-align: center;
           margin-bottom: 4rem;
        }
        
        .section-header h2 {
           font-size: 2.5rem;
           margin-bottom: 1rem;
        }

        .bento-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 2rem;
           max-width: 1000px;
           margin: 0 auto;
        }

        .bento-card {
           padding: 0; /* Reset padding for img handling */
           border-radius: 32px;
           transition: transform 0.3s ease;
           overflow: hidden; /* Clip image */
           position: relative;
           display: flex;
           flex-direction: column;
        }

        .bento-card:hover {
           transform: translateY(-8px);
        }

        /* Pastel Themes */
        .pastel-indigo { background: #EEF2FF; color: #3730A3; }
        .pastel-emerald { background: #ECFDF5; color: #065F46; }
        .pastel-amber { background: #FFFBEB; color: #92400E; }
        .pastel-rose { background: #FFF1F2; color: #9F1239; }
        
        .bento-content {
           padding: 2.5rem 2.5rem 1rem 2.5rem;
           z-index: 2;
           position: relative;
        }

        .bento-icon {
           width: 56px;
           height: 56px;
           display: flex;
           align-items: center;
           justify-content: center;
           background: rgba(255,255,255,0.7);
           border-radius: 16px;
           margin-bottom: 1.5rem;
           backdrop-filter: blur(4px);
        }
        
        .bento-icon svg {
           width: 28px;
           height: 28px;
           opacity: 0.9;
        }

        .bento-card h3 {
           font-size: 1.5rem;
           font-weight: 800;
           margin-bottom: 1rem;
           letter-spacing: -0.01em;
        }

        .bento-card p {
           font-size: 1.1rem;
           line-height: 1.6;
           opacity: 0.9;
           margin-bottom: 2rem;
        }

        .bento-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            object-position: center;
            opacity: 0.9;
            mask-image: linear-gradient(to top, black 60%, transparent 100%);
            -webkit-mask-image: linear-gradient(to top, black 60%, transparent 100%);
            margin-top: auto; /* Push to bottom */
            transition: transform 0.5s ease;
        }

        .bento-card:hover .bento-img {
            transform: scale(1.05);
        }

        /* Audience Section */
        .audience-section {
           padding: 6rem 0;
           background: #ffffff;
        }

        .audience-grid {
           display: grid;
           grid-template-columns: repeat(4, 1fr);
           gap: 1.5rem;
           max-width: 1200px;
           margin: 0 auto;
        }

        .audience-card {
           padding: 2rem 1.5rem;
           background: white;
           border: 1px solid #f3f4f6;
           border-radius: 20px;
           text-align: center;
           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
           display: flex;
           flex-direction: column;
           align-items: center;
           height: 100%;
        }
        
        .audience-card:hover {
           border-color: #6366f1;
           transform: translateY(-8px);
           box-shadow: 0 12px 30px -10px rgba(99, 102, 241, 0.15);
        }

        .audience-icon-wrapper {
            width: 56px;
            height: 56px;
            background: #EEF2FF;
            color: #4F46E5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.25rem;
            transition: transform 0.3s;
        }

        .audience-card:hover .audience-icon-wrapper {
            transform: scale(1.1) rotate(5deg);
            background: #4F46E5;
            color: white;
        }

        .audience-icon-wrapper svg {
            width: 24px;
            height: 24px;
        }

        .audience-card h4 {
           margin-bottom: 0.5rem;
           color: #111827;
           font-size: 1.1rem;
           font-weight: 700;
        }
        
        .audience-card p {
            font-size: 0.9rem;
            color: #6b7280;
            line-height: 1.5;
        }

        /* Vision Section */
        .vision-section {
          padding: 8rem 0;
          background: #f9fafb;
        }

        .vision-grid {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 5rem;
           align-items: center;
        }

        .vision-image-wrapper {
            position: relative;
        }

        .vision-img {
            width: 100%;
            border-radius: 24px;
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
            aspect-ratio: 1;
            object-fit: cover;
        }

        .vision-overlay-card {
            position: absolute;
            bottom: -20px;
            right: -20px;
            background: white;
            padding: 1.5rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 180px;
        }

        .vision-stat {
            font-size: 2rem;
            font-weight: 800;
            color: #4F46E5;
        }

        .vision-label {
            font-size: 0.8rem;
            font-weight: 600;
            color: #6b7280;
            margin-top: 0.25rem;
        }

        .section-label-left {
           display: inline-block;
           padding: 0.5rem 1rem;
           background: #F3F4F6;
           color: #4b5563;
           border-radius: 50px;
           font-size: 0.75rem;
           font-weight: 700;
           text-transform: uppercase;
           letter-spacing: 0.05em;
           margin-bottom: 2rem;
        }

        .vision-content-split h2 {
           font-size: 3rem;
           line-height: 1.1;
           margin-bottom: 1.5rem;
           color: #111827;
        }

        .vision-content-split p {
           font-size: 1.15rem;
           line-height: 1.7;
           color: #4b5563;
           margin-bottom: 2rem;
        }

        .vision-list {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .vision-list li {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 1.05rem;
            color: #111827;
            font-weight: 500;
        }

        .check-icon {
            width: 24px;
            height: 24px;
            background: #D1FAE5;
            color: #059669;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 900;
        }

        /* CTA Banner Section */
        .cta-section-wrapper {
           padding: 3rem 0 4rem;
           background: #ffffff;
        }

        .cta-banner {
            background: transparent;
            padding: 3rem 1rem;
            text-align: center;
            position: relative;
            border: none;
            box-shadow: none;
        }

        .cta-content-centered {
            position: relative;
            z-index: 2;
            color: #111827;
            max-width: 600px;
            margin: 0 auto;
        }

        .cta-content-centered h2 {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 1.25rem;
            color: #111827 !important;
        }

        .cta-content-centered p {
            font-size: 1.15rem;
            color: #4b5563;
            margin-bottom: 2.5rem;
            font-weight: 400;
            line-height: 1.6;
        }

        .btn-white-primary {
            background: hsla(214, 92%, 47%, 1);
            background: linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
            background: -moz-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
            background: -webkit-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
            filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0968E5", endColorstr="#091970", GradientType=1 );
            color: white;
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            display: inline-flex;
            align-items: center;
            transition: all 0.2s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .btn-white-primary:hover {
            filter: brightness(1.1);
            transform: translateY(-2px);
            box-shadow: 0 10px 15px rgba(37, 99, 235, 0.3);
        }

        /* Responsive */
        @media (max-width: 900px) {
           .hero-grid {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 3rem;
           }
           .hero-content {
              margin: 0 auto;
           }
           .bento-grid {
              grid-template-columns: 1fr;
           }
           .audience-grid {
              grid-template-columns: 1fr 1fr;
           }
        }

        @media (max-width: 600px) {
           .about-hero h1 { font-size: 2.5rem; }
           .story-container h2 { font-size: 2.25rem; }
           .audience-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
