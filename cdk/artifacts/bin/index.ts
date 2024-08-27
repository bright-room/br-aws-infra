#!/usr/bin/env node
import "source-map-support/register"
import { artifactAccount } from "../lib/context/account"
import { Region } from "../lib/context/region"
import { ArtifactRegistryStack } from "../lib/stacks/artifact-registry"
import { onyxArtifactRegistryProperties } from "../lib/stacks/artifact-registry/env/onyx"
import { GithubOidcStack } from "../lib/stacks/github-oidc"
import { githubOIDCProperties } from "../lib/stacks/github-oidc/env"
import { graphGenerateSupport } from "../lib/utils/graph"

const baseProps = {
  env: {
    account: artifactAccount.id,
    region: Region.AP_NORTHEAST_1,
  },
}

graphGenerateSupport("shared", (app) => {
  const githubOidcStack = new GithubOidcStack(app, "GithubOidcStack", {
    ...baseProps,
    properties: githubOIDCProperties,
  })

  const onyxArtifactRegistryStack = new ArtifactRegistryStack(app, "OnyxArtifactRegistryStack", {
    ...baseProps,
    properties: onyxArtifactRegistryProperties,
  })
  onyxArtifactRegistryStack.addDependency(githubOidcStack)
}).then()
