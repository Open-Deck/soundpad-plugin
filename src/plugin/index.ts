import { join } from 'path';
import {
  PluginUUID,
  ActionUUID,
  IDeck,
  BasePlugin,
  StringDecoderAdapter,
  NetCreateSocketConnectionAdapter,
  ICreateSocketConnection
} from '@open-deck/tools';
import { ACTIONS } from './tokens';
import { log } from '../helpers';

@PluginUUID('696de65d-4411-4384-8cb1-3855897b6771')
class PluginEntryFile extends BasePlugin {
  private connectionPath = join('\\\\.\\pipe', 'sp_remote_control');
  private readonly socketAdapter: ICreateSocketConnection;
  public ready = false;

  constructor(deck: IDeck) {
    super();
    const stringDecoderAdapter = new StringDecoderAdapter();
    this.socketAdapter = new NetCreateSocketConnectionAdapter(stringDecoderAdapter);
  }

  init(): void {
    this.socketAdapter.create(this.connectionPath);

    this.socketAdapter.on('ready', () => {
      log('Connected, soundpad is ready!');
      this.ready = true;
    });

    const closeConnectionEvents = ['timeout', 'close', 'error'];
    closeConnectionEvents.forEach((eventName) => {
      this.socketAdapter.on(eventName, () => {
        log(`ERROR: dispatched ${eventName}`);
        this.ready = false;
      });
    });
  }

  private handleError(error: Error) {
    console.error('ERROR:', error);
  }

  @ActionUUID(ACTIONS.PLAY_SOUND_BY_INDEX)
  async handlePlaySoundByIndex(index: number) {
    log(`Play sound by index: ${index}`);
    return this.socketAdapter.writeAsync(`DoPlaySound(${index})`).catch(this.handleError);
  }

  @ActionUUID(ACTIONS.STOP_SOUND)
  handleStopSound(): void {
    log('Stop sound now!');
    this.socketAdapter.writeSync('DoStopSound()', this.handleError);
  }
}

export { PluginEntryFile };
