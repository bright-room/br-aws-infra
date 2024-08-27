import type { ArtifactRegistryProperties } from "../../parameter"

export const onyxScheduler: ArtifactRegistryProperties = {
  name: "onyx-scheduler",
  multiModuleSupport: true,
  modules: ["sandbox1", "sandbox2", "sandbox3"],
}
