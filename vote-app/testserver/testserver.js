import Hapi from 'hapi';

function start(port, voteDatabase) {
  const server = new Hapi.Server();
  server.connection(
    {
      port: port,
      routes: {
        // cors muss eingeschaltet werden, wenn die Client-Anwendung nicht über Hapi, sondern den Webpack Dev Server
        // ausgeliefert werden soll
        cors: true,
        json: {
          space: 2
        }
      }
    }
  );

  server.route({
    method:  'GET', //
    path:    '/api/votes', //
    handler: (request, reply) => {
      voteDatabase.getAllVotes((err, votes) => {
        const response = reply(votes);
        response.type('application/json');
      });
    }
  });
