import type { ArtifactRegistryProperties } from "../../parameter"

export const onyxInternalApi: ArtifactRegistryProperties = {
  name: "onyx-internal-api",
  multiModuleSupport: true,
  modules: ["sandbox1", "sandbox2", "sandbox3"],
}
