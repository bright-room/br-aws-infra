import type { ArtifactRegistryProperties } from "../../parameter"
import { onyxGatewayApi } from "./onyx-gateway-api"
import { onyxInternalApi } from "./onyx-internal-api"
import { onyxScheduler } from "./onyx-scheduler"
import { onyxWeb } from "./onyx-web"

export const onyxArtifactRegistryProperties: ArtifactRegistryProperties[] = [
  onyxWeb,
  onyxGatewayApi,
  onyxInternalApi,
  onyxScheduler,
]
