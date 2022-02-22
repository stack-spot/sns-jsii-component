import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';

export interface SnsCreateTopicProps {
  readonly contentBasedDeduplication?: boolean;
  readonly displayName?: string;
  readonly fifo?: boolean;
  readonly topicName: string; 
}
export class SnsAppJsiiComponent extends Construct {

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  public createTopic(props:SnsCreateTopicProps) {
    new sns.Topic(this, 'Topic', {
      displayName: props.displayName,
      fifo: props.fifo,
      topicName: props.topicName,
      contentBasedDeduplication: props.contentBasedDeduplication
    });
  }

  public subscription(arn:string, protocol:sns.SubscriptionProtocol) {
    const topic = sns.Topic.fromTopicArn(this,'id', arn);

    new sns.Subscription(this, 'Subscription', {
      topic,
      endpoint: arn,
      protocol: protocol
    });
  }

}

