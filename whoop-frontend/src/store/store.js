import { configureStore } from "@reduxjs/toolkit"
import { AuthSlice } from "./authSlice";
import { DailyJournalSlice } from "./dailyjournalSlice";
import { EverydaysSlice } from "./everydaysSlice";
import { GoalsSlice } from "./goalsSlice";
import { JournalEntrySlice } from "./journalentrySlice";
import { TomorrowTodosSlice } from "./tmtodosSlice";
import { TodosSlice } from './todosSlice';
import { WhoopSlice } from "./whoopSlice";

const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer,
        Everydays: EverydaysSlice.reducer,
        Todos: TodosSlice.reducer,
        TomorrowTodos: TomorrowTodosSlice.reducer,
        Whoop: WhoopSlice.reducer,
        DailyJournal: DailyJournalSlice.reducer,
        JournalEntry: JournalEntrySlice.reducer,
        Goals: GoalsSlice.reducer
    }
})

export default store;