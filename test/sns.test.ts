import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { UrlSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Sns } from '../lib/index';

describe('Sns', () => {
  test('create topic', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Sns(stack, 'TestSns', {
      displayName: 'test-display-name-topic',
      topicName: 'test-topic',
    });
    const template = Template.fromStack(stack);

    template.hasResource('AWS::SNS::Topic', {});
  });

  test('create topic with right display name', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Sns(stack, 'TestSns', {
      displayName: 'test-display-name-topic',
      topicName: 'test-topic',
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::SNS::Topic', {
      DisplayName: 'test-display-name-topic',
    });
  });

  test('create topic with right topic name', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Sns(stack, 'TestSns', {
      displayName: 'test-display-name-topic',
      topicName: 'test-topic',
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::SNS::Topic', {
      TopicName: 'test-topic',
    });
  });

  test('save topic arn with stack manager', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Sns(stack, 'MySns', {
      displayName: 'test-display-name-topic',
      topicName: 'test-topic',
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: '/stackspot/TestStack/test-topic',
      Type: 'String',
    });
  });

  test('can add a lambda subscription to topic', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const sns = new Sns(stack, 'TestSns', {
      displayName: 'test-display-name-topic',
      topicName: 'test-topic',
    });
    const fn = new Function(stack, 'TestFunction', {
      code: Code.fromInline(`exports.handler = async (event: any) => {
        JSON.stringify(event, null, 2);
      };`),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_14_X,
    });
    sns.addLambdaSubscription(fn);
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::SNS::Subscription', {
      Protocol: 'lambda',
    });
  });

  test('can add a subscription to topic', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const sns = new Sns(stack, 'TestSns', {
      displayName: 'test-display-name-topic',
      topicName: 'test-topic',
    });
    sns.addSubscription(new UrlSubscription('https://www.stackspot.com'));
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::SNS::Subscription', {
      Protocol: 'https',
      Endpoint: 'https://www.stackspot.com',
    });
  });

  test('can add a subscription to topic from stack manager', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    Sns.addSubscriptionFromStackTopic(
      stack,
      'TestStack',
      'test-topic',
      new UrlSubscription('https://docs.stackspot.com')
    );
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::SNS::Subscription', {
      Protocol: 'https',
      Endpoint: 'https://docs.stackspot.com',
    });
  });
});
