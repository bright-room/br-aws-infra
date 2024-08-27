import { Fn, RemovalPolicy } from "aws-cdk-lib"
import { Repository, TagStatus } from "aws-cdk-lib/aws-ecr"
import { AccountPrincipal, Effect, IRole, PolicyStatement, Role } from "aws-cdk-lib/aws-iam"
import { StringParameter } from "aws-cdk-lib/aws-ssm"
import { Construct } from "constructs"
import { BrightRoomAccounts } from "../../context/account"
import type { ArtifactRegistryProperties } from "./parameter"

export class RepositoryConfiguration extends Construct {
  constructor(scope: Construct, id: string, properties: ArtifactRegistryProperties[]) {
    super(scope, id)

    const githubAssumeRoleArn = Fn.importValue("GithubAssumeRoleArn")
    const githubAssumeRole = Role.fromRoleArn(this, "ImportGithubAssumeRoleArn", githubAssumeRoleArn)

    for (const property of properties) {
      const ecr = new Repository(this, `${property.name}`, {
        repositoryName: property.name,
        removalPolicy: RemovalPolicy.DESTROY,
        emptyOnDelete: true,
        lifecycleRules: [
          {
            rulePriority: 1,
            description: "Delete more than 100 images",
            maxImageCount: 100,
            tagStatus: TagStatus.ANY,
          },
        ],
      })

      for (const account of BrightRoomAccounts) {
        const policy = new PolicyStatement({
          effect: Effect.ALLOW,
          principals: [new AccountPrincipal(account.id)],
          actions: ["ecr:GetAuthorizationToken", "ecr:BatchGetImage", "ecr:GetDownloadUrlForLayer"],
        })
        ecr.addToResourcePolicy(policy)
      }

      ecr.grantPush(githubAssumeRole)
    }
  }
}

export class StateConfiguration extends Construct {
  constructor(scope: Construct, id: string, properties: ArtifactRegistryProperties[]) {
    super(scope, id)

    const githubAssumeRoleArn = Fn.importValue("GithubAssumeRoleArn")
    const githubAssumeRole = Role.fromRoleArn(this, "ImportGithubAssumeRoleArn", githubAssumeRoleArn)

    const devAssumeRole = new Role(this, "devAssumeRole", {
      assumedBy: new AccountPrincipal("000000000001"),
    })

    const stringParameters: StringParameter[] = []
    for (const property of properties) {
      if (!property.multiModuleSupport) {
        const tag = `/${property.name}/image-tag`
        const sp = new StringParameter(this, `${property.name}-ImageTag`, {
          parameterName: tag,
          stringValue: "latest",
        })
        stringParameters.push(sp)
      }

      for (const module of property.modules) {
        const tag = `/${property.name}/${module}/image-tag`
        const sp = new StringParameter(this, `${property.name}-${module}-ImageTag`, {
          parameterName: tag,
          stringValue: "latest",
        })
        stringParameters.push(sp)
      }
    }

    for (const stringParameter of stringParameters) {
      stringParameter.grantWrite(githubAssumeRole)
      stringParameter.grantRead(devAssumeRole)
    }
  }
}
