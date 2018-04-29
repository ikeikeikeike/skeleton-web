import {RecorderImpl, Recorder} from './recorder'
declare const process: {
  env: {
    NODE_ENV: string,
    ENDPOINT: string,
  }
}

let rec: Recorder
const defId = 1

 // ENTRY POINT
export const Track = {
  // Woker Variable
  env: {
    endpoint: `${process.env.ENDPOINT || '/'}` // TODO: Ask some of them that this variable is editable
  },
  // record launches audio recorder
  record: async (userId: number) => {
    rec = new RecorderImpl(`${userId || defId}`, Track.env)
    if (await rec.auth()) rec.play()
  },
  // play audio if play stop
  play: async () => {
    rec.play()
  },
  // stop audio if play audio
  stop: async () => {
    rec.stop()
  }
}
