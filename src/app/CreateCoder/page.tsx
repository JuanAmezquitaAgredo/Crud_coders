import { CoderService } from "@/services/coders.service"
import CreateCoder from "../createCoders/CreateCodersButton"

const useCoderService = new CoderService()

export default async function Home() {
  return <CreateCoder/>
}
