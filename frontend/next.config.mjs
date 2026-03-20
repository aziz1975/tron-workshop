import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootEnvPath = path.resolve(currentDir, "..", ".env");
const contractArtifactPath = path.resolve(
  currentDir,
  "..",
  "build",
  "contracts",
  "SimpleStorage.json"
);

function readEnvValue(key) {
  if (!fs.existsSync(rootEnvPath)) {
    return "";
  }

  const envContent = fs.readFileSync(rootEnvPath, "utf8");
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, "m"));

  if (!match) {
    return "";
  }

  return match[1].trim().replace(/^['"]|['"]$/g, "");
}

function readContractAbi() {
  if (!fs.existsSync(contractArtifactPath)) {
    return "[]";
  }

  const artifactContent = fs.readFileSync(contractArtifactPath, "utf8");
  const artifact = JSON.parse(artifactContent);

  return JSON.stringify(artifact.abi || []);
}

const nextConfig = {
  env: {
    NEXT_PUBLIC_SIMPLE_STORAGE_ADDRESS: readEnvValue(
      "SIMPLE_STORAGE_ADDRESS"
    ),
    NEXT_PUBLIC_SIMPLE_STORAGE_ABI: readContractAbi(),
  },
};

export default nextConfig;
