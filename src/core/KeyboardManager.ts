import { Singleton } from 'typescript-ioc';
import * as MiniSignal from 'mini-signals';

@Singleton
export class KeyboardManager {

	public onKeyDownSignal: MiniSignal = new MiniSignal();

	constructor () {
		window.addEventListener( 'keydown', this.onKeyDown.bind( this ) );
	}

	protected onKeyDown ( e: KeyboardEvent ): void {
		const data: IKeyboardEventData = {
			key: e.key
		};
		console.error( 'data : ', data );
		this.onKeyDownSignal.dispatch( data );
	}
}

export interface IKeyboardEventData {
	key: string;
}