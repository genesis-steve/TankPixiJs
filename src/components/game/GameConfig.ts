import { ISprite } from "src/elements/Sprite";
import { IConfig } from "src/ui/Config";

export class GameConfig implements IGameConfig {

	public name: string = 'GameController';

	public tank: ISprite = {
		name: 'tank',
		position: { x: 640, y: 360 },
		anchor: { x: 0.5, y: 0.5 },
		assetName: 'tank.png'
	};

}

export interface IGameConfig extends IConfig {
	tank: ISprite;
}