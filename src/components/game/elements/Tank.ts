import { AngleDirection } from 'src/config/GeneralInterface';
import { ISprite, Sprite } from 'src/elements/Sprite';
import { TSMap } from 'typescript-map';

export class Tank extends Sprite {

	protected config: ITank;

}

export interface ITank extends ISprite {
	moveSpeeds: Array<number>;
}

export enum MoveDirection {
	RIGHT = 0,
	DOWN = 1,
	LEFT = 2,
	UP = 3
}