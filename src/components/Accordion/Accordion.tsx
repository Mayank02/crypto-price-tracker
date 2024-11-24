import React, { useState } from "react";
import accordionStyles from "./Accordion.module.css";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={accordionStyles.actions}>
      <div className={accordionStyles.accordion}>
        <button
          className={accordionStyles.accordionButton}
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls="accordion-content"
          id="accordion-header"
          data-testid="accordion-button"
        >
          <span className={accordionStyles.title}>{title}</span>
          <span className={accordionStyles.icon}>{isOpen ? "-" : "+"}</span>
        </button>
        {isOpen && (
          <div
            id="accordion-content"
            role="region"
            aria-labelledby="accordion-header"
            className={accordionStyles.accordionContent}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default Accordion;
