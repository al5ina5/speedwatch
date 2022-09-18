import classNames from "classnames"
import dayjs from "dayjs"
import { useState } from "react"
import useSWR from "swr"

export default function Table() {
    const { data: unsortedData } = useSWR('/api/data')
    const tests = unsortedData && unsortedData.tests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    const latest = tests && tests[0]


    const [open, setOpen] = useState(false)

    return <div className="space-y-4 overflow-auto whitespace-nowrap">
        <table className="w-full text-left">
            <tr>
                <th className="p-2">Upload</th>
                <th>Download</th>
                <th>Ping</th>
                <th>Timestamp</th>
                <th>More</th>
            </tr>
            {tests.slice(0, open ? 200 : 15).map((test, index) => {
                return <tr className={classNames(index % 2 === 0 && "bg-white bg-opacity-10")}>
                    <td className="p-2">{(test.download.bandwidth / 125000).toFixed(2)} mbps</td>
                    <td>{(test.upload.bandwidth / 125000).toFixed(2)} mbps</td>
                    <td>{test.ping.latency.toFixed(2)} ms</td>
                    <td>{dayjs(test.timestamp).fromNow()} <span className="opacity-50">({test.timestamp})</span></td>
                    <td>
                        <a className="underline hover:no-underline" href={test.result.url} target="_blank">speedtest.net</a>
                    </td>
                </tr>
            })}
        </table>
        <button onClick={() => setOpen(_ => !_)} className="underline lowercase hover:no-underline text-xl">Show {open ? "Less" : "More"}</button>
    </div>
}