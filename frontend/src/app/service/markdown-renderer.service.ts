import { Injectable } from "@angular/core";
import { ConstantsService, RegOp } from "./constants.service";

@Injectable({
    providedIn: 'root'
})
export class MarkdownRendererService {

    constructor(private constantsService: ConstantsService) {}
    
    public renderString(inputString: string):string {
        for(let op of this.constantsService.mkdownRenderPipeline) {
            inputString =  this.operatorRunner(inputString, op);
        }
        return inputString;
    }

    private operatorRunner(s: string, op: RegOp): string {
        console.log(op.pattern);
        var match = op.pattern.exec(s);
        while (match) {
            const replaceTo = op.tags.s + match[1].trim() + op.tags.e;

            console.log(replaceTo);
            s = s.replace(match[0], replaceTo);
            op.pattern.lastIndex = 0;
            match = op.pattern.exec(s);
        }
        return s;
    }
}