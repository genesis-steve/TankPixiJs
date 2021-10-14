import { Inject } from 'typescript-ioc';
import { GameView, TankRotateDirection } from 'src/components/game/GameView';
import { IKeyboardEventData, KeyboardManager } from 'src/core/KeyboardManager';

export class GameController {

	@Inject
	protected keyboardManager: KeyboardManager;

	protected view: GameView;

	public get mainContainer (): GameView {
		return this.view;
	}

	constructor () {
		this.view = new GameView();
		this.addListeners();
	}

	protected addListeners (): void {
		this.keyboardManager.onKeyDownSignal.add( this.onKeyDown, this );
	}

	protected onKeyDown ( data: IKeyboardEventData ): void {
		switch ( data.key ) {
			case 'ArrowLeft':
				this.view.rotateTank( TankRotateDirection.LEFT );
				break;
			case 'ArrowRight':
				this.view.rotateTank( TankRotateDirection.RIGHT );
				break;
		}
	}
}