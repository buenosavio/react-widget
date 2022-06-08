import { CloseButton } from '../CloseButton'

import bugImageUrl from '../../assets/Figmoji/bug.svg'
import ideaImageUrl from '../../assets/Figmoji/idea.svg'
import throughtImageUrl from '../../assets/Figmoji/thought.svg'
import { useState } from 'react'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSucessStep } from './Steps/FeedbackSucessStep'

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto, representando um problema no sistema.'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lampada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: throughtImageUrl,
      alt: 'Imagem de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const handleRestartFeedback = () => {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ?         
       <FeedbackSucessStep onFeedbackRestartFeedback={handleRestartFeedback}/>
       :
       <>
       {!feedbackType ? (
          <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
        ) : (
          <FeedbackContentStep feedbackType={feedbackType} onFeedbackRestartRequested={handleRestartFeedback} onFeedbackSent={() => setFeedbackSent(true)}/>
        )}
       </>
      }      

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{' '}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  )
}
