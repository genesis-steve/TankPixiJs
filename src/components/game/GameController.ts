import { Inject } from 'typescript-ioc';
import { GameView } from 'src/components/game/GameView';
import { IKeyboardEventData, KeyboardManager } from 'src/core/KeyboardManager';
import { Controller } from 'src/ui/Controller';
import { GameConfig, IGameConfig } from 'src/components/game/GameConfig';
import { MoveDirection, RotateDirection } from 'src/components/game/elements/Tank';

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
				this.view.rotateTank( RotateDirection.LEFT );
				break;
			case 'ArrowRight':
				this.view.rotateTank( RotateDirection.RIGHT );
				break;
			case 'ArrowUp':
				this.view.moveTank( MoveDirection.FORWARD );
				break;
			case 'ArrowDown':
				this.view.moveTank( MoveDirection.BACKWARD );
				break;
		}
	}
}