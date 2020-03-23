export interface Def {
    reading: string,
    accent?: string,

    senses: Sense[],
    altWords: string[],


}

export interface Sense {
    pos: string,
    definitions: string[],

}

export enum Lang{jp, en}