
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
	protected size: IPoint;

	constructor ( config: IPixelField ) {
		super( config );
	}

	protected init ( config: IPixelField ): void {
		super.init( config );
		this.createTiles( config );
	}

	protected createTiles ( config: IPixelField ): void {
		this.tiles = new Array<Sprite>();
		const fieldRange: IFieldRange = config.fieldRange;
		this.startPoint = {
			x: - fieldRange.borderOffset.x,
			y: - fieldRange.borderOffset.y
		};
		this.endPoint = {
			x: this.viewport.width + fieldRange.borderOffset.x,
			y: this.viewport.height + fieldRange.borderOffset.y
		};
		this.size = { x: this.endPoint.x - this.startPoint.x, y: this.endPoint.y - this.startPoint.y };
		const pixelX: number = this.size.x / fieldRange.pixelSize;
		const pixelY: number = this.size.y / fieldRange.pixelSize;
		for ( let i: number = 0; i < pixelX; i++ ) {
			for ( let j: number = 0; j < pixelY; j++ ) {
				const tile: Sprite = this.createRandomTile();
				const posX: number = this.startPoint.x + fieldRange.pixelSize * i;
				const posY: number = this.startPoint.y + fieldRange.pixelSize * j;
				tile.position.set( posX, posY );
				this.addChild( tile );
				this.tiles.push( tile );
			}
		}
	}

	protected createRandomTile (): Sprite {
		const tile: Sprite = new Sprite( { name: 'tile' } )
		tile.texture = this.getRandomTileTexture();
		return tile;
	}

	public scroll ( direction: ScrollDirection, speed: number ): void {
		switch ( direction ) {
			case ScrollDirection.UP:
				this.tiles.forEach( tile => tile.position.y -= speed );
				break;
			case ScrollDirection.DOWN:
				this.tiles.forEach( tile => tile.position.y += speed );
				break;
			case ScrollDirection.LEFT:
				this.tiles.forEach( tile => tile.position.x -= speed );
				break;
			case ScrollDirection.RIGHT:
				this.tiles.forEach( tile => tile.position.x += speed );
				break;
		}
		this.updateTileOverBorder();
	}
	protected updateTileOverBorder (): void {
		this.tiles.forEach( tile => {
			let isUpdate: boolean = false;
			if ( tile.position.x < this.startPoint.x ) {
				tile.position.x += this.size.x;
				isUpdate = true;
			} else if ( tile.position.x >= this.endPoint.x ) {
				tile.position.x -= this.size.x;
				isUpdate = true;
			} else if ( tile.position.y < this.startPoint.y ) {
				tile.position.y += this.size.y;
				isUpdate = true;
			} else if ( tile.position.y >= this.endPoint.y ) {
				tile.position.y -= this.size.y;
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
	fieldRange: IFieldRange;
}

export interface IFieldRange {
	borderOffset: IPoint;
	pixelSize: number;
}

export enum ScrollDirection {
	UP,
	DOWN,
	LEFT,
	RIGHT
}