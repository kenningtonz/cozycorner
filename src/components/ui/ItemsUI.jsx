import { models, Categories } from "@data/models";
import { spawnItem } from "@state/selectedStoreFunctions";
import { Accordion } from "@components/Accordion";
import { useState } from "react";

const ItemsUI = () => {
	// const itemsList = Object.values(items);
	// console.log(models.getItems());
	return (
		<section className='rainbowBorder'>
			<div className='pointer-events-auto self-end  justify-self-end rounded-lg '>
				<Accordion
					items={Object.values(models.getCategories()).map((category) => {
						return <ItemList items={models.getItems()} category={category} />;
					})}
					labels={Object.values(models.getCategories()).map((category) => {
						return category.name;
					})}
				/>
			</div>
		</section>
	);
};

const ItemListItem = ({ item }) => {
	// console.log(item);
	return (
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
	);
};

const ItemList = ({ items, category }) => {
	// console.log(items);
	// Object.values(items).map((item, index) => {
	// 	console.log(item.name);
	// });
	return (
		<ul className='flex flex-wrap gap-1'>
			{Object.values(items).map((item, index) =>
				item.category.name === category.name ? (
					<li key={`${item.name}-${index}`} className='basis-1/3'>
						<ItemListItem item={item} />
					</li>
				) : null
			)}
		</ul>
	);
};

export default ItemsUI;
