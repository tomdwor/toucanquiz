import { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { QuizSession, SessionAnswer } from '../types/session'

type SessionAction =
  | { type: 'START_SESSION'; payload: QuizSession }
  | { type: 'SUBMIT_ANSWER'; payload: { question_id: string; answer: SessionAnswer } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'RESET_SESSION' }

function sessionReducer(state: QuizSession | null, action: SessionAction): QuizSession | null {
  switch (action.type) {
    case 'START_SESSION':
      return action.payload

    case 'SUBMIT_ANSWER': {
      if (!state) return state
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.question_id]: action.payload.answer,
        },
      }
    }

    case 'NEXT_QUESTION': {
      if (!state) return state
      return {
        ...state,
        current_index: state.current_index + 1,
      }
    }

    case 'COMPLETE_SESSION': {
      if (!state) return state
      return {
        ...state,
        status: 'reviewing',
        completed_at: Date.now(),
      }
    }

    case 'RESET_SESSION':
      return null

    default:
      return state
  }
}

interface SessionContextValue {
  session: QuizSession | null
  dispatch: React.Dispatch<SessionAction>
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, dispatch] = useReducer(sessionReducer, null)
  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
