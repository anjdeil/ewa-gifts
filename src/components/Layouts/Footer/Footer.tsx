import { FC, useState } from "react";
import styles from './styles.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, useMediaQuery } from "@mui/material";
import Socials from "../Socials/Socials";
import Nav from "../Navigation/Nav";
import { SliderMenu } from "../SliderMenu";
import { SubscriptionForm } from "@/components/Forms";

const FooterAccordion = styled(Accordion)`
    margin: 0;
    background-color: transparent;
    border: none;
    box-shadow: none;
    flex: 1;

    .css-9l5vo-MuiCollapse-wrapperInner {
        display: flex;
    }

    &::before {
    display: none;
    }

    .css-15v22id-MuiAccordionDetails-root {
    padding: 0;
    }

    .css-yw020d-MuiAccordionSummary-expandIconWrapper.Mui-expanded {
        display: none;
    }

    && {
    margin: 0;
    }
    
    @media (max-width: 992px) {
        flex: 100%;
        .css-yw020d-MuiAccordionSummary-expandIconWrapper.Mui-expanded {
            display: flex;
        }
    }
`;

const AccordionSummaryCustom = styled(AccordionSummary)`
    margin-bottom: 50px;
    padding: 0;
    min-height: fit-content!important;

  .css-eqpfi5-MuiAccordionSummary-content.Mui-expanded {
    margin: 0;
  }

  @media (max-width: 1024px) {
    margin-bottom: 25px;
  }

  @media (max-width: 992px) {
    margin-bottom: 10px;

    .css-eqpfi5-MuiAccordionSummary-content {
        margin: 0;        
    }
  }
`;

export const Footer: FC = () =>
{

    const isMobile = useMediaQuery('(max-width: 992px)');
    const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'panel1' : false);

    const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) =>
    {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={styles.footer}>
            <div className={styles.footer__form}>
                <SubscriptionForm formId={22199} />
            </div>
            <FooterAccordion expanded={!isMobile || expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummaryCustom
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <h3 className={`${styles.footer__title} sub-title`}>Infomarmacja</h3>
                </AccordionSummaryCustom>
                <AccordionDetails>
                    <Nav menuId={819} className={styles.footer__nav} />
                </AccordionDetails>
            </FooterAccordion>
            <FooterAccordion expanded={!isMobile || expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummaryCustom
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <h3 className={`${styles.footer__title} sub-title`}>NASZE LOKALIZACE</h3>
                </AccordionSummaryCustom>
                <AccordionDetails>
                    <SliderMenu menuId={820} className={styles.footer__menuSlider} />
                </AccordionDetails>
            </FooterAccordion>
            <FooterAccordion expanded={!isMobile || expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummaryCustom
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`"panel1a-content"`}
                    id="panel1a-header"
                >
                    <h3 className={`${styles.footer__title} sub-title`}>Kontakt</h3>
                </AccordionSummaryCustom>
                <AccordionDetails>
                    <Socials
                        menuId={818}
                        skeleton={{
                            elements: 2,
                            width: 100,
                            height: 60,
                            gap: '30px'
                        }}
                        className={`${styles.footer__socials}`}
                    />
                </AccordionDetails>
            </FooterAccordion>
        </div>
    )
}
