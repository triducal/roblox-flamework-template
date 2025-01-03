import { datastore } from "..";
import { flattenAtoms } from "./utility/flatten-atoms";

export type GlobalAtoms = typeof atoms;

export const atoms = flattenAtoms({
	datastore,
});
