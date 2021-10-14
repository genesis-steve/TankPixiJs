import { Inject } from 'typescript-ioc';
import { GameView, TankRotateDirection } from 'src/components/game/GameView';
import { IKeyboardEventData, KeyboardManager } from 'src/core/KeyboardManager';
import { Controller } from 'src/ui/Controller';
import { GameConfig, IGameConfig } from 'src/components/game/GameConfig';

export class GameController extends Controller {

	@Inject
	protected keyboardManager: KeyboardManager;

	protected config: IGameConfig;
	protected view: GameView;

	protected init (): void {
		this.config = new GameConfig();
		this.view = new GameView( this.config );
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