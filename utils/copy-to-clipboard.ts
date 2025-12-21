'use client'

import toast from 'react-hot-toast'

interface CopyToClipboardResult {
    copyToClipboard: (text: string) => Promise<void>
}

export const useCopyToClipboard = (): CopyToClipboardResult => {
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            toast.success('کد تخفیف کپی شد')
        } catch (error) {
            toast.error('کد تخفیف کپی نشد')
        }
    }

    return { copyToClipboard }
}
