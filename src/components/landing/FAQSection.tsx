import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-white/10">
              <AccordionTrigger className="text-left">
                How do you ensure the quality of the pitches?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Our AI-powered system is trained on successful music pitches and follows industry best practices. Each pitch is crafted to highlight your unique strengths while maintaining a professional tone. You can also edit and customize the pitch to your liking before sending.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-white/10">
              <AccordionTrigger className="text-left">
                What happens after I make the payment?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                After your $1 payment is processed, you'll get immediate access to our pitch creator tool. You can start creating your pitch right away, and you'll be able to edit, download, or copy your pitch as many times as you need.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-white/10">
              <AccordionTrigger className="text-left">
                Are there any recurring charges?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                No, this is a one-time payment of $1. There are no hidden fees, no subscriptions, and no recurring charges. You get full access to create your professional pitch for just $1.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};