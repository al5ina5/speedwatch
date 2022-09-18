import classNames from 'classnames'
import Portal from './Portal'

export default function Modal({ visible, onClose, children, }) {
    return (
        <Portal>
            {visible && (
                <div
                    className="fixed z-40 inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-75 p-6"
                    onClick={() => onClose()}
                >
                    <div
                        className={classNames('max-w-2xl max-h-full overflow-auto w-full p-6 shadow bg-zinc-900 rounded')}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            )}
        </Portal>
    )
}
