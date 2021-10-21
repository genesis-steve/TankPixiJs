import { Singleton } from 'typescript-ioc';
import * as MiniSignal from 'mini-signals';

@Singleton
export class KeyboardManager {

	public onKeyDownSignal: MiniSignal = new MiniSignal();
	public onKeyUpSignal: MiniSignal = new MiniSignal();
	public onKeyPressSignal: MiniSignal = new MiniSignal();

	public keysState: Array<IKeyboardButtonState>;

	constructor () {
		this.initKeysState();
		this.initSignals();
		this.addEventListeners();
	}

	protected initKeysState (): void {
		this.keysState = new Array<IKeyboardButtonState>();
	}

	protected initSignals (): void {
		this.onKeyDownSignal = new MiniSignal();
		this.onKeyUpSignal = new MiniSignal();
		this.onKeyPressSignal = new MiniSignal();
	}

	protected addEventListeners (): void {
		window.addEventListener( 'keydown', this.onKeyDown.bind( this ) );
		window.addEventListener( 'keyup', this.onKeyUp.bind( this ) );
	}

	protected onKeyDown ( e: KeyboardEvent ): void {
		const keyState = this.keysState.find( state => state.code === e.key );
		if ( !keyState ) {
			this.keysState.push( {
				code: e.key,
				isPress: true,
				isTouch: true
			} );
		} else {
			keyState.isTouch = !keyState.isPress;
			keyState.isPress = true;
		}
		const data: IKeyboardEventData = {
			code: e.code
		};
		this.onKeyDownSignal.dispatch( data );
	}

	protected onKeyUp ( e: KeyboardEvent ): void {
		const keyState = this.keysState.find( state => state.code === e.key );
		if ( !keyState ) {
			return;
		}
		keyState.isTouch = false;
		keyState.isPress = false;
		const data: IKeyboardEventData = {
			code: e.key
		};
		this.onKeyUpSignal.dispatch( data );
	}

	public updateKeyboard (): void {
		this.keysState.forEach( state => {
			if ( state.isPress ) {
				const data: IKeyboardEventData = {
					code: state.code
				};
				this.onKeyPressSignal.dispatch( data );
			}
		} );
	}

}

export interface IKeyboardButtonState {
	code: string;
	isPress: boolean;
	isTouch: boolean;
}

export interface IKeyboardEventData {
	code: string;
}

export enum KeyboardButton {
	ARROW_UP = 'ArrowUp',
	ARROW_DOWN = 'ArrowDown',
	ARROW_LEFT = 'ArrowLeft',
	ARROW_RIGHT = 'ArrowRight',
	SPACE = 'Space'
}