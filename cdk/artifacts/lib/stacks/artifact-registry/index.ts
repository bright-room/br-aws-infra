import { Stack, type StackProps } from "aws-cdk-lib"
import type { Construct } from "constructs"
import { RepositoryConfiguration, StateConfiguration } from "./constructs"
import type { ArtifactRegistryProperties } from "./parameter"

interface ArtifactRegistryStackProps extends StackProps {
  properties: ArtifactRegistryProperties[]
}

export class ArtifactRegistryStack extends Stack {
  constructor(scope: Construct, id: string, props: ArtifactRegistryStackProps) {
    super(scope, id, props)

    new RepositoryConfiguration(this, "RepositoryConfiguration", props.properties)
    new StateConfiguration(this, "StateConfiguration", props.properties)
  }
}
