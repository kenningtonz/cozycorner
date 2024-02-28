import { items, Categories } from "../data";
import { spawnItem } from "../store";

export const ItemsUI = () => {
	return (
		<div className='pointer-events-auto self-end  justify-self-end bg-green-300'>
			{Object.values(Categories).map((category, indexC) => (
				<>
					<h2> {category.name}</h2>
					<ul key={`${category.name}-${indexC}`}>
						{Object.values(items).map((item, index) =>
							item.category === category.name ? (
								<li key={`${item.name}-${index}`}>
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
				</>
			))}
		</div>
	);
};
