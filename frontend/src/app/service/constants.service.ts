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
    private patternH3: RegExp = new RegExp(/\#{3,}\h([^\n]+)/g);
    private patternH2: RegExp = new RegExp(/\#{2}\h([^\n]+)/g);
    private patternH1: RegExp = new RegExp(/\#{1}\h([^\n]+)/g);
    private patternCodeBlock: RegExp = new RegExp(/\`{3}((.|\n)*?)\`{3}/g);
    private tagBold: TagPair = {s: '<span class=\'bold\'>', e: '</span>'};
    private tagCodeSnipet: TagPair = {s: '<span class=\'code-snipet\'>', e: '</span>'};
    private tagH3: TagPair = {s: '<p class=\'h-lv3\'>', e: '</p>'};
    private tagH2: TagPair = {s: '<p class=\'h-lv2\'>', e: '</p>'};
    private tagH1: TagPair = {s: '<p class=\'h-lv1\'>', e: '</p>'};
    private tagCodeBlock: TagPair = {s: '<p class=\'code-block\'>', e: '</p>'};

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
        highlight: '#719ece'
    }

    public iconPath = {
        edit: 'M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z',
    }
}