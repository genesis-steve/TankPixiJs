import { IBullet } from 'src/components/game/elements/Bullet';
import { IMaterial } from 'src/components/game/elements/materials/Material';
import { IPixelField } from 'src/components/game/elements/PixelField';
import { ITank } from 'src/components/game/elements/Tank';
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
		boomAssetName: 'boom.png',
		damage: 10
	};

	public materials: Array<IMaterial> = [
		{
			name: 'Rock',
			assetName: 'rock.png',
			dieAssetName: 'rock_die.png',
			anchor: { x: 0.5, y: 0.5 },
			hp: 50
		}
	];

	protected tileTexture: Array<string> = [
		'fieldTile1.png',
		'fieldTile2.png',
		'fieldTile3.png'
	];

	public pixelField: IPixelField = {
		name: 'pixelField',
		tiles: this.tileTexture,
		pixelSize: 50,
		pixelMap: this.getRandomPixelMap( 20, 20 ),
		playerInitPosition: { x: 150, y: 150 }
	};

	protected getRandomPixelMap ( pixelX: number, pixelY: number ): Array<Array<string>> {
		const randomMap: Array<Array<string>> = new Array<Array<string>>();
		for ( let i: number = 0; i < pixelX; i++ ) {
			const row: Array<string> = new Array<string>();
			for ( let j: number = 0; j < pixelY; j++ ) {
				row.push( this.tileTexture[ Math.floor( Math.random() * this.tileTexture.length ) ] );
			}
			randomMap.push( row );
		}
		return randomMap;
	}

}

export interface IGameConfig extends IConfig {
	tank: ITank;
	bullet: IBullet;
	materials: Array<IMaterial>;
	pixelField: IPixelField;
}