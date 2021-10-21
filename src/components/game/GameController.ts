import { Inject } from 'typescript-ioc';
import { GameView } from 'src/components/game/GameView';
import { IKeyboardEventData, KeyboardButton, KeyboardManager } from 'src/core/KeyboardManager';
import { Controller } from 'src/ui/Controller';
import { GameConfig, IGameConfig } from 'src/components/game/GameConfig';
import { MoveDirection, RotateDirection } from 'src/components/game/elements/Tank';
import { GamePadAxesIntensity, GamePadAxesKey, GamePadButtonKey, GamePadManager, IGamePadAxesEventData, IGamePadButtonEventData } from 'src/core/GamePadManager';

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
		this.keyboardManager.onKeyUpSignal.add( this.onKeyUp, this );
		this.gamePadManager.onButtonUpdateSignal.add( this.onGamePadButtonUpdate, this );
		this.gamePadManager.onAxesUpdateSignal.add( this.onGamePadAxesUpdate, this );
	}

	protected onKeyDown ( data: IKeyboardEventData ): void {
		switch ( data.code ) {
			case KeyboardButton.ARROW_LEFT:
				this.view.rotateTank( RotateDirection.LEFT );
				break;
			case KeyboardButton.ARROW_RIGHT:
				this.view.rotateTank( RotateDirection.RIGHT );
				break;
			case KeyboardButton.SPACE:
				this.view.shoot();
				break;
		}
	}

	protected onKeyUp ( data: IKeyboardEventData ): void {
		//
	}

	protected onKeyPress ( data: IKeyboardEventData ): void {
		switch ( data.code ) {
			case KeyboardButton.ARROW_UP:
				this.view.moveTank( MoveDirection.FORWARD, this.config.tank.moveSpeeds[ 1 ] );
				break;
			case KeyboardButton.ARROW_DOWN:
				this.view.moveTank( MoveDirection.BACKWARD, this.config.tank.moveSpeeds[ 1 ] );
				break;
		}
	}

	protected onGamePadButtonUpdate ( data: IGamePadButtonEventData ): void {
		data.buttonsUpdateState.forEach( button => {
			switch ( button.key ) {
				case GamePadButtonKey.PAD_UP:
					if ( button.isPress ) {
						this.view.moveTank( MoveDirection.FORWARD, this.config.tank.moveSpeeds[ 1 ] );
					}
					break;
				case GamePadButtonKey.PAD_DOWN:
					if ( button.isPress ) {
						this.view.moveTank( MoveDirection.BACKWARD, this.config.tank.moveSpeeds[ 1 ] );
					}
					break;
				case GamePadButtonKey.PAD_LEFT:
					if ( button.isTouch ) {
						this.view.rotateTank( RotateDirection.LEFT );
					}
					break;
				case GamePadButtonKey.PAD_RIGHT:
					if ( button.isTouch ) {
						this.view.rotateTank( RotateDirection.RIGHT );
					}
					break;
				case GamePadButtonKey.PAD_A:
					if ( button.isTouch ) {
						this.view.shoot();
					}
					break;
			}
		} );
	}

	protected onGamePadAxesUpdate ( data: IGamePadAxesEventData ): void {
		data.axesUpdateState.forEach( axes => {
			switch ( axes.key ) {
				case GamePadAxesKey.AXES_LX:
					if ( axes.isTouch ) {
						if ( axes.isPositive ) {
							this.view.rotateTank( RotateDirection.RIGHT );
						} else {
							this.view.rotateTank( RotateDirection.LEFT );
						}
					}
					break;
				case GamePadAxesKey.AXES_LY:
					const speedIndex: number = axes.intensity === GamePadAxesIntensity.WEAK ? 0 : 1;
					const speed: number = this.config.tank.moveSpeeds[ speedIndex ];
					if ( axes.isPositive ) {
						this.view.moveTank( MoveDirection.BACKWARD, speed );
					} else {
						this.view.moveTank( MoveDirection.FORWARD, speed );
					}
					break;
			}
		} );
	}
}