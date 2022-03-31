import { Stack } from 'aws-cdk-lib';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { ITopicSubscription, Topic } from 'aws-cdk-lib/aws-sns';
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { StackManager } from '@stackspot/cdk-core';

/**
 * Sns construct props.
 */
export interface SnsCreateTopicProps {
  /**
   * A developer-defined string that can be used to identify this SNS topic.
   */
  readonly displayName: string;

  /**
   * A name for the topic.
   */
  readonly topicName: string;
}

/**
 * Component to manage Amazon Simple Notification Service.
 */
export class Sns extends Construct {
  /**
   * The topic that was created.
   */
  public readonly topic: Topic;

  /**
   * Creates a new instance of class Sns.
   *
   * @param {Construct} scope The construct within which this construct is defined.
   * @param {string} id Identifier to be used in AWS CloudFormation.
   * @param {SnsCreateTopicProps} [props={}] Parameters of the class Sns.
   * @see {@link https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs_init|AWS CDK Constructs}
   */
  constructor(scope: Construct, id: string, props: SnsCreateTopicProps) {
    super(scope, id);

    this.topic = new Topic(this, `topic-${props.topicName}`, {
      displayName: props.displayName,
      fifo: false,
      topicName: props.topicName,
    });

    StackManager.saveResource(scope, {
      arn: this.topic.topicArn,
      name: props.topicName,
      stackName: Stack.of(scope).stackName,
    });
  }

  /**
   * Adds an AWS Lambda function as a topic subscription.
   *
   * @param {IFunction} fn AWS Lambda function to be added as a subscription to the topic.
   */
  public addLambdaSubscription(fn: IFunction): void {
    this.topic.addSubscription(new LambdaSubscription(fn));
  }

  /**
   * Adds a generic subscription to the topic.
   *
   * @param {ITopicSubscription} subscription Subscription to be added to the topic.
   */
  public addSubscription(subscription: ITopicSubscription): void {
    this.topic.addSubscription(subscription);
  }

  /**
   * Adds a generic subscription to the topic from StackManager.
   *
   * @param {Construct} scope The construct within which this construct is defined.
   * @param {string} stackName The name of the stack.
   * @param {string} topicName The name of the topic.
   * @param {ITopicSubscription} subscription The subscription to be added.
   */
  public static addSubscriptionFromStackTopic(
    scope: Construct,
    stackName: string,
    topicName: string,
    subscription: ITopicSubscription
  ): void {
    const topicArn = StackManager.getResourceArn(scope, stackName, topicName);

    const topic = Topic.fromTopicArn(scope, `topicArn-${topicName}`, topicArn);

    topic.addSubscription(subscription);
  }
}
