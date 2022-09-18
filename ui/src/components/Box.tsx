
import classNames from 'classnames'
export default function Box({ title, children, titleClassName }) {
    return <div className="rounded bg-white bg-opacity-10 p-6 space-y-6 shadow">
        <p className={classNames("text-center font-medium text-3xl", titleClassName)}>{title}</p>
        <div>{children}</div>
    </div>
}