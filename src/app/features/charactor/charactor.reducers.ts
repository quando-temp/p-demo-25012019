import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers/state';
import { CharacterActions } from './charactor.actions';
import { CharacterModel } from 'app/models';
// import { API } from 'app/utils/api';

const initialState: RootState.PageState = [
  {
    id: 111,
    age: 29,
    name: 'Vix Nguyen',
    comment: 'Senior Software Engineer'
  }
];

export const characterReducer = handleActions<RootState.PageState, CharacterModel>(
  {
    [CharacterActions.Type.CHARACTER_LIST]: (state, action: any) => {
      return [...state, ...action.payload];
    },
    [CharacterActions.Type.CHARACTER_NEW]: (state, action) => {
      if (action.payload && action.payload.name) {
        return [
          {
            id: state.reduce((max: any, todo: any) => Math.max(todo.id || 1, max), 0) + 1,
            age: action.payload.age,
            name: action.payload.name,
            comment: action.payload.comment
          },
          ...state
        ];
      }
      return state;
    },
    [CharacterActions.Type.CHARACTER_UPDATE]: (state, action) => {
      return state.map((item) => {
        if (!item || !action || !action.payload) {
          return item;
        }
        return (item.id || 0) === action.payload ? { ...item, age: ++item.age } : item;
      });
    },
    [CharacterActions.Type.CHARACTER_DELETE]: (state, action) => {
      return state.filter((item: CharacterModel) => item.id !== (action.payload as any));
    }
  },
  initialState
);
