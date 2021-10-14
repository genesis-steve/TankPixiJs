import { ITank, MoveDirection, RotateDirection, Tank } from 'src/components/game/elements/Tank';
import { IGameConfig } from 'src/components/game/GameConfig';
import { View } from 'src/ui/View';

export class GameView extends View {

	protected config: IGameConfig;

	protected field: PIXI.Sprite;
	protected tank: Tank;

	protected init ( config?: IGameConfig ): void {
		super.init( config );
		this.createField();
		this.createTank( this.config.tank );
	}

	protected createField (): void {
		this.field = new PIXI.Sprite();
		this.addChild( this.field );
	}

	protected createTank ( config: ITank ): void {
		this.tank = new Tank( config );
		this.addChild( this.tank );
	}

	public moveTank ( direction: MoveDirection ): void {
		this.tank.move( direction );
	}

	public rotateTank ( direction: RotateDirection ): void {
		this.tank.rotate( direction );
	}

}