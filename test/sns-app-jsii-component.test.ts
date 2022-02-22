// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as sns from '../lib/index';

test('SNS topic created', () => {
  // const app = new cdk.App();
  // const stack = new cdk.Stack(app, 'TestStack');
  // const component = new sns.SnsAppJsiiComponent(stack, 'SNS');
  // component.createTopic({
  //  displayName: 'topic', fifo: false, contentBasedDeduplication: false, topicName: 'topicName',
  // });
  // const template = Template.fromStack(stack);

  // template.hasResource('AWS::SNS::Topic', {});
});

// test('SNS subscription created', () => {
//  const app = new cdk.App();
//  const stack = new cdk.Stack(app, 'TestStack');
//  const component = new sns.SnsAppJsiiComponent(stack, 'SNS');
//  component.createTopic({
//    displayName: 'topic', fifo: false, contentBasedDeduplication: false, topicName: 'topicName',
//  });
//  component.subscription('arn:aws:sns:us-east-1:123456789012:aws-sns-TestTopic', cdk.aws_sns.SubscriptionProtocol.HTTPS, 'https://www.example.com');
//  const template = Template.fromStack(stack);
//
//  template.hasResource('AWS::SNS::Subscription', {});
// });
