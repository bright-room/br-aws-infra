export const AccountId = {
  artifacts: "000000000000",
  dev: "000000000001",
  staging: "000000000002",
  production: "000000000003",
} as const
export type AccountId = (typeof AccountId)[keyof typeof AccountId]

export const AccountName = {
  artifacts: "artifacts",
  dev: "dev",
  staging: "staging",
  production: "production",
} as const
export type AccountName = (typeof AccountName)[keyof typeof AccountName]

export interface Account {
  id: AccountId
  name: AccountName
}

export const artifactAccount: Account = {
  id: AccountId.artifacts,
  name: AccountName.artifacts,
}

export const devAccount: Account = {
  id: AccountId.dev,
  name: AccountName.dev,
}

export const stagingAccount: Account = {
  id: AccountId.staging,
  name: AccountName.staging,
}

export const productionAccount: Account = {
  id: AccountId.production,
  name: AccountName.production,
}

export const BrightRoomAccounts: Account[] = [devAccount, stagingAccount, productionAccount]
