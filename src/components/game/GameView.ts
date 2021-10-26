import { Tween } from '@tweenjs/tween.js';
import { IPixelField, PixelField, ScrollDirection } from 'src/components/game/elements/PixelField';
import { ITank, MoveDirection, Tank } from 'src/components/game/elements/Tank';
import { IGameConfig, IMaterialSettings } from 'src/components/game/GameConfig';
import { View } from 'src/ui/View';
import { Bullet } from 'src/components/game/elements/Bullet';
import { IPoint } from 'src/elements/DisplayObject';
import { AngleDirection } from 'src/config/GeneralInterface';
import { Material } from 'src/components/game/elements/materials/Material';
import { CollisionSystem } from 'src/core/CollisionSystem';
import { Helper } from 'src/utils/Helper';

export class GameView extends View {

	protected config: IGameConfig;

	protected field: PixelField;
	protected tank: Tank;
	protected bullets: Array<Bullet>;
	protected materials: Array<Material>;
	protected emptyOnMap: Array<number>;

	protected init ( config?: IGameConfig ): void {
		super.init( config );
		this.initBullets();
		this.initEmptyOnMap();
		this.createField( config.pixelField );
		this.createTank( config.tank );
		this.createMaterials( config.material );
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

	protected initEmptyOnMap (): void {
		const rowLength: number = this.config.pixelField.pixelMap[ 0 ].length;
		const columnLength: number = this.config.pixelField.pixelMap.length;
		this.emptyOnMap = new Array<number>();
		for ( let i: number = 0; i < rowLength * columnLength; i++ ) {
			this.emptyOnMap.push( i );
		}
	}

	protected createMaterials ( config: IMaterialSettings ): void {
		this.materials = new Array<Material>();
		const rowLength: number = this.config.pixelField.pixelMap[ 0 ].length;
		const pixelSize: number = this.config.pixelField.pixelSize;
		config.sprites.forEach( spriteConfig => {
			const amount: number = config.amountOfMaterial.get( spriteConfig.name );
			for ( let i: number = 0; i < amount; i++ ) {
				if ( this.emptyOnMap.length === 0 ) {
					break;
				}
				const material: Material = new Material( spriteConfig );
				const randomIndex: number = Helper.randomInt( 0, this.emptyOnMap.length );
				const positionIndex: number = this.emptyOnMap[ randomIndex ];
				this.emptyOnMap.splice( randomIndex );
				const rowIndex: number = Math.floor( positionIndex / rowLength );
				const columnIndex: number = positionIndex % rowLength;
				material.position.set(
					rowIndex * pixelSize + spriteConfig.anchor.x * pixelSize,
					columnIndex * pixelSize + spriteConfig.anchor.y * pixelSize
				);
				this.field.addChild( material );
				this.materials.push( material );
			}
		} );
	}

	public moveTank ( direction: MoveDirection, speed: number ): void {
		const angle: number = this.getTankAngleDirection( direction );
		const scrollDirection: ScrollDirection = this.getFieldScrollDirection( this.tank.angle );
		if ( this.isTankMovable( scrollDirection ) ) {
			this.field.scroll( scrollDirection, speed );
		}
		this.tank.angle = angle;
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

	protected getTankAngleDirection ( direction: MoveDirection ): AngleDirection {
		return ( direction * 90 ) % 360;
	}

	protected getFieldScrollDirection ( angle: number ): ScrollDirection {
		switch ( angle ) {
			case AngleDirection.LEFT:
				return ScrollDirection.RIGHT;
			case AngleDirection.UP:
				return ScrollDirection.DOWN;
			case AngleDirection.RIGHT:
				return ScrollDirection.LEFT;
			case AngleDirection.DOWN:
				return ScrollDirection.UP;
		}
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
				posOffset.x -= this.tank.width / 2;
				break;
			case AngleDirection.UP:
				posOffset.y -= this.tank.width / 2;
				break;
			case AngleDirection.RIGHT:
				posOffset.x += this.tank.width / 2;
				break;
			case AngleDirection.DOWN:
				posOffset.y += this.tank.width / 2;
				break;
		}
		bullet.position.set(
			this.tank.position.x - this.field.position.x + posOffset.x,
			this.tank.position.y - this.field.position.y + posOffset.y
		)
		bullet.angle = this.tank.angle;
		this.bulletFly( bullet, 300, 200 );
	}

	public bulletFly ( bullet: Bullet, distance: number, speed: number ): void {
		const bulletFlyTween: Tween<Bullet> = new Tween( bullet )
			.to( this.getFlyDestination( bullet, distance ), speed )
			.onUpdate( () => {
				for ( let material of this.materials ) {
					if ( material.isVanish ) {
						continue;
					}
					if ( CollisionSystem.isCollide( bullet, material ) ) {
						bulletFlyTween.stop();
						bullet.boom();
						material.reduceHp( bullet.damage );
						break;
					}
				}
			} )
			.onComplete( () => {
				bullet.boom();
			} )
			.start();
	}

	protected getFlyDestination ( bullet: Bullet, distance: number ): object {
		switch ( bullet.angle ) {
			case AngleDirection.LEFT:
				return { x: bullet.x - distance };
			case AngleDirection.UP:
				return { y: bullet.y - distance };
			case AngleDirection.RIGHT:
				return { x: bullet.x + distance };
			case AngleDirection.DOWN:
				return { y: bullet.y + distance };
		}
	}

}