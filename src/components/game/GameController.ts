import { Inject } from 'typescript-ioc';
import { GameView } from 'src/components/game/GameView';
import { IKeyboardEventData, KeyboardButton, KeyboardManager } from 'src/core/KeyboardManager';
import { Controller } from 'src/ui/Controller';
import { GameConfig, IGameConfig } from 'src/components/game/GameConfig';
import { MoveDirection, RotateDirection } from 'src/components/game/elements/Tank';
import { GamePadKey, GamePadManager, IGamePadEventData } from 'src/core/GamePadManager';

export class GameController extends Controller {

	@Inject
	protected keyboardManager: KeyboardManager;

	@Inject
	protected gamePadManager: GamePadManager;

	protected config: IGameConfig;
	protected view: GameView;

	protected init (): void {
		this.config = new GameConfig();
		this.view = new GameView( this.config );
		this.addListeners();
	}

	protected addListeners (): void {
		this.keyboardManager.onKeyDownSignal.add( this.onKeyDown, this );
		this.keyboardManager.onKeyPressSignal.add( this.onKeyPress, this );
		this.gamePadManager.onGamePadPressSignal.add( this.onGamePadPress, this );
	}

	protected onKeyDown ( data: IKeyboardEventData ): void {
		switch ( data.key ) {
			case KeyboardButton.ARROW_LEFT:
				this.view.rotateTank( RotateDirection.LEFT );
				break;
			case KeyboardButton.ARROW_RIGHT:
				this.view.rotateTank( RotateDirection.RIGHT );
				break;
		}
	}

	protected onKeyPress ( data: IKeyboardEventData ): void {
		switch ( data.key ) {
			case KeyboardButton.ARROW_UP:
				this.view.moveTank( MoveDirection.FORWARD );
				break;
			case KeyboardButton.ARROW_DOWN:
				this.view.moveTank( MoveDirection.BACKWARD );
				break;
		}
	}

	protected onGamePadPress ( data: IGamePadEventData ): void {
		data.buttonsUpdateState.forEach( button => {
			switch ( button.key ) {
				case GamePadKey.PAD_UP:
					if ( button.isPress ) {
						this.view.moveTank( MoveDirection.FORWARD );
					}
					break;
				case GamePadKey.PAD_DOWN:
					if ( button.isPress ) {
						this.view.moveTank( MoveDirection.BACKWARD );
					}
					break;
				case GamePadKey.PAD_LEFT:
					if ( button.isTouch ) {
						this.view.rotateTank( RotateDirection.LEFT );
					}
					break;
				case GamePadKey.PAD_RIGHT:
					if ( button.isTouch ) {
						this.view.rotateTank( RotateDirection.RIGHT );
					}
					break;
			}
		} );
	}
}