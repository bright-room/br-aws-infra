import { CfnOutput, Stack, type StackProps } from "aws-cdk-lib"
import { OpenIdConnectPrincipal, OpenIdConnectProvider, Role } from "aws-cdk-lib/aws-iam"
import type { Construct } from "constructs"
import type { GithubOIDCProperties } from "./parameter"

interface GithubOidcStackProps extends StackProps {
  properties: GithubOIDCProperties
}

export class GithubOidcStack extends Stack {
  constructor(scope: Construct, id: string, props: GithubOidcStackProps) {
    super(scope, id, props)

    const provider = new OpenIdConnectProvider(this, "GithubOIDCProvider", {
      url: "https://token.actions.githubusercontent.com",
      clientIds: ["sts.amazonaws.com"],
    })

    const accessibleOrganizations = props.properties.accessibleOrganizations
    const principal = new OpenIdConnectPrincipal(provider, {
      "ForAnyValue:StringLike": {
        "token.actions.githubusercontent.com:sub": accessibleOrganizations.map((org) => `repo:${org}/*:*`),
      },
    })

    const githubAssumeRole = new Role(this, "GitHubAssumeRole", {
      assumedBy: principal,
    })

    new CfnOutput(this, "ExportGithubAssumeRoleArn", {
      exportName: "GithubAssumeRoleArn",
      value: githubAssumeRole.roleArn,
    })
  }
}
