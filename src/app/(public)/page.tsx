import AboutPage from '@/components/module/about/AboutPage';
import Hero from '@/components/module/home/Hero';
import ProjectPage from '@/components/module/project/ProjectPage';
import ReviewPage from '@/components/module/review/ReviewPage';
import SkillsPage from '@/components/module/skills/SkillsPage';


export default function Home() {
  return (
    <div>
      <Hero />
      <AboutPage />
      <SkillsPage />
      <ProjectPage />
      <ReviewPage />
    </div>
  );
}
