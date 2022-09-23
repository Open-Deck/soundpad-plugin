import { PluginUUID, ActionUUID, IDeck, BasePlugin } from '@open-deck/tools';
import { ACTIONS } from './tokens';
import { log } from '../helpers';

@PluginUUID('plugin-uuid-here')
class PluginEntryFile extends BasePlugin {
  public ready = false;

  constructor(deck: IDeck) {
    log(`constructor called with deck: ${JSON.stringify(deck)}`);
    super();
  }

  init(): void {
    this.ready = true;
    log('init called');
  }

  @ActionUUID(ACTIONS.SAY_HELLO)
  async sayHello() {
    log('hello');
  }

  @ActionUUID(ACTIONS.SAY_HELLO_BY_NAME)
  async sayHelloByName(name: string) {
    log(`Hello ${name}, my friend!`);
  }
}

export { PluginEntryFile };
