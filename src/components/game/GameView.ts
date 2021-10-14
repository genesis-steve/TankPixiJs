export class GameView extends PIXI.Container {

	protected field: PIXI.Sprite;
	protected tank: PIXI.Sprite;
	protected isRotate: boolean = false;

	constructor () {
		super();
		this.createElements();
	}

	protected createElements (): void {
		this.createField();
		this.createTank();
	}

	protected createField (): void {
		this.field = new PIXI.Sprite();
		this.addChild( this.field );
	}

	protected createTank (): void {
		this.tank = new PIXI.Sprite();
		this.tank.anchor.set( 0.5, 0.5 );
		this.tank.position.set( 640, 360 );
		this.tank.texture = PIXI.utils.TextureCache[ 'tank.png' ];
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