import AboutPage from '@/components/module/about/AboutPage';
import Hero from '@/components/module/home/Hero';
import SkillsPage from '@/components/module/skills/SkillsPage';


export default function Home() {
  return (
    <div>
      <Hero />
      <AboutPage />
      <SkillsPage />
    </div>
  );
}
