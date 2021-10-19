import { Singleton } from 'typescript-ioc';
import * as MiniSignal from 'mini-signals';

@Singleton
export class GamePadManager {

	public onGamePadPressSignal: MiniSignal = new MiniSignal();

	protected buttonsState: Array<boolean> = new Array<boolean>( 16 );
	protected axesState: Array<boolean> = new Array<boolean>( 4 );

	constructor () {
		for ( let i: number = 0; i < this.buttonsState.length; i++ ) {
			this.buttonsState[ i ] = false;
		}
		for ( let i: number = 0; i < this.axesState.length; i++ ) {
			this.axesState[ i ] = false;
		}
	}

	public updateGamePad ( gamepad: Gamepad ): void {
		const buttonsUpdateState: Array<IGamePadButtonState> = new Array<IGamePadButtonState>();
		const gamePadKeys = Object.values( GamePadKey );
		this.buttonsState.forEach( ( state, i ) => {
			buttonsUpdateState.push( {
				key: gamePadKeys[ i ],
				isPress: gamepad.buttons[ i ].pressed,
				isTouch: gamepad.buttons[ i ].pressed && !state
			} )
			this.buttonsState[ i ] = gamepad.buttons[ i ].pressed;
		} );
		const data: IGamePadEventData = { buttonsUpdateState };
		this.onGamePadPressSignal.dispatch( data );
	}
}

export interface IGamePadEventData {
	buttonsUpdateState: Array<IGamePadButtonState>;
}

export interface IGamePadButtonState {
	key: string;
	isPress: boolean;
	isTouch: boolean;
}

export enum GamePadKey {
	PAD_A = 'PAD_A',
	PAD_B = 'PAD_B',
	PAD_X = 'PAD_X',
	PAD_Y = 'PAD_Y',
	PAD_LB = 'PAD_LB',
	PAD_RB = 'PAD_RB',
	PAD_LT = 'PAD_LT',
	PAD_RT = 'PAD_RT',
	PAD_BACK = 'PAD_BACK',
	PAD_START = 'PAD_START',
	PAD_LS = 'PAD_LS',
	PAD_RS = 'PAD_RS',
	PAD_UP = 'PAD_UP',
	PAD_DOWN = 'PAD_DOWN',
	PAD_LEFT = 'PAD_LEFT',
	PAD_RIGHT = 'PAD_RIGHT',
	PAD_HOME = 'PAD_HOME'
}