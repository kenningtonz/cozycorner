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
		<li key={name} className='mb-1 '>
			<p className='text-xs-mb-2'>{name} by </p>
			<a
				className='text-sm hover:underline decoration-solid decoration-violet-400'
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
		<>
			<h1 className='text-xl text-center'>Credits</h1>
			{Object.values(creditData).map((category) => {
				return (
					<>
						<h2>{category.name}</h2>
						{Object.values(category.items).map((subCat) => (
							<>
								<h3 className='text-md'>{subCat.name}</h3>
								<ul className='flex flex-wrap gap-x-4  justify-stretch'>
									{subCat.items.map((item) => (
										<CreditItem name={item.name} artist={item.artist} link={item.link} />
									))}
								</ul>
							</>
						))}
					</>
				);
			})}
		</>
	);
};

export default Credits;
