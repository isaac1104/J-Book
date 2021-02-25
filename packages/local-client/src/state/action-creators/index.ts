import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  FetchCellsAction,
  FetchCellsCompleteAction,
  FetchCellsErrorAction,
  Direction,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import bundle from '../../bundler';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellAction => ({
  type: ActionType.UPDATE_CELL,
  payload: {
    id,
    content,
  },
});

export const deleteCell = (id: string): DeleteCellAction => ({
  type: ActionType.DELETE_CELL,
  payload: id,
});

export const moveCell = (id: string, direction: Direction): MoveCellAction => ({
  type: ActionType.MOVE_CELL,
  payload: {
    id,
    direction,
  },
});

export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => ({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id,
    type,
  },
});

export const createBundle = (cellId: string, input: string) => async (
  dispatch: Dispatch<Action>
) => {
  dispatch({
    type: ActionType.BUNDLE_START,
    payload: { cellId },
  });
  const { code, err } = await bundle(input);
  dispatch({
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      cellId,
      bundle: { code, err },
    },
  });
};

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch<FetchCellsAction>({ type: ActionType.FETCH_CELLS });
  try {
    const { data }: { data: Cell[] } = await axios.get('/cells');
    dispatch<FetchCellsCompleteAction>({
      type: ActionType.FETCH_CELLS_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch<FetchCellsErrorAction>({
      type: ActionType.FETCH_CELLS_ERROR,
      payload: err.message,
    });
  }
};

export const saveCells = () => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  const {
    cells: { data, order },
  } = getState();

  const cells = order.map(id => data[id]);

  try {
    await axios.post('/cells', { cells });
  } catch (err) {
    dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: err.message });
  }
};
