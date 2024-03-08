const creditData = {
	audio: {
		name: "Audio",
		items: {
			music: {
				name: "Music",
				items: [
					{
						name: "Colorful Flowers",
						artist: "Tokyo Music Walker",
						link: "https://soundcloud.com/user-356546060",
					},
					{
						name: "Crescent Moon",
						artist: "Purrple Cat",
						link: "https://purrplecat.com/",
					},
					{ name: "Wanted", artist: "Purrple Cat", link: "https://purrplecat.com/" },
					{
						name: "Forgotten Places",
						artist: "Purrple Cat",
						link: "https://purrplecat.com/",
					},
					{
						name: "Late at Night",
						artist: "Sakura Girl",
						link: "https://soundcloud.com/sakuragirl_official",
					},
					{
						name: "Cozy Place",
						artist: "Keys of Moon",
						link: "https://soundcloud.com/keysofmoon",
					},
				],
			},
			soundEffects: {
				name: "Sound Effects",
				items: [
					{
						name: "Interface Sounds & UI Audio",
						artist: "Kenney",
						link: "https://www.kenney.nl/",
					},
				],
			},
		},
	},
	ui: {
		name: "UI",
		items: {
			icons: {
				name: "Icons",
				items: [
					{
						name: "Font Awesome Solid Icons",
						artist: "Font Awesome",
						link: "https://fontawesome.com/",
					},
				],
			},
		},
	},
	models: {
		name: "Models",
		items: {
			interior: {
				name: "Interior",
				items: [
					{
						name: "KayKit : Furniture Bits",
						artist: "Kay Lousberg",
						link: "https://kaylousberg.itch.io/",
					},
					{
						name: "Mix Match Asset Pack",
						artist: "SadCattlez",
						link: "https://sadcattle.itch.io",
					},
					{
						name: "Low Poly Furniture Pack",
						artist: "VNB-Leo",
						link: "https://vnbp.itch.io/",
					},
					{
						name: "Furniture Asset Pack",
						artist: "Aline",
						link: "https://ladoncha.itch.io/",
					},
					{
						name: "Monitor, Rubber Duck, Trash Bin, Wall Corkboard, Globe",
						artist: "CreativeTrio",
						link: "https://poly.pizza/u/CreativeTrio",
					},
				],
			},
			environment: {
				name: "Environment",
				items: [
					{
						name: "Modular Terrain Pack",
						artist: "Keith at Fertile Soil Productions",
						link: "https://fertile-soil-productions.itch.io/",
					},
					{
						name: "Low Poly Nature Models",
						artist: "quaternius",
						link: "https://quaternius.itch.io/",
					},
					{
						name: "Poly Desert Freebies",
						artist: "runemarkstudio",
						link: "https://runemarkstudio.itch.io/",
					},
					{
						name: "Fantasy FREE Free low-poly",
						artist: "ithappy",
						link: "https://www.cgtrader.com/designers/ithappy",
					},
					{
						name: "51 Low poly Nature Assets Planet",
						artist: "HiepVu",
						link: "https://www.cgtrader.com/designers/hiepvu",
					},
				],
			},
		},
	},
};

const CreditItem = ({ name, artist, link }) => {
	return (
		<li key={`${name}-key`} className='mb-1 flex items-center justify-between'>
			<p className='text-sm mr-1'>{name} </p>
			<a
				className='text-sm hover:underline decoration-solid decoration-lime-600 text-lime-600 text-right'
				href={link}
				rel='noopener'
				target='_blank'
			>
				{artist}
			</a>
		</li>
	);
};

const Credits = () => {
	return (
		<div className='max-w-[400px]'>
			<h1 className='text-2xl text-center'>Credits</h1>
			{Object.values(creditData).map((category) => {
				return (
					<>
						<h2 className='font-semibold text-xl text-center'>{category.name}</h2>
						<ul className='m-2'>
							{Object.values(category.items).map((subCat) => (
								<li key={`${subCat.name}-key`} className='mb-2'>
									<h3 className='text-lg font-medium'>{subCat.name}</h3>
									<ul className=''>
										{subCat.items.map((item) => (
											<CreditItem name={item.name} artist={item.artist} link={item.link} />
										))}
									</ul>
								</li>
							))}
						</ul>
					</>
				);
			})}
		</div>
	);
};

export default Credits;
