
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
                Why do I need this if I can email curators directly?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Playlist curators receive hundreds of pitches daily. Our tool helps you stand out with professionally structured pitches that highlight your music's unique qualities in a way curators appreciate. Artists using our tool report 4x higher response rates compared to standard emails.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-white/10">
              <AccordionTrigger className="text-left">
                How do you ensure the quality of the pitches?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Our AI-powered system is trained on successful music pitches and follows industry best practices. Each pitch is crafted to highlight your unique strengths while maintaining a professional tone that playlist curators respond to. You can also edit and customize the pitch to your liking.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-white/10">
              <AccordionTrigger className="text-left">
                What happens after I make the payment?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                After your $7 payment is processed, you'll get immediate access to our pitch creator tool. You can start creating your pitch right away, and you'll be able to edit, download, or copy your pitch as many times as you need during your session.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-white/10">
              <AccordionTrigger className="text-left">
                Are there any recurring charges?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                No, this is a one-time payment of $7 for 1 session. There are no hidden fees, no subscriptions, and no recurring charges. You get full access to create your professional pitch for just $7.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-white/10">
              <AccordionTrigger className="text-left">
                Is there a guarantee?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                We're confident in our pitch creator's quality. While we can't guarantee playlist placement (as that depends on your music and the curator's preferences), we do guarantee you'll receive a professional-quality pitch that significantly improves your chances. If you're not satisfied, contact us for assistance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-white/10">
              <AccordionTrigger className="text-left">
                How long does it take to create a pitch?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Most artists complete their pitch in under 10 minutes. Simply fill in the details about your music, and our AI enhances it into a professional pitch instantly. You can make adjustments as needed before exporting.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};
