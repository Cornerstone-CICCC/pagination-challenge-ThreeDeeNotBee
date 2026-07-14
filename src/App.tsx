import { useState } from "react";
import "./App.css";

/**
 * `items` variable is an array of objects with the following structure:
 *
 * [
 *  { id: 0, name: 'Item 1' },
 *  { id: 1, name: 'Item 2' },
 *  { id: 2, name: 'Item 3' },
 * ]
 *
 * Array.from() is used to create an array of 30 items.
 * The second argument of Array.from() is a map function that returns
 * an object with an id and name property.
 */
const items = Array.from({ length: 30 }, (_, index) => ({
	id: index,
	name: `Item ${index + 1}`,
}));

/**
 * `itemsPerPageOptions` is an array of numbers that represent the
 * options for the items per page select element.
 *
 * Sample initial value: [5, 10, 15]
 *
 * This array is used to render the options for the select element.
 */
const itemsPerPageOptions = [5, 10, 15];

export const PaginationChallenge = () => {
	/**
	 * Write your states here
	 */

	/**
	 * Write your event handlers here
	 */

	return (
		<div className="pagination-challenge">
			<div className="pagination-controls"></div>

			<div className="items-per-page">
				<label>Items per Page:</label>
			</div>

			<div className="item-list"></div>
		</div>
	);
};

export default PaginationChallenge;
