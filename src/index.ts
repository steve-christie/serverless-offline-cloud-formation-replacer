class ServerlessOfflineCloudFormationReplacer {
	declare serverless;
	constructor(serverless: any, options: any) {
		this.serverless = serverless

		this.runPlugin();
	}

	runPlugin() {
		const logMessage = (msg:any) => {
			if (process.env.SLS_DEBUG) {
				this.serverless.cli.log(msg, pluginName);
			}
		}
		const pluginName = "serverless-offline-cloud-formation-replacer";

		logMessage(`Welcome to the ${pluginName}`)

		if (this.serverless.pluginManager.cliCommands[0] !== 'offline') {
			return;
		}

		const replacements = this.serverless.service.custom.offline["cloud-formation-replacements"];
		console.log(replacements)
	}
}

export {
	ServerlessOfflineCloudFormationReplacer
}

module.exports = ServerlessOfflineCloudFormationReplacer
