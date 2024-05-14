import Head from "next/head";
// import { Slider } from "@/components/Slider";
import { Hero } from "@/components/Hero";
import { HeroPropsType, ProductType, TopProductSliderType } from "@/types";
import { TopProductSlider } from "@/components/TopProductSlider";
import { Split } from "@/components/Split";
import { Features } from "@/components/Features";
import { BlogList } from "@/components/BlogList";
import { useFetchProductListQuery } from "@/store/actionCreators";
import { ProductCard } from "@/components/ProductCard";

const dataHero: HeroPropsType = {
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

const blogTest = [
  {
    id: 22184,
    date: "2024-05-13T12:52:26",
    slug: "eko-gadzety-z-wlasnym-logo-od-ewa-gifts",
    status: "publish",
    title: "Eko-Gadżety z Własnym Logo od Ewa Gifts",
    excerpt: "<p>W roku 2024 obserwujemy fascynujący rozwój w dziedzinie gadżetów reklamowych, a szczególnie w kategorii ekologicznych gadżetów z własnym logo oferowanych przez firmę Ewa Gifts. </p>\n",
    content: "\n<p>W roku 2024 obserwujemy fascynujący rozwój w dziedzinie gadżetów reklamowych, a szczególnie w kategorii ekologicznych gadżetów z własnym logo oferowanych przez firmę Ewa Gifts.W roku 2024 obserwujemy fascynujący rozwój w dziedzinie gadżetów reklamowych, a szczególnie w kategorii ekologicznych gadżetów z własnym logo oferowanych przez firmę Ewa Gifts.W roku 2024 obserwujemy fascynujący rozwój w dziedzinie gadżetów reklamowych, a szczególnie w kategorii ekologicznych gadżetów z własnym logo oferowanych przez firmę Ewa Gifts.W roku 2024 obserwujemy fascynujący rozwój w dziedzinie gadżetów reklamowych, a szczególnie w kategorii ekologicznych gadżetów z własnym logo oferowanych przez firmę Ewa Gifts.W roku 2024 obserwujemy fascynujący rozwój w dziedzinie gadżetów reklamowych, a szczególnie w kategorii ekologicznych gadżetów z własnym logo oferowanych przez firmę Ewa Gifts.W roku 2024 obserwujemy fascynujący rozwój w dziedzinie gadżetów reklamowych, a szczególnie w kategorii ekologicznych gadżetów z własnym logo oferowanych przez firmę Ewa Gifts.W roku 2024 obserwujemy fascynujący rozwój w dziedzinie gadżetów reklamowych, a szczególnie w kategorii ekologicznych gadżetów z własnym logo oferowanych przez firmę Ewa Gifts.</p>\n",
    image: "https://new.ewagifts.pl/wp-content/uploads/2024/05/testArt4.jpg"
  },
  {
    id: 22182,
    date: "2024-05-13T12:51:59",
    slug: "dlaczego-warto-inwestowac-w-gadzety-reklamowe",
    status: "publish",
    title: "Dlaczego warto inwestować w gadżety reklamowe?",
    excerpt: "<p> Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO. </p>\n",
    content: "\n<p>Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.</p>\n",
    image: "https://new.ewagifts.pl/wp-content/uploads/2024/05/testArt3.jpg"
  },
  {
    id: 22178,
    date: "2024-05-13T12:51:05",
    slug: "otwieramy-drzwi-do-sukcesu-z-ewa-gifts",
    status: "publish",
    title: "Dlaczego warto inwestować w gadżety reklamowe?",
    excerpt: "<p> Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO. </p>\n",
    content: "\n<p>Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.</p>\n",
    image: "https://new.ewagifts.pl/wp-content/uploads/2024/05/testArt2.jpg"
  },
  {
    id: 22187,
    date: "2024-05-13T12:51:59",
    slug: "dlaczego-warto-inwestowac-w-gadzety-reklamowe",
    status: "publish",
    title: "Dlaczego warto inwestować w gadżety reklamowe?",
    excerpt: "<p> Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO. </p>\n",
    content: "\n<p>Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.Czy kiedykolwiek zastanawiałeś się, dlaczego niektóre firmy odnoszą takie sukcesy w marketingu, podczas gdy inne z trudnością utrzymują się na powierzchni? Sekretem nie jest zawsze czy charyzmatyczny CEO.</p>\n",
    image: "https://new.ewagifts.pl/wp-content/uploads/2024/05/testArt1.jpg"
  }
]

const Home = () =>
{

  const { data, isError, isLoading } = useFetchProductListQuery({});

  let products = [];

  if (data)
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products = data.map((product: any): ProductType =>
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const colorAttribute = product.attributes.filter((attr: any) => attr.slug === 'pa_kolor' && attr.options.length > 0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sizes = product.attributes.filter((attr: any) => attr.slug === 'pa_rozmiar' && attr.options.length > 0);
      // const default_attr = product.attribures.default_attributes;
      // console.log(default_attr);
      return {
        name: product.name,
        price: product.price,
        slug: product.slug,
        price_html: product.price_html,
        image: product.images[0].src,
        attributes: colorAttribute ? colorAttribute : [],
        default_attr: '',
        isSized: sizes ? sizes : [],
      }
    })
    // console.log(products[0].attributes[0].options);
  }

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
        {/* <Hero data={dataHero} /> */}
        {/* <Slider /> */}
        {/* <Split
          leftContent={<TopProductSlider data={TopSlider} />}
          rightContent={<TopProductSlider data={TopSlider} />}
          isReversed={true}
        /> */}
        {/* <Features data={featuresdata} /> */}
        {/* <BlogList data={blogTest} /> */}
        {products && products.map((product, index) => <ProductCard key={index} product={product} />)}
      </main >
    </>
  );
};

export default Home;
