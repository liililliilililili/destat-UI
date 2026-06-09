import { createPublicClient, http } from "viem";
import { hardhat } from "viem/chains";
import {
  SURVEY_FACTORY_ABI,
  SURVEY_FACTORY_ADDRESS,
} from "~/constants/contracts";

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});

export async function onchainLoader() {
  const surveys = await publicClient.readContract({
    address: SURVEY_FACTORY_ADDRESS,
    abi: SURVEY_FACTORY_ABI,
    functionName: "getSurveys",
  });

  return surveys;
}
