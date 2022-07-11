import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"

const ResultTable = ({ resultMsgArr }: { resultMsgArr: string[] }) => {
  return (
    <TableContainer>
      <Table size="lg" variant="simple">
        <Thead>
          <Tr>
            <Th textAlign="center" w="100px">
              Id.
            </Th>
            <Th textAlign="center" w="900px">
              認識結果
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {resultMsgArr.map((resultMsg, index) => {
            if (resultMsg) {
              return (
                <Tr key={index + 1}>
                  <Td>{index + 1}.</Td>
                  <Td>{resultMsg}</Td>
                </Tr>
              )
            } else {
              return <></>
            }
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ResultTable
