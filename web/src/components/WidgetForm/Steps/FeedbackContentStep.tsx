import { ArrowLeft, Camera } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypes } from '..'
import { api } from '../../../lib/api'
import { CloseButton } from '../../CloseButton'
import { Loading } from '../../Loading'
import { ScreenshotButton } from '../ScreenshotButton'

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}

export const FeedbackContentStep = ({
  feedbackType,
  onFeedbackRestartRequested, 
  onFeedbackSent
}: FeedbackContentStepProps) => {

  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState<string | null>(null)
  const [loadingFeedback, setLoadingFeedback] = useState<boolean>(false)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const handleSubmitFeedback = (event: FormEvent) => {
    setLoadingFeedback(true)
    event.preventDefault()
    onFeedbackSent()
    try {
      api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot
      })  
    } catch (error) {
      alert('error')
    }
    
  }

  return (
    <>
      <header>
        <button
          onClick={onFeedbackRestartRequested}
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          <p>{feedbackTypeInfo.title}</p>
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className='my-4 w-full'>
        <div className="my-4 w-full">
          <textarea
            className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus: outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
            placeholder="Conte com detalhes o que está acontecendo..."
            onChange={e => setComment(e.target.value)}
          />
          <footer className='flex gap-2 mt-2'>
            <ScreenshotButton onScreenshotTook={setScreenshot} screenshot={screenshot}/>          
            <button 
              type='submit' 
              disabled={comment?.length==0 || comment==null || loadingFeedback}
              className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'>
            { loadingFeedback ? <Loading/> : 'Enviar feedback'}
            </button>
          </footer>
        </div>
      </form>
    </>
  )
}
