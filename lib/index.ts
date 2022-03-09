import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export interface SnsCreateTopicProps {
  readonly displayName?: string;
  readonly topicName: string;
}
export class SnsAppJsiiComponent extends Construct {
  constructor(scope: Construct, id: string, props:SnsCreateTopicProps) {
    super(scope, id);
    new sns.Topic(this, 'topic-'.concat(props.topicName), {
      displayName: props.displayName,
      fifo: false,
      topicName: props.topicName,
    });
  }

  public static addSubscription(scope: Construct, topicArn: string, fn:lambda.IFunction): void {
    const topic = sns.Topic.fromTopicArn(scope, 'topic-'.concat(topicArn.split(':').slice(-1)[0]), topicArn);
    topic.addSubscription(new subs.LambdaSubscription(fn));
  }
}
