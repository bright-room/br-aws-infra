import {AwsPrototypingChecks, PDKNag, PDKNagApp} from "@aws/pdk/pdk-nag";
import {CdkGraph, FilterPreset, Filters} from "@aws/pdk/cdk-graph";
import {CdkGraphDiagramPlugin, DiagramFormat} from "@aws/pdk/cdk-graph-plugin-diagram";
import {CdkGraphThreatComposerPlugin} from "@aws/pdk/cdk-graph-plugin-threat-composer";

export const cdkGraphGenerateSupport = (async (contextName: string, block: (app: PDKNagApp) => void) => {
    const app = PDKNag.app({ nagPacks: [new AwsPrototypingChecks()] })

    block(app)

    const graph = new CdkGraph(app, {
        plugins: [
            new CdkGraphDiagramPlugin({
                defaults: {
                    format: [DiagramFormat.SVG, DiagramFormat.PNG],
                    filterPlan: {
                        preset: FilterPreset.COMPACT,
                        filters: [{ store: Filters.pruneCustomResources() }],
                    },
                },
                diagrams: [
                    {
                        name: contextName,
                        title: contextName,
                    },
                ],
            }),
            new CdkGraphThreatComposerPlugin({
                applicationDetails: {
                    name: contextName,
                },
            }),
        ],
    })

    app.synth()
    await graph.report()
});
