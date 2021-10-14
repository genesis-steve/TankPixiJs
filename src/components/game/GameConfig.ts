import { ITank } from 'src/components/game/elements/Tank';
import { IConfig } from 'src/ui/Config';

export class GameConfig implements IGameConfig {

	public name: string = 'GameController';

	public tank: ITank = {
		name: 'tank',
		position: { x: 640, y: 360 },
		anchor: { x: 0.5, y: 0.5 },
		assetName: 'tank.png',
		moveSpeed: 10
	};

}

export interface IGameConfig extends IConfig {
	tank: ITank;
}