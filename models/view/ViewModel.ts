import type { CodeModel } from "../data/ElectionModel";

export type MapViewModel = CodeModel & {
    name: string[],
    path: string,
    party_color: string,
    party_code: string,
    party_name: string
}

// name === party_name