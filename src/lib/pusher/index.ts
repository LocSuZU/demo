import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
  appId: '1727568',
  key: '7e94a0d8574daa4b2e5d',
  secret: 'a4d713936be78bd4c56a',
  cluster: 'ap1',
  useTLS: true,
});

export const pusherClient = new PusherClient(
  '7e94a0d8574daa4b2e5d',
  {
    channelAuthorization: {
      endpoint: '/api/pusher/auth',
      transport: 'ajax',
    },
    cluster: 'ap1'
  }
);
