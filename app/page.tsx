import HeroSlideshow from "./components/HeroSlideshow";
import HillsAssistant from "./components/HillsAssistant";
import AdmissionApplicationForm from "./components/AdmissionApplicationForm";
const cloudinary = "https://res.cloudinary.com/azrvy9ub/image/upload";
const assets = {
  logo: cloudinary + "/v1794316527/1794316169002.jpg",
  hero: cloudinary + "/v1794316525/1794316196149.jpg",
  campus: cloudinary + "/v1794316525/1794316203995.jpg",
  learners: cloudinary + "/v1794316524/1794316211355.jpg",
  boarding: cloudinary + "/v1794316523/1794316214986.jpg",
  schoolLife: cloudinary + "/v1794316524/1794316227138.jpg",
  activities: cloudinary + "/v1794316527/1794316184528.jpg",
  community: cloudinary + "/v1794316526/1794316187874.jpg",
  galleryOne: cloudinary + "/v1794316523/1794316235562.jpg",
  galleryTwo: cloudinary + "/v1794316523/1794316246574.jpg",
  galleryThree: cloudinary + "/v1794316522/1794316253006.jpg",
  galleryFour: cloudinary + "/v1794316522/1794316275745.jpg",
  galleryFive: cloudinary + "/v1794316378/21494.jpg"
};

function BrandMark() {
  return (
    <div className="brand-lockup">
      {assets.logo ? (
        <img className="brand-logo" src={assets.logo} alt="Gilgil Hills Academy crest" />
      ) : (
        <div className="brand-placeholder" aria-label="Gilgil Hills Academy logo placeholder">
          <span>GHA</span>
          <small>ACADEMY</small>
        </div>
      )}
      <div className="brand-copy">
        <span className="brand-name">GILGIL HILLS</span>
        <span className="brand-academy">ACADEMY</span>
        <span className="brand-motto">Excellence in All We Do</span>
      </div>
    </div>
  );
}

function PhotoFrame({
  src,
  alt,
  label,
  className = ""
}: {
  src?: string;
  alt: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={"photo-frame " + className}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="photo-placeholder">
          <span className="placeholder-symbol">GHA</span>
          <span>{label}</span>
          <small>School photo will appear here</small>
        </div>
      )}
    </div>
  );
}

const schoolSections = [
  {
    number: "01",
    title: "Pre-Primary & Lower Primary",
    range: "PP1 – Grade 3",
    description: "A warm, engaging foundation where curiosity, confidence and essential skills begin to grow."
  },
  {
    number: "02",
    title: "Upper Primary",
    range: "Grade 4 – Grade 6",
    description: "Building knowledge, independence and strong learning habits for the next stage."
  },
  {
    number: "03",
    title: "Junior Secondary",
    range: "Grade 7 – Grade 9",
    description: "Supporting learners as they discover their strengths, talents and future pathways."
  },
  {
    number: "04",
    title: "Boarding School",
    range: "A caring home away from home",
    description: "A structured and supportive boarding environment that nurtures responsibility and belonging."
  }
];

const learningPillars = [
  ["01", "Strong foundations", "Meaningful learning experiences that build knowledge, skills and confidence."],
  ["02", "CBC learning", "A learner-centred approach that supports competencies, creativity and practical application."],
  ["03", "Talent development", "Opportunities to discover and grow through sport, music, drama and school activities."],
  ["04", "Character & values", "Encouraging respect, responsibility, discipline and a positive attitude to learning."]
];

const admissionSteps = [
  ["01", "Make an enquiry", "Speak with the admissions office about the grade and school option you are considering."],
  ["02", "Visit the school", "Arrange a visit to learn about the learning environment and meet the school team."],
  ["03", "Assessment & documents", "The admissions team will explain any assessment and documents required for the selected grade."],
  ["04", "Confirmation", "Receive guidance from the school on placement, reporting and the next steps."]
];

export default function HomePage() {
  return (
    <main>
      <div className="topline">
        <div className="container topline-inner">
          <span>OFF GILGIL–NYAHURURU ROAD · GILGIL, NAKURU COUNTY</span>
          <div className="topline-contact">
            <a href="tel:+254794952635">0794 952 635</a>
            <span className="topline-dot">•</span>
            <a href="mailto:gilgilhillsacademy2026@gmail.com">gilgilhillsacademy2026@gmail.com</a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#home" className="brand-link" aria-label="Gilgil Hills Academy home">
            <BrandMark />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#home" className="active">Home</a>
            <a href="#about">About</a>
            <a href="#schools">Our Schools</a>
            <a href="#academics">Academics</a>
            <a href="#boarding">Boarding</a>
            <a href="#admissions">Admissions</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="button button-red header-cta" href="#admissions">Apply Now <span>↗</span></a>
          <details className="mobile-menu">
            <summary aria-label="Open navigation menu"><span></span><span></span><span></span></summary>
            <nav aria-label="Mobile navigation">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#schools">Our Schools</a>
              <a href="#academics">Academics</a>
              <a href="#boarding">Boarding</a>
              <a href="#admissions">Admissions</a>
              <a href="#gallery">Gallery</a>
              <a href="#contact">Contact</a>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero" id="home">
        <HeroSlideshow slides={[
          { src: assets.hero, alt: "Gilgil Hills Academy school life" },
          { src: assets.campus, alt: "Gilgil Hills Academy campus" },
          { src: assets.learners, alt: "Learners at Gilgil Hills Academy" },
          { src: assets.community, alt: "The Gilgil Hills Academy community" }
        ]} />
        <div className="hero-swoosh hero-swoosh-red"></div>
        <div className="hero-swoosh hero-swoosh-yellow"></div>
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> LEARN · GROW · EXCEL</div>
            <div className="hero-school-name">GILGIL HILLS ACADEMY</div>
            <h1><span>rising higher</span><br /><em>every single year.</em></h1>
            <p className="hero-lead">A brighter future begins with a strong foundation.</p>
            <p className="hero-description">
              For over 25 years, Gilgil Hills Academy has been committed to nurturing learners,
              building character and opening doors to opportunity.
            </p>
            <div className="hero-actions">
              <a className="button button-yellow" href="#schools">Explore Our Schools <span>→</span></a>
              <a className="button button-outline-light" href="#about">Discover Gilgil Hills</a>
            </div>
            <div className="hero-proof">
              <span className="proof-star">★</span>
              <span>EXCELLENCE IN ALL WE DO</span>
            </div>
          </div>
          <div className="hero-photo-caption">
            <span className="caption-accent"></span>
            <strong>Learning today.</strong>
            <span>Leading tomorrow.</span>
          </div>
        </div>
        <div className="hero-bottom-band">
          <div className="container hero-stats">
            <div className="stat">
              <strong>25<span>+</span></strong>
              <span>Years of learning</span>
            </div>
            <div className="stat">
              <strong>PP1<span>–</span>9</strong>
              <span>Pre-primary to Grade 9</span>
            </div>
            <div className="stat">
              <strong>Day <span>&</span> Boarding</strong>
              <span>Learning options</span>
            </div>
            <div className="stat-note">One community.<br /><b>One standard of excellence.</b></div>
          </div>
        </div>
      </section>

      <section className="intro-section section-pad" id="about">
        <div className="container intro-grid">
          <div className="intro-visual">
            <PhotoFrame src={assets.campus} alt="Gilgil Hills Academy campus" label="Campus photograph" className="campus-photo" />
            <div className="photo-stamp"><span>GILGIL</span><strong>HILLS</strong><small>ACADEMY</small></div>
            <div className="years-card"><strong>25<span>+</span></strong><span>Years of<br />commitment</span></div>
          </div>
          <div className="intro-copy">
            <div className="eyebrow"><span className="eyebrow-line"></span> WELCOME TO GILGIL HILLS</div>
            <h2>More than a school.<br /><em>A place to thrive.</em></h2>
            <p className="section-lead">
              We believe every learner deserves the opportunity to discover their potential and
              prepare for a meaningful future.
            </p>
            <p>
              At Gilgil Hills Academy, we bring together learning, character development and a
              supportive school community. From the early years through Junior Secondary, we guide
              learners as they grow in confidence, knowledge and responsibility.
            </p>
            <div className="intro-values">
              <div><span className="value-icon">✦</span><span><b>Purposeful learning</b><small>Building skills for life</small></span></div>
              <div><span className="value-icon">✦</span><span><b>Individual potential</b><small>Encouraging every learner</small></span></div>
            </div>
            <a className="text-link" href="#academics">Discover our approach <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="schools-section section-pad" id="schools">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line"></span> OUR LEARNING COMMUNITY</div>
              <h2>Every stage.<br /><em>Room to rise.</em></h2>
            </div>
            <p>Thoughtful learning and guidance at every stage of the journey, from the first classroom experiences to Junior Secondary.</p>
          </div>
          <div className="school-grid">
            {schoolSections.map((school) => (
              <article className="school-card" key={school.number}>
                <div className="school-card-top"><span>{school.number}</span><span className="school-arrow">↗</span></div>
                <div className="school-card-rule"></div>
                <h3>{school.title}</h3>
                <div className="school-range">{school.range}</div>
                <p>{school.description}</p>
                <a href="#admissions" className="card-link">Enquire about this section <span>→</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="academics-section section-pad" id="academics">
        <div className="container academics-grid">
          <div className="academics-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> LEARNING WITH PURPOSE</div>
            <h2>Knowledge.<br /><em>Character.</em><br />Possibility.</h2>
            <p>
              Learning is about more than what happens in a textbook. We encourage learners to ask
              questions, solve problems, collaborate and apply what they discover.
            </p>
            <a className="button button-yellow" href="#contact">Talk to our school team <span>→</span></a>
          </div>
          <div className="pillars-list">
            {learningPillars.map(([number, title, description]) => (
              <article className="pillar" key={number}>
                <span className="pillar-number">{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <span className="pillar-plus">+</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="boarding-section section-pad" id="boarding">
        <div className="container boarding-grid">
          <div className="boarding-copy">
            <div className="eyebrow"><span className="eyebrow-line"></span> GILGIL HILLS BOARDING</div>
            <h2>A home away<br /><em>from home.</em></h2>
            <p className="section-lead">A supportive environment where learners can study, grow and build lasting friendships.</p>
            <p>
              Our boarding programme is designed around structure, care and a sense of community.
              Families are encouraged to contact the school for current details about accommodation,
              routines, requirements and boarding fees.
            </p>
            <a className="text-link" href="#contact">Ask about boarding <span>→</span></a>
          </div>
          <PhotoFrame src={assets.boarding} alt="Gilgil Hills Academy boarding facilities" label="Boarding photograph" className="boarding-photo" />
        </div>
      </section>

      <section className="life-section section-pad">
        <div className="container life-inner">
          <div className="life-heading">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> BEYOND THE CLASSROOM</div>
            <h2>Discover your<br /><em>potential.</em></h2>
          </div>
          <div className="life-copy">
            <p>School life is enriched by experiences that help learners build confidence, teamwork and a sense of belonging.</p>
            <div className="life-tags">
              <span>Sports</span><span>Music</span><span>Drama</span><span>Clubs</span><span>Talent</span><span>Community</span>
            </div>
            <a className="button button-outline-light" href="#gallery">Explore school life <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="admissions-section section-pad" id="admissions">
        <div className="container">
          <div className="section-heading admissions-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line"></span> JOIN OUR COMMUNITY</div>
              <h2>Your next chapter<br /><em>starts here.</em></h2>
            </div>
            <div className="admissions-intro">
              <p>We welcome enquiries from families interested in joining Gilgil Hills Academy. Our team will guide you through the process and explain the requirements for your chosen grade.</p>
              <a className="button button-red" href="https://wa.me/254794952635?text=Hello%20Gilgil%20Hills%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20admission." target="_blank" rel="noreferrer">Start an enquiry <span>↗</span></a>
            </div>
          </div>
          <div className="steps-grid">
            {admissionSteps.map(([number, title, description]) => (
              <article className="step-card" key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="admissions-note">
            <span className="note-star">✦</span>
            <p><b>Need the latest fees or requirements?</b> Contact the admissions office directly. We will share the current approved information with you.</p>
            <a href="#contact">Contact admissions <span>→</span></a>
          </div>
          <AdmissionApplicationForm />
        </div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="container">
          <div className="gallery-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line"></span> A GLIMPSE OF GILGIL HILLS</div>
              <h2>Our school.<br /><em>Our moments.</em></h2>
            </div>
            <p>Every day brings new opportunities to learn, connect and grow.</p>
          </div>
          <div className="gallery-grid">
            <PhotoFrame src={assets.learners} alt="Learners at Gilgil Hills Academy" label="Learner photograph" className="gallery-main" />
            <PhotoFrame src={assets.campus} alt="Gilgil Hills Academy campus" label="Campus photograph" />
            <PhotoFrame src={assets.boarding} alt="Gilgil Hills Academy boarding" label="Boarding photograph" />
            <PhotoFrame src={assets.schoolLife} alt="Gilgil Hills Academy school life" label="School life photograph" />
            <PhotoFrame src={assets.activities} alt="Gilgil Hills Academy activities" label="School activities" />
            <PhotoFrame src={assets.community} alt="Gilgil Hills Academy community" label="School community" />
            <PhotoFrame src={assets.galleryOne} alt="Gilgil Hills Academy learners and school activities" label="School moments" />
            <PhotoFrame src={assets.galleryTwo} alt="Gilgil Hills Academy school activities" label="School activities" />
            <PhotoFrame src={assets.galleryThree} alt="Gilgil Hills Academy learners" label="Learner moments" />
            <PhotoFrame src={assets.galleryFour} alt="Gilgil Hills Academy campus and learning" label="Learning moments" />
            <PhotoFrame src={assets.galleryFive} alt="Gilgil Hills Academy school life" label="School life" />
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> LET'S TALK</div>
            <h2>We would love<br />to hear <em>from you.</em></h2>
            <p>Speak with our team about admissions, school visits, day and boarding options, or any other question you may have.</p>
            <a className="button button-yellow" href="https://wa.me/254794952635" target="_blank" rel="noreferrer">Chat with us on WhatsApp <span>↗</span></a>
          </div>
          <div className="contact-details">
            <div className="contact-item"><span className="contact-icon">☎</span><div><small>CALL OUR OFFICE</small><a href="tel:+254794952635">0794 952 635</a><a href="tel:+254710308818">0710 308 818</a></div></div>
            <div className="contact-item"><span className="contact-icon">✉</span><div><small>EMAIL US</small><a href="mailto:gilgilhillsacademy2026@gmail.com">gilgilhillsacademy2026@gmail.com</a></div></div>
            <div className="contact-item"><span className="contact-icon">⌖</span><div><small>FIND US</small><span>Off Gilgil–Nyahururu Road,<br />Gilgil, Nakuru County, Kenya</span><a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Gilgil+Hills+Academy+Gilgil+Kenya" target="_blank" rel="noreferrer">Get directions ↗</a></div></div>
            <div className="contact-item"><span className="contact-icon">◷</span><div><small>OFFICE HOURS</small><span>Monday – Friday: 8:00am – 4:00pm<br />Saturday: 9:00am – 12:00pm</span></div></div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand"><BrandMark /><p>Learning with purpose. Growing with confidence. <b>Excellence in All We Do.</b></p></div>
          <div className="footer-links"><span>EXPLORE</span><a href="#about">About us</a><a href="#schools">Our schools</a><a href="#academics">Academics</a><a href="#boarding">Boarding</a></div>
          <div className="footer-links"><span>GET IN TOUCH</span><a href="#admissions">Admissions</a><a href="#gallery">Gallery</a><a href="#contact">Contact us</a><a href="mailto:gilgilhillsacademy2026@gmail.com">Email the school</a></div>
          <div className="footer-contact"><span>CALL THE SCHOOL</span><a href="tel:+254794952635">0794 952 635</a><a href="tel:+254710308818">0710 308 818</a><a href="https://wa.me/254794952635" target="_blank" rel="noreferrer">WhatsApp us ↗</a></div>
        </div>
        <div className="footer-bottom"><div className="container footer-bottom-inner"><span>© {new Date().getFullYear()} Gilgil Hills Academy. All rights reserved.</span><span>Website by <b>DIGITAL KINGDOM MEDIA</b></span></div></div>
      </footer>

      <HillsAssistant />

      <a className="whatsapp-float" href="https://wa.me/254794952635" target="_blank" rel="noreferrer" aria-label="Chat with Gilgil Hills Academy on WhatsApp">
        <span>◉</span><small>Chat with us</small>
      </a>
    </main>
  );
}