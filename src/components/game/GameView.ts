import { IPixelField, PixelField, ScrollDirection } from 'src/components/game/elements/PixelField';
import { ITank, MoveDirection, RotateDirection, Tank } from 'src/components/game/elements/Tank';
import { IGameConfig } from 'src/components/game/GameConfig';
import { View } from 'src/ui/View';

export class GameView extends View {

	protected config: IGameConfig;

	protected field: PixelField;
	protected tank: Tank;

	protected init ( config?: IGameConfig ): void {
		super.init( config );
		this.createField( this.config.pixelField );
		this.createTank( this.config.tank );
	}

	protected createField ( config: IPixelField ): void {
		this.field = new PixelField( config );
		this.addChild( this.field );
	}

	protected createTank ( config: ITank ): void {
		this.tank = new Tank( config );
		this.addChild( this.tank );
	}

	public moveTank ( direction: MoveDirection, speed: number ): void {
		this.field.scroll( this.getFieldScrollDirection( direction ), speed );
	}

	protected getFieldScrollDirection ( direction: MoveDirection ): ScrollDirection {
		const angle: number = ( this.tank.angle + ( direction === MoveDirection.FORWARD ? 0 : 1 ) * 180 ) % 360;
		switch ( angle ) {
			case 0:
				return ScrollDirection.LEFT;
			case 90:
				return ScrollDirection.UP;
			case 180:
				return ScrollDirection.RIGHT;
			case 270:
				return ScrollDirection.DOWN;
		}
	}

	public rotateTank ( direction: RotateDirection ): void {
		this.tank.rotate( direction );
	}

}