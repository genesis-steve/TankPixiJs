import { IGameConfig } from 'src/components/game/GameConfig';
import { ISprite, Sprite } from 'src/elements/Sprite';
import { View } from 'src/ui/View';

export class GameView extends View {

	protected config: IGameConfig;

	protected field: PIXI.Sprite;
	protected tank: Sprite;

	protected init ( config?: IGameConfig ): void {
		super.init( config );
		this.createField();
		this.createTank( this.config.tank );
	}

	protected createField (): void {
		this.field = new PIXI.Sprite();
		this.addChild( this.field );
	}

	protected createTank ( config: ISprite ): void {
		this.tank = new Sprite( config );
		this.addChild( this.tank );
	}

	public rotateTank ( direction: TankRotateDirection ): void {
		const offset: number = ( ( direction === TankRotateDirection.LEFT ) ? -1 : 1 );
		const rotation: number = offset * ( 90 * Math.PI / 180 ) % 360;
		this.tank.rotation += rotation;
	}

}

export enum TankRotateDirection {
	LEFT,
	RIGHT
}