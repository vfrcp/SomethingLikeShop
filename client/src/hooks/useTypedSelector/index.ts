import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IStore } from "../../store/reducers/types";

export const useTypedSelector: TypedUseSelectorHook<IStore> = useSelector