import { type Component, For, Show, createMemo, createSignal } from "solid-js";
import { twMerge } from "tailwind-merge";

export type Testimony = {
	image: string;
	name: string;
	adopted: string;
	comment: string;
	adoptedPlus?: number;
};

export type TestimoniesCarousel = {
	testimonies: Testimony[];
};

export const TestimoniesCarousel: Component<TestimoniesCarousel> = ({
	testimonies = [],
}) => {
	const isEven = testimonies.length % 2 === 0;
	const initialSelected = isEven ? 0 : Math.floor(testimonies.length / 2);

	const [selected, setSelected] = createSignal(initialSelected);
	const selectedTestimony = createMemo(() => testimonies[selected()]);

	return (
		// TODO add height change transition
		<div class="flex flex-col items-center w-full">
			{/* TODO add big " in bg */}
			<div class="w-full bg-blue-100 rounded-xl border-4 border-black flex items-center justify-center px-10 py-20">
				{/* TODO add text transition */}
				<p>{selectedTestimony().comment}</p>
			</div>
			<div class="flex flex-col gap-1 items-center -mt-12">
				<div class="flex gap-4 items-center h-24 mb-20">
					<For each={testimonies}>
						{(testimony, i) => {
							const isSelected = createMemo(() => selected() === i());
							return (
								<div class={twMerge("relative", isSelected() ? "w-24" : "w-16")}>
									<button
										type="button"
										class={twMerge(
											"bg-gray-200 rounded-full border-4 border-black transition-all size-16",
											selected() === i() && "size-24",
										)}
										disabled={isSelected()}
										title={`${isSelected() ? "" : "Selecionar "}${testimony.name}`}
										onClick={() => setSelected(i)}
									/>
									{/* TODO add transition when shown */}
									<Show when={isSelected()}>
										<div class="flex flex-col items-center text-center absolute top-28 left-0 right-0">
											<span class="text-nowrap">{selectedTestimony().name}</span>
											<span class="text-lg text-nowrap">
												adotou {selectedTestimony().adopted}
												<Show when={selectedTestimony().adoptedPlus}>
													{" "}
													+ {selectedTestimony().adoptedPlus}
												</Show>
											</span>
										</div>
									</Show>
								</div>
							);
						}}
					</For>
				</div>
			</div>
		</div>
	);
};
