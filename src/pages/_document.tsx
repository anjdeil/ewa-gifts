import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
export default class MyDocument extends Document
{
    render()
    {
        return (
            <Html lang="pl">
                <Head>
                    {/* Google Tag Manager */}
                    <Script id="gtm-script" strategy="afterInteractive">
                        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-TCTL7HVL');`}
                    </Script>
                    {/* End Google Tag Manager */}
                    {/* Organization Schema */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Organization",
                                "name": "Ewa Gifts",
                                "url": "https://ewagifts.pl/",
                                "logo": "https://ewagifts.pl/logo.svg",
                                "sameAs": [
                                    "https://www.facebook.com/people/Ewa-Gifts/61558161148225/",
                                    "https://www.instagram.com/ewagifts.pl/"
                                ]
                            })
                        }}
                    />
                </Head>
                <body>
                    {/* Google Tag Manager (noscript) */}
                    <noscript>
                        <iframe
                            src="https://www.googletagmanager.com/ns.html?id=GTM-TCTL7HVL"
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        ></iframe>
                    </noscript>
                    {/* End Google Tag Manager (noscript) */}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
