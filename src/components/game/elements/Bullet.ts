import { Tween } from '@tweenjs/tween.js';
import { AngleDirection } from 'src/config/GeneralInterface';
import { ISprite, Sprite } from 'src/elements/Sprite';

export class Bullet extends Sprite {

	protected config: IBullet;

	protected _isVanish: boolean = false;

	public get isVanish (): boolean {
		return this._isVanish;
	}

	public set isVanish ( value: boolean ) {
		this._isVanish = value;
		this.visible = !value;
	}

	public fly ( distance: number, speed: number ): void {
		new Tween( this )
			.to( this.getFlyDestination( distance ), speed )
			.onComplete( () => {
				this.boom();
			} )
			.start();
	}

	protected getFlyDestination ( distance: number ): object {
		switch ( this.angle ) {
			case AngleDirection.LEFT:
				return { x: this.x + distance };
			case AngleDirection.UP:
				return { y: this.y + distance };
			case AngleDirection.RIGHT:
				return { x: this.x - distance };
			case AngleDirection.DOWN:
				return { y: this.y - distance };
		}
	}

	protected boom (): void {
		this.texture = PIXI.utils.TextureCache[ this.config.boomAssetName ];
		new Tween( this )
			.to( { alpha: 0 }, 500 )
			.onComplete( () => {
				this.isVanish = true;
				this.alpha = 1;
				this.texture = PIXI.utils.TextureCache[ this.config.assetName ];
			} )
			.start();
	}

}

export interface IBullet extends ISprite {
	boomAssetName: string;
}