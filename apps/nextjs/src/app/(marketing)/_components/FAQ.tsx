import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@recaply/ui/accordion";

interface FAQProps {
	question: string;
	answer: string;
	value: string;
}

const FAQList: FAQProps[] = [
	{
		question: "What is Recaply?",
		answer:
			"Recaply is an AI-powered assistant that integrates with your communication platforms like Slack and Microsoft Teams to provide you with a concise audio summary of the most important events from the past 24 hours.",
		value: "item-1",
	},
	{
		question: "How does Recaply collect information?",
		answer:
			"Recaply connects to your selected communication platforms and uses AI to sift through messages and notifications, identifying the most relevant updates.",
		value: "item-2",
	},
	{
		question: "Is my data secure?",
		answer:
			"Absolutely. We prioritize your privacy and security. All data is encrypted, and we follow stringent protocols to ensure that your information remains confidential and secure.",
		value: "item-3",
	},
	{
		question: "Can I customize my audio summaries?",
		answer:
			"Yes, you can tailor your audio summaries based on specific channels, keywords, or project updates to receive personalized and relevant information.",
		value: "item-4",
	},
	{
		question: "What platforms does Recaply support?",
		answer:
			"Recaply currently supports integration with Slack, We are continuously working on adding more platforms.",
		value: "item-5",
	},
	{
		question: "How often will I receive summaries??",
		answer:
			"You can customize when you receive your audio recap to best fit your schedule. Choose the specific time of day you'd like to receive your summary, whether it's in the morning, afternoon, or evening. Additionally, you can set the time span for your recap, such as the past 8 hours or the past 24 hours, ensuring you get the most relevant updates when you need them.",
		value: "item-5",
	},
];

export const FAQ = () => {
	return (
		<section id="faq" className="container py-24 sm:py-32">
			<h2 className="text-3xl md:text-4xl font-bold mb-4">
				Frequently Asked{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					Questions
				</span>
			</h2>

			<Accordion type="single" collapsible className="w-full AccordionRoot">
				{FAQList.map(({ question, answer, value }: FAQProps) => (
					<AccordionItem key={value} value={value}>
						<AccordionTrigger className="text-left">
							{question}
						</AccordionTrigger>

						<AccordionContent>{answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
};
