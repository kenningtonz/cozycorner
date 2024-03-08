import { models } from "@data/models";
import { spawnItem } from "@state/selectedStoreFunctions";
import { Accordion } from "@components/Accordion";
import useSound from "use-sound";
const ItemsUI = ({ muted }) => {
	const [spawnSound] = useSound("/soundEffects/spawn.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [clickSound] = useSound("/soundEffects/click.mp3", {
		volume: muted ? 0 : 0.5,
	});

	return (
		<section className=''>
			<div className=' self-end  justify-self-end rounded-lg  '>
				<Accordion
					clickSound={clickSound}
					items={Object.values(models.getCategories()).map((category) => {
						return (
							<ItemList
								spawnSound={spawnSound}
								items={models.getItems()}
								category={category}
							/>
						);
					})}
				/>
			</div>
		</section>
	);
};

const ItemListItem = ({ item, spawnSound }) => {
	// console.log(item);
	return (
		<button
			value={item.name}
			className='flex w-12 h-12 p-0'
			onClick={(e) => {
				spawnItem(e.currentTarget.value);
				spawnSound();
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

const ItemList = ({ items, category, spawnSound }) => {
	return (
		<ul className='flex flex-wrap gap-2'>
			{Object.values(items).map((item, index) =>
				item.category.name === category.name ? (
					<li key={`${item.name}-${index}`} className='w-12 h-12'>
						<ItemListItem item={item} spawnSound={spawnSound} />
					</li>
				) : null
			)}
		</ul>
	);
};

export default ItemsUI;
