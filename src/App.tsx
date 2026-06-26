import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { WorkExperience } from './components/WorkExperience';
import { Certifications } from './components/Certifications';
import { ContactForm } from './components/ContactForm';
import { PERSONAL_DATA } from './data/portfolioData';

const bodyElements = [
  { id: 'home', displayName: '// home.root', element: Hero },
  { id: 'about', displayName: '// about.log', element: AboutMe },
  { id: 'experience', displayName: '// experience.nodes', element: WorkExperience },
  { id: 'education', displayName: '// education.vault', element: Certifications },
  { id: 'contact', displayName: '// contact.secure', element: ContactForm }
];

function App() {
  return (
    <div className="bg-clean-bg min-h-screen text-slate-dark relative selection:bg-cerulean/25">
      {/* Global Navbar */}
      <Navbar navElements={bodyElements.map(el => ({ ...el, element: undefined }))} />

      {/* Body Sections */}
      {bodyElements.map(({ id, element: Element }) => (
        <section key={id} id={id} className="min-h-screen flex items-center justify-center">
          <Element />
        </section>
      ))}

      {/* Footer Shell */}
      <footer className="py-12 border-t border-slate-200/50 bg-white/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[11px] text-slate-500">
          <div>
            <span>MF // AUDIT_LOG // © {new Date().getFullYear()} MELKY FERNANDES. ALL RIGHTS PROTECTED.</span>
          </div>
          <div className="flex gap-4">
            <a href={PERSONAL_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cerulean transition-colors">
              // LINKEDIN
            </a>
            <a href={PERSONAL_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cerulean transition-colors">
              // GITHUB
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
