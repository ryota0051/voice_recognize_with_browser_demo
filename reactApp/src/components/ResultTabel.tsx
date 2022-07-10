const ResultTable = ({ resultMsgArr }: { resultMsgArr: string[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>認識結果</th>
        </tr>
      </thead>
      <tbody>
        {resultMsgArr.map((resultMsg, index) => {
          if (resultMsg) {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{resultMsg}</td>
              </tr>
            )
          } else return <></>
        })}
      </tbody>
    </table>
  )
}

export default ResultTable
