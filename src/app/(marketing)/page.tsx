import { PortfolioMain } from "@/components/portfolio/PortfolioMain";
import { PortfolioMasthead } from "@/components/portfolio/PortfolioMasthead";

export default function HomePage() {
  return (
    <>
      <a href="#portfolio-view" className="skip-link">
        Skip to content
      </a>
      <PortfolioMasthead />
      <PortfolioMain />
    </>
  );
}
