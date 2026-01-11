import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"

export interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
}

const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  ({ className, isOpen, onClose, title, description, children, ...props }, forwardedRef) => {
    const internalRef = React.useRef<HTMLDialogElement>(null)
    const ref = (forwardedRef as React.RefObject<HTMLDialogElement>) || internalRef

    React.useEffect(() => {
      const dialog = ref.current
      if (!dialog) return

      if (isOpen) {
        if (!dialog.open) dialog.showModal()
      } else {
        if (dialog.open) dialog.close()
      }
    }, [isOpen, ref])

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === ref.current) {
        onClose()
      }
    }

    const handleBackdropKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    return (
      <dialog
        ref={ref}
        className={cn(
          "bg-transparent p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 open:duration-200 closed:animate-out closed:fade-out closed:zoom-out-95",
          className
        )}
        onClick={handleBackdropClick}
        onKeyDown={handleBackdropKeyDown}
        onClose={onClose}
        {...props}
      >
        <div className="fixed inset-0 z-50 flex items-stretch p-4 sm:p-6">
          <div 
            className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-card p-6 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {(title || description) && (
              <div className="mb-4 shrink-0">
                {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}
                {description && <p className="mt-1 text-sm text-foreground/60">{description}</p>}
              </div>
            )}
            <div className="text-foreground flex-1 flex flex-col">{children}</div>
            
            <div className="mt-6 flex justify-end gap-2 shrink-0">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    )
  }
)
Modal.displayName = "Modal"

export { Modal }
