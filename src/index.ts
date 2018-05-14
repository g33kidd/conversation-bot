import * as CleverBot from 'cleverbot.io';
import * as Discord from 'discord.js';

class Bot {
  respondsTo: string;
  client: Discord.Client;
  cleverClient: any;
  nick: string;
  startsFirst: boolean;

  constructor(token: string, nick: string, respond: string, first: boolean = false) {
    this.client = new Discord.Client();
    this.respondsTo = respond;
    this.nick = nick;
    this.startsFirst = first;

    this.cleverClient = new CleverBot(
      "--",
      "--"
    );

    this.cleverClient.setNick(nick);

    this.client.on('message', this.onMessage.bind(this));
    this.client.on('ready', () => {
      console.log(`Bot ${this.nick}`);
    })

    this.cleverClient.create((err, session) => {
      this.client.login(token);
    });
  }

  async onMessage(message: Discord.Message) {
    if (message.channel.id == "445588982768861184") {
      if (message.content.startsWith('++start')) {
        if (this.startsFirst) {
          await message.channel.send("Hello!");
        }
      }

      if (message.author.bot && message.author.id == this.respondsTo) {
        await message.channel.startTyping();
        const response = await this.ask(message.content);
        await message.channel.send(response);
        await message.channel.stopTyping();
      }
    }
  }

  ask(query: string): Promise<string> {
    return new Promise(resolve => {
      this.cleverClient.ask(query, (err, res) => {
        resolve(res);
      });
    });
  }
}

const botOne = new Bot(
  "--.DdsoWw.TtAYDxCHFHrcIfSTpNk7UtgCpjk",
  "conversationbot-bot-1",
  "346466291739131905",
  true
);

const botTwo = new Bot(
  "--.Ddsoeg.n3AYsREpWDuLA3yT1H9H1IIde9o",
  "conversationbot-bot-2",
  "340494303887360010"
);