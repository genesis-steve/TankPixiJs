import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
window.PIXI = PIXI;
import './style.css';
import { IMainConfig, MainConfig } from 'src/config/MainConfig';
import { GameController } from 'src/components/game/GameController';
import { UIController } from 'src/components/ui/UIController';
import { AssetLoader } from 'src/utils/AssetLoader';
import * as AssetList from 'src/config/AssetList';

window.onload = () => {
	new GmaeApplication();
};

export class GmaeApplication {

	protected assetLoader: AssetLoader;

	protected appConfig: IMainConfig;
	protected mainContainer: HTMLDivElement;
	protected pixi: PIXI.Application;

	protected gameController: GameController;
	protected uiController: UIController;

	constructor () {
		this.appConfig = new MainConfig();
		document.title = this.appConfig.title;
		document.body.style.overflow = 'hidden';
		this.mainContainer = <HTMLDivElement> document.getElementById( 'mainContainer' );
		this.assetLoader = new AssetLoader();
		this.assetLoader.loadResource( AssetList.list );
		this.addListners();
		this.tickStart();
	}

	protected addListners (): void {
		this.assetLoader.onCompleteSignal.add( this.onLoadAssetComplete, this );
	}

	protected onLoadAssetComplete (): void {
		this.pixi = new PIXI.Application( this.appConfig );
		this.addComponents();
	}

	protected addComponents (): void {
		this.createGameView();
		this.createUI();
	}

	protected createGameView (): void {
		this.gameController = new GameController;
		this.addChild( this.gameController.mainContainer );
	}

	protected createUI (): void {
		this.uiController = new UIController;
		this.addChild( this.uiController.mainContainer );
	}

	protected addChild ( child: PIXI.DisplayObject ): void {
		this.pixi.stage.addChild( child );
	}

	protected tickStart (): void {
		function animate () {
			requestAnimationFrame( animate )
			TWEEN.update()
		}
		requestAnimationFrame( animate )
	}

}