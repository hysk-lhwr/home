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
}