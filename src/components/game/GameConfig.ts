import { IBullet } from 'src/components/game/elements/Bullet';
import { IPixelField } from 'src/components/game/elements/PixelField';
import { ITank } from 'src/components/game/elements/Tank';
import { ISprite } from 'src/elements/Sprite';
import { IConfig } from 'src/ui/Config';

export class GameConfig implements IGameConfig {

	public name: string = 'GameController';

	public tank: ITank = {
		name: 'tank',
		position: { x: 640, y: 360 },
		anchor: { x: 0.5, y: 0.5 },
		assetName: 'tank.png',
		moveSpeeds: [ 5, 10 ]
	};

	public bullet: IBullet = {
		name: 'bullet',
		assetName: 'bullet.png',
		anchor: { x: 0.5, y: 0.5 },
		boomAssetName: 'boom.png'
	};

	public pixelField: IPixelField = {
		name: 'pixelField',
		tiles: [
			'fieldTile1.png',
			'fieldTile2.png',
			'fieldTile3.png'
		],
		pixelSize: 50
	};

}

export interface IGameConfig extends IConfig {
	tank: ITank;
	bullet: IBullet;
	pixelField: IPixelField;
}