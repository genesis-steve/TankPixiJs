
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
		const startPoint: IPoint = {
			x: - fieldRange.borderOffset.x,
			y: - fieldRange.borderOffset.y
		};
		console.error( 'this.viewport : ', this.viewport.width, this.viewport.height );
		const endPoint: IPoint = {
			x: this.viewport.width + fieldRange.borderOffset.x,
			y: this.viewport.height + fieldRange.borderOffset.y
		};
		const pixelX: number = ( endPoint.x - startPoint.x ) / fieldRange.pixelSize;
		const pixelY: number = ( endPoint.y - startPoint.y ) / fieldRange.pixelSize;
		for ( let i: number = 0; i < pixelX; i++ ) {
			for ( let j: number = 0; j < pixelY; j++ ) {
				const tile: Sprite = this.getRandomTile( config );
				const posX: number = startPoint.x + fieldRange.pixelSize * i;
				const posY: number = startPoint.y + fieldRange.pixelSize * j;
				console.error( posX, posY );
				tile.position.set( posX, posY );
				this.addChild( tile );
				this.tiles.push( tile );
			}
		}
	}

	protected getRandomTile ( config: IPixelField ): Sprite {
		const randomIndex: number = Math.floor( Math.random() * config.tiles.length );
		return new Sprite( config.tiles[ randomIndex ] );
	}
}

export interface IPixelField extends IDisplayObject {
	tiles: Array<ISprite>;
	fieldRange: IFieldRange;
}

export interface IFieldRange {
	borderOffset: IPoint;
	pixelSize: number;
}