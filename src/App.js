import {List} from "./List";
import {useReducer} from "react";

const initialState = {
    items: ["initial"],
    inputText: "",
    editItemIndex: -1
}

function reducer(state, action) {
    switch (action.type) {
        case "edit-item-input-value-change":
            return {
                ...state,
                inputText: action.value
            }
        case "edit-item": {
            return {
                ...state,
                editItemIndex: action.editItemIndex,
                inputText: state.items[action.editItemIndex]
            }
        }
        case "save":
            if (state.editItemIndex === -1) {
                return {
                    ...state,
                    items: state.items.concat([state.inputText]),
                    inputText: ""
                }
            }
            state.items[state.editItemIndex] = state.inputText
            return {
                ...state,
                inputText: ""
            }
        case "cancel":
            return {
                ...state,
                editItemIndex: -1,
                inputText: ""
            }
        default:
            throw new Error()
    }
}

export default function App() {

    const [appState, appDispatch] = useReducer(reducer, initialState)

    return (
        <div>
            <EditItem
                value={appState.inputText}
                onChange={(e) => appDispatch({type: "edit-item-input-value-change", value: e.target.value})}
                onSave={() => appDispatch({type: "save"})}
                onCancel={() => appDispatch({type: "cancel"})}/>
            <List
                items={appState.items}
                ListItem={Item}
                listItemProp={(item, index) => (
                    {
                        key: item,
                        text: item,
                        onClick: () => appDispatch({type: "edit-item", editItemIndex: index})
                    }
                )}
                Divider={Divider}/>
        </div>
    );
}

function Item({text, onClick}) {
    return (
        <li onClick={onClick}>
            {text}
        </li>
    );
}

function Divider() {
    return (
        <li>
            <span>||||</span>
        </li>
    )
}

function EditItem({value, onChange, onSave, onCancel}) {
    return (
        <div>
            <input type="text" onChange={onChange} value={value}/>
            <button type="button" onClick={onSave}>Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </div>
    )
}


// won't work since react calculates/renders based on state
// export default class App extends Component {
//
//     constructor(props) {
//         super(props);
//
//         this.todoViewModel = new TodoViewModel()
//     }
//
//     addItem = (inputText) => {
//         this.todoViewModel.addItem(inputText)
//     }
//
//     render() {
//         return (
//             <div>
//                 <AddItem add={this.addItem}/>
//                 <List
//                     items={this.todoViewModel.items}
//                     ListItem={Item}
//                     listItemProp={(item) => ({key: item, text: item})}
//                     Divider={Divider}/>
//             </div>
//         )
//     }
//
//
// }