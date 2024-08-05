import { PDKNagApp } from "@aws/pdk/pdk-nag";
export declare const cdkGraph: (contextName: string, block: (app: PDKNagApp) => void) => Promise<void>;
