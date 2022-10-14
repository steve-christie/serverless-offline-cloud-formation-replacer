# serverless-offline-provider-value-replacer

[Serverless](http://www.serverless.com) plugin for manipulating values under providers while using
[serverless-offline](https://github.com/dherault/serverless-offline).

Main use case is for replacing values which would otherwise been imported from cloud formation.

## Installation 

Installing using npm:

```shell
npm i serverless-offline-provider-value-replacer --save-dev
```

Then inside your serverless.yml, add `serverless-offline-provider-value-replacer` to your plugins list.

```yaml
    plugins:
        - serverless-offline-provider-value-replacer
```

## Usage

The plugin is configured with values located at `custom.offline.provider-replacements`

```yaml
    offline:
      provider-replacements:
        - path: "$..URL_INGESTED_FROM_CF"
          replaceWith: "http://localhost:9090"
```

If we take the following yml which will cause issue running locally:

```yaml
provider:
  name: aws
  stage: local
  environment:
    FOO: !ImportValue my-aws-stack-foo
```

When running the lambda with `serverless offline`, the value of FOO when accessed by `process.env.FOO` will be `[Object object]`.

Using the plugin, we can force the value of FOO to be some other value at run time while using `serverless offline`. Eg:

```yaml
    offline:
      provider-replacements:
        - path: "$..FOO"
          replaceWith: "bar"
```

When the code is then running, the value of `process.env.FOO` will now be `bar`.

Depending on how you have serverless.ymls configured, you may not need this plugin. However, in our scenario we had a single
map in the yml for cloud formation outputs that would support all of our environments except local. So this allowed us to
circumvent not being able to run !ImportValue with our local stack.