import * as jsonpath from "jsonpath"

interface IReplacement {
	path: string,
	replaceWith: string
}

const pluginName = "serverless-offline-cloud-formation-replacer";

export class ServerlessOfflineCloudFormationReplacer {
	declare serverless

	constructor(serverless: any, options: any){
		this.serverless = serverless
		try {
			this.runPlugin();
		} catch (e) {
			console.error(e)
		}
	}

	logMessage(msg: any){
		if (process.env.SLS_DEBUG) {
			this.serverless.cli.log(msg, pluginName);
		}
	}

	runPlugin(){
		this.logMessage(`Start of ${pluginName}`)

		if (!this.serverless.pluginManager.cliCommands[0].includes('offline')) {
			return;
		}

		if (!this.serverless.service.custom.offline) {
			this.logMessage("No offline object defined in serverless yaml")
			return;
		}

		if (!this.serverless.service.custom.offline["cloud-formation-replacements"]) {
			this.logMessage("No cloud-formation-replacements object present in offline object in serverless yaml")
			return;
		}

		const replacements: IReplacement[] = this.serverless.service.custom.offline["cloud-formation-replacements"];
		this.logMessage(`Replacements requested: ${replacements}`)

		replacements.forEach((replacement: IReplacement) => this.actionReplacement(replacement))

		this.logMessage(`End of ${pluginName}`)
	}

	actionReplacement(replacement: IReplacement){
		this.logMessage(`Handling replacement: ${replacement}`)
		jsonpath.apply(this.serverless.service.provider, replacement.path, () => replacement.replaceWith)
	}
}

module.exports = ServerlessOfflineCloudFormationReplacer


