import { Tween } from '@tweenjs/tween.js';
import { ISprite, Sprite } from 'src/elements/Sprite';

export class Bullet extends Sprite {

	protected config: IBullet;

	protected _isVanish: boolean = false;

	public get isVanish (): boolean {
		return this._isVanish;
	}

	protected _damage: number;

	public get damage (): number {
		return this._damage;
	}

	public set isVanish ( value: boolean ) {
		this._isVanish = value;
		this.visible = !value;
	}

	protected init ( config: IBullet ) {
		super.init( config );
		this._damage = config.damage;
	}

	public boom (): void {
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
	damage: number;
}