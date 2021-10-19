export const list: Array<IAsset> = [
	{
		assetKey: 'tank.png',
		assetUrl: 'assets/tank.png'
	},
	{
		assetKey: 'fieldTile1.png',
		assetUrl: 'assets/fieldTile1.png'
	},
	{
		assetKey: 'fieldTile2.png',
		assetUrl: 'assets/fieldTile2.png'
	},
	{
		assetKey: 'fieldTile3.png',
		assetUrl: 'assets/fieldTile3.png'
	}
];

export interface IAsset {
	assetKey: string;
	assetUrl: string;
}