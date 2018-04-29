import {RecorderImpl, Recorder} from './recorder'
declare const process: {
  env: {
    NODE_ENV: string,
    ENDPOINT: string,
  }
}

let rec: Recorder

const defId = 1
const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
  console.debug(event.data)

  switch(event.data.cmd) {
    case 'launch': {
      launch(event)
      break
    }
    case 'play': {
      play(event)
      break
    }
    case 'stop': {
      play(event)
      break
    }
    default: {
      console.error('WORKER: undefined cmd')
    }
  }
})

const launch = async (event) => {
  const userId = `${event.data.userId || defId}`

  rec = new RecorderImpl(userId, event.data.env)
  if (await rec.auth()) rec.play()
}

const play = async (event) => {
  rec.play()
}

const stop = async (event) => {
  rec.stop()
}

// Post data to parent thread
// ctx.postMessage({ foo: "foo" });
