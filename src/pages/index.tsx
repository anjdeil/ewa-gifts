import Head from "next/head";
// import { Slider } from "@/components/Slider";
import { Hero } from "@/components/Hero";
import { HeroPropsType, TopProductSliderType } from "@/types";
import { TopProductSlider } from "@/components/TopProductSlider";
import { Split } from "@/components/Split";
import { Features } from "@/components/Features";

const data: HeroPropsType = {
  title: "Misja perfekcja",
  richText:
    `
  <h1>This is an example of rich text content.</h1>
  <p>Gadżety reklamowe efek: końcowy to sukces wsp?Inej pracy Twojej 
  i naszej firmy. Ostatecznie, geyby nie Twillj kontakt z nami. za kthry z gry 
  ślicznie dziękujemy, nie stworzylibyśmy czegoś, co zmieni wizerunek Twojej marki w oczach Twoich klientw. 
  To, jaki efekt przyniesie la praca, przekonasz się już wkratce.</p>
  <p>Stworzenie dla Ciebie upominku reklamowego jest naszym wspill nym celem, Twoje zadowolenie naszą misją, ale z efektu, 
  jaki przyniesie przygotowany i dostarczony przez nas gacżet, będziemy cieszyć się wspilnie. 
  Czekamy na Twaj kontakt. Wiemy, że go wykonasz. Pamiętaj każdy z zam? 
  wionych gadżethw reklamowych odniesie większy efekt i sukces od tych gadżettw, kt rych nie zam wisz.</p>
  `,
  isReversed: false,
  images: {
    large: {
      alt: "Large Image Alt Text",
      src: "/images/testHero.jpg"
    },
    small: {
      alt: "Small Image Alt Text",
      src: "/images/testHero.jpg"
    }
  }
};

const TopSlider: TopProductSliderType[] = [
  {
    images: {
      large: {
        alt: "Large Image Alt Text",
        src: "/images/testSlideProd.jpg"
      },
      small: {
        alt: "Small Image Alt Text",
        src: "/images/testSlideProd.jpg"
      }
    },
    title: 'Czapka z daszkiem 6-panelowa SAN FRANCISCO',
    desc: 'Od zł 7.19 bez VAT',
  },

  {
    images: {
      large: {
        alt: "Large Image Alt Text",
        src: "/images/testSlideProd.jpg"
      },
      small: {
        alt: "Small Image Alt Text",
        src: "/images/testSlideProd.jpg"
      }
    },
    title: 'Czapka z daszkiem 6-panelowa SAN FRANCISCO',
    desc: 'Od zł 7.19 bez VAT',
  },
  {
    images: {
      large: {
        alt: "Large Image Alt Text",
        src: "/images/testSlideProd.jpg"
      },
      small: {
        alt: "Small Image Alt Text",
        src: "/images/testSlideProd.jpg"
      }
    },
    title: 'Czapka z daszkiem 6-panelowa SAN FRANCISCO',
    desc: 'Od zł 7.19 bez VAT',
  },
  {
    images: {
      large: {
        alt: "Large Image Alt Text",
        src: "/images/testSlideProd.jpg"
      },
      small: {
        alt: "Small Image Alt Text",
        src: "/images/testSlideProd.jpg"
      }
    },
    title: 'Czapka z daszkiem 6-panelowa SAN FRANCISCO',
    desc: 'Od zł 7.19 bez VAT',
  },
]

const featuresdata = [
  {
    _type: "_",
    image: "https://new.ewagifts.pl/wp-content/uploads/2024/05/12-years-1.svg",
    text: "12 lat doświadczenia"
  },
  {
    _type: "_",
    image: "https://new.ewagifts.pl/wp-content/uploads/2024/05/virsualization.svg",
    text: "Darmowa wizualizacja"
  },
  {
    _type: "_",
    image: "https://new.ewagifts.pl/wp-content/uploads/2024/05/support.svg",
    text: "Profesjonalne doradztwo"
  }
]

const Home = () =>
{
  const pageTitle = "Home Page";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main
        style={{ padding: 30 }}>
        <h1>{pageTitle}</h1>
        {/* <TestToolkit /> */}
        <Hero data={data} />
        {/* <Slider /> */}
        <Split
          leftContent={<TopProductSlider data={TopSlider} />}
          rightContent={<TopProductSlider data={TopSlider} />}
          isReversed={true}
        />
        <Features data={featuresdata} />
      </main >
    </>
  );
};

export default Home;
