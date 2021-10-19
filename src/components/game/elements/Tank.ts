import { ISprite, Sprite } from 'src/elements/Sprite';

export class Tank extends Sprite {

	protected config: ITank;

	public rotate ( direction: RotateDirection ): void {
		const offset: number = ( ( direction === RotateDirection.LEFT ) ? -1 : 1 );
		const angle: number = offset * 90;
		this.angle = ( this.angle + angle + 360 ) % 360;
	}

}

export interface ITank extends ISprite {
	moveSpeeds: Array<number>;
}

export enum MoveDirection {
	FORWARD,
	BACKWARD
}

export enum RotateDirection {
	LEFT,
	RIGHT
}