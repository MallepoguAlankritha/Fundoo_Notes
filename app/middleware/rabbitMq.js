const amqplib = require("amqplib/callback_api");
const { logger } = require("../../logger/logger");

class RabitMqServer {
    sender = (data, queue) => {
        amqplib.connect("amqp://localhost", (error, connection) => {
        if (error) {
          throw error;
        } else {
          connection.createChannel((error, channel) => {
            if (error) {
              logger.error(error)
            } else {
              const str = JSON.stringify(data);
              channel.assertQueue(queue);
              channel.sendToQueue(queue, Buffer.from(str));
            }
          });
        }
      });
    };

    receiver = (queue) => {
      return new Promise((resolve, reject) => {
        amqplib.connect("amqp://localhost", (error, connection) => {
          if (error) {
              console.log("sudh",error);
            throw error;
          } else {
            connection.createChannel((error, channel) => {
              if (error) {
                  console.log("wsud",error);
                reject(error);
              } else {
                  console.log("jwhd",channel);
                channel.assertQueue(queue);
                channel.consume(queue, (msg) => {
                  resolve(msg.content.toString());
                });
              }
            });
          }
        });
      });
    };
}
module.exports = new RabitMqServer();