/**
 * This class is meant for testing code documentation on nested AST nodes
 */
export default class AstTest {
	/**
	 * This is the doc for a class property
	 */
	prop1: string;

	/**
	 * This is the doc for the constructor
	 */
	constructor(
		/**
		 * This is the doc for constructor argument 1
		 */
		arg1: string
	) {
		this.prop1 = arg1;
	}
}
