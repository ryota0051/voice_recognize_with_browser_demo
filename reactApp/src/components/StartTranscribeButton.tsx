import { Button } from "@chakra-ui/react"

import MicrophoneStream from "microphone-stream"

const StartTranscribeButton = ({
  micStream,
  onClick,
}: {
  micStream: MicrophoneStream
  onClick: () => void
}) => {
  if (micStream.isPaused()) {
    const text = "音声認識開始"
    return (
      <Button onClick={onClick} colorScheme="teal">
        {text}
      </Button>
    )
  } else {
    const text = "音声認識停止"
    return (
      <Button onClick={onClick} colorScheme="teal">
        {text}
      </Button>
    )
  }
}

export default StartTranscribeButton
