import type { CodeModel } from "../data/ElectionModel";

export type MapViewModel = CodeModel & {
    name: string[],
    path: string,
    party_color: string,
}

// name === party_name