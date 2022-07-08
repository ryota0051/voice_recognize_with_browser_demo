import MicrophoneStream from "microphone-stream"

const StartTranscribeButton = ({
  isInitialized,
  micStream,
  onClick,
}: {
  isInitialized: Boolean
  micStream: MicrophoneStream | undefined
  onClick: () => void
}) => {
  if (!isInitialized || !micStream) {
    return <div>初期化中</div>
  }
  if (micStream.isPaused()) {
    const text = "音声認識開始"
    return <button onClick={onClick}>{text}</button>
  } else {
    const text = "音声認識停止"
    return <button onClick={onClick}>{text}</button>
  }
}

export default StartTranscribeButton
