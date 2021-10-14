import { IDisplayObject } from "src/elements/DisplayObject";

export class Sprite extends PIXI.Sprite {

	constructor ( config: ISprite ) {
		super();
		this.init( config );
	}

	protected init ( config: ISprite ) {
		this.name = config.name;
		this.updateAttribute( config );
	}

	public updateAttribute ( config: ISprite ): void {
		if ( config.position ) {
			this.position.set( config.position.x, config.position.y );
		}
		if ( config.anchor ) {
			this.anchor.set( config.anchor.x, config.anchor.y );
		}
		if ( config.assetName ) {
			this.texture = PIXI.utils.TextureCache[ config.assetName ];
		}
	}

}

export interface ISprite extends IDisplayObject {
	assetName?: string;
}