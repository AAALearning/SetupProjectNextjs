import PorfolioBanner from "@/components/portfolio/PortfolioBanner";
import styles from "./index.module.css";
import PorfolioDetails from "@/components/portfolio/PortfolioDetails";
import { getDictionary, Language } from "@/utils/dictionaries";
import LangButton from "@/components/portfolio/LangButton";

// export const metadata = { };
export const generateMetadata = async ({ params }: { params: Promise<{ lang: Language }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    metadataBase: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    title: "Portfoio",
    description: dict.portfolio.metadata.description,
    keywords: ["NextJS", "React", "Web", "Portfolio"],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Portfolio",
      description: "Checkout my portfolio",
      url: "/",
      siteName: "Portfolio",
      type: "website",
      images: [
        {
          url: "/portfolio/avatar.png",
          width: 800,
          height: 600,
        },
        {
          url: "/portfolio/avatar.png",
          width: 1800,
          height: 1600,
          alt: "My avatar",
        },
      ],
    },
  };
};

const Porfolio = async ({ params }: { params: Promise<{ lang: Language }> }) => {
  return (
    <main className={styles.container}>
      <LangButton />
      <PorfolioBanner params={params} />
      <PorfolioDetails />
    </main>
  );
};

export default Porfolio;
