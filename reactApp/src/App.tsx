import React, { useReducer } from "react"

import useInitializer from "./hooks/setInitialise"
import StartTranscribeButton from "./components/StartTranscribeButton"
import ResultTable from "./components/ResultTabel"
import Header from "./components/Header"
import { Box, VStack, Text } from "@chakra-ui/react"

function App() {
  const [, forceRender] = useReducer((boolean) => !boolean, false)
  const { micStream, setMicStrem, resultMsgArr, isInitialized } =
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
  const notReady = !isInitialized || !micStream
  return (
    <>
      <Header title="Voice Transcribe" />
      <VStack>
        {notReady ? (
          <Box p={5}>
            <Text fontWeight="bold">初期化中</Text>
          </Box>
        ) : (
          <>
            <Box p={5}>
              <StartTranscribeButton
                micStream={micStream}
                onClick={switchTranscribe}
              ></StartTranscribeButton>
            </Box>
            <Box>
              <ResultTable resultMsgArr={resultMsgArr}></ResultTable>
            </Box>
          </>
        )}
      </VStack>
    </>
  )
}

export default App
