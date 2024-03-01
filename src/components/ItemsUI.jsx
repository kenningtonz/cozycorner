import { items, Categories } from "../data";
import { spawnItem, useUIStore } from "../store";
import { Accordion } from "./Accordion";
import { useState } from "react";

export const ItemsUI = () => {
	const openCategory = useUIStore((state) => state.openCategory);

	return (
		<section className='rainbowBorder'>
			<div className='pointer-events-auto self-end  justify-self-end rounded-lg '>
				{Object.values(Categories).map((category, indexC) => (
					<Accordion
						label={category.name}
						index={indexC}
						open={openCategory === indexC ? true : false}
						content={
							<ul key={`${category.name}-${indexC}`} className='flex flex-wrap gap-1'>
								{Object.values(items).map((item, index) =>
									item.category === category.name ? (
										<li key={`${item.name}-${index}`} className='basis-1/3'>
											<button
												value={item.name}
												className='flex w-12 h-12 p-0'
												onClick={(e) => {
													spawnItem(e.currentTarget.value);
												}}
											>
												<img
													className='w-full h-full object-contain'
													src={`/modelImages/${item.name}.png`}
													alt={item.name}
												/>
											</button>
										</li>
									) : null
								)}
							</ul>
						}
					/>
				))}
			</div>
		</section>
	);
};
