import { ServerlessOfflineCloudFormationReplacer } from "./index"
describe("serverless-offline-cloud-formation-replacer Unit Tests", () => {

	test("TBD", () => {
		const serverless = {
			custom: {
				offline: {
					["cloud-formation-replacements"]: {
						foo: "bar"
					}
				}
			}
		}

		const replacer = new ServerlessOfflineCloudFormationReplacer(serverless, undefined);
	})
})