"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cdkGraph = void 0;
const pdk_nag_1 = require("@aws/pdk/pdk-nag");
const cdk_graph_1 = require("@aws/pdk/cdk-graph");
const cdk_graph_plugin_diagram_1 = require("@aws/pdk/cdk-graph-plugin-diagram");
const cdk_graph_plugin_threat_composer_1 = require("@aws/pdk/cdk-graph-plugin-threat-composer");
const cdkGraph = async (contextName, block) => {
    const app = pdk_nag_1.PDKNag.app({ nagPacks: [new pdk_nag_1.AwsPrototypingChecks()] });
    block(app);
    const graph = new cdk_graph_1.CdkGraph(app, {
        plugins: [
            new cdk_graph_plugin_diagram_1.CdkGraphDiagramPlugin({
                defaults: {
                    format: [cdk_graph_plugin_diagram_1.DiagramFormat.SVG, cdk_graph_plugin_diagram_1.DiagramFormat.PNG],
                    filterPlan: {
                        preset: cdk_graph_1.FilterPreset.COMPACT,
                        filters: [{ store: cdk_graph_1.Filters.pruneCustomResources() }],
                    },
                },
                diagrams: [
                    {
                        name: contextName,
                        title: contextName,
                    },
                ],
            }),
            new cdk_graph_plugin_threat_composer_1.CdkGraphThreatComposerPlugin({
                applicationDetails: {
                    name: contextName,
                },
            }),
        ],
    });
    app.synth();
    await graph.report();
};
exports.cdkGraph = cdkGraph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLWdyYXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nkay1ncmFwaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBeUU7QUFDekUsa0RBQW1FO0FBQ25FLGdGQUF1RjtBQUN2RixnR0FBdUY7QUFFaEYsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLFdBQW1CLEVBQUUsS0FBK0IsRUFBRSxFQUFFO0lBQ25GLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSw4QkFBb0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRWxFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVWLE1BQU0sS0FBSyxHQUFHLElBQUksb0JBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDNUIsT0FBTyxFQUFFO1lBQ0wsSUFBSSxnREFBcUIsQ0FBQztnQkFDdEIsUUFBUSxFQUFFO29CQUNOLE1BQU0sRUFBRSxDQUFDLHdDQUFhLENBQUMsR0FBRyxFQUFFLHdDQUFhLENBQUMsR0FBRyxDQUFDO29CQUM5QyxVQUFVLEVBQUU7d0JBQ1IsTUFBTSxFQUFFLHdCQUFZLENBQUMsT0FBTzt3QkFDNUIsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsbUJBQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUM7cUJBQ3ZEO2lCQUNKO2dCQUNELFFBQVEsRUFBRTtvQkFDTjt3QkFDSSxJQUFJLEVBQUUsV0FBVzt3QkFDakIsS0FBSyxFQUFFLFdBQVc7cUJBQ3JCO2lCQUNKO2FBQ0osQ0FBQztZQUNGLElBQUksK0RBQTRCLENBQUM7Z0JBQzdCLGtCQUFrQixFQUFFO29CQUNoQixJQUFJLEVBQUUsV0FBVztpQkFDcEI7YUFDSixDQUFDO1NBQ0w7S0FDSixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxNQUFNLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUN4QixDQUFDLENBQUM7QUFoQ1csUUFBQSxRQUFRLFlBZ0NuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXdzUHJvdG90eXBpbmdDaGVja3MsIFBES05hZywgUERLTmFnQXBwfSBmcm9tIFwiQGF3cy9wZGsvcGRrLW5hZ1wiO1xuaW1wb3J0IHtDZGtHcmFwaCwgRmlsdGVyUHJlc2V0LCBGaWx0ZXJzfSBmcm9tIFwiQGF3cy9wZGsvY2RrLWdyYXBoXCI7XG5pbXBvcnQge0Nka0dyYXBoRGlhZ3JhbVBsdWdpbiwgRGlhZ3JhbUZvcm1hdH0gZnJvbSBcIkBhd3MvcGRrL2Nkay1ncmFwaC1wbHVnaW4tZGlhZ3JhbVwiO1xuaW1wb3J0IHtDZGtHcmFwaFRocmVhdENvbXBvc2VyUGx1Z2lufSBmcm9tIFwiQGF3cy9wZGsvY2RrLWdyYXBoLXBsdWdpbi10aHJlYXQtY29tcG9zZXJcIjtcblxuZXhwb3J0IGNvbnN0IGNka0dyYXBoID0gYXN5bmMgKGNvbnRleHROYW1lOiBzdHJpbmcsIGJsb2NrOiAoYXBwOiBQREtOYWdBcHApID0+IHZvaWQpID0+IHtcbiAgICBjb25zdCBhcHAgPSBQREtOYWcuYXBwKHsgbmFnUGFja3M6IFtuZXcgQXdzUHJvdG90eXBpbmdDaGVja3MoKV0gfSlcblxuICAgIGJsb2NrKGFwcClcblxuICAgIGNvbnN0IGdyYXBoID0gbmV3IENka0dyYXBoKGFwcCwge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICBuZXcgQ2RrR3JhcGhEaWFncmFtUGx1Z2luKHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFtEaWFncmFtRm9ybWF0LlNWRywgRGlhZ3JhbUZvcm1hdC5QTkddLFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQbGFuOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVzZXQ6IEZpbHRlclByZXNldC5DT01QQUNULFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogW3sgc3RvcmU6IEZpbHRlcnMucHJ1bmVDdXN0b21SZXNvdXJjZXMoKSB9XSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpYWdyYW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRleHROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGNvbnRleHROYW1lLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBDZGtHcmFwaFRocmVhdENvbXBvc2VyUGx1Z2luKHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbkRldGFpbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY29udGV4dE5hbWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgIH0pXG5cbiAgICBhcHAuc3ludGgoKVxuICAgIGF3YWl0IGdyYXBoLnJlcG9ydCgpXG59O1xuIl19