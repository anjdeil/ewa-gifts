import Head from "next/head";
import { Slider } from "@/components/Slider";
import { Hero } from "@/components/Hero";
import { HeroPropsType } from "@/types";

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

const Home = () => {
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
        <Slider />
      </main >
    </>
  );
};

export default Home;
