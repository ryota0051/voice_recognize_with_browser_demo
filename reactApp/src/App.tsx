import React, { useReducer } from "react"

import useInitializer from "./hooks/setInitialise"
import StartTranscribeButton from "./components/StartTranscribeButton"

function App() {
  const [, forceRender] = useReducer((boolean) => !boolean, false)
  const { micStream, setMicStrem, resultMsg, setResultMsg, isInitialized } =
    useInitializer()
  const switchTranscribe = () => {
    if (!micStream) {
      // マイクストリームが取得できていない場合
      return
    }
    if (micStream.isPaused()) {
      console.log("mic resume")
      micStream.resume()
    } else {
      console.log("mic puase")
      micStream.pause()
    }
    setMicStrem(micStream)
    forceRender()
  }
  return (
    <div>
      <StartTranscribeButton
        isInitialized={isInitialized}
        micStream={micStream}
        onClick={switchTranscribe}
      ></StartTranscribeButton>
      <div>{resultMsg}</div>
    </div>
  )
}

export default App
