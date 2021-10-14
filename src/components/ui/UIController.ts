import { UIView } from 'src/components/ui/UIView';

export class UIController {
	protected view: UIView;

	public get mainContainer (): UIView {
		return this.view;
	}

	constructor () {
		this.view = new UIView();
	}
}