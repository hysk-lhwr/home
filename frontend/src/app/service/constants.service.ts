import { Injectable } from "@angular/core";

interface TagPair {
    s: string;
    e: string;
}

export interface RegOp {
    pattern: RegExp;
    tags: TagPair;
}

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {

    private patternBold: RegExp = new RegExp(/\*\*([^\n]+)\*\*/g);
    private patternCodeSnipet: RegExp = new RegExp(/(?!<\`)\`{1}([^\s][^\n\`]+)\`{1}(?!\`)/g);
    private patternH3: RegExp = new RegExp(/\#{3,} ([^\n]+)/g);
    private patternH2: RegExp = new RegExp(/\#{2} ([^\n]+)/g);
    private patternH1: RegExp = new RegExp(/\#{1} ([^\n]+)/g);
    private patternCodeBlock: RegExp = new RegExp(/\`{3}((.|\n)*?)\`{3}/g);
    private tagBold: TagPair = {s: '<span class=\'bold\'>', e: '</span>'};
    private tagCodeSnipet: TagPair = {s: '<span class=\'code-snipet\'>', e: '</span>'};
    private tagH3: TagPair = {s: '</p><p class=\'h-lv3\'>', e: '</p><p>'};
    private tagH2: TagPair = {s: '</p><p class=\'h-lv2\'>', e: '</p><p>'};
    private tagH1: TagPair = {s: '</p><p class=\'h-lv1\'>', e: '</p><p>'};
    private tagCodeBlock: TagPair = {s: '</p><p class=\'code-block\'>', e: '</p><p>'};

    public mkdownRenderPipeline: RegOp[] = [
        {pattern: this.patternBold, tags: this.tagBold},
        {pattern: this.patternCodeSnipet, tags: this.tagCodeSnipet},
        {pattern: this.patternH3, tags: this.tagH3},
        {pattern: this.patternH2, tags: this.tagH2},
        {pattern: this.patternH1, tags: this.tagH1},
        {pattern: this.patternCodeBlock, tags: this.tagCodeBlock},
    ]

    public iconColor = {
        regular: '#808080',
        highlight: '#719ece',
        delete: 'rgb(241, 131, 112)',
        enabled: 'rgb(131, 190, 161)',
        disabled: 'rgb(168, 168, 168)',
    }

    public iconPath = {
        edit: 'M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z',
        toggleOn: 'M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z',
        toggleOff: 'M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4zM7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
        delete: 'M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z',
        home: 'M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z',
        login: 'M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z',
        new: 'M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
        logout: 'M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z',
        next: 'M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z',
        previous: 'M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z',
    }
}