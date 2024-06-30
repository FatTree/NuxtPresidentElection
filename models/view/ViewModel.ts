import type { CodeModel } from "../data/ElectionModel";

export type MapViewModel = CodeModel & {
    name: string[],
    path: string,
    fill: string,
}