'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { IoClose } from 'react-icons/io5'
import { cn } from '@/utils/cn'

// Hook to detect mobile/desktop based on media query
const useMediaQuery = (query: string) => {
    const [matches, setMatches] = React.useState(false)

    React.useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }
        const listener = () => setMatches(media.matches)
        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [matches, query])

    return matches
}

// Dialog Components
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[90] bg-black/80',
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showClose?: boolean
}

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
    ({ className, children, showClose = true, ...props }, ref) => (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(
                    'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-[100] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
                    className
                )}
                {...props}
            >
                {children}
                {showClose && (
                    <DialogPrimitive.Close className='ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute left-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none'>
                        <IoClose size={20} />
                        <span className='sr-only'>Close</span>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPortal>
    )
)
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col text-center sm:text-left', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// Mobile Drawer Components (using Dialog with drawer-like styling)
const DrawerTrigger = DialogTrigger

const DrawerContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { showClose?: boolean }
>(({ className, children, showClose = false, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom fixed bottom-0 left-0 right-0 z-[100] flex h-auto max-h-[85vh] w-full flex-col rounded-t-[20px] border shadow-lg duration-200',
                className
            )}
            {...props}
        >
            <div className='bg-muted absolute left-0 right-0 top-0 mx-auto mt-3 h-1.5 w-[100px] rounded-full' />
            {children}
            {showClose && (
                <DialogPrimitive.Close className='ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none'>
                    <IoClose className='h-4 w-4' />
                    <span className='sr-only'>Close</span>
                </DialogPrimitive.Close>
            )}
        </DialogPrimitive.Content>
    </DialogPortal>
))
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('text-center sm:text-right', className)} {...props} />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = DialogTitle
const DrawerDescription = DialogDescription

// Responsive Modal Components
type ResponsiveModalProps = {
    children: React.ReactNode
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ResponsiveModal({ children, open, onOpenChange }: ResponsiveModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog>
    )
}

type ResponsiveModalTriggerProps = React.ComponentPropsWithoutRef<typeof DialogTrigger>

export function ResponsiveModalTrigger({ ...props }: ResponsiveModalTriggerProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return <DialogTrigger {...props} />
    }

    return <DrawerTrigger {...props} />
}

type ResponsiveModalContentProps = React.ComponentPropsWithoutRef<typeof DialogContent>

export function ResponsiveModalContent({ children, className, ...props }: ResponsiveModalContentProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return (
            <DialogContent className={className} {...props}>
                {children}
            </DialogContent>
        )
    }

    return (
        <DrawerContent className={cn('bg-white p-4 pt-10', className)} {...props}>
            {children}
        </DrawerContent>
    )
}

type ResponsiveModalHeaderProps = React.HTMLAttributes<HTMLDivElement>

export function ResponsiveModalHeader({ ...props }: ResponsiveModalHeaderProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return <DialogHeader {...props} />
    }

    return <DrawerHeader {...props} className='flex flex-col items-start' />
}

type ResponsiveModalTitleProps = React.ComponentPropsWithoutRef<typeof DialogTitle>

export function ResponsiveModalTitle({ ...props }: ResponsiveModalTitleProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return <DialogTitle {...props} className='text-right text-base font-bold lg:text-lg' />
    }

    return <DrawerTitle {...props} />
}

type ResponsiveModalDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogDescription>

export function ResponsiveModalDescription({ ...props }: ResponsiveModalDescriptionProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return <DialogDescription {...props} className='text-right text-xs lg:text-sm' />
    }

    return <DrawerDescription {...props} />
}

type ResponsiveModalFooterProps = React.HTMLAttributes<HTMLDivElement>

export function ResponsiveModalFooter({ ...props }: ResponsiveModalFooterProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return <DialogFooter {...props} />
    }

    return <DrawerFooter {...props} />
}

type ResponsiveModalBodyProps = React.HTMLAttributes<HTMLDivElement>

export function ResponsiveModalBody({ className, ...props }: ResponsiveModalBodyProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return <div className={className} {...props} />
    }

    return <div className={className} {...props} />
}

export const ResponsiveModalClose = DialogClose
