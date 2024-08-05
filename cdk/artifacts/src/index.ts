import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { cdkGraphGenerateSupport } from "utils/src/cdk-graph-generate-support"

class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id)
  }
}

cdkGraphGenerateSupport("artifacts", app => {
  new TestStack(app, "a", {})
}).then()
