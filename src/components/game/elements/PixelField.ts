
import { Inject } from 'typescript-ioc';
import { Viewport } from 'src/core/Viewport';
import { IDisplayObject, IPoint } from 'src/elements/DisplayObject';
import { ISprite, Sprite } from 'src/elements/Sprite';
import { View } from 'src/ui/View';

export class PixelField extends View {

	@Inject
	protected viewport: Viewport;

	protected config: IPixelField;

	protected tiles: Array<Sprite>;

	protected startPoint: IPoint;
	protected endPoint: IPoint;
	protected scrollUpdateDistance: IPoint;

	constructor ( config: IPixelField ) {
		super( config );
	}

	protected init ( config: IPixelField ): void {
		super.init( config );
		this.createTiles( config );
	}

	protected createTiles ( config: IPixelField ): void {
		this.tiles = new Array<Sprite>();
		this.startPoint = {
			x: - config.pixelSize * 2,
			y: - config.pixelSize * 2
		};
		this.endPoint = {
			x: Math.ceil( this.viewport.width / config.pixelSize ) * config.pixelSize,
			y: Math.ceil( this.viewport.height / config.pixelSize ) * config.pixelSize
		};
		const pixelX: number = ( this.endPoint.x - this.startPoint.x ) / config.pixelSize;
		const pixelY: number = ( this.endPoint.y - this.startPoint.y ) / config.pixelSize;
		for ( let i: number = 0; i < pixelX; i++ ) {
			for ( let j: number = 0; j < pixelY; j++ ) {
				const tile: Sprite = this.createRandomTile();
				const posX: number = this.startPoint.x + config.pixelSize * i;
				const posY: number = this.startPoint.y + config.pixelSize * j;
				tile.position.set( posX, posY );
				this.addChild( tile );
				this.tiles.push( tile );
			}
		}
		this.scrollUpdateDistance = { x: config.pixelSize * pixelX, y: config.pixelSize * pixelY };
	}

	protected createRandomTile (): Sprite {
		const tile: Sprite = new Sprite( { name: 'tile' } )
		tile.texture = this.getRandomTileTexture();
		return tile;
	}

	public scroll ( direction: ScrollDirection, speed: number ): void {
		switch ( direction ) {
			case ScrollDirection.UP:
				this.position.y -= speed;
				// this.tiles.forEach( tile => tile.position.y -= speed );
				break;
			case ScrollDirection.DOWN:
				this.position.y += speed;
				// this.tiles.forEach( tile => tile.position.y += speed );
				break;
			case ScrollDirection.LEFT:
				this.position.x -= speed;
				// this.tiles.forEach( tile => tile.position.x -= speed );
				break;
			case ScrollDirection.RIGHT:
				this.position.x += speed;
				// this.tiles.forEach( tile => tile.position.x += speed );
				break;
		}
		this.updateTileOverBorder();
	}
	protected updateTileOverBorder (): void {
		this.tiles.forEach( tile => {
			let isUpdate: boolean = false;
			if ( tile.getGlobalPosition().x < this.startPoint.x ) {
				tile.position.x += this.scrollUpdateDistance.x;
				isUpdate = true;
			} else if ( tile.getGlobalPosition().x >= this.endPoint.x ) {
				tile.position.x -= this.scrollUpdateDistance.x;
				isUpdate = true;
			} else if ( tile.getGlobalPosition().y < this.startPoint.y ) {
				tile.position.y += this.scrollUpdateDistance.y;
				isUpdate = true;
			} else if ( tile.getGlobalPosition().y >= this.endPoint.y ) {
				tile.position.y -= this.scrollUpdateDistance.y;
				isUpdate = true;
			}
			if ( isUpdate ) {
				tile.texture = this.getRandomTileTexture();
			}
		} )
	}

	protected getRandomTileTexture (): PIXI.Texture {
		const randomIndex: number = Math.floor( Math.random() * this.config.tiles.length );
		return PIXI.utils.TextureCache[ this.config.tiles[ randomIndex ] ];
	}
}

export interface IPixelField extends IDisplayObject {
	tiles: Array<string>;
	pixelSize: number;
}

export enum ScrollDirection {
	UP,
	DOWN,
	LEFT,
	RIGHT
}