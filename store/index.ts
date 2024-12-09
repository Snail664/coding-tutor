import { configureStore } from '@reduxjs/toolkit'
import CodeReducer from '@/slices/CodeSlice'
import QuestionReducer from '@/slices/QuestionSlice'
import AssistantReducer from '@/slices/AssistantSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    code: CodeReducer,
    question: QuestionReducer,
    assistant: AssistantReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;