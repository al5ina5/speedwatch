import classNames from "classnames"
import dayjs from "dayjs"
import { useState } from "react"
import useSWR from "swr"
import Modal from "./Modal"

export default function Table() {
    const { data: unsortedData } = useSWR('/api/data')
    const tests = unsortedData && unsortedData.tests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    const latest = tests && tests[0]


    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)

    return <>
        <Modal visible={modal} onClose={() => setModal(false)}>
            <div className="space-y-4">
                <p className="text-3xl">Report</p>
                <pre className="bg-white bg-opacity-10 rounded p-6 overflow-auto">{JSON.stringify(modal, null, 4)}</pre>
            </div>
        </Modal>
        <div className="space-y-4 overflow-auto whitespace-nowrap">
            <table className="w-full text-left">
                <tr>
                    <th className="p-2">Download</th>
                    <th className="p-2">Upload</th>
                    <th className="p-2">Ping</th>
                    <th className="p-2">Timestamp</th>
                    <th className="p-2">More</th>
                </tr>
                {tests.slice(0, open ? 200 : 15).map((test, index) => {
                    return <tr className={classNames(index % 2 === 0 && "bg-white bg-opacity-10")}>
                        <td className="p-2">{(test.download.bandwidth / 125000).toFixed(2)} mbps</td>
                        <td className="p-2">{(test.upload.bandwidth / 125000).toFixed(2)} mbps</td>
                        <td className="p-2">{test.ping.latency.toFixed(2)} ms</td>
                        <td className="p-2">{dayjs(test.timestamp).fromNow()} <span className="opacity-50">({test.timestamp})</span></td>
                        <td className="p-2">
                            <a className="underline hover:no-underline" href={test.result.url} target="_blank">speedtest.net</a>&nbsp;<button className="underline hover:no-underline" onClick={() => setModal(test)}>full report</button>
                        </td>
                    </tr>
                })}
            </table>
            <button onClick={() => setOpen(_ => !_)} className="underline lowercase hover:no-underline text-xl">Show {open ? "Less" : "More"}</button>
        </div></>
}