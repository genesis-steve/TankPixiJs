import { IPixelField, PixelField, ScrollDirection } from 'src/components/game/elements/PixelField';
import { ITank, MoveDirection, RotateDirection, Tank } from 'src/components/game/elements/Tank';
import { IGameConfig } from 'src/components/game/GameConfig';
import { View } from 'src/ui/View';
import { Bullet } from 'src/components/game/elements/Bullet';
import { IPoint } from 'src/elements/DisplayObject';
import { AngleDirection } from 'src/config/GeneralInterface';

export class GameView extends View {

	protected config: IGameConfig;

	protected field: PixelField;
	protected tank: Tank;
	protected bullets: Array<Bullet>;

	protected init ( config?: IGameConfig ): void {
		super.init( config );
		this.createField( this.config.pixelField );
		this.createTank( this.config.tank );
		this.initBullets();
	}

	protected createField ( config: IPixelField ): void {
		this.field = new PixelField( config );
		this.addChild( this.field );
	}

	protected initBullets (): void {
		this.bullets = new Array<Bullet>()
	}

	protected createTank ( config: ITank ): void {
		this.tank = new Tank( config );
		this.addChild( this.tank );
	}

	public moveTank ( direction: MoveDirection, speed: number ): void {
		const scrollDirection: ScrollDirection = this.getFieldScrollDirection( direction );
		if ( this.isTankMovable( scrollDirection ) ) {
			this.field.scroll( scrollDirection, speed );
		}
	}

	protected isTankMovable ( direction: ScrollDirection ): boolean {
		switch ( direction ) {
			case ScrollDirection.LEFT:
				return this.field.position.x + this.field.realWidth > this.tank.position.x + this.tank.width / 2;
			case ScrollDirection.UP:
				return this.field.position.y + this.field.realHeight > this.tank.position.y + this.tank.height / 2;
			case ScrollDirection.RIGHT:
				return this.field.position.x < this.tank.position.x - this.tank.width / 2;
			case ScrollDirection.DOWN:
				return this.field.position.y < this.tank.position.y - this.tank.height / 2;
		}
	}

	protected getFieldScrollDirection ( direction: MoveDirection ): ScrollDirection {
		const angle: number = ( this.tank.angle + ( direction === MoveDirection.FORWARD ? 0 : 1 ) * 180 ) % 360;
		switch ( angle ) {
			case AngleDirection.LEFT:
				return ScrollDirection.LEFT;
			case AngleDirection.UP:
				return ScrollDirection.UP;
			case AngleDirection.RIGHT:
				return ScrollDirection.RIGHT;
			case AngleDirection.DOWN:
				return ScrollDirection.DOWN;
		}
	}

	public rotateTank ( direction: RotateDirection ): void {
		this.tank.rotate( direction );
	}

	public shoot (): void {
		let bullet: Bullet = this.bullets.find( bullet => bullet.isVanish );
		if ( !bullet ) {
			bullet = new Bullet( this.config.bullet );
			this.field.addChild( bullet );
			this.bullets.push( bullet );
		} else {
			bullet.isVanish = false;
		}
		const posOffset: IPoint = { x: 0, y: 0 };
		switch ( this.tank.angle ) {
			case AngleDirection.LEFT:
				posOffset.x += this.tank.width / 2;
				break;
			case AngleDirection.UP:
				posOffset.y += this.tank.width / 2;
				break;
			case AngleDirection.RIGHT:
				posOffset.x -= this.tank.width / 2;
				break;
			case AngleDirection.DOWN:
				posOffset.y -= this.tank.width / 2;
				break;
		}
		bullet.position.set(
			this.tank.position.x - this.field.position.x + posOffset.x,
			this.tank.position.y - this.field.position.y + posOffset.y
		)
		bullet.angle = this.tank.angle;
		bullet.fly( 300, 200 );
	}

}