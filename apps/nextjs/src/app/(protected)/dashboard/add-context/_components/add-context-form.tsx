"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@recaply/ui/accordion";
import { Input } from "@recaply/ui/input";
import { Skeleton } from "@recaply/ui/skeleton";
import { Label } from "@recaply/ui/label";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "../../_components/multi-select";

import { RouterOutputs } from "@recaply/api";
import { zNewContext } from "@recaply/db/schema/contexts";
import type { Provider } from "@recaply/db/schema/providers";
import { Button } from "@recaply/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@recaply/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@recaply/ui/select";
import { toast } from "@recaply/ui/toast";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

type Providers = RouterOutputs["providers"]["all"];

const formSchema = zNewContext;
type formValues = z.infer<typeof formSchema>;

export default function AddContextForm({
	providers,
}: {
	providers: Providers;
}) {
	const router = useRouter();

	const form = useForm<formValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			recapeTime: "9",
			recapeTimeSpan: "24",
			providersConfig: providers.reduce(
				(acc, p) => {
					acc[p.id] = {
						providerId: p.id,
						type: p.type as Provider["type"],
					};
					return acc;
				},
				{} as Record<number, { providerId: number; type: Provider["type"] }>,
			),
		},
	});

	const { mutate } = api.contexts.add.useMutation({
		onSuccess() {
			form.reset();
			toast.success("Context added");
			router.push("/dashboard");
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		mutate(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex justify-center">
					<div className="w-full max-w-2xl space-y-6">
						<h3 className="text-2xl font-bold">Add Context</h3>
						<div className="space-y-4">
							<div className="grid w-full items-center gap-1.5">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="Project hydra" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid w-full items-center gap-1.5">
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Input
													placeholder="web application i am working with my team"
													{...field}
													value={field.value || ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="md:grid grid-cols-2 md:gap-8">
							<div className="w-full">
								<RecapeTimeSelect />
							</div>
							<div className="w-full">
								<RecapeSpan />
							</div>
						</div>

						<div className="border-b" />

						<div>
							<h3 className="text-lg font-bold">Configure Providers</h3>
							<ConfigProvider providers={providers} />
						</div>
						<div className="flex justify-end space-x-4">
							<Button variant="outline">Cancel</Button>
							<Button type="submit">Add Context</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}

function ConfigProvider({ providers }: { providers: Providers }) {
	return (
		<Accordion type="single" collapsible className="w-full">
			{providers.map((p) => (
				<AccordionItem key={p.id} value={p.id.toString()}>
					<AccordionTrigger>
						{p.label} ({p.type})
					</AccordionTrigger>
					<AccordionContent>
						<ConfigSlack providerId={p.id} />
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

function ConfigSlack({ providerId }: { providerId: number }) {
	const { control } = useFormContext<formValues>();

	const { data, isLoading } = api.providers.getSlackOptions.useQuery(
		{
			providerId,
		},
		{
			refetchOnWindowFocus: false,
			staleTime: Number.MAX_SAFE_INTEGER,
			// cacheTime: Number.MAX_SAFE_INTEGER,
		},
	);

	return (
		<div>
			<Label htmlFor={`slack.${providerId}.channels`} className="block mb-2">
				Slack Channels
			</Label>
			{isLoading ? (
				<Skeleton className="h-8 full-w mt-8" />
			) : (
				<Controller
					control={control}
					defaultValue={[]}
					name={`providersConfig.${providerId}.channels`}
					render={({ field }) => (
						<MultiSelect
							options={
								data?.channels.map((channel) => ({
									label: `# ${channel.name}`,
									value: channel.id,
								})) || []
							}
							selectedValues={field.value}
							onSelectedValuesChange={(selectedValues) => {
								field.onChange(selectedValues);
							}}
						/>
					)}
				/>
			)}
		</div>
	);
}

export function RecapeTimeSelect() {
	const form = useFormContext<formValues>();

	return (
		<FormField
			control={form.control}
			name="recapeTime"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Recape Time</FormLabel>
					<FormControl>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select a recape time" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Every weekday at</SelectLabel>
									<SelectItem value="8">8 AM</SelectItem>
									<SelectItem value="9">9 AM</SelectItem>
									<SelectItem value="14">2 PM</SelectItem>
									<SelectItem value="17">5 PM</SelectItem>
									<SelectItem value="18">6 PM</SelectItem>
									<SelectItem value="19">7 PM</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function RecapeSpan() {
	const form = useFormContext<formValues>();

	return (
		<FormField
			control={form.control}
			name="recapeTimeSpan"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Recape Time Span</FormLabel>
					<FormControl>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select recape time span" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Past</SelectLabel>
									<SelectItem value="6">6 Hours</SelectItem>
									<SelectItem value="8">8 Hours</SelectItem>
									<SelectItem value="12">12 Hours</SelectItem>
									<SelectItem value="24">24 Hours</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
