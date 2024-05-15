import {
	CheckCircledIcon,
	ChevronDownIcon,
	CircleIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@recaply/ui/badge";
import { Button } from "@recaply/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@recaply/ui/command";
import { Label } from "@recaply/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@recaply/ui/popover";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function MultiSelect({
	label,
	options,
	selectedValues,
	onSelectedValuesChange,
}: {
	label?: string;
	options: { label: string; value: string }[];
	selectedValues: string[];
	onSelectedValuesChange: (selectedValues: string[]) => void;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="w-full">
			<Popover open={open} onOpenChange={setOpen}>
				{label && <Label>Channels</Label>}
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					>
						Add Channel
						<ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[600px] p-0">
					<Command>
						<CommandInput placeholder="Filter..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										key={option.value}
										value={option.label}
										onSelect={(currentValue) => {
											onSelectedValuesChange(
												toggleElementFromArray(selectedValues, option.value),
											);
											// setOpen(false);
										}}
										className="flex items-center gap-2"
									>
										{selectedValues.includes(option.value) ? (
											<CheckCircledIcon className="h-4 w-4 text-primary" />
										) : (
											<CircleIcon className="h-4 w-4 text-primary" />
										)}
										<span>{option.label}</span>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<div className="flex flex-row pl-1 py-4 w-full">
				<span className="w-[215px]">Selected Channels:</span>
				<div className="flex grow gap-1 flex-wrap justify-start">
					{selectedValues.map((c) => (
						<Button
							key={c}
							variant={"outline"}
							size="sm"
							onClick={() => {
								onSelectedValuesChange(selectedValues.filter((v) => v !== c));
							}}
						>
							{options.find((option) => option.value === c)?.label ?? c}{" "}
							<Trash2 className="ml-2 w-3" />
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

const toggleElementFromArray = <T,>(array: T[], element: T) => {
	if (array.includes(element)) {
		return array.filter((item) => item !== element);
	}

	return [...array, element];
};
