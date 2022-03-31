# SNS

[![aws-cdk][badge-aws-cdk]][aws-cdk]
[![jsii][badge-jsii]][jsii]
[![npm-version][badge-npm-version]][npm-package]
[![nuget-version][badge-nuget-version]][nuget-package]
[![npm-downloads][badge-npm-downloads]][npm-package]
[![nuget-downloads][badge-nuget-downloads]][nuget-package]
[![license][badge-license]][license]

Component to manage Amazon Simple Notification Service.

## How to use

Below are all languages supported by the AWS CDK.

### C#

Install the dependency:

```sh
dotnet add package StackSpot.Cdk.Sns
```

Import the construct into your project, for example:

```csharp
using Amazon.CDK;
using Constructs;
using StackSpot.Cdk.Sns;

namespace MyStack
{
    public class MyStack : Stack
    {
        internal MyStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            new Sns(this, "MySns", new SnsCreateTopicProps{
                DisplayName = "my-topic",
                TopicName = "my-topic"
            });
        }
    }
}
```

### F#

Not yet supported.

### Go

Not yet supported.

### Java

Not yet supported.

### JavaScript

Install the dependency:

```sh
npm install --save @stackspot/cdk-sns
```

Import the construct into your project, for example:

```javascript
const { Stack } = require('aws-cdk-lib');
const { Sns } = require('@stackspot/cdk-sns');

class MyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new Sns(this, 'MySns', { displayName: 'my-topic', topicName: 'my-topic' });
  }
}

module.exports = { MyStack };
```

### Python

Not yet supported.

### TypeScript

Install the dependency:

```sh
npm install --save @stackspot/cdk-sns
```

Import the construct into your project, for example:

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Sns } from '@stackspot/cdk-sns';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Sns(this, 'MySns', { displayName: 'my-topic', topicName: 'my-topic' });
  }
}
```

## Construct Props

| Name        | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| displayName | string | A developer-defined string that can be used to identify this SNS topic. |
| topicName   | string | A name for the topic.                                                   |

## Properties

| Name  | Type                       | Description                 |
| ----- | -------------------------- | --------------------------- |
| topic | [Topic][aws-cdk-sns-topic] | The topic that was created. |

## Methods

| Name                                                                            | Description                                                 |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| addLambdaSubscription(fn)                                                       | Adds an AWS Lambda function as a topic subscription.        |
| addSubscription(subscription)                                                   | Adds a generic subscription to the topic.                   |
| static addSubscriptionFromStackTopic(scope, stackName, topicName, subscription) | Adds a generic subscription to the topic from StackManager. |

### addLambdaSubscription(fn)

```
public addLambdaSubscription(fn: IFunction): void
```

_Parameters_

- **fn** [IFunction][aws-cdk-lamdba-ifunction]

Adds an AWS Lambda function as a topic subscription.

### addSubscription(subscription)

```
public addSubscription(subscription: ITopicSubscription): void
```

_Parameters_

- **subscription** [ITopicSubscription][aws-cdk-sns-itopicsubscription]

Adds a generic subscription to the topic.

### static addSubscriptionFromStackTopic(scope, stackName, topicName, subscription)

```
public static addSubscriptionFromStackTopic(scope: Construct, stackName: string, topicName: string, subscription: ITopicSubscription): void
```

_Parameters_

- **scope** [Construct][aws-cdk-construct]
- **stackName** string
- **topicName** string
- **subscription** [ITopicSubscription][aws-cdk-sns-itopicsubscription]

Adds a generic subscription to the topic from StackManager.

## IAM Least privilege

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:AddPermission",
        "lambda:RemovePermission",
        "sns:CreateTopic",
        "sns:DeleteTopic",
        "sns:GetTopicAttributes",
        "sns:Subscribe",
        "sns:Unsubscribe",
        "ssm:DeleteParameter",
        "ssm:GetParameters",
        "ssm:PutParameter"
      ],
      "Resource": "*"
    }
  ]
}
```

## Development

### Prerequisites

- [EditorConfig][editorconfig] (Optional)
- [Git][git]
- [Node.js][nodejs] 17

### Setup

```sh
cd sns-jsii-component
npm install
```

[aws-cdk]: https://aws.amazon.com/cdk
[aws-cdk-construct]: https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html
[aws-cdk-lamdba-ifunction]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.IFunction.html
[aws-cdk-sns-itopicsubscription]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sns.ITopicSubscription.html
[aws-cdk-sns-topic]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sns.Topic.html
[badge-aws-cdk]: https://img.shields.io/github/package-json/dependency-version/stack-spot/sns-jsii-component/dev/aws-cdk-lib
[badge-jsii]: https://img.shields.io/github/package-json/dependency-version/stack-spot/sns-jsii-component/dev/jsii
[badge-license]: https://img.shields.io/github/license/stack-spot/sns-jsii-component
[badge-npm-downloads]: https://img.shields.io/npm/dt/@stackspot/cdk-sns?label=downloads%20%28npm%29
[badge-npm-version]: https://img.shields.io/npm/v/@stackspot/cdk-sns
[badge-nuget-downloads]: https://img.shields.io/nuget/dt/StackSpot.Cdk.Sns?label=downloads%20%28NuGet%29
[badge-nuget-version]: https://img.shields.io/nuget/vpre/StackSpot.Cdk.Sns
[editorconfig]: https://editorconfig.org/
[git]: https://git-scm.com/downloads
[jsii]: https://aws.github.io/jsii
[license]: https://github.com/stack-spot/sns-jsii-component/blob/main/LICENSE
[nodejs]: https://nodejs.org/download
[npm-package]: https://www.npmjs.com/package/@stackspot/cdk-sns
[nuget-package]: https://www.nuget.org/packages/StackSpot.Cdk.Sns
