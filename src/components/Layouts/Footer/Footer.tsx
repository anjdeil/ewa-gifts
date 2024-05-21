import { FC } from "react";
import styles from './styles.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/material";
import Socials from "../Socials/Socials";
import Nav from "../Navigation/Nav";
import { SliderMenu } from "../SliderMenu";
import { SubscriptionForm } from "@/components/Forms";

const FooterAccordion = styled(Accordion)`
  margin: 0;
  background-color: transparent;
  border: none;
  box-shadow: none;
  width: 100%;
  &::before {
    display: none;
  }
  .css-eqpfi5-MuiAccordionSummary-content {
    margin: 0;
  }

  && {
    margin-top: 0;
  }
`;

export const Footer: FC = () =>
{
    return (
        <div className={styles.footer}>
            <FooterAccordion expanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography fontWeight={'bold'} textTransform={'uppercase'}>Аккордеон 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SubscriptionForm />
                </AccordionDetails>
            </FooterAccordion>
            <FooterAccordion expanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography fontWeight={'bold'} textTransform={'uppercase'}>Infomarmacja</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Nav menuId={819} className={styles.footer__nav} />
                </AccordionDetails>
            </FooterAccordion>
            <FooterAccordion expanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography fontWeight={'bold'} textTransform={'uppercase'}>NASZE LOKALIZACE</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SliderMenu menuId={820} />
                </AccordionDetails>
            </FooterAccordion>
            <FooterAccordion sx={{ boxShadow: 'none' }} expanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`"panel1a-content"`}
                    id="panel1a-header"
                >
                    <Typography fontWeight={'bold'} textTransform={'uppercase'}>Kontakt</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Socials menuId={818} className={`${styles.footer__socials}`} />
                </AccordionDetails>
            </FooterAccordion>
        </div>
    )
}
