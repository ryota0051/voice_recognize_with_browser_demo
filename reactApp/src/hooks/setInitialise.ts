import { useEffect, useMemo, useState } from "react"
import { Duplex, DuplexOptions } from "readable-stream"
import MicrophoneStream from "microphone-stream"
import {
  RecognizerMessage,
  ServerMessageResult,
} from "vosk-browser/dist/interfaces"
import { createModel, KaldiRecognizer } from "vosk-browser"
import Setting from "../enviroment/setting"

class AudioStreamer extends Duplex {
  constructor(public recognizer: KaldiRecognizer, options?: DuplexOptions) {
    super(options)
  }

  public _write(chunk: AudioBuffer, _encoding: any, callback: any) {
    const buffer = chunk.getChannelData(0)
    if (this.recognizer && buffer.byteLength > 0) {
      this.recognizer.acceptWaveform(chunk)
    }
    callback()
  }
}

const useInitializer = () => {
  const [recognizer, setRecgnizer] = useState<KaldiRecognizer>()
  const [micStream, setMicStrem] = useState<MicrophoneStream>()
  const [resultMsg, setResultMsg] = useState<string>("")
  const [isInitialized, setIsInitialized] = useState<Boolean>(false)

  const audioStreamer = useMemo(() => {
    if (!recognizer) {
      return null
    }
    const audioStreamer = new AudioStreamer(recognizer, {
      objectMode: true,
    })
    return audioStreamer
  }, [recognizer])
  useEffect(() => {
    const loadVosk = async () => {
      const model = await createModel("model.tar.gz")
      const recognizer = new model.KaldiRecognizer(Setting.SAMPLE_RATE)
      recognizer.on("result", (message: RecognizerMessage) => {
        const res = message as ServerMessageResult
        if (res.result && res.result.text) {
          console.log(res.result.text)
          setResultMsg(res.result.text)
        }
      })
      recognizer.on("partialresult", (message: any) => {
        // console.log(message.result)
      })
      setRecgnizer(recognizer)
    }
    loadVosk()
  }, [])
  useEffect(() => {
    if (!audioStreamer) {
      return
    }
    if (micStream) {
      // マイクストリームがすでにある場合は初期化しておく。
      micStream.unpipe()
      micStream.stop()
      micStream.destroy()
    }
    const createRecorder = async () => {
      if (!recognizer) {
        return
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      })
      try {
        const micStream = new MicrophoneStream({
          objectMode: true,
          bufferSize: 1024,
        })
        if (mediaStream) {
          micStream.setStream(mediaStream)
          micStream.pipe(audioStreamer)
          micStream.pause()
        }
        setMicStrem(micStream)
        setIsInitialized(true)
      } catch (exception) {
        console.error(exception)
      }
    }
    createRecorder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioStreamer, recognizer])
  return { micStream, setMicStrem, resultMsg, setResultMsg, isInitialized }
}

export default useInitializer
