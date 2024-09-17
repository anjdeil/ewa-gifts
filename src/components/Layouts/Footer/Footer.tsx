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

    .MuiCollapse-wrapperInner {
        display: flex;
    }

    &::before {
    display: none;
    }

    .MuiAccordionDetails-root {
        padding: 0;
    }

    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
        display: none;
    }

    && {
    margin: 0;
    }
    
    @media (max-width: 992px) {
        flex: 100%;
        .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
            display: flex;
        }
    }
`;

const AccordionSummaryCustom = styled(AccordionSummary)`
    margin-bottom: 50px;
    padding: 0;
    min-height: fit-content!important;

  .MuiAccordionSummary-content.Mui-expanded {
    margin: 0;
  }

  @media (max-width: 1024px) {
    margin-bottom: 25px;
  }

  @media (max-width: 992px) {
    margin-bottom: 10px;

    .MuiAccordionSummary-content {
        margin: 0;        
    }
  }
`;

export const Footer: FC = () => {

    const isMobile = useMediaQuery('(max-width: 768px)');
    const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'panel1' : false);

    const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={`${styles.footer} container`}>
            <div className={styles.footer__column}>
                <SubscriptionForm formId={22199} />
            </div>
            <div className={styles.footer__column}>
                <FooterAccordion expanded={!isMobile || expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummaryCustom
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <h3 className={`${styles.footer__title} secondary-title`}>Informacja</h3>
                    </AccordionSummaryCustom>
                    <AccordionDetails>
                        <Nav menuId={817}
                            className={styles.footer__nav}
                            skeleton={
                                {
                                    elements: 7,
                                    isColumn: true,
                                    width: "200px",
                                    height: "30px",
                                    gap: '5px'
                                }
                            }
                        />
                    </AccordionDetails>
                </FooterAccordion>
            </div>
            <div className={styles.footer__column}>
                <FooterAccordion expanded={!isMobile || expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummaryCustom
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <h3 className={`${styles.footer__title} secondary-title`}>NASZE LOKALIZACE</h3>
                    </AccordionSummaryCustom>
                    <AccordionDetails>
                        <SliderMenu menuId={820}
                            className={styles.footer__menuSlider}
                            skeleton={
                                {
                                    elements: 6,
                                    isColumn: true,
                                    width: "200px",
                                    height: '30px',
                                    gap: '5px'
                                }
                            }
                        />
                    </AccordionDetails>
                </FooterAccordion>
            </div>
            <div className={styles.footer__column}>
                <FooterAccordion expanded={!isMobile || expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummaryCustom
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`"panel1a-content"`}
                        id="panel1a-header"
                    >
                        <h3 className={`${styles.footer__title} secondary-title`}>Kontakt</h3>
                    </AccordionSummaryCustom>
                    <AccordionDetails>
                        <Socials
                            menuId={818}
                            skeleton={
                                {
                                    elements: 7,
                                    isColumn: true,
                                    width: "200px",
                                    height: "30px",
                                    gap: '5px'
                                }
                            }
                            className={`${styles.footer__socials}`}
                        />
                    </AccordionDetails>
                </FooterAccordion>
            </div>
        </div>
    )
}
