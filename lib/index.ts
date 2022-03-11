import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import * as core from '@stackspot/cdk-core';
import { Stack } from 'aws-cdk-lib';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

export interface SnsCreateTopicProps {
  readonly displayName?: string;
  readonly topicName: string;
}
export class Sns extends Construct {
  public readonly topic: sns.Topic;

  constructor(scope: Construct, id: string, props:SnsCreateTopicProps) {
    super(scope, id);

    this.topic = new sns.Topic(this, 'topic-'.concat(props.topicName), {
      displayName: props.displayName,
      fifo: false,
      topicName: props.topicName,
    });

    core.StackManager.saveResource(
      scope,
      {
        arn: this.topic.topicArn,
        name: props.topicName,
        stackName: Stack.of(scope).stackName,
      },
    );
  }

  public addLambdaSubscription(fn:IFunction){
    this.topic.addSubscription(new LambdaSubscription(fn));
  }
  
  public addSubscription(subscription:sns.ITopicSubscription) {
    this.topic.addSubscription(subscription);
  }

  public static addSubscriptionFromStackTopic(
    scope: Construct,
    stackName: string,
    topicName: string,
    subscription: sns.ITopicSubscription,
  ) {
    const topicArn = core.StackManager.getResourceArn(scope, stackName, topicName);

    const topic = sns.Topic.fromTopicArn(scope, 'topicArn-'.concat(topicName), topicArn);
    topic.addSubscription(subscription);
  }
}
